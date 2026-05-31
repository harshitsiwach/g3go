import type { FastifyInstance } from 'fastify';
import { z } from 'zod';
import db from '../db.js';

const ProjectSchema = z.object({
  name: z.string().min(1).max(100),
  description: z.string().max(500).optional(),
});

export async function projectRoutes(fastify: FastifyInstance) {
  // List all projects
  fastify.get('/', async () => {
    const projects = db.prepare('SELECT * FROM projects ORDER BY updated_at DESC').all();
    return {
      success: true,
      data: projects.map((p: any) => ({
        id: p.id,
        name: p.name,
        description: p.description,
        userId: p.user_id,
        thumbnailUrl: p.thumbnail_url,
        createdAt: p.created_at,
        updatedAt: p.updated_at,
        lastExportedAt: p.last_exported_at,
      })),
    };
  });

  // Get project by ID
  fastify.get<{ Params: { id: string } }>('/:id', async (request, reply) => {
    const { id } = request.params;
    const project = db.prepare('SELECT * FROM projects WHERE id = ?').get(id) as any;

    if (!project) {
      return reply.status(404).send({ success: false, error: 'Project not found' });
    }

    return {
      success: true,
      data: {
        id: project.id,
        name: project.name,
        description: project.description,
        userId: project.user_id,
        thumbnailUrl: project.thumbnail_url,
        createdAt: project.created_at,
        updatedAt: project.updated_at,
        lastExportedAt: project.last_exported_at,
      },
    };
  });

  // Create new project
  fastify.post('/', async (request, reply) => {
    const body = request.body as any;
    const result = ProjectSchema.safeParse(body);

    if (!result.success) {
      return reply.status(400).send({
        success: false,
        error: result.error.errors.map(e => e.message).join(', '),
      });
    }

    const id = Date.now().toString();
    const now = new Date().toISOString();

    db.prepare(`
      INSERT INTO projects (id, name, description, user_id, created_at, updated_at)
      VALUES (?, ?, ?, ?, ?, ?)
    `).run(id, result.data.name, result.data.description || '', 'user-1', now, now);

    const project = db.prepare('SELECT * FROM projects WHERE id = ?').get(id) as any;

    return reply.status(201).send({
      success: true,
      data: {
        id: project.id,
        name: project.name,
        description: project.description,
        userId: project.user_id,
        thumbnailUrl: project.thumbnail_url,
        createdAt: project.created_at,
        updatedAt: project.updated_at,
        lastExportedAt: project.last_exported_at,
      },
    });
  });

  // Update project
  fastify.patch<{ Params: { id: string } }>('/:id', async (request, reply) => {
    const { id } = request.params;
    const project = db.prepare('SELECT * FROM projects WHERE id = ?').get(id) as any;

    if (!project) {
      return reply.status(404).send({ success: false, error: 'Project not found' });
    }

    const body = request.body as any;
    const result = ProjectSchema.partial().safeParse(body);

    if (!result.success) {
      return reply.status(400).send({
        success: false,
        error: result.error.errors.map(e => e.message).join(', '),
      });
    }

    const now = new Date().toISOString();
    const updates: string[] = ['updated_at = ?'];
    const values: any[] = [now];

    if (result.data.name !== undefined) {
      updates.push('name = ?');
      values.push(result.data.name);
    }
    if (result.data.description !== undefined) {
      updates.push('description = ?');
      values.push(result.data.description);
    }

    values.push(id);

    db.prepare(`UPDATE projects SET ${updates.join(', ')} WHERE id = ?`).run(...values);

    const updated = db.prepare('SELECT * FROM projects WHERE id = ?').get(id) as any;

    return {
      success: true,
      data: {
        id: updated.id,
        name: updated.name,
        description: updated.description,
        userId: updated.user_id,
        thumbnailUrl: updated.thumbnail_url,
        createdAt: updated.created_at,
        updatedAt: updated.updated_at,
        lastExportedAt: updated.last_exported_at,
      },
    };
  });

  // Delete project
  fastify.delete<{ Params: { id: string } }>('/:id', async (request, reply) => {
    const { id } = request.params;
    const project = db.prepare('SELECT * FROM projects WHERE id = ?').get(id) as any;

    if (!project) {
      return reply.status(404).send({ success: false, error: 'Project not found' });
    }

    db.prepare('DELETE FROM projects WHERE id = ?').run(id);

    return { success: true };
  });
}
