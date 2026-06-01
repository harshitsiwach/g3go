/**
 * Browser-side export builder. Bundles the runtime + the project's exported
 * game zip + a platform-specific HTML shell into a single self-contained
 * archive the user can download and host anywhere.
 *
 * The output is a single .zip. For Telegram Mini Apps and Reddit Devvit the
 * user is responsible for publishing; for X / generic web they just drop the
 * zip on any static host.
 *
 * The shell templates are versioned in `packages/export-shells/` and bundled
 * into the web app at build time (via Next.js webpack). See
 * `lib/shells/index.ts` for the registry.
 */
import { zip, strToU8 } from 'fflate';
import { ExportPlatform, type Web3Config } from '@browser-forge/shared';
import { getShellTemplate } from './shells';

export interface BuildExportOptions {
  /** The game zip produced by the in-browser Godot export */
  gameZip: Uint8Array;
  /** Game format — only used to pick rendering flags in the shell */
  format: 'webgl' | 'webgpu';
  /** Target platform shell */
  platform: ExportPlatform;
  /** Project metadata embedded in the shell for OG tags, manifest, etc. */
  meta: {
    title: string;
    description?: string;
    author?: string;
    /** Public URL the game will be hosted at — used for OG tags and embed code */
    hostedUrl?: string;
    /** Wallet address of the project owner (for Web3 projects) */
    walletAddress?: string;
  };
  /** Per-project web3 config — passed to the in-game SDK on load */
  web3Config?: Web3Config | null;
  /** Custom theme overrides (CSS variables injected into the shell) */
  theme?: Record<string, string>;
  /** Optional extras to merge into the zip */
  extraFiles?: Record<string, Uint8Array | string>;
  /** Progress callback for the zipping step */
  onProgress?: (pct: number, label: string) => void;
}

export interface BuildExportResult {
  zip: Uint8Array;
  fileCount: number;
  totalBytes: number;
  filename: string;
  /** A human-readable HTML snippet the user can paste into a blog post, Reddit, etc. */
  embedCode?: string;
}

const RUNTIME_FILES: Array<{ name: string; url: string }> = [
  { name: 'godot.js', url: '/godot-wasm/godot.template_release.js' },
  { name: 'godot.wasm', url: '/godot-wasm/godot.template_release.wasm' },
  { name: 'godot.audio.position.worklet.js', url: '/godot-wasm/godot.template_release.audio.position.worklet.js' },
  { name: 'godot.audio.worklet.js', url: '/godot-wasm/godot.template_release.audio.worklet.js' },
  // The Web3 SDK ships in every game so the runtime API is always available
  // (it no-ops gracefully if no wallet is installed).
  { name: 'web3.js', url: '/web3-sdk/web3.js' },
];

/** Loads a URL as a Uint8Array (uses the cache when possible) */
async function fetchAsBytes(url: string): Promise<Uint8Array> {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`fetch ${url}: HTTP ${res.status}`);
  const buf = await res.arrayBuffer();
  return new Uint8Array(buf);
}

/**
 * Build a complete export zip. This is the function the export page calls
 * after the in-browser Godot export finishes.
 */
export async function buildExportZip(opts: BuildExportOptions): Promise<BuildExportResult> {
  const { gameZip, format, platform, meta, web3Config, theme, extraFiles, onProgress } = opts;
  const files: Record<string, Uint8Array> = {};
  let totalBytes = 0;

  const set = (path: string, data: Uint8Array | string) => {
    const bytes = typeof data === 'string' ? strToU8(data) : data;
    files[path] = bytes;
    totalBytes += bytes.length;
  };

  onProgress?.(0.05, 'Injecting game assets…');
  set('game.pck', gameZip);

  onProgress?.(0.2, 'Adding runtime…');
  for (const f of RUNTIME_FILES) {
    try {
      const bytes = await fetchAsBytes(f.url);
      set(f.name, bytes);
      onProgress?.(0.2 + 0.4 * (RUNTIME_FILES.indexOf(f) / RUNTIME_FILES.length), `Loading ${f.name}…`);
    } catch (err) {
      // Allow the export to proceed without audio worklets if they're missing
      console.warn(`[buildExport] skipping ${f.name}:`, err);
    }
  }

  onProgress?.(0.7, 'Generating platform shell…');
  const shell = getShellTemplate(platform);
  const html = shell.render({
    format,
    meta,
    theme,
    web3Config,
  });
  set('index.html', html);

  // Platform-specific extras
  for (const [path, content] of Object.entries(shell.extras(meta))) {
    set(path, content);
  }

  if (extraFiles) {
    for (const [path, content] of Object.entries(extraFiles)) {
      set(path, content);
    }
  }

  onProgress?.(0.9, 'Zipping…');
  const out = await new Promise<Uint8Array>((resolve, reject) => {
    zip(files, { level: 6 }, (err, data) => {
      if (err) reject(err);
      else resolve(data);
    });
  });

  onProgress?.(1, 'Done');

  const safeName = meta.title.replace(/[^a-z0-9_-]+/gi, '-').toLowerCase() || 'game';
  return {
    zip: out,
    fileCount: Object.keys(files).length,
    totalBytes: out.length,
    filename: `${safeName}-${platform}.zip`,
    embedCode: shell.embedCode?.(meta.hostedUrl ?? ''),
  };
}

/** Triggers a browser download of the produced zip */
export function downloadZip(zip: Uint8Array, filename: string): void {
  // Copy into a fresh ArrayBuffer to satisfy strict BlobPart typings
  const buf = new ArrayBuffer(zip.length);
  new Uint8Array(buf).set(zip);
  const blob = new Blob([buf], { type: 'application/zip' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  setTimeout(() => {
    a.remove();
    URL.revokeObjectURL(url);
  }, 1000);
}
