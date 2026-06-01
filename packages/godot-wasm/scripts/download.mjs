#!/usr/bin/env node
/**
 * Pulls the Godot WebGPU editor + template_release bundles into
 * packages/godot-wasm/public/ from the upstream GitHub release.
 *
 * Usage: pnpm --filter @browser-forge/godot-wasm download
 *
 * The files are LFS-tracked once committed, so this script only needs to be run
 * when bumping the bundled version. The browser always loads assets from
 * /godot-wasm/* — adjust the URLs in public/manifest.json if you mirror to a
 * CDN.
 */
import { mkdir, writeFile, stat } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const PUBLIC_DIR = join(__dirname, '..', 'public');
const RELEASE = 'https://github.com/dwalter/godotwebgpu/releases/download/latest';

const FILES = [
  // Editor bundle
  { name: 'godot.editor.js', required: true },
  { name: 'godot.editor.wasm', required: true },
  { name: 'godot.editor.html', required: false },
  { name: 'godot.editor.audio.position.worklet.js', required: false },
  { name: 'godot.editor.audio.worklet.js', required: false },
  { name: 'service.worker.js', required: false },
  { name: 'offline.html', required: false },
  { name: 'favicon.png', required: false },
  { name: 'logo.svg', required: false },
  // Template (export) bundle
  { name: 'godot.template_release.js', required: false },
  { name: 'godot.template_release.wasm', required: false },
  { name: 'godot.template_release.audio.position.worklet.js', required: false },
  { name: 'godot.template_release.audio.worklet.js', required: false },
];

async function download(url, dest) {
  console.log(`  fetching ${url}`);
  const res = await fetch(url, { redirect: 'follow' });
  if (!res.ok) throw new Error(`HTTP ${res.status} for ${url}`);
  const buf = Buffer.from(await res.arrayBuffer());
  await mkdir(dirname(dest), { recursive: true });
  await writeFile(dest, buf);
  return buf.length;
}

async function main() {
  console.log(`Downloading Godot Wasm assets into ${PUBLIC_DIR}`);
  await mkdir(PUBLIC_DIR, { recursive: true });

  for (const file of FILES) {
    const dest = join(PUBLIC_DIR, file.name);
    if (existsSync(dest)) {
      const s = await stat(dest);
      if (s.size > 0) {
        console.log(`  skip ${file.name} (already present, ${s.size} bytes)`);
        continue;
      }
    }
    try {
      const size = await download(`${RELEASE}/${file.name}`, dest);
      console.log(`  ok   ${file.name} (${size} bytes)`);
    } catch (err) {
      const level = file.required ? 'ERROR' : 'warn';
      console.log(`  [${level}] ${file.name}: ${err.message}`);
    }
  }

  console.log('Done. Verify public/manifest.json sizes match what you just downloaded.');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
