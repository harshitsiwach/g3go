#!/usr/bin/env node
/**
 * Lists the Godot Wasm assets currently present in public/ and their sizes.
 * Useful for sanity-checking what's actually deployed.
 */
import { readdir, stat } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const PUBLIC_DIR = join(__dirname, '..', 'public');

async function main() {
  const files = await readdir(PUBLIC_DIR);
  let total = 0;
  const rows = [];
  for (const name of files.sort()) {
    const s = await stat(join(PUBLIC_DIR, name));
    if (!s.isFile()) continue;
    rows.push([name, s.size]);
    total += s.size;
  }
  const w = Math.max(...rows.map((r) => r[0].length), 10);
  for (const [name, size] of rows) {
    console.log(`  ${name.padEnd(w)}  ${String(size).padStart(12)} bytes`);
  }
  console.log('  ' + '-'.repeat(w + 16));
  console.log(`  ${'TOTAL'.padEnd(w)}  ${String(total).padStart(12)} bytes (${(total / 1024 / 1024).toFixed(2)} MiB)`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
