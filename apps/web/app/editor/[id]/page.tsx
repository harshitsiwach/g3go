'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import { Loader2, AlertTriangle, Terminal, Download } from 'lucide-react';
import Link from 'next/link';
import { EditorToolbar } from '@/components/editor-toolbar';
import { FileTree } from '@/components/file-tree';
import { Web3Panel } from '@/components/Web3Panel';
import { useAuth } from '@/lib/auth-context';
import type { GodotEngineInstance } from '@/lib/godot-engine-types';

// ------------------------------------------------------------
// Module-level engine cache.
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
    const scriptPath = `${executable}.js`;
    await ensureScriptLoaded(scriptPath);

    const Engine = window.Engine;
    if (!Engine) {
      throw new Error(
        `window.Engine is not defined after loading ${scriptPath}. ` +
          'The Godot runtime script did not register the Engine class.',
      );
    }

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

  engineCache = { instance: null as unknown as GodotEngineInstance, initPromise };

  try {
    const engine = await initPromise;
    engineCache = { instance: engine, initPromise: Promise.resolve(engine) };
    return engine;
  } catch (err) {
    engineCache = null;
    throw err;
  }
}

async function preflightAssets(executable: string): Promise<{
  ok: boolean;
  missing: string[];
}> {
  const required = [`${executable}.js`, `${executable}.wasm`, `${executable}.pck`];
  const optional = [
    `${executable}.side.wasm`,
    `${executable}.audio.worklet.js`,
    `${executable}.audio.position.worklet.js`,
  ];
  
  const check = async (path: string): Promise<{ url: string; status: number | string }> => {
    try {
      const res = await fetch(path, { method: 'HEAD' });
      return { url: path, status: res.status };
    } catch (err) {
      return { url: path, status: err instanceof Error ? err.message : 'fetch failed' };
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
  const { fetchWithAuth } = useAuth();
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

  // Automatic asset downloader state
  const [downloadingAssets, setDownloadingAssets] = useState(false);
  const [downloadProgress, setDownloadProgress] = useState(0);
  const [downloadLabel, setDownloadLabel] = useState('');
  const [downloadError, setDownloadError] = useState<string | null>(null);

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
        
        const hasPckMissing = preflight.missing.some(m => m.includes('.pck'));
        let errMsg = `Required Wasm assets are missing or unreachable:\n${preflight.missing.join('\n')}`;
        if (hasPckMissing) {
          errMsg += `\n\n[CRITICAL ERROR] The Godot Editor pack file (.pck) is missing from public/godot-wasm/.\n` +
            `To resolve this, you can click "Download Assets Automatically" below, or run the following command in your terminal:\n\n` +
            `pnpm --filter @browser-forge/godot-wasm download\n\n` +
            `After downloading, refresh this page to launch the editor.`;
        }
        setError(errMsg);
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
          const zipResponse = await fetchWithAuth(`/api/projects/${projectId}/import-zip`);
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
  }, [projectId, shouldImport, router, appendLog, fetchWithAuth]);

  const startAssetDownload = async () => {
    setDownloadingAssets(true);
    setDownloadProgress(0);
    setDownloadLabel('Initializing download...');
    setDownloadError(null);

    try {
      const res = await fetch('/api/assets/download-wasm', { method: 'POST' });
      const data = await res.json();
      if (!data.success) throw new Error(data.message || 'Failed to start download');

      const pollInterval = setInterval(async () => {
        try {
          const statusRes = await fetch('/api/assets/download-status');
          const statusData = await statusRes.json();

          setDownloadProgress(statusData.progress);
          setDownloadLabel(statusData.label || 'Downloading...');

          if (statusData.error) {
            clearInterval(pollInterval);
            setDownloadError(statusData.error);
            setDownloadingAssets(false);
          } else if (statusData.progress >= 100) {
            clearInterval(pollInterval);
            setDownloadLabel('Assets successfully installed! Reloading editor...');
            setTimeout(() => {
              setDownloadingAssets(false);
              setError(null);
              setMissingAssets([]);
              void initEngine();
            }, 1500);
          }
        } catch (pollErr) {
          console.error('Failed to poll download status:', pollErr);
        }
      }, 1000);
    } catch (err) {
      setDownloadError(err instanceof Error ? err.message : 'Failed to start download');
      setDownloadingAssets(false);
    }
  };

  useEffect(() => {
    if (projectId === 'new') {
      const search = typeof window !== 'undefined' ? window.location.search : '';
      const params = new URLSearchParams(search);
      const template = params.get('template') || 'blank';
      const name = params.get('name') || undefined;

      fetchWithAuth('/api/projects', {
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

    if (engineCache) {
      engineRef.current = engineCache.instance;
      setProgress(100);
      setLoading(false);
      return;
    }

    void initEngine();
  }, [projectId, initEngine, router, fetchWithAuth]);

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
        const res = await fetchWithAuth(`/api/projects/${projectId}/import-zip`);
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
              
              {missingAssets.some(m => m.includes('.pck')) && (
                <div className="mb-6 p-5 bg-brand-500/10 border border-brand-500/30 rounded-xl max-w-xl text-center">
                  <p className="text-brand-300 font-medium text-sm mb-3">
                    The Godot Editor asset pack (.pck) is missing or could not be loaded.
                  </p>
                  
                  {downloadingAssets ? (
                    <div className="space-y-3">
                      <div className="flex items-center justify-center gap-2 text-white text-xs">
                        <Loader2 className="w-4 h-4 animate-spin text-brand-400" />
                        <span>{downloadLabel}</span>
                      </div>
                      <div className="w-full h-1.5 bg-gray-800 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-brand-500 transition-all duration-300"
                          style={{ width: `${downloadProgress}%` }}
                        />
                      </div>
                      <span className="text-xs text-gray-400 font-mono">{downloadProgress}%</span>
                    </div>
                  ) : (
                    <button
                      onClick={startAssetDownload}
                      className="px-6 py-2.5 bg-brand-600 hover:bg-brand-700 text-white text-sm font-semibold rounded-lg transition-colors flex items-center gap-2 mx-auto"
                    >
                      <Download className="w-4 h-4" /> Download Assets Automatically
                    </button>
                  )}
                  {downloadError && (
                    <p className="text-xs text-red-400 mt-2 font-mono">Error: {downloadError}</p>
                  )}
                </div>
              )}

              {missingAssets.length > 0 && !downloadingAssets && (
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
              {engineLogs.length > 0 && !downloadingAssets && (
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
                  disabled={downloadingAssets}
                  className="px-6 py-2 bg-brand-600 hover:bg-brand-700 text-white font-medium rounded-lg transition-colors disabled:opacity-50"
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
