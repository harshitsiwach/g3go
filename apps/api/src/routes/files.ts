import type { FastifyInstance } from 'fastify';
import db from '../db.js';

export async function fileRoutes(fastify: FastifyInstance) {
  // Upload file to project
  fastify.post<{ Params: { id: string } }>('/:id/files', async (request, reply) => {
    const { id: projectId } = request.params;
    const userId = (request as any).userId;

    // Check project exists and belongs to user
    const project = db.prepare('SELECT id FROM projects WHERE id = ? AND user_id = ?').get(projectId, userId);
    if (!project) {
      return reply.status(404).send({ success: false, error: 'Project not found' });
    }

    const data = await request.file();
    if (!data) {
      return reply.status(400).send({ success: false, error: 'No file provided' });
    }

    const pathField = data.fields.path;
    const pathValue = pathField && typeof pathField === 'object' && 'value' in pathField ? pathField.value : null;
    const path = (typeof pathValue === 'string' ? pathValue : null) || data.filename;
    const buffer = await data.toBuffer();

    db.prepare(`
      INSERT INTO project_files (project_id, path, content, size)
      VALUES (?, ?, ?, ?)
      ON CONFLICT(project_id, path) DO UPDATE SET content = ?, size = ?
    `).run(projectId, path, buffer, buffer.length, buffer, buffer.length);

    // Update project's updated_at
    db.prepare('UPDATE projects SET updated_at = datetime(\'now\') WHERE id = ?').run(projectId);

    return reply.status(201).send({
      success: true,
      data: {
        path,
        size: buffer.length,
        lastModified: new Date(),
      },
    });
  });

  // Get file from project
  fastify.get<{ Params: { id: string; '*': string } }>('/:id/files/*', async (request, reply) => {
    const { id: projectId } = request.params;
    const filePath = (request.params as any)['*'];
    const userId = (request as any).userId;

    const project = db.prepare('SELECT id FROM projects WHERE id = ? AND user_id = ?').get(projectId, userId);
    if (!project) {
      return reply.status(404).send({ success: false, error: 'Project not found' });
    }

    const file = db.prepare(
      'SELECT content, size FROM project_files WHERE project_id = ? AND path = ?'
    ).get(projectId, filePath) as any;

    if (!file) {
      return reply.status(404).send({ success: false, error: 'File not found' });
    }

    return reply
      .header('Content-Type', 'application/octet-stream')
      .header('Content-Length', file.size)
      .send(file.content);
  });

  // Delete file from project
  fastify.delete<{ Params: { id: string; '*': string } }>('/:id/files/*', async (request, reply) => {
    const { id: projectId } = request.params;
    const filePath = (request.params as any)['*'];
    const userId = (request as any).userId;

    const project = db.prepare('SELECT id FROM projects WHERE id = ? AND user_id = ?').get(projectId, userId);
    if (!project) {
      return reply.status(404).send({ success: false, error: 'Project not found' });
    }

    const result = db.prepare(
      'DELETE FROM project_files WHERE project_id = ? AND path = ?'
    ).run(projectId, filePath);

    if (result.changes === 0) {
      return reply.status(404).send({ success: false, error: 'File not found' });
    }

    return { success: true };
  });

  // List files in project
  fastify.get<{ Params: { id: string } }>('/:id/files', async (request, reply) => {
    const { id: projectId } = request.params;
    const userId = (request as any).userId;

    const project = db.prepare('SELECT id FROM projects WHERE id = ? AND user_id = ?').get(projectId, userId);
    if (!project) {
      return reply.status(404).send({ success: false, error: 'Project not found' });
    }

    const files = db.prepare(
      'SELECT path, size FROM project_files WHERE project_id = ?'
    ).all(projectId);

    return { success: true, data: files };
  });

  // Get project import ZIP
  fastify.get<{ Params: { id: string } }>('/:id/import-zip', async (request, reply) => {
    const { id: projectId } = request.params;
    const userId = (request as any).userId;

    const project = db.prepare('SELECT id FROM projects WHERE id = ? AND user_id = ?').get(projectId, userId);
    if (!project) {
      return reply.status(404).send({ success: false, error: 'Project not found' });
    }

    const file = db.prepare(
      'SELECT content, size FROM project_files WHERE project_id = ? AND path = ?'
    ).get(projectId, 'project.zip') as any;

    if (!file) {
      // Try to find any .zip file
      const anyZip = db.prepare(
        'SELECT content, size FROM project_files WHERE project_id = ? AND path LIKE ?'
      ).get(projectId, '%.zip') as any;

      if (!anyZip) {
        return reply.status(404).send({ success: false, error: 'No ZIP file found for this project' });
      }

      return reply
        .header('Content-Type', 'application/zip')
        .header('Content-Length', anyZip.size)
        .send(anyZip.content);
    }

    return reply
      .header('Content-Type', 'application/zip')
      .header('Content-Length', file.size)
      .send(file.content);
  });

  // Upload project ZIP
  fastify.post<{ Params: { id: string } }>('/:id/import-zip', async (request, reply) => {
    const { id: projectId } = request.params;
    const userId = (request as any).userId;

    // Check project exists and belongs to user
    const project = db.prepare('SELECT id FROM projects WHERE id = ? AND user_id = ?').get(projectId, userId);
    if (!project) {
      return reply.status(404).send({ success: false, error: 'Project not found' });
    }

    const data = await request.file();
    if (!data) {
      return reply.status(400).send({ success: false, error: 'No file provided' });
    }

    const buffer = await data.toBuffer();

    db.prepare(`
      INSERT INTO project_files (project_id, path, content, size)
      VALUES (?, ?, ?, ?)
      ON CONFLICT(project_id, path) DO UPDATE SET content = ?, size = ?
    `).run(projectId, 'project.zip', buffer, buffer.length, buffer, buffer.length);

    // Update project's updated_at
    db.prepare('UPDATE projects SET updated_at = datetime(\'now\') WHERE id = ?').run(projectId);

    return reply.status(201).send({
      success: true,
      data: {
        path: 'project.zip',
        size: buffer.length,
        lastModified: new Date(),
      },
    });
  });
}
