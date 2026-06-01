'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import { Loader2, AlertTriangle, Terminal } from 'lucide-react';
import Link from 'next/link';
import { EditorToolbar } from '@/components/editor-toolbar';
import { FileTree } from '@/components/file-tree';
import { Web3Panel } from '@/components/Web3Panel';
import type { GodotEngineInstance } from '@/lib/godot-engine-types';

// ------------------------------------------------------------
// Module-level engine cache.
//
// React 19 strict mode (and any future concurrent render) double-invokes
// useEffect. The Godot runtime is a *singleton* in disguise — its init() uses
// closure-level state (the loaded wasm bytes, the init promise) that is shared
// across every `new Engine()` call. If we create two Engine instances and
// call init() on both, the first one's promise chain sets `instance.g` only
// for the first instance. The second instance ends up with `g === null` and
// the engine then throws "The engine must be initialized before it can be
// started" — which is misleading; the real cause is that init's chain
// rejected (e.g. a missing .side.wasm, a Wasm compile failure, or an
// IndexedDB init failure).
//
// We solve it by:
//   1. Caching the engine instance at module scope (one per page load).
//   2. Making the init promise cached too — the second call gets the same
//      promise as the first and sees the same result.
//   3. NOT tearing the engine down on React unmount, since the user can
//      navigate to the editor, leave, and come back. The engine survives
//      until the tab is closed (handled by the browser's process exit).
// ------------------------------------------------------------
let engineCache: {
  instance: GodotEngineInstance;
  initPromise: Promise<GodotEngineInstance>;
} | null = null;

let scriptTagPromise: Promise<void> | null = null;

function ensureScriptLoaded(src: string): Promise<void> {
  if (scriptTagPromise) return scriptTagPromise;
  scriptTagPromise = new Promise<void>((resolve, reject) => {
    const existing = document.querySelector(
      `script[data-godot-runtime="${src}"]`,
    );
    if (existing) {
      resolve();
      return;
    }
    const s = document.createElement('script');
    s.src = src;
    s.async = false;
    s.dataset.godotRuntime = src;
    s.onload = () => resolve();
    s.onerror = () =>
      reject(new Error(`Failed to load runtime script: ${src}`));
    document.head.appendChild(s);
  });
  return scriptTagPromise;
}

async function loadAndInitEngine(
  executable: string,
  canvas: HTMLCanvasElement,
  onProgress?: (loaded: number, total: number) => void,
  onPrintError?: (...args: unknown[]) => void,
  onPrint?: (...args: unknown[]) => void,
): Promise<GodotEngineInstance> {
  if (engineCache) return engineCache.initPromise;

  const initPromise = (async () => {
    // 1. Load the runtime script (registers window.Engine)
    const scriptPath = `${executable}.js`;
    await ensureScriptLoaded(scriptPath);

    const Engine = window.Engine;
    if (!Engine) {
      throw new Error(
        `window.Engine is not defined after loading ${scriptPath}. ` +
          'The Godot runtime script did not register the Engine class.',
      );
    }

    // 2. Construct the engine instance
    const engine = new Engine({
      executable,
      canvas,
      canvasResizePolicy: 0,
      focusCanvas: true,
      experimentalVK: false,
      persistentDrops: true,
      onProgress,
      onPrint,
      onPrintError,
    });

    // 3. Init — wraps the engine's init() in a try/catch that surfaces the
    //    *real* underlying error. The engine's internal start() will throw a
    //    generic "must be initialized" message if init's chain rejected, so
    //    we capture the underlying error here and re-throw with context.
    try {
      await engine.init(executable);
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err);
      throw new Error(
        `Godot runtime init failed: ${msg}. ` +
          'This usually means a Wasm file failed to fetch, the Wasm binary ' +
          'failed to compile, or the IndexedDB-backed VFS could not be ' +
          'initialized. Check the browser console for `[Godot]` lines.',
      );
    }

    if (!(engine as any).g && !(engine as any).getModuleProperty) {
      // Defensive: if the engine's internal `g` is still null after init()
      // resolved, the chain rejected silently. This is what causes the
      // misleading "must be initialized" error from start().
      throw new Error(
        'Godot runtime init resolved but the engine instance is not ' +
          'initialised. This is a known issue when init() fails silently ' +
          '(e.g. .side.wasm 404, IndexedDB blocked, or Wasm compile error). ' +
          'Open DevTools Network tab and look for failed /godot-wasm/* ' +
          'requests, then check the console for [Godot] errors.',
      );
    }

    engineCache = { instance: engine, initPromise: Promise.resolve(engine) };
    return engine;
  })();

  // Store the promise immediately so a second concurrent call awaits the
  // same one. The instance is only filled in if the chain succeeds.
  engineCache = { instance: null as unknown as GodotEngineInstance, initPromise };

  try {
    const engine = await initPromise;
    engineCache = { instance: engine, initPromise: Promise.resolve(engine) };
    return engine;
  } catch (err) {
    // Reset cache so a retry can attempt a fresh init.
    engineCache = null;
    throw err;
  }
}

