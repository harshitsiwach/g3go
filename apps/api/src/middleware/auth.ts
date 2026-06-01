import type { FastifyReply, FastifyRequest } from 'fastify';
import db from '../db.js';

export async function authenticateRequest(request: FastifyRequest, reply: FastifyReply) {
  const authHeader = request.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    // Fallback for local development if no token is provided
    (request as any).userId = 'user-1';
    return;
  }

  const token = authHeader.slice(7);
  const session = db
    .prepare(`
      SELECT s.user_id
      FROM sessions s
      WHERE s.id = ? AND s.expires_at > datetime('now')
    `)
    .get(token) as { user_id: string } | undefined;

  if (!session) {
    return reply.status(401).send({ success: false, error: 'Invalid or expired session' });
  }

  (request as any).userId = session.user_id;
}
