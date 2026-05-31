# PROJECT CONTEXT: Browser-Based Godot WebGPU Game Engine
# Codename: BrowserForge (rename as needed)
# Date: May 2026
# Stack: Godot 4.6.x (WebGPU fork) + React/Next.js + Node.js/Fastify + Docker + Supabase/S3

==============================================================
## VISION
==============================================================
Build a browser-based game engine where users:
1. Visit a website
2. Build games using a Godot-powered editor running in the browser (via WebAssembly)
3. Export a WebGL/WebGPU game build directly — no installs required

Think: "Figma, but for game development" — fully cloud-native, zero local install.

==============================================================
## ARCHITECTURE OVERVIEW
==============================================================

[USER BROWSER]
  └── React/Next.js Shell (UI, auth, project management)
        └── Godot Editor (WebAssembly + WebGPU via Emscripten)
              └── Virtual Filesystem (IndexedDB <-> S3 sync)

[BACKEND]
  └── Fastify/Node.js API
        ├── Auth (Supabase or Clerk)
        ├── Project storage (Supabase Storage or AWS S3)
        ├── Export Job Queue (BullMQ + Redis)
        └── Export Workers (Docker containers: Godot headless + export templates)

[EXPORT FLOW]
  User clicks "Export WebGL"
  → Project files sent to backend
  → Export job queued
  → Docker container runs: `godot --headless --export-release "Web" game.zip`
  → Output zip returned to user as download

==============================================================
## TECH STACK DETAILS
==============================================================

### Frontend
- Framework: Next.js 15 (App Router)
- Language: TypeScript
- UI: Tailwind CSS + shadcn/ui
- Godot Editor embed: iframe or canvas element loading Godot Wasm
- Virtual FS bridge: JavaScript <-> Godot Engine JS API
- Auth: Clerk or Supabase Auth
- File sync: S3-compatible (Supabase Storage)
- State: Zustand

### Backend
- Runtime: Node.js (Fastify or Express)
- Job queue: BullMQ + Redis (for export jobs)
- Container runtime: Docker (one container per export job)
- Storage: Supabase Storage (S3-compatible)
- DB: Supabase PostgreSQL (projects, users, export history)

### Godot Layer
- Base: Godot 4.6.2 (forked)
- WebGPU fork: github.com/dwalter/godotwebgpu (May 2026 public fork)
- Compilation: Emscripten 3.1.x + SCons
- Export templates: prebuilt web export templates baked into Docker image
- Editor build: custom HTML shell with your React UI wrapping the Wasm runtime
- Headless binary: Linux x86_64 for server-side export jobs

### Infrastructure
- Docker: export worker image with Godot headless + web export templates
- Redis: job queue
- Fly.io or Railway: container hosting (auto-scale export workers)
- Vercel: frontend hosting
- CDN: Cloudflare for Wasm/asset caching

==============================================================
## GODOT ENGINE JS API (Critical for Editor Embed)
==============================================================

The Godot Wasm export exposes a JavaScript `Engine` class:

```javascript
const engine = new Engine({
  executable: "/godot/godot.editor",
  experimentalVK: false,
  fileSizes: { "godot.editor.pck": 52428800 },
});

engine.startEditor().then(() => {
  console.log("Godot editor started in browser");
});
```

Key Engine methods:
- `engine.startEditor()` — start the Godot editor
- `engine.start({ args: ["--path", "/project"] })` — start a project
- `engine.copyToFS(path, buffer)` — copy files into the virtual FS
- `engine.fileSystemSync()` — sync virtual FS
- `engine.requestQuit()` — graceful shutdown

Required HTTP headers for SharedArrayBuffer (threading):
  Cross-Origin-Opener-Policy: same-origin
  Cross-Origin-Embedder-Policy: require-corp

==============================================================
## EXPORT PIPELINE (Server-Side Docker)
==============================================================

Dockerfile for export worker:

```dockerfile
FROM ubuntu:22.04
RUN apt-get update && apt-get install -y wget unzip
WORKDIR /godot

# Download Godot headless binary + web export templates
RUN wget https://github.com/dwalter/godotwebgpu/releases/download/latest/godot-headless-linux.zip
RUN unzip godot-headless-linux.zip
RUN mkdir -p ~/.local/share/godot/export_templates/4.6.webgpu/
RUN cp web_export_template.zip ~/.local/share/godot/export_templates/4.6.webgpu/

COPY export_worker.sh /godot/export_worker.sh
RUN chmod +x /godot/export_worker.sh
ENTRYPOINT ["/godot/export_worker.sh"]
```

export_worker.sh:
```bash
#!/bin/bash
# $1 = path to project zip, $2 = output path
unzip $1 -d /tmp/project
cd /tmp/project
/godot/godot --headless --export-release "Web" /output/game.zip
```

Export API endpoint (Node.js):
```typescript
app.post('/api/export', async (req, reply) => {
  const { projectId } = req.body;
  // 1. Download project from S3
  // 2. Queue Docker export job via BullMQ
  // 3. Poll for completion
  // 4. Return signed S3 URL for download
});
```

==============================================================
## FILE STRUCTURE (Monorepo)
==============================================================

