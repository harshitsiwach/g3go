# BrowserForge

A browser-based game engine for building **Web3 games** with Godot — no installs required. Build, run, and export games that talk to **Solana** and **EVM chains (Base, Polygon)**, and ship them to the **web, Telegram, X, and Reddit** as self-contained zips.

> v0.2 — pure-client compute. No Docker. No Redis. No export workers. Your browser does the work.

**Think: "Figma, but for Web3 game development"** — fully browser-native, wallet-first auth, zero server compute.

## What's new in v0.2

- **Exports run in the browser.** The Godot `template_release` Wasm runtime compiles the project on the user's machine and produces a downloadable zip — no server worker, no queue, no Docker.
- **Wallet-first auth.** Sign in with **Phantom / Solflare / MetaMask / Coinbase / Rabby** via SIWS (Solana) and SIWE (EVM). Email/password is a legacy fallback.
- **Web3 SDK** ships inside every exported game. One `Web3.connect('solana')` from GDScript connects a wallet, reads balances, signs messages.
- **Social export presets.** One runtime, six shells: `web`, `telegram`, `x`, `reddit-devvit`, `reddit-host`, `iframe`.
- **Template gallery** with Web3-onboarding and token-gated starters.

## Quick Start

### Prerequisites
- **Node.js 22+** — [Download](https://nodejs.org/)
- **pnpm 9+** — Install: `npm i -g pnpm`

### 1. Clone & Install
```bash
git clone https://github.com/harshitsiwach/g3go.git
cd g3go
pnpm install
```

### 2. Set up environment variables
```bash
cp apps/web/.env.example apps/web/.env.local
cp apps/api/.env.example apps/api/.env
```
The defaults work out of the box for local dev. For Supabase, fill in the URL + anon key.

### 3. Download the Godot Wasm assets
```bash
pnpm --filter @browser-forge/godot-wasm download
```
This pulls `godot.editor.*` and `godot.template_release.*` from the upstream `dwalter/godotwebgpu` release. If the release URLs aren't live yet, the editor will still load a stub (the build pipeline still works for shells and the web3 SDK).

### 4. Start the dev servers
```bash
pnpm dev
```
This runs:
- **Frontend** at http://localhost:3000
- **API** at http://localhost:3001

### 5. Sign in & build
- Go to http://localhost:3000/login
- Connect a Solana or EVM wallet (Phantom, MetaMask, etc.)
- Pick a template from the gallery and start building

## Architecture

```
┌──────────────────────────────────────────────────────────────┐
│ User's browser                                                │
│                                                                │
│  ┌───────────────┐    ┌─────────────────┐                     │
│  │  Next.js UI   │    │ Godot Wasm edit │   (88 MB)           │
│  │  (React 19)   │    │   (editor mode) │                     │
│  └───────┬───────┘    └────────┬────────┘                     │
│          │                     │                               │
│          │   ┌─────────────────▼──────────────┐                │
│          │   │ IndexedDB Wasm cache (shared)  │                │
│          │   └─────────────────┬──────────────┘                │
│          │                     │                               │
│          │    ┌────────────────▼─────────────┐                │
│          └───►│  Web3 SDK (Solana + EVM)     │                │
│               │  Phantom, MetaMask, etc.     │                │
│               └────────────────┬─────────────┘                │
│                                │                               │
│  When user clicks "Export":    │                               │
│  ┌─────────────────────────────▼────────────┐                 │
│  │ Godot Wasm export runtime                │   (~50 MB)      │
│  │ --headless --export-release "Web"        │                 │
│  │ → reads /project, writes /output/game.pck│                │
│  └─────────────────────────────┬────────────┘                 │
│                                │                               │
│  ┌─────────────────────────────▼────────────┐                 │
│  │ export-builder.ts                        │                 │
│  │  • bundles runtime + game.pck            │                 │
│  │  • injects platform shell (web, TG, X)   │                 │
│  │  • inlines per-project web3 config       │                 │
│  │  • produces self-contained .zip          │                 │
│  └─────────────────────────────┬────────────┘                 │
│                                │                               │
│                       browser downloads zip → user hosts it   │
└────────────────────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────────────────┐
│ BrowserForge API (Fastify / Node 22)                          │
│                                                                │
│  POST /api/auth/wallet/{challenge,verify}    SIWS + SIWE       │
│  POST /api/auth/{login,register,logout}      email fallback    │
│  GET/POST /api/projects                       project CRUD     │
│  PATCH /api/projects/:id/web3                 web3 config     │
│  POST/GET /api/projects/:id/files             project files   │
│  POST /api/projects/:id/import-zip            project zip     │
│  POST /api/export                             analytics only   │
│                                                                │
│  NO Docker, NO Redis, NO export workers.                      │
└──────────────────────────────────────────────────────────────┘
```

## Project structure

```
.
├── apps/
│   ├── web/                       # Next.js 15 frontend
│   │   ├── app/                   # Pages (dashboard, editor, export, login)
│   │   ├── components/            # React (Web3Panel, TemplateGallery, etc.)
│   │   ├── lib/                   # Auth context, runtime wrappers, export builder
│   │   │   ├── godot-runtime.ts   # Unified Wasm runtime (editor + export)
│   │   │   ├── godot-export.ts    # In-browser export runner
│   │   │   ├── export-builder.ts  # Zip + shell + web3 config bundler
│   │   │   ├── shells/            # Platform shells (web, telegram, x, ...)
│   │   │   ├── wasm-cache.ts      # IndexedDB asset cache
│   │   │   ├── wallet-auth.ts     # SIWS/SIWE flow
│   │   │   ├── save-sync.ts       # VFS → cloud sync
│   │   │   └── auth-context.tsx   # React auth provider
│   │   └── public/                # Static Wasm + web3 SDK assets
│   └── api/                       # Fastify backend
│       └── src/routes/            # auth, projects, files, export
├── packages/
│   ├── shared/                    # Shared types (Project, Web3Config, ...)
│   ├── web3-sdk/                  # In-game Web3 SDK
│   │   ├── src/                   # TypeScript source (Solana + EVM providers)
│   │   ├── dist/web3.js           # UMD bundle shipped with every game
│   │   └── godot/templates/       # GDScript files to drop into your project
│   └── godot-wasm/                # Editor + export template Wasm assets (LFS)
└── docs/
    └── ARCHITECTURE.md
```

## Web3 in your game

The Web3 SDK auto-installs as `window.Web3` in every exported game. From GDScript:

```gdscript
# Drop scripts/web3.gd in your project and add it as an autoload called "Web3"

func _ready() -> void:
    var res = Web3.connect("solana")
    if not res.has("error"):
        print("Connected: ", res.address)

        # Read a balance
        var bal = Web3.get_balance("solana")
        print("Balance: ", bal.amount, " (decimals: ", bal.decimals, ")")

        # Sign a message
        var sign = Web3.sign_message("solana", "Sign in to play")
        if not sign.has("error"):
            print("Signature: ", sign.signature)
```

Bundled with the SDK are three ready-to-use Godot nodes:
- `WalletConnectButton` — connect/disconnect UI
- `TokenBalanceLabel` — auto-refreshing balance display
- `TransactionButton` — prompt a signature

Copy them from `packages/web3-sdk/godot/templates/scripts/` into your project.

## Export targets

| Target | Shell extras | Best for |
|---|---|---|
| `web` | OG tags, mobile viewport | Generic hosting (Vercel, Netlify, S3) |
| `telegram` | Telegram Web App SDK, MainButton, theme sync | Telegram bots / mini apps |
| `x` | Square aspect ratio, no chrome | X / Twitter embeds |
| `reddit-devvit` | Devvit manifest + entry | Reddit apps via developers.reddit.com |
| `reddit-host` | oEmbed discovery | Embedding in normal Reddit posts |
| `iframe` | Fixed 16:9 wrapper | Blog / docs / CMS embeds |

Same Godot runtime, different `index.html`. The export zip is self-contained — host on any static server.

## API endpoints

### Auth
| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/auth/wallet/challenge` | SIWS/SIWE challenge message |
| POST | `/api/auth/wallet/verify` | Verify signature, issue session |
| POST | `/api/auth/login` | Legacy email/password |
| POST | `/api/auth/register` | Legacy email/password |
| POST | `/api/auth/logout` | Invalidate session |
| GET | `/api/auth/me` | Current user |

### Projects
| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/projects` | List user's projects |
| GET | `/api/projects/:id` | Get project (incl. web3Config, template) |
| POST | `/api/projects` | Create (with template) |
| PATCH | `/api/projects/:id` | Update name/description |
| PATCH | `/api/projects/:id/web3` | Update web3 config |
| DELETE | `/api/projects/:id` | Delete project |
| GET | `/api/projects/:id/files` | List files |
| POST | `/api/projects/:id/files` | Upload file |
| GET | `/api/projects/:id/files/*` | Download file |
| POST | `/api/projects/:id/import-zip` | Upload project zip (for editor) |
| GET | `/api/projects/:id/import-zip` | Download project zip |

### Export
| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/export` | Log export event (analytics only — no server work) |
| GET | `/api/export/:id` | Status (always `completed` for client-side exports) |
| GET | `/api/export?projectId=:id` | List project's exports |

## Development commands

```bash
pnpm install              # Install all workspaces
pnpm dev                  # Run API + frontend
pnpm dev:web              # Frontend only
pnpm dev:api              # API only
pnpm build                # Build all packages
pnpm typecheck            # TypeScript check all packages
pnpm lint                 # Lint all packages

# Web3 SDK
pnpm --filter @browser-forge/web3-sdk build
pnpm --filter @browser-forge/web3-sdk typecheck

# Godot Wasm assets
pnpm --filter @browser-forge/godot-wasm download   # one-time setup
pnpm --filter @browser-forge/godot-wasm list       # inspect what's on disk
```

## Environment variables

### Frontend — `apps/web/.env.local`
```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
NEXT_PUBLIC_API_URL=http://localhost:3001
```

### Backend — `apps/api/.env`
```env
PORT=3001
HOST=0.0.0.0
CORS_ORIGIN=http://localhost:3000
SUPABASE_URL=
SUPABASE_SERVICE_ROLE_KEY=
```

## How it works (end-to-end)

1. **User signs in** with Phantom or MetaMask (SIWS/SIWE). The server returns a session JWT.
2. **User opens a project** — the Godot Wasm editor fetches the project's source zip from `/api/projects/:id/import-zip` and injects it into the editor's VFS via `engine.copyToFS`.
3. **User edits** — Godot's internal save writes to its IndexedDB VFS.
4. **User clicks Save** — `save-sync.ts` reads the project zip from the VFS and uploads it back to the server.
5. **User clicks Export** — `godot-export.ts` boots the `template_release` Wasm runtime and runs `--headless --export-release "Web" /output/game.pck`. The runtime produces the compiled game on the user's CPU.
6. **`export-builder.ts`** bundles the compiled game + the Godot runtime + the chosen platform shell + the per-project web3 config into a single zip.
7. **User downloads the zip** and uploads it to Vercel, Telegram, Reddit, or wherever.

## License

MIT
