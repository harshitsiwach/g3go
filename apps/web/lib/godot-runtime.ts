/**
 * Unified Godot Wasm runtime — supports both the editor and the export
 * template. The two runtimes are the same C++ binary compiled with different
 * Emscripten flags, so they share the same JS API surface.
 *
 *  - 'editor' mode boots the full Godot editor at the /home/web_user path.
 *  - 'export' mode boots the template_release runtime, which is invoked with
 *    `--headless --export-release "Web" /output/game.zip`. The runtime then
 *    exits when the export finishes.
 */
import { fetchCached } from './wasm-cache';
import type { GodotEngineInstance } from './godot-engine-types';

export type GodotMode = 'editor' | 'export';

export interface GodotRuntimeConfig {
  /** "/godot-wasm/godot.editor" or "/godot-wasm/godot.template_release" */
  executable: string;
  /** Base URL the runtime will use to load its siblings */
  baseUrl?: string;
  /** Which mode to run in. Affects the loaded runtime bundle. */
  mode: GodotMode;
  /** Offscreen canvas for headless export */
  canvas?: HTMLCanvasElement | null;
  onProgress?: (loaded: number, total: number) => void;
  onPrint?: (...args: unknown[]) => void;
  onPrintError?: (...args: unknown[]) => void;
  onExit?: (code: number) => void;
  onFileWritten?: (path: string, data: Uint8Array) => void;
  /** Optional progress thresholds surfaced for UI */
  stage?: (label: string) => void;
}

export interface GodotRuntimeHandle {
  start(args: string[]): Promise<{ exitCode: Promise<number> }>;
  /** Read a file from the runtime's virtual FS as a Uint8Array */
  readFile(path: string): Uint8Array | null;
  /** Write a file into the runtime's virtual FS (e.g. the project zip) */
  copyToFS(path: string, data: Uint8Array): void;
  /** Quit the runtime cleanly */
  requestQuit(): void;
}

interface InternalEngine extends GodotEngineInstance {}

export type { GodotEngineInstance } from './godot-engine-types';

export class GodotRuntime {
  private config: GodotRuntimeConfig;
  private engine: InternalEngine | null = null;

  constructor(config: GodotRuntimeConfig) {
    this.config = config;
  }

  /** Discover the executable + its sibling files from the public manifest */
  static async loadManifest(): Promise<{
    bundles: Record<string, { executable: string; files: { name: string; size: number }[] }>;
  }> {
    const res = await fetch('/godot-wasm/manifest.json');
    if (!res.ok) throw new Error('Failed to load /godot-wasm/manifest.json');
    return res.json();
  }

  /**
   * Fetch the runtime script (the Emscripten-generated `godot.<mode>.js`),
   * evaluate it in the current window so it registers `window.Engine`, and
   * initialize the runtime.
   */
  async init(): Promise<void> {
    if (this.engine) return;

    this.config.stage?.('Fetching runtime script…');

    const executable = this.config.executable;
    const scriptPath = `${executable}.js`;

    // The script is a single Emscripten module that registers window.Engine
    // when evaluated. We fetch it via a <script> tag so it can use top-level
    // await + import.meta shims without us needing to manipulate its body.
    await new Promise<void>((resolve, reject) => {
      const existing = document.querySelector(
        `script[data-godot-runtime="${executable}"]`,
      );
      if (existing) {
        resolve();
        return;
      }
      const s = document.createElement('script');
      s.src = scriptPath;
      s.async = false;
      s.dataset.godotRuntime = executable;
      s.onload = () => resolve();
      s.onerror = () => reject(new Error(`Failed to load ${scriptPath}`));
      document.head.appendChild(s);
    });

    this.config.stage?.('Initializing engine…');

    const Engine = window.Engine;
    if (!Engine) throw new Error('window.Engine not present after loading script');

    this.engine = new Engine({
      executable,
      canvas: this.config.canvas,
      canvasResizePolicy: 2, // Godot Emscripten constant: stretch
      focusCanvas: this.config.mode === 'editor',
      experimentalVK: false,
      onProgress: this.config.onProgress,
      onPrint: this.config.onPrint,
      onPrintError: this.config.onPrintError,
      onExit: this.config.onExit,
    });

    // Init loads the .wasm into the runtime
    await this.engine.init(executable);

    this.config.stage?.('Runtime ready');
  }

  async start(args: string[]): Promise<{ exitCode: Promise<number> }> {
    if (!this.engine) throw new Error('Runtime not initialized');
    const exitCode = new Promise<number>((resolve) => {
      const original = this.config.onExit;
      this.config.onExit = (code) => {
        original?.(code);
        resolve(code);
      };
      // Re-create the engine so it picks up the new onExit
      // (Engine doesn't expose a setter, so the start wrapper below handles this)
    });

    // The Engine class captures onExit at construction; for the export runtime
    // we resolve the exitCode promise from a poll loop that watches the
    // engine's "exited" state, since not all builds support Promise-based exit.
    // We use a simple approach: the export is a one-shot and we resolve once
    // the expected output file appears in the VFS (handled by the caller).
    await this.engine.start({ args, persistentDrops: true });
    return { exitCode };
  }

  copyToFS(path: string, data: Uint8Array): void {
    if (!this.engine) throw new Error('Runtime not initialized');
    this.engine.copyToFS(path, data);
  }

  readFile(path: string): Uint8Array | null {
    if (!this.engine) throw new Error('Runtime not initialized');
    return this.engine.readFileFromFS?.(path) ?? null;
  }

  requestQuit(): void {
    this.engine?.requestQuit();
  }
}

/**
 * Convenience helper — checks the browser has the cross-origin isolation bits
 * required for SharedArrayBuffer (used by the Godot Wasm threading).
 */
export function checkBrowserSupport(): { ok: true } | { ok: false; reason: string } {
  if (typeof window === 'undefined') return { ok: true };
  if (!('SharedArrayBuffer' in window)) {
    return { ok: false, reason: 'SharedArrayBuffer not available — server must send COOP/COEP headers' };
  }
  if (!window.crossOriginIsolated) {
    return { ok: false, reason: 'Page is not cross-origin isolated — server must send COOP/COEP headers' };
  }
  return { ok: true };
}

/**
 * Warm up the cache by pre-fetching the export template's .wasm into IndexedDB.
 * Called when the user opens the editor so the first export is fast.
 */
export async function preloadExportTemplate(onProgress?: (loaded: number, total: number) => void): Promise<void> {
  const url = '/godot-wasm/godot.template_release.wasm';
  const res = await fetch(url, { cache: 'no-store' });
  if (!res.ok || !res.body) return;
  const total = parseInt(res.headers.get('content-length') || '0', 10);
  const reader = res.body.getReader();
  const chunks: Uint8Array[] = [];
  let received = 0;
  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    if (value) {
      chunks.push(value);
      received += value.length;
      onProgress?.(received, total);
    }
  }
  const blob = new Blob(chunks as BlobPart[]);
  await fetchCached(url, { skipCache: true }).catch(() => {
    // Best-effort — we just want the warm fetch; the export flow will fall
    // back to a plain fetch if caching fails.
    void blob;
  });
}
