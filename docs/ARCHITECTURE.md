# BrowserForge v0.2 — Architecture

A browser-based Web3 game engine. Builds and exports run entirely in the user's browser via the Godot Wasm runtime. The server is a thin storage + auth layer.

## High-level

```
┌──────────────────────────────────────────────────────────────┐
│ User's browser                                                │
│                                                                │
│  ┌──────────────┐    ┌────────────────────┐                   │
│  │  Next.js UI  │    │ Godot Wasm editor  │ (88 MB)            │
│  │  (React 19)  │    │   + export runtime │ (~50 MB)           │
│  └──────┬───────┘    └─────────┬──────────┘                   │
│         │                      │                               │
│         │   ┌──────────────────▼─────────────┐                 │
│         │   │  IndexedDB Wasm asset cache    │                 │
│         │   └──────────────────┬─────────────┘                 │
│         │                      │                               │
│         │   ┌──────────────────▼──────────────┐                 │
│         └──►│  Web3 SDK (Solana + EVM)       │                 │
│             │  window.Web3 global            │                 │
│             │  Phantom, MetaMask, WalletConnect │               │
│             └─────────────────────────────────┘                 │
│                                                                │
│  Export flow:                                                  │
│   1. User clicks "Export"                                     │
│   2. Browser boots Godot template_release Wasm runtime        │
│   3. Runtime runs --headless --export-release                 │
│   4. /output/game.pck appears in the runtime's VFS            │
│   5. export-builder.ts zips it + a platform shell + web3.js   │
│   6. Browser downloads the .zip to the user's machine         │
│                                                                │
└──────────────────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────────────────┐
│ BrowserForge API (Fastify / Node 22)                          │
│                                                                │
│  Auth:     SIWS (Solana) + SIWE (EVM) + email fallback       │
│  Projects: CRUD + per-project web3 config                     │
│  Files:    Per-project file storage (SQLite for dev,          │
│            Supabase Storage for prod)                         │
│  Export:   Analytics-only — no server compute                 │
└──────────────────────────────────────────────────────────────┘
```

## Key design decisions

### Pure client-side export
In v0.1 the export pipeline ran on the server via Docker + Godot headless,
choreographed by BullMQ + Redis. v0.2 deletes all of that:

- The Godot Wasm runtime can be invoked with `--headless --export-release`
  in the browser. The compiled game is written to the runtime's virtual
  filesystem, which the host JavaScript can read back.
- The output is bundled with the Godot runtime, a platform shell, and the
  project's web3 config into a self-contained zip.
- The user downloads the zip directly — no upload, no server worker.

**Why this matters**: zero server compute per export. The platform scales
to unlimited concurrent users without spinning up workers. Exports are also
faster (no upload → docker → poll → download round-trip).

### Wallet-first auth
v0.1's email/password flow still works, but the primary sign-in path is
**Sign-In with Wallet**:

- **Solana**: SIWS-style message signed with `signMessage` on Phantom /
  Solflare / Backpack / Brave. Verified server-side with `tweetnacl`.
- **EVM**: SIWE-style message signed with `personal_sign` on MetaMask /
  Coinbase / Rabby / Frame. Verified server-side with `eth-sig-util`.

The challenge → sign → verify flow uses a single-use nonce stored in
SQLite with a 10-minute TTL. On success the user gets a session JWT
identical to the email/password flow.

