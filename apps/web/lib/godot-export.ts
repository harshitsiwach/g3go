/**
 * In-browser export runner.
 *
 * Loads the Godot `template_release` Wasm runtime, boots it with
 * `--headless --export-release "Web" /output/game.zip`, and watches the VFS for
 * the produced zip. The caller can then read the zip via `readResultZip()`.
 *
 * This replaces the v0.1 server-side Docker worker entirely. All compute runs
 * on the user's machine; the server only logs the export event for analytics.
 */
import { GodotRuntime, GodotMode } from './godot-runtime';

export interface ExportOptions {
  /** Either 'webgl' (auto-fallback) or 'webgpu' (WebGPU only) */
  format: 'webgl' | 'webgpu';
  /** Project file contents — usually a project.zip that was imported */
  projectZip?: Uint8Array;
  /** Path the runtime will write the output to */
  outputPath?: string;
  /** Callback for UI progress (0..1) */
  onProgress?: (pct: number, label: string) => void;
  /** Stream of stdout/stderr lines from the engine */
  onLog?: (line: string) => void;
}

export interface ExportResult {
  zip: Uint8Array;
  format: 'webgl' | 'webgpu';
  durationMs: number;
  logs: string[];
}

const EXPORT_PRESET = 'Web'; // matches the preset name in the export template

export async function runExport(opts: ExportOptions): Promise<ExportResult> {
  const {
    format,
    projectZip,
    outputPath = '/output/game.zip',
    onProgress,
    onLog,
  } = opts;

  const logs: string[] = [];
  const startedAt = performance.now();

  // Create a hidden canvas (required by the Wasm runtime even in headless mode)
  const canvas = document.createElement('canvas');
  canvas.style.position = 'absolute';
  canvas.style.left = '-9999px';
  canvas.style.width = '8px';
  canvas.style.height = '8px';
  document.body.appendChild(canvas);

  const runtime = new GodotRuntime({
    executable: '/godot-wasm/godot.template_release',
    mode: 'export' as GodotMode,
    canvas,
    onPrint: (...args) => {
      const line = args.map(String).join(' ');
      logs.push(line);
      onLog?.(line);
    },
    onPrintError: (...args) => {
      const line = args.map(String).join(' ');
      logs.push(`[error] ${line}`);
      onLog?.(line);
    },
    stage: (label) => onProgress?.(0.05, label),
  });

  try {
    onProgress?.(0.05, 'Loading export template…');
    await runtime.init();
    onProgress?.(0.2, 'Template loaded');

    // Inject the project into the runtime's virtual FS
    if (projectZip) {
      onProgress?.(0.25, 'Injecting project…');
      runtime.copyToFS('/project/project.zip', projectZip);
    }

    onProgress?.(0.3, 'Starting export…');

    // The template_release runtime supports --headless export. We point
    // --path at /project and ask for the "Web" preset. The runtime will
    // produce the output zip at the path we specify.
    const args = [
      '--headless',
      '--path', '/project',
      '--export-release', EXPORT_PRESET, outputPath,
    ];

    if (format === 'webgpu') {
      args.push('--rendering-driver', 'webgpu');
    } else {
      args.push('--rendering-driver', 'gl_compatibility');
    }

    const { exitCode } = await runtime.start(args);

    onProgress?.(0.6, 'Compiling project (this is the slow part)…');

    // Watch the VFS for the output zip appearing. We poll because the
    // runtime's exit promise is best-effort and may not fire on every build.
    const zip = await waitForOutput(runtime, outputPath, exitCode, onProgress);

    onProgress?.(1, 'Export complete');

    return {
      zip,
      format,
      durationMs: performance.now() - startedAt,
      logs,
    };
  } finally {
    runtime.requestQuit();
    canvas.remove();
  }
}

async function waitForOutput(
  runtime: GodotRuntime,
  path: string,
  exitCode: Promise<number>,
  onProgress?: (pct: number, label: string) => void,
): Promise<Uint8Array> {
  const start = performance.now();
  // Most projects export in 5–60s depending on size and the user's machine.
  // We cap at 5 min and surface a clear error if we hit that.
  const TIMEOUT_MS = 5 * 60 * 1000;
  let pct = 0.6;

  while (performance.now() - start < TIMEOUT_MS) {
    const zip = runtime.readFile(path);
    if (zip && zip.length > 0) return zip;

    // If the engine has already exited and we still don't have the file, bail
    const exit = await Promise.race([
      exitCode.then((c) => ({ exited: true, c })),
      new Promise((r) => setTimeout(() => r({ exited: false }), 200)),
    ]);
    if (exit && (exit as any).exited && (exit as any).c !== 0) {
      throw new Error(`Export runtime exited with code ${(exit as any).c}`);
    }

    // Slow-burn progress: drift from 60% → 95% over 90s, then plateau
    const elapsed = (performance.now() - start) / 1000;
    pct = Math.min(0.95, 0.6 + Math.min(1, elapsed / 90) * 0.35);
    onProgress?.(pct, `Compiling… ${Math.round(elapsed)}s`);

    await new Promise((r) => setTimeout(r, 250));
  }
  throw new Error('Export timed out after 5 minutes');
}
