import type { FastifyInstance } from 'fastify';
import { z } from 'zod';
import db from '../db.js';
import { authenticateRequest } from '../middleware/auth.js';
import { fileRoutes } from './files.js';

const ProjectSchema = z.object({
  name: z.string().min(1).max(100).optional(),
  description: z.string().max(500).optional(),
  template: z.string().max(50).optional(),
});

const Web3ConfigSchema = z.object({
  enabled: z.boolean().default(false),
  chains: z.array(z.enum(['solana', 'base', 'polygon'])).default([]),
  solana: z
    .object({
      rpcUrl: z.string().url().optional().or(z.literal('')),
      tokenMint: z.string().optional().or(z.literal('')),
      programId: z.string().optional().or(z.literal('')),
    })
    .optional(),
  evm: z
    .object({
      chainId: z.number().int().optional().nullable(),
      rpcUrl: z.string().url().optional().or(z.literal('')),
      tokenAddress: z.string().optional().or(z.literal('')),
    })
    .optional(),
});

export async function projectRoutes(fastify: FastifyInstance) {
  // Add authentication middleware
  fastify.addHook('preHandler', authenticateRequest);

  // Register file routes nested under this plugin so they inherit /api/projects prefix and don't collide
  await fastify.register(fileRoutes);

  fastify.get('/', async (request) => {
    const userId = (request as any).userId;
    const projects = db
      .prepare('SELECT * FROM projects WHERE user_id = ? ORDER BY updated_at DESC')
      .all(userId) as any[];
    return {
      success: true,
      data: projects.map((p) => ({
        id: p.id,
        name: p.name,
        description: p.description,
        userId: p.user_id,
        thumbnailUrl: p.thumbnail_url,
        template: p.template ?? 'blank',
        web3Config: p.web3_config ? JSON.parse(p.web3_config) : null,
        createdAt: p.created_at,
        updatedAt: p.updated_at,
        lastExportedAt: p.last_exported_at,
      })),
    };
  });

  fastify.get<{ Params: { id: string } }>('/:id', async (request, reply) => {
    const { id } = request.params;
    const userId = (request as any).userId;
    const project = db.prepare('SELECT * FROM projects WHERE id = ? AND user_id = ?').get(id, userId) as any;
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
        template: project.template ?? 'blank',
        web3Config: project.web3_config ? JSON.parse(project.web3_config) : null,
        createdAt: project.created_at,
        updatedAt: project.updated_at,
        lastExportedAt: project.last_exported_at,
      },
    };
  });

  fastify.post('/', async (request, reply) => {
    const body = (request.body as any) ?? {};
    const result = ProjectSchema.safeParse(body);
    if (!result.success) {
      return reply.status(400).send({
        success: false,
        error: result.error.errors.map((e) => e.message).join(', '),
      });
    }

    const userId = (request as any).userId;

    // Per-template display name. Falls back to a timestamped default so a
    // user can fire `POST /api/projects {}` with nothing and still get back
    // a project they can immediately open in the editor.
    const TEMPLATE_NAMES: Record<string, string> = {
      'blank': 'Untitled Project',
      'platformer': 'Platformer Demo',
      'topdown': 'Top-Down Shooter',
      'puzzle': 'Match-3 Puzzle',
      'web3-onboarding': 'Web3 Token-Gated Demo',
      'web3-coin-collect': 'Token-Gated Coin Collector',
      'telegram-invite': 'Telegram Mini App',
    };
    const template = result.data.template || 'blank';
    const name = result.data.name || TEMPLATE_NAMES[template] || 'Untitled Project';

    const id = `proj-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 6)}`;
    const now = new Date().toISOString();
    db.prepare(`
      INSERT INTO projects (id, name, description, user_id, template, created_at, updated_at)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `).run(
      id,
      name,
      result.data.description || '',
      userId,
      template,
      now,
      now,
    );

    const project = db.prepare('SELECT * FROM projects WHERE id = ? AND user_id = ?').get(id, userId) as any;
    return reply.status(201).send({
      success: true,
      data: {
        id: project.id,
        name: project.name,
        description: project.description,
        userId: project.user_id,
        thumbnailUrl: project.thumbnail_url,
        template: project.template ?? 'blank',
        web3Config: null,
        createdAt: project.created_at,
        updatedAt: project.updated_at,
        lastExportedAt: project.last_exported_at,
      },
    });
  });

  fastify.patch<{ Params: { id: string } }>('/:id', async (request, reply) => {
    const { id } = request.params;
    const userId = (request as any).userId;
    const project = db.prepare('SELECT * FROM projects WHERE id = ? AND user_id = ?').get(id, userId) as any;
    if (!project) {
      return reply.status(404).send({ success: false, error: 'Project not found' });
    }

    const body = request.body as any;
    const result = ProjectSchema.partial().safeParse(body);
    if (!result.success) {
      return reply.status(400).send({
        success: false,
        error: result.error.errors.map((e) => e.message).join(', '),
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
    if (result.data.template !== undefined) {
      updates.push('template = ?');
      values.push(result.data.template);
    }

    values.push(id);
    values.push(userId);
    db.prepare(`UPDATE projects SET ${updates.join(', ')} WHERE id = ? AND user_id = ?`).run(...values);

    const updated = db.prepare('SELECT * FROM projects WHERE id = ? AND user_id = ?').get(id, userId) as any;
    return {
      success: true,
      data: {
        id: updated.id,
        name: updated.name,
        description: updated.description,
        userId: updated.user_id,
        thumbnailUrl: updated.thumbnail_url,
        template: updated.template ?? 'blank',
        web3Config: updated.web3_config ? JSON.parse(updated.web3_config) : null,
        createdAt: updated.created_at,
        updatedAt: updated.updated_at,
        lastExportedAt: updated.last_exported_at,
      },
    };
  });

  // PATCH /:id/web3 — update the web3 config (no project body required)
  fastify.patch<{ Params: { id: string } }>('/:id/web3', async (request, reply) => {
    const { id } = request.params;
    const userId = (request as any).userId;
    const project = db.prepare('SELECT id FROM projects WHERE id = ? AND user_id = ?').get(id, userId);
    if (!project) {
      return reply.status(404).send({ success: false, error: 'Project not found' });
    }

    const body = request.body as any;
    const result = Web3ConfigSchema.safeParse(body);
    if (!result.success) {
      return reply.status(400).send({
        success: false,
        error: result.error.errors.map((e) => e.message).join(', '),
      });
    }

    const now = new Date().toISOString();
    db.prepare(`
      UPDATE projects SET web3_config = ?, updated_at = ? WHERE id = ? AND user_id = ?
    `).run(JSON.stringify(result.data), now, id, userId);

    return { success: true, data: result.data };
  });

  fastify.delete<{ Params: { id: string } }>('/:id', async (request, reply) => {
    const { id } = request.params;
    const userId = (request as any).userId;
    const project = db.prepare('SELECT id FROM projects WHERE id = ? AND user_id = ?').get(id, userId);
    if (!project) {
      return reply.status(404).send({ success: false, error: 'Project not found' });
    }
    db.prepare('DELETE FROM projects WHERE id = ? AND user_id = ?').run(id, userId);
    return { success: true };
  });
}
