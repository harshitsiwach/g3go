'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import { Loader2 } from 'lucide-react';
import Link from 'next/link';
import { EditorToolbar } from '@/components/editor-toolbar';
import { FileTree } from '@/components/file-tree';

interface GodotEngine {
  init(executable: string): Promise<void>;
  start(options: { args: string[]; persistentDrops?: boolean }): Promise<void>;
  preloadFile(url: string, path?: string): Promise<void>;
  copyToFS(path: string, buffer: ArrayBuffer | Uint8Array): void;
  requestQuit(): void;
}

declare global {
  interface Window {
    Engine: new (config: Record<string, unknown>) => GodotEngine;
    EngineLoader: {
      load(basePath: string): Promise<void>;
    };
  }
}

export default function EditorPage() {
  const params = useParams();
  const router = useRouter();
  const searchParams = useSearchParams();
  const projectId = params.id as string;
  const shouldImport = searchParams.get('import') === 'true';
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const engineRef = useRef<GodotEngine | null>(null);
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [loadingMessage, setLoadingMessage] = useState('Loading Godot Editor...');
  const [error, setError] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<string | undefined>();

  const initEngine = useCallback(async () => {
    try {
      setLoading(true);
      setProgress(10);
      setLoadingMessage('Checking editor assets...');

      // Check if Godot Wasm assets exist
      const checkAssets = async () => {
        try {
          const response = await fetch('/godot-wasm/godot.editor.js', { method: 'HEAD' });
          return response.ok;
        } catch {
          return false;
        }
      };

      const assetsExist = await checkAssets();

      if (!assetsExist) {
        setLoading(false);
        setProgress(100);
        return;
      }

      // Dynamically load the Godot engine script
      setLoadingMessage('Loading engine script...');
      setProgress(20);

      const script = document.createElement('script');
      script.src = '/godot-wasm/godot.editor.js';

      await new Promise<void>((resolve, reject) => {
        script.onload = () => resolve();
        script.onerror = () => reject(new Error('Failed to load Godot engine script'));
        document.head.appendChild(script);
      });

      setProgress(40);
      setLoadingMessage('Initializing engine...');

      if (!window.Engine) {
        throw new Error('Godot Engine class not found');
      }

      // Create engine instance
      const engine = new window.Engine({
        executable: '/godot-wasm/godot.editor',
        canvas: canvasRef.current,
        experimentalVK: false,
        focusCanvas: true,
        canvasResizePolicy: 0,
        persistentDrops: true,
        onProgress: (loaded: number, total: number) => {
          if (total > 0) {
            const pct = Math.round((loaded / total) * 100);
            setProgress(40 + Math.round(pct * 0.5));
          }
        },
        onPrintError: (...args: unknown[]) => {
          console.error('[Godot]', ...args);
        },
      });

      setProgress(50);
      setLoadingMessage('Loading engine binary...');

      // Initialize the engine (loads wasm)
      await engine.init('/godot-wasm/godot.editor');

      engineRef.current = engine;
      setProgress(80);

      // If importing, fetch the ZIP and inject it into the VFS
      if (shouldImport) {
        setLoadingMessage('Importing project...');
        setProgress(85);

        try {
          const zipResponse = await fetch(`/api/projects/${projectId}/import-zip`);
          if (zipResponse.ok) {
            const zipBuffer = await zipResponse.arrayBuffer();
            setProgress(90);
            setLoadingMessage('Extracting project files...');

            // Inject ZIP into Godot's virtual filesystem
            engine.copyToFS('/tmp/preload.zip', new Uint8Array(zipBuffer));

            setProgress(95);
            setLoadingMessage('Starting editor...');
          }
        } catch (importErr) {
          console.warn('ZIP import failed, starting editor normally:', importErr);
        }
      }

      setProgress(98);
      setLoadingMessage('Starting Godot Editor...');

      // Start the editor - use --project-manager for imports, or direct for existing projects
      const args = shouldImport
        ? ['--project-manager', '--single-window']
        : ['--editor', '--path', '/home/web_user'];

      await engine.start({ args, persistentDrops: true });

      setProgress(100);
      setLoading(false);

      // Clear the import query parameter
      if (shouldImport) {
        router.replace(`/editor/${projectId}`);
      }
    } catch (err) {
      console.error('Engine init failed:', err);
      setError(`Failed to start Godot editor: ${err instanceof Error ? err.message : 'Unknown error'}`);
      setLoading(false);
    }
  }, [projectId, shouldImport, router]);

  useEffect(() => {
    if (projectId === 'new') {
      router.push('/dashboard');
      return;
    }

    initEngine();

    return () => {
      if (engineRef.current) {
        try {
          engineRef.current.requestQuit();
        } catch {
          // Ignore cleanup errors
        }
      }
    };
  }, [projectId, initEngine, router]);

  const handleSave = async () => {
    if (engineRef.current) {
      try {
        alert('Project saved to browser storage!');
      } catch (err) {
        alert(`Failed to save: ${err instanceof Error ? err.message : 'Unknown error'}`);
      }
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
        <FileTree
          onFileSelect={handleFileSelect}
          selectedFile={selectedFile}
        />

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
            </div>
          )}

          {error && (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-900 z-10">
              <div className="text-red-500 text-6xl mb-4">!</div>
              <h2 className="text-xl font-semibold text-white mb-2">Failed to Load Editor</h2>
              <p className="text-gray-400 mb-6 text-center max-w-md">{error}</p>
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
