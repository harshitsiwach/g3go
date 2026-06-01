import type { FastifyInstance } from 'fastify';
import { z } from 'zod';
import db from '../db.js';
import { authenticateRequest } from '../middleware/auth.js';

const ExportSchema = z.object({
  projectId: z.string().min(1),
  format: z.enum(['webgl', 'webgpu']),
  platform: z.string().optional(),
});

/**
 * Exports are now performed entirely client-side in the user's browser using
 * the Godot Wasm runtime. This route exists only to log export analytics and
 * update the project's last_exported_at timestamp. The actual build zip is
 * produced in the browser and downloaded directly by the user.
 */
export async function exportRoutes(fastify: FastifyInstance) {
  // Add authentication middleware
  fastify.addHook('preHandler', authenticateRequest);

  fastify.post('/', async (request, reply) => {
    const body = request.body as any;
    const result = ExportSchema.safeParse(body);

    if (!result.success) {
      return reply.status(400).send({
        success: false,
        error: result.error.errors.map((e) => e.message).join(', '),
      });
    }

    const { projectId, format, platform } = result.data;
    const userId = (request as any).userId;

    // Verify the project exists and belongs to the user
    const project = db.prepare('SELECT id FROM projects WHERE id = ? AND user_id = ?').get(projectId, userId);
    if (!project) {
      return reply.status(404).send({ success: false, error: 'Project not found' });
    }

    // Update the project's last_exported_at for analytics
    db.prepare("UPDATE projects SET last_exported_at = datetime('now') WHERE id = ?").run(projectId);

    const id = `export-${Date.now()}`;
    const now = new Date().toISOString();

    return reply.status(201).send({
      success: true,
      data: {
        id,
        projectId,
        status: 'completed',
        format,
        platform: platform ?? 'web',
        // No outputUrl — the zip is built and downloaded in the browser
        createdAt: now,
        completedAt: now,
        clientSide: true,
      },
    });
  });

  fastify.get<{ Params: { id: string } }>('/:id', async (request, reply) => {
    return {
      success: true,
      data: {
        id: request.params.id,
        status: 'completed',
        clientSide: true,
        note: 'Browser-side exports are not tracked server-side.',
      },
    };
  });

  fastify.get<{ Querystring: { projectId: string } }>('/', async (request, reply) => {
    const { projectId } = request.query;
    if (!projectId) {
      return reply.status(400).send({ success: false, error: 'projectId is required' });
    }
    const userId = (request as any).userId;
    const project = db.prepare('SELECT id FROM projects WHERE id = ? AND user_id = ?').get(projectId, userId);
    if (!project) {
      return reply.status(404).send({ success: false, error: 'Project not found' });
    }
    return {
      success: true,
      data: []
    };
  });
}
