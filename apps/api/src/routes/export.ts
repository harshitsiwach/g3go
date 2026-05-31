import type { FastifyInstance } from 'fastify';
import { z } from 'zod';
import { Queue } from 'bullmq';
import db from '../db.js';

const ExportSchema = z.object({
  projectId: z.string().min(1),
  format: z.enum(['webgl', 'webgpu', 'windows', 'macos', 'linux']),
});

// BullMQ queue (falls back to simulation if Redis unavailable)
let exportQueue: Queue | null = null;
let redisAvailable = false;

try {
  const connection = {
    host: process.env.REDIS_HOST || 'localhost',
    port: parseInt(process.env.REDIS_PORT || '6379', 10),
  };

  exportQueue = new Queue('export-jobs', {
    connection,
    defaultJobOptions: {
      attempts: 3,
      backoff: {
        type: 'exponential',
        delay: 2000,
      },
    },
  });

  // Test connection
  await exportQueue.waitUntilReady();
  redisAvailable = true;
  console.log('BullMQ: Connected to Redis');
} catch (err) {
  console.warn('BullMQ: Redis not available, using simulation mode');
  exportQueue = null;
  redisAvailable = false;
}

export async function exportRoutes(fastify: FastifyInstance) {
  // Start export job
  fastify.post('/', async (request, reply) => {
    const body = request.body as any;
    const result = ExportSchema.safeParse(body);

    if (!result.success) {
      return reply.status(400).send({
        success: false,
        error: result.error.errors.map(e => e.message).join(', '),
      });
    }

    const { projectId, format } = result.data;
    const jobId = `export-${Date.now()}`;

    // Create job in database
    db.prepare(`
      INSERT INTO export_jobs (id, project_id, status, format, created_at)
      VALUES (?, ?, 'pending', ?, datetime('now'))
    `).run(jobId, projectId, format);

    // Update project's last_exported_at
    db.prepare('UPDATE projects SET last_exported_at = datetime(\'now\') WHERE id = ?').run(projectId);

    if (redisAvailable && exportQueue) {
      // Add job to BullMQ queue
      try {
        await exportQueue.add('export', {
          jobId,
          projectId,
          format,
        }, {
          jobId,
        });

        console.log(`Export job ${jobId} queued for project ${projectId}`);
      } catch (err) {
        console.error('Failed to queue export job:', err);
        // Fall back to simulation
        simulateExport(jobId);
      }
    } else {
      // Simulate export (Redis not available)
      simulateExport(jobId);
    }

    const job = db.prepare('SELECT * FROM export_jobs WHERE id = ?').get(jobId) as any;

    return reply.status(201).send({
      success: true,
      data: {
        id: job.id,
        projectId: job.project_id,
        status: job.status,
        format: job.format,
        outputUrl: job.output_url,
        error: job.error,
        startedAt: job.started_at,
        completedAt: job.completed_at,
        createdAt: job.created_at,
      },
    });
  });

  // Get export job status
  fastify.get<{ Params: { id: string } }>('/:id', async (request, reply) => {
    const { id } = request.params;
    const job = db.prepare('SELECT * FROM export_jobs WHERE id = ?').get(id) as any;

    if (!job) {
      return reply.status(404).send({ success: false, error: 'Export job not found' });
    }

    return {
      success: true,
      data: {
        id: job.id,
        projectId: job.project_id,
        status: job.status,
        format: job.format,
        outputUrl: job.output_url,
        error: job.error,
        startedAt: job.started_at,
        completedAt: job.completed_at,
        createdAt: job.created_at,
      },
    };
  });

  // List export jobs for a project
  fastify.get<{ Querystring: { projectId: string } }>('/', async (request, reply) => {
    const { projectId } = request.query;

    if (!projectId) {
      return reply.status(400).send({ success: false, error: 'projectId is required' });
    }

    const jobs = db.prepare(
      'SELECT * FROM export_jobs WHERE project_id = ? ORDER BY created_at DESC'
    ).all(projectId) as any[];

    return {
      success: true,
      data: jobs.map(job => ({
        id: job.id,
        projectId: job.project_id,
        status: job.status,
        format: job.format,
        outputUrl: job.output_url,
        error: job.error,
        startedAt: job.started_at,
        completedAt: job.completed_at,
        createdAt: job.created_at,
      })),
    };
  });
}

// Simulate export when Redis is not available
function simulateExport(jobId: string) {
  setTimeout(() => {
    db.prepare('UPDATE export_jobs SET status = \'processing\', started_at = datetime(\'now\') WHERE id = ?').run(jobId);
  }, 1000);

  setTimeout(() => {
    db.prepare(`
      UPDATE export_jobs
      SET status = 'completed',
          completed_at = datetime('now'),
          output_url = ?
      WHERE id = ?
    `).run(`http://localhost:3001/api/export/${jobId}/download`, jobId);
  }, 5000);
}