async function preflightAssets(executable: string): Promise<{
  ok: boolean;
  missing: string[];
}> {
  // Strict preflight: only fail on files the runtime is *guaranteed* to
  // request. Optional files (.side.wasm, audio worklets) are reported in
  // the UI if missing but don't block — the binary may or may not request
  // them depending on its compile-time flags.
  const baseUrl = executable.replace(/\/[^/]+$/, '');
  const required = [`${executable}.js`, `${executable}.wasm`];
  const optional = [
    `${executable}.side.wasm`,
    `${executable}.audio.worklet.js`,
    `${executable}.audio.position.worklet.js`,
  ];
  const check = async (path: string): Promise<{ url: string; status: number | string }> => {
    const url = path.startsWith('http')
      ? path
      : `${baseUrl}/${path.replace(baseUrl + '/', '')}`;
    try {
      const res = await fetch(url, { method: 'HEAD' });
      return { url, status: res.status };
    } catch (err) {
      return { url, status: err instanceof Error ? err.message : 'fetch failed' };
    }
  };
  const requiredResults = await Promise.all(required.map(check));
  const optionalResults = await Promise.all(optional.map(check));
  const missing = requiredResults
    .filter((r) => typeof r.status !== 'number' || r.status >= 400)
    .map((r) => `${r.url} → ${r.status}`);
  const optionalMissing = optionalResults
    .filter((r) => typeof r.status !== 'number' || r.status >= 400)
    .map((r) => `${r.url} → ${r.status}`);
  return { ok: missing.length === 0, missing: [...missing, ...optionalMissing] };
}

