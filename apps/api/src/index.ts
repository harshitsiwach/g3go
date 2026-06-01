import Fastify from 'fastify';
import cors from '@fastify/cors';
import multipart from '@fastify/multipart';
import { projectRoutes } from './routes/projects.js';
import { exportRoutes } from './routes/export.js';
import { authRoutes } from './routes/auth.js';

const server = Fastify({
  logger: {
    level: 'info',
    transport: {
      target: 'pino-pretty',
      options: {
        translateTime: 'HH:MM:ss Z',
        ignore: 'pid,hostname',
      },
    },
  },
});

// Register plugins
await server.register(cors, {
  origin: process.env.CORS_ORIGIN || 'http://localhost:3000',
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
});

await server.register(multipart, {
  limits: {
    fileSize: 100 * 1024 * 1024, // 100MB max file size
  },
});

// Register routes
await server.register(authRoutes, { prefix: '/api/auth' });
await server.register(projectRoutes, { prefix: '/api/projects' });
await server.register(exportRoutes, { prefix: '/api/export' });

// Health check
server.get('/api/health', async () => {
  return { status: 'ok', timestamp: new Date().toISOString() };
});

// Start server
const start = async () => {
  try {
    const port = parseInt(process.env.PORT || '3001', 10);
    const host = process.env.HOST || '0.0.0.0';

    await server.listen({ port, host });
    server.log.info(`Server running on http://${host}:${port}`);
  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }
};

start();