### Web3 in the exported game
Every exported game ships with `web3.js` (the SDK's UMD bundle). It
auto-installs `window.Web3` with chain-agnostic methods for connect,
disconnect, get balance, sign message, and account/chain events.

The game calls into it from GDScript via `JavaScriptBridge.eval()`. The
`packages/web3-sdk/godot/templates/scripts/web3.gd` autoload wraps that
in a clean GDScript API with signals.

### Platform shells
Same Godot runtime, six HTML shells. Each shell adds platform-specific
JS to the index.html (Telegram WebApp SDK, Reddit Devvit entry, etc.) and
a `README.md` with publishing instructions. The shell registry lives in
`apps/web/lib/shells/`.

### Save sync
The Godot editor's VFS is internal to the Wasm sandbox. We bridge to
cloud storage like this:

- **On load**: dashboard → editor → fetch `/api/projects/:id/import-zip` →
  `engine.copyToFS('/project/project.zip', bytes)`.
- **On save**: editor → try `engine.readFileFromFS('/project/project.zip')`
  → fallback to last server copy → `POST /api/projects/:id/import-zip`.

The `save-sync.ts` module is a thin wrapper around this.

## Component map

### Frontend (`apps/web/`)
| File | Purpose |
|---|---|
| `app/layout.tsx` | Root layout, wraps app in `AuthProvider` + `RouteGuard` |
| `app/login/page.tsx` | Wallet-first sign-in (Solana + EVM detection) |
| `app/login/email/page.tsx` | Email fallback |
| `app/dashboard/page.tsx` | Project list + template gallery trigger |
| `app/editor/[id]/page.tsx` | Boots Godot Wasm editor, wires `Web3Panel` into sidebar |
| `app/export/[id]/page.tsx` | Runs in-browser export + `PlatformSelector` |
| `components/TemplateGallery.tsx` | 7 starter templates (3 starter, 3 web3, 1 TG) |
| `components/Web3Panel.tsx` | Per-project chain + RPC + token mint config |
| `components/export/PlatformSelector.tsx` | UI for picking export shell |
| `lib/godot-runtime.ts` | Unified Wasm runtime (editor + export) |
| `lib/godot-export.ts` | In-browser export runner |
| `lib/export-builder.ts` | Zip + shell + web3 config bundler |
| `lib/wasm-cache.ts` | IndexedDB asset cache |
| `lib/auth-context.tsx` | React auth state + localStorage sync |
| `lib/wallet-auth.ts` | SIWS/SIWE challenge → sign → verify |
| `lib/save-sync.ts` | VFS → cloud project zip sync |
| `lib/route-guard.tsx` | Client-side route protection |
| `lib/shells/` | Platform shell templates |

### Backend (`apps/api/`)
| File | Purpose |
|---|---|
| `src/index.ts` | Fastify server bootstrap |
| `src/db.ts` | SQLite schema + seed (users, sessions, projects, files, nonces) |
| `src/routes/auth.ts` | Wallet + email auth |
| `src/routes/projects.ts` | Project CRUD + per-project web3 config |
| `src/routes/files.ts` | Per-project file upload/download |
| `src/routes/export.ts` | Export analytics (no server work) |

### Shared (`packages/`)
| Package | Purpose |
|---|---|
| `@browser-forge/shared` | TypeScript types (Project, Web3Config, ExportFormat, ...) |
| `@browser-forge/web3-sdk` | In-game Web3 SDK (TS source + UMD bundle + GDScript templates) |
| `@browser-forge/godot-wasm` | Godot Wasm assets (LFS-tracked, served from `/godot-wasm/*`) |

## What we removed from v0.1

- `apps/api/src/workers/` — entire BullMQ/Dockerode worker
- `apps/api/docker/` — Godot headless container
- `apps/api/Dockerfile` — backend Docker image (now deploys as Node service)
- `docker-compose.yml` — Redis + Postgres + worker services
- `infra/fly.toml` — worker-specific Fly config
- Server-side deps: `bullmq`, `dockerode`, `ioredis`

## What we added in v0.2

- `apps/web/lib/godot-runtime.ts` — unified editor + export runtime
- `apps/web/lib/godot-export.ts` — in-browser export runner
- `apps/web/lib/export-builder.ts` — zip + shell bundler
- `apps/web/lib/shells/` — 6 platform shell templates
- `apps/web/lib/wasm-cache.ts` — IndexedDB asset cache
- `apps/web/lib/wallet-auth.ts` — SIWS/SIWE client
- `apps/web/lib/save-sync.ts` — VFS → cloud sync
- `apps/web/lib/auth-context.tsx` — React auth state
- `apps/web/lib/route-guard.tsx` — client-side route protection
- `apps/web/components/Web3Panel.tsx` — per-project web3 config
- `apps/web/components/TemplateGallery.tsx` — starter templates
- `apps/web/components/export/PlatformSelector.tsx` — shell picker
- `packages/web3-sdk/` — full Web3 SDK (TS + UMD + GDScript)
- `apps/api/src/routes/auth.ts` — wallet challenge + verify endpoints
- `apps/api/src/routes/projects.ts` — `/web3` PATCH endpoint

## Browser support

Both the editor and the export runtime require **SharedArrayBuffer**, which
requires the page to be **cross-origin isolated**. Send these headers on
every route that serves the editor or the export page:

```
Cross-Origin-Opener-Policy: same-origin
Cross-Origin-Embedder-Policy: require-corp
```

WebGPU additionally requires Chrome 113+ / Edge 113+ / Firefox 121+ / Safari 17+.
The export page always offers a WebGL 2.0 fallback for older browsers.

## Future work

- **P2P multiplayer** via WebRTC. The Web3 SDK exposes a `Web3.pubsub`
  interface that no-ops for now.
- **On-chain game saves** — sign a checkpoint, store the hash on IPFS or
  Arweave, verify on resume.
- **Custom React scene editor** for non-coders — multi-month build that
  unlocks a much bigger audience.
- **One-click deploy to Vercel** from the export page using the Vercel API.