browser-forge/
├── apps/
│   ├── web/                    # Next.js frontend
│   │   ├── app/
│   │   │   ├── editor/         # Main editor page
│   │   │   ├── dashboard/      # User project dashboard
│   │   │   └── api/            # API routes
│   │   ├── components/
│   │   │   ├── GodotEditor/    # Wasm embed component
│   │   │   ├── ExportModal/    # Export UI
│   │   │   └── ProjectTree/    # File browser
│   │   └── lib/
│   │       ├── godot-engine.ts # Engine JS API wrapper
│   │       └── storage.ts      # S3 sync utilities
│   └── api/                    # Fastify backend
│       ├── routes/
│       │   ├── projects.ts
│       │   ├── export.ts
│       │   └── auth.ts
│       ├── workers/
│       │   └── exportWorker.ts # BullMQ worker
│       └── docker/
│           └── Dockerfile      # Export worker image
├── packages/
│   ├── godot-wasm/             # Compiled Godot Wasm assets
│   │   ├── godot.editor.js
│   │   ├── godot.editor.wasm
│   │   └── godot.editor.pck
│   └── shared/                 # Shared types/utils
├── infra/
│   ├── fly.toml                # Fly.io config
│   └── docker-compose.yml      # Local dev
└── docs/
    └── ARCHITECTURE.md

==============================================================
## PHASE 1 MVP — WHAT TO BUILD FIRST
==============================================================

1. Get Godot WebGPU Wasm editor running in a Next.js page
   - Serve required COOP/COEP headers
   - Load godot.editor.js + godot.editor.wasm + godot.editor.pck
   - Verify editor boots in Chrome/Firefox

2. Virtual filesystem sync
   - On project save: sync VFS to S3
   - On project load: pull from S3, inject into VFS via copyToFS()

3. Export worker Docker image
   - Build and test locally with docker-compose
   - Run: godot --headless --export-release "Web" output.zip

4. Export API endpoint
   - Accept projectId, run Docker export job, return download URL

5. React shell UI
   - Project dashboard (create/open/delete projects)
   - Editor page (Godot Wasm embed)
   - Export modal (trigger export + download)

==============================================================
## KEY CONSTRAINTS & GOTCHAS
==============================================================

1. SharedArrayBuffer requires COOP+COEP headers — set these on ALL routes serving
   the editor page and Wasm assets.

2. Godot Wasm editor is ~40-60MB — use aggressive HTTP caching (Cache-Control:
   immutable) and a loading progress bar.

3. IndexedDB is the default FS for Godot Wasm — use engine.copyToFS() to inject
   project files, and hook into Godot's save callbacks to sync back to S3.

4. Godot headless export requires a matching export template version — bake the
   exact version into the Docker image, don't download at runtime.

5. One Docker container per export job — use BullMQ concurrency limits to avoid
   resource exhaustion. Start with concurrency: 3 per worker node.

6. WebGPU fallback: Always provide a WebGL 2.0 fallback. ~30% of users may not
   have WebGPU support. The dwalter/godotwebgpu fork supports both.

7. CORS: Configure S3/Supabase CORS to allow your frontend domain for direct
   asset uploads from the browser.

==============================================================
## KEY REPOSITORIES & RESOURCES
==============================================================

- Godot WebGPU fork:         https://github.com/dwalter/godotwebgpu
- Godot official repo:       https://github.com/godotengine/godot
- Godot web editor docs:     https://docs.godotengine.org/en/4.4/tutorials/editor/using_the_web_editor.html
- Godot web export docs:     https://docs.godotengine.org/en/latest/tutorials/export/exporting_for_web.html
- Godot HTML shell docs:     https://docs.godotengine.org/en/stable/tutorials/platform/web/customizing_html5_shell.html
- Godot JS Engine API:       https://docs.godotengine.org/en/stable/tutorials/platform/web/html5_shell_classref.html
- Godot headless export:     https://docs.godotengine.org/en/stable/tutorials/export/exporting_for_dedicated_servers.html
- WebGPU explainer (MDN):    https://developer.mozilla.org/en-US/docs/Web/API/WebGPU_API
- WebGPU browser status:     https://caniuse.com/webgpu
- Emscripten docs:           https://emscripten.org/docs/getting_started/index.html
- BullMQ docs:               https://docs.bullmq.io/
- Supabase storage docs:     https://supabase.com/docs/guides/storage
- Fly.io Docker deploy:      https://fly.io/docs/languages-and-frameworks/dockerfile/

==============================================================
## ENVIRONMENT VARIABLES NEEDED
==============================================================

# Frontend (.env.local)
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
NEXT_PUBLIC_API_URL=http://localhost:3001

# Backend (.env)
SUPABASE_SERVICE_ROLE_KEY=
REDIS_URL=redis://localhost:6379
S3_BUCKET=browser-forge-projects
S3_REGION=ap-south-1
DOCKER_SOCKET=/var/run/docker.sock
MAX_EXPORT_CONCURRENCY=3

==============================================================
## AI AGENT INSTRUCTIONS
==============================================================

When building this project:

1. Start with Phase 1 MVP only. Do not build features beyond what's listed.

2. For the Godot Wasm embed (GodotEditor component), fetch the prebuilt Wasm
   assets from the dwalter/godotwebgpu GitHub releases. Do not compile from
   source in Phase 1.

3. The Next.js server must set these headers for the editor route:
     'Cross-Origin-Opener-Policy': 'same-origin'
     'Cross-Origin-Embedder-Policy': 'require-corp'
   Add this in next.config.ts under `headers()`.

4. Use TypeScript strictly. Enable strict mode in tsconfig.json.

5. Use pnpm as the package manager with a monorepo workspace setup.

6. For local dev, use docker-compose to spin up Redis + a local Godot export
   worker container alongside the Next.js and Fastify servers.

7. Test the export pipeline first with a minimal Godot demo project (the
   official Godot 2D platformer demo works well) before wiring up the UI.

8. Do not implement blockchain/Web3 features in Phase 1. That is Phase 3.
