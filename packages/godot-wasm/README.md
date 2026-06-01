# @browser-forge/godot-wasm

Two Wasm asset bundles shipped with BrowserForge. Both are served from
`/godot-wasm/*` at runtime and LFS-tracked in git.

| Bundle | Used by | Purpose |
|---|---|---|
| `godot.editor.*` | `/editor/[id]` | The full Godot editor running in the user's browser |
| `godot.template_release.*` | `/export/[id]` | The export-only runtime that runs `godot --export-release` in the browser to build a downloadable zip |

## Why two bundles?

`v0.1` of BrowserForge ran the Godot **editor** in the browser and pushed
exports to a server-side Docker worker. `v0.2` flips that — both the editor
and the export step run in the user's browser, on the user's CPU/GPU. The
server no longer runs any compute.

That gives us:

- **Zero server compute cost** per export (scales to unlimited users)
- **Faster exports** (no upload → docker → poll → download round-trip)
- **WebGPU by default** — the user's machine handles the heavy lifting

## Files

Run `pnpm --filter @browser-forge/godot-wasm download` to (re)fetch the latest
binaries from the upstream [`dwalter/godotwebgpu`](https://github.com/dwalter/godotwebgpu)
release. `pnpm --filter @browser-forge/godot-wasm list` shows what's on disk.

The `manifest.json` in `public/` is the source of truth for sizes + cached
flags. Both the editor and the export runtime read it on first load to decide
which files to fetch eagerly and which can be lazily streamed from the IndexedDB
cache.

## Cache strategy

- `*.wasm` is downloaded once and stored in `IndexedDB` keyed by URL+hash.
  Cached files are evicted on a 30-day rolling basis or when the user clears
  site data.
- `*.js` shims and `*.html` are `Cache-Control: immutable, max-age=31536000`
  on the CDN and are also mirrored into the service worker.
- Export templates (`godot.template_release.*`) are ~50 MiB and follow the
  same IndexedDB cache. Repeat exports become near-instant.