export default function EditorPage() {
  const params = useParams();
  const router = useRouter();
  const searchParams = useSearchParams();
  const projectId = params.id as string;
  const shouldImport = searchParams.get('import') === 'true';
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const engineRef = useRef<GodotEngineInstance | null>(null);
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [loadingMessage, setLoadingMessage] = useState('Loading Godot Editor…');
  const [error, setError] = useState<string | null>(null);
  const [missingAssets, setMissingAssets] = useState<string[]>([]);
  const [engineLogs, setEngineLogs] = useState<string[]>([]);
  const [selectedFile, setSelectedFile] = useState<string | undefined>();

  const appendLog = useCallback((line: string) => {
    setEngineLogs((prev) => {
      const next = [...prev, line];
      return next.length > 30 ? next.slice(next.length - 30) : next;
    });
  }, []);

  const initEngine = useCallback(async () => {
    if (engineRef.current) return;

    if (!canvasRef.current) {
      setError('Canvas element is not mounted yet — cannot start engine.');
      setLoading(false);
      return;
    }

    const executable = '/godot-wasm/godot.editor';

    try {
      setLoading(true);
      setProgress(5);
      setLoadingMessage('Checking editor assets…');

      // Preflight: every required file reachable?
      const preflight = await preflightAssets(executable);
      if (!preflight.ok) {
        setMissingAssets(preflight.missing);
        setError(
          `Required Wasm assets are missing or unreachable:\n${preflight.missing.join('\n')}`,
        );
        setLoading(false);
        return;
      }

      setProgress(15);
      setLoadingMessage('Loading engine script…');

      const engine = await loadAndInitEngine(
        executable,
        canvasRef.current,
        (loaded, total) => {
          if (total > 0) {
            const pct = Math.round((loaded / total) * 100);
            setProgress(15 + Math.round(pct * 0.6));
          }
        },
        (...args) => {
          const line = args
            .map((a) => (typeof a === 'string' ? a : JSON.stringify(a)))
            .join(' ');
          appendLog(`[err] ${line}`);
          console.error('[Godot]', ...args);
        },
        (...args) => {
          const line = args
            .map((a) => (typeof a === 'string' ? a : JSON.stringify(a)))
            .join(' ');
          appendLog(line);
        },
      );

      engineRef.current = engine;
      setProgress(80);
      setLoadingMessage('Engine ready');

      if (shouldImport) {
        setLoadingMessage('Importing project…');
        setProgress(85);
        try {
          const zipResponse = await fetch(`/api/projects/${projectId}/import-zip`);
          if (zipResponse.ok) {
            const zipBuffer = await zipResponse.arrayBuffer();
            setProgress(90);
            setLoadingMessage('Extracting project files…');
            engine.copyToFS('/tmp/preload.zip', new Uint8Array(zipBuffer));
            setProgress(95);
            setLoadingMessage('Starting editor…');
          }
        } catch (importErr) {
          appendLog(
            `[warn] ZIP import failed, starting editor normally: ${
              importErr instanceof Error ? importErr.message : 'unknown'
            }`,
          );
        }
      }

      setProgress(98);
      setLoadingMessage('Starting Godot Editor…');

      const args = shouldImport
        ? ['--project-manager', '--single-window']
        : ['--editor', '--path', '/home/web_user'];

      await engine.start({ args, persistentDrops: true });

      setProgress(100);
      setLoading(false);

      if (shouldImport) {
        router.replace(`/editor/${projectId}`);
      }
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err);
      appendLog(`[fatal] ${msg}`);
      setError(msg);
      setLoading(false);
    }
  }, [projectId, shouldImport, router, appendLog]);

  useEffect(() => {
    if (projectId === 'new') {
      const search = typeof window !== 'undefined' ? window.location.search : '';
      const params = new URLSearchParams(search);
      const template = params.get('template') || 'blank';
      const name = params.get('name') || undefined;

      fetch('/api/projects', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ template, ...(name ? { name } : {}) }),
      })
        .then((r) => r.json())
        .then((data) => {
          if (data?.success && data.data?.id) {
            router.replace(`/editor/${data.data.id}`);
          } else {
            setError(data?.error || 'Could not create a new project');
            setLoading(false);
          }
        })
        .catch((err) => {
          setError(`Network error creating project: ${err instanceof Error ? err.message : 'unknown'}`);
          setLoading(false);
        });
      return;
    }

    // If the engine is already running (from a previous mount — including
    // React 19 strict-mode's double-invoke), wire up our ref to it and skip
    // reinitialisation. The engine survives across navigations and
    // re-renders within the same tab.
    if (engineCache) {
      engineRef.current = engineCache.instance;
      setProgress(100);
      setLoading(false);
      return;
    }

    void initEngine();
    // NOTE: no cleanup. The engine is intentionally kept alive across React
    // re-renders and route navigations within the same tab. See the module
    // comment above for why.
  }, [projectId, initEngine, router]);

  const handleSave = async () => {
    const engine = engineRef.current;
    if (!engine) {
      alert('Editor is not ready yet — wait for the Godot runtime to finish loading.');
      return;
    }
    try {
      let bytes: ArrayBuffer | undefined;
      const readFile = (engine as any).readFileFromFS?.bind(engine);
      if (readFile) {
        const fromFs = readFile('/project/project.zip');
        if (fromFs) {
          bytes = fromFs.buffer.slice(fromFs.byteOffset, fromFs.byteOffset + fromFs.byteLength);
        }
      }
      if (!bytes) {
        const res = await fetch(`/api/projects/${projectId}/import-zip`);
        if (!res.ok) {
          alert('Project saved to browser storage (no zip to upload).');
          return;
        }
        bytes = await res.arrayBuffer();
      }

      const { syncProjectZip } = await import('@/lib/save-sync');
      const result = await syncProjectZip({ projectId, zip: bytes });
      alert(`Saved (${(result.size / 1024).toFixed(1)} KiB) to cloud.`);
    } catch (err) {
      alert(`Failed to save: ${err instanceof Error ? err.message : 'Unknown error'}`);
    }
  };

  const handleExport = () => {
    router.push(`/export/${projectId}`);
  };

  const handleFileSelect = (path: string) => {
    setSelectedFile(path);
  };

  return (
    <main className="h-screen flex flex-col bg-gray-900">
      <EditorToolbar
        onSave={handleSave}
        onExport={handleExport}
        onPlay={() => console.log('Play')}
        onDebug={() => console.log('Debug')}
        onSettings={() => console.log('Settings')}
        disabled={loading || !!error}
      />

      <div className="flex-1 flex overflow-hidden">
        <FileTree onFileSelect={handleFileSelect} selectedFile={selectedFile}>
          <Web3Panel />
        </FileTree>

        <div className="flex-1 relative">
          {loading && progress < 100 && (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-900 z-10">
              <div className="loading-spinner mb-4" />
              <p className="text-gray-400 mb-4">{loadingMessage}</p>
              <div className="w-64 progress-bar">
                <div
                  className="progress-bar-fill"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <p className="text-gray-500 text-sm mt-2">{progress}%</p>
              {engineLogs.length > 0 && (
                <details className="mt-6 max-w-2xl w-full px-4 text-left">
                  <summary className="text-xs text-gray-500 cursor-pointer hover:text-gray-300 flex items-center gap-1">
                    <Terminal className="w-3 h-3" /> engine output ({engineLogs.length})
                  </summary>
                  <pre className="mt-2 text-xs text-gray-500 font-mono whitespace-pre-wrap max-h-40 overflow-y-auto bg-gray-950 p-2 rounded">
                    {engineLogs.join('\n')}
                  </pre>
                </details>
              )}
            </div>
          )}

          {error && (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-900 z-10 p-6 overflow-y-auto">
              <AlertTriangle className="w-16 h-16 text-red-500 mb-4" />
              <h2 className="text-xl font-semibold text-white mb-2">
                Failed to Load Editor
              </h2>
              <pre className="text-red-300 mb-4 text-center max-w-2xl whitespace-pre-wrap font-mono text-sm">
                {error}
              </pre>
              {missingAssets.length > 0 && (
                <div className="mb-4 text-left max-w-2xl w-full">
                  <p className="text-gray-300 text-sm font-semibold mb-2">
                    Missing or unreachable assets:
                  </p>
                  <ul className="text-xs text-gray-400 font-mono space-y-1 bg-gray-950 p-3 rounded">
                    {missingAssets.map((m, i) => (
                      <li key={i}>• {m}</li>
                    ))}
                  </ul>
                </div>
              )}
              {engineLogs.length > 0 && (
                <details className="mb-4 text-left max-w-2xl w-full">
                  <summary className="text-xs text-gray-500 cursor-pointer hover:text-gray-300 flex items-center gap-1">
                    <Terminal className="w-3 h-3" /> engine output ({engineLogs.length})
                  </summary>
                  <pre className="mt-2 text-xs text-gray-500 font-mono whitespace-pre-wrap max-h-60 overflow-y-auto bg-gray-950 p-3 rounded">
                    {engineLogs.join('\n')}
                  </pre>
                </details>
              )}
              <div className="flex gap-3">
                <button
                  onClick={() => window.location.reload()}
                  className="px-6 py-2 bg-brand-600 hover:bg-brand-700 text-white font-medium rounded-lg transition-colors"
                >
                  Try Again
                </button>
                <Link
                  href="/dashboard"
                  className="px-6 py-2 bg-gray-700 hover:bg-gray-600 text-white font-medium rounded-lg transition-colors"
                >
                  Back to Dashboard
                </Link>
              </div>
            </div>
          )}

          {!loading && !error && progress === 100 && !engineRef.current && (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-900">
              <div className="text-center max-w-lg">
                <div className="w-20 h-20 bg-brand-600/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <Loader2 className="w-10 h-10 text-brand-400" />
                </div>
                <h2 className="text-2xl font-bold text-white mb-4">
                  Godot Editor Ready
                </h2>
                <p className="text-gray-400 mb-6">
                  Import a project ZIP or create a new project to get started.
                </p>
                <div className="flex gap-3 justify-center">
                  <Link
                    href="/dashboard"
                    className="px-6 py-3 bg-brand-600 hover:bg-brand-700 text-white font-medium rounded-lg transition-colors"
                  >
                    Go to Dashboard
                  </Link>
                  <button
                    onClick={() => window.location.reload()}
                    className="px-6 py-3 bg-gray-700 hover:bg-gray-600 text-white font-medium rounded-lg transition-colors"
                  >
                    Reload Editor
                  </button>
                </div>
              </div>
            </div>
          )}

          <canvas
            ref={canvasRef}
            id="canvas"
            className="godot-editor-container"
            style={{ display: loading || error || !engineRef.current ? 'none' : 'block' }}
          />
        </div>
      </div>
    </main>
  );
}
