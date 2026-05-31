# BrowserForge

A browser-based game engine where users build games using a Godot-powered editor running in the browser (via WebAssembly), and export WebGL/WebGPU game builds directly — no installs required.

**Think: "Figma, but for game development"** — fully cloud-native, zero local install.

## Quick Start

### Prerequisites

- **Node.js 22+** — [Download](https://nodejs.org/)
- **pnpm 9+** — Install: `npm install -g pnpm`
- **Docker** (optional) — For export workers and Redis

### 1. Clone & Install

```bash
git clone https://github.com/your-username/browserforge.git
cd browserforge
pnpm install
```

### 2. Set Up Environment Variables

```bash
# Frontend
cp apps/web/.env.example apps/web/.env.local

# Backend
cp apps/api/.env.example apps/api/.env
```

### 3. Start the App

```bash
# Start both API + Frontend
pnpm dev
```

This starts:
- **Frontend**: http://localhost:3000
- **API**: http://localhost:3001

### 4. Open & Sign In

1. Go to http://localhost:3000
2. Click **Sign In** (or go to http://localhost:3000/login)
3. Use demo account:
   - Email: `demo@browserforge.dev`
   - Password: `demo123`

### 5. Start Building

- **Create a new project** — Click "New Project" on the dashboard
- **Import a ZIP** — Click "Import ZIP" and select a Godot project `.zip` file
- **Open the editor** — Click "Open Editor" on any project

## Running with Docker (Optional)

For Redis (job queue) and full export pipeline:

```bash
# Start Docker Desktop first, then:
docker-compose up -d

# This starts:
# - Redis on port 6379
# - PostgreSQL on port 5432 (optional)
```

## Project Structure

```
browserforge/
├── apps/
│   ├── web/                    # Next.js 15 frontend
│   │   ├── app/               # Pages (dashboard, editor, export, auth)
│   │   ├── components/        # React components
│   │   ├── lib/               # Utilities, API client, Godot wrapper
│   │   └── public/            # Static assets (Godot Wasm)
│   └── api/                    # Fastify backend
│       ├── src/
│       │   ├── routes/        # API routes (auth, projects, files, export)
│       │   ├── workers/       # BullMQ export worker
│       │   └── db.ts          # SQLite database
│       └── docker/            # Export worker Dockerfile
├── packages/
│   ├── shared/                 # Shared TypeScript types
│   └── godot-wasm/            # Godot Wasm assets
├── infra/                      # Deployment configs
└── docker-compose.yml         # Local dev infrastructure
```

## Features

### Core
- **Browser-Based Editor** — Full Godot editor via WebAssembly
- **Project Management** — Create, import, delete projects
- **ZIP Import** — Import any Godot project as a ZIP file
- **Export Pipeline** — Export to WebGL, WebGPU, Windows, macOS, Linux

### Authentication
- Session-based auth with register/login/logout
- Route protection middleware
- Demo account included

### Storage
- SQLite database for persistence
- File storage for project files
- Ready for S3/Supabase integration

### Infrastructure
- Docker export workers with Godot headless
- BullMQ job queue (falls back to simulation without Redis)
- Fly.io deployment config

## API Endpoints

### Auth
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/register` | Create account |
| POST | `/api/auth/login` | Sign in |
| POST | `/api/auth/logout` | Sign out |
| GET | `/api/auth/me` | Get current user |

### Projects
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/projects` | List all projects |
| GET | `/api/projects/:id` | Get project |
| POST | `/api/projects` | Create project |
| PATCH | `/api/projects/:id` | Update project |
| DELETE | `/api/projects/:id` | Delete project |

### Files
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/projects/:id/files` | List files |
| POST | `/api/projects/:id/files` | Upload file |
| GET | `/api/projects/:id/files/*` | Download file |
| DELETE | `/api/projects/:id/files/*` | Delete file |
| POST | `/api/projects/:id/import-zip` | Import ZIP |
| GET | `/api/projects/:id/import-zip` | Export ZIP |

### Export
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/export` | Start export job |
| GET | `/api/export/:id` | Get job status |
| GET | `/api/export?projectId=:id` | List project exports |

## Tech Stack

| Layer | Technology |
|-------|------------|
| Frontend | Next.js 15, React 19, TypeScript, Tailwind CSS |
| Backend | Fastify 5, Node.js, TypeScript |
| Database | SQLite (better-sqlite3) |
| Job Queue | BullMQ + Redis (optional) |
| Game Engine | Godot 4.6 WebAssembly |
| Auth | Custom session-based |
| Deployment | Vercel (frontend), Fly.io (backend), Docker |

## Environment Variables

### Frontend (`apps/web/.env.local`)
```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
NEXT_PUBLIC_API_URL=http://localhost:3001
```

### Backend (`apps/api/.env`)
```env
PORT=3001
HOST=0.0.0.0
REDIS_URL=redis://localhost:6379
CORS_ORIGIN=http://localhost:3000
```

## Development Commands

```bash
# Install dependencies
pnpm install

# Start development servers
pnpm dev              # Both API + Frontend
pnpm dev:web          # Frontend only (port 3000)
pnpm dev:api          # Backend only (port 3001)

# Build
pnpm build            # Build all packages

# Type checking
pnpm typecheck        # Check all packages

# Linting
pnpm lint             # Lint all packages

# Database
# SQLite DB is created automatically at apps/api/data/browserforge.db
# Delete it to reset: rm apps/api/data/browserforge.db
```

## How It Works

1. **User visits the website** and signs in
2. **Creates or imports a project** (ZIP upload)
3. **Opens the editor** — Godot Wasm loads in the browser
4. **Edits the game** using the full Godot editor UI
5. **Exports the game** — Backend runs Godot headless in Docker
6. **Downloads the build** — WebGL, desktop, or mobile

## Limitations

- Web editor has no C#/Mono support (Godot limitation)
- No debugging support in web editor
- Export requires Docker with Godot headless
- WebGPU not supported in all browsers (WebGL 2.0 fallback available)

## License

MIT
