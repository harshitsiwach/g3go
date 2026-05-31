# BrowserForge - Cloud Game Engine

A browser-based game development platform powered by Godot WebGPU. Build games entirely in your browser with no local installations required.

## Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                     User Browser                            │
├─────────────────────────────────────────────────────────────┤
│  React/Next.js Shell                                        │
│    ├── Project Dashboard                                    │
│    ├── Godot Editor (Wasm + WebGPU)                         │
│    └── Virtual Filesystem (IndexedDB ↔ S3)                  │
└─────────────────────────────────────────────────────────────┘
                           │
                           ▼
┌─────────────────────────────────────────────────────────────┐
│                    Backend API                               │
├─────────────────────────────────────────────────────────────┤
│  Fastify/Node.js                                            │
│    ├── Auth (Supabase/Clerk)                                │
│    ├── Project Storage (S3)                                 │
│    ├── Export Job Queue (BullMQ + Redis)                    │
│    └── Export Workers (Docker: Godot headless)              │
└─────────────────────────────────────────────────────────────┘
```

## Tech Stack

- **Frontend**: Next.js 15, React 19, TypeScript, Tailwind CSS, Zustand
- **Backend**: Node.js, Fastify, BullMQ, Redis
- **Database**: Supabase (PostgreSQL)
- **Storage**: S3-compatible (Supabase Storage)
- **Export**: Docker containers with Godot headless
- **Infrastructure**: Fly.io, Vercel, Docker

## Prerequisites

- Node.js 22+
- pnpm 9+
- Docker (for export workers)
- Redis (for job queue)

## Getting Started

1. **Install dependencies**:
   ```bash
   pnpm install
   ```

2. **Download Godot Wasm assets**:
   See `packages/godot-wasm/README.md` for instructions.

3. **Set up environment variables**:
   ```bash
   cp apps/web/.env.example apps/web/.env.local
   cp apps/api/.env.example apps/api/.env
   ```

4. **Start development servers**:
   ```bash
   pnpm dev
   ```

5. **Start Redis and export worker** (optional):
   ```bash
   docker-compose up redis
   ```

## Project Structure

```
browser-forge/
├── apps/
│   ├── web/                    # Next.js frontend
│   │   ├── app/               # App Router pages
│   │   ├── components/        # React components
│   │   └── lib/               # Utilities and API client
│   └── api/                    # Fastify backend
│       ├── src/
│       │   ├── routes/        # API routes
│       │   └── workers/       # BullMQ workers
│       └── docker/            # Export worker Dockerfile
├── packages/
│   ├── shared/                 # Shared types and utilities
│   └── godot-wasm/            # Godot Wasm assets
├── infra/                      # Deployment configs
└── docker-compose.yml         # Local development setup
```

## Development

### Frontend (Next.js)
```bash
pnpm dev:web
```
Opens at http://localhost:3000

### Backend (Fastify)
```bash
pnpm dev:api
```
Opens at http://localhost:3001

### Both
```bash
pnpm dev
```

## Export Pipeline

1. User clicks "Export" in the editor
2. Frontend sends export request to API
3. API queues export job in BullMQ
4. Export worker picks up the job
5. Worker runs Godot headless in Docker container
6. Exported file is uploaded to S3
7. Download URL is returned to user

## Environment Variables

### Frontend (.env.local)
- `NEXT_PUBLIC_SUPABASE_URL` - Supabase project URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` - Supabase anonymous key
- `NEXT_PUBLIC_API_URL` - Backend API URL

### Backend (.env)
- `PORT` - Server port (default: 3001)
- `REDIS_URL` - Redis connection URL
- `DATABASE_URL` - PostgreSQL connection string
- `DOCKER_SOCKET` - Docker socket path
- `MAX_EXPORT_CONCURRENCY` - Max concurrent exports (default: 3)
- `CORS_ORIGIN` - Frontend URL for CORS

## Deployment

### Frontend (Vercel)
```bash
vercel deploy
```

### Backend (Fly.io)
```bash
fly deploy
```

### Export Workers
```bash
docker build -t browserforge-export-worker -f apps/api/docker/Dockerfile .
docker push browserforge-export-worker
```

## Contributing

1. Create a feature branch
2. Make your changes
3. Run `pnpm typecheck` and `pnpm lint`
4. Submit a pull request

## License

MIT
