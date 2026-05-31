import type { FastifyInstance } from 'fastify';
import { z } from 'zod';
import { createHash, randomBytes } from 'crypto';
import db from '../db.js';

const RegisterSchema = z.object({
  email: z.string().email(),
  name: z.string().min(1).max(100),
  password: z.string().min(6).max(100),
});

const LoginSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

function hashPassword(password: string): string {
  return createHash('sha256').update(password).digest('hex');
}

function createSessionToken(): string {
  return randomBytes(32).toString('hex');
}

export async function authRoutes(fastify: FastifyInstance) {
  // Register
  fastify.post('/register', async (request, reply) => {
    const body = request.body as any;
    const result = RegisterSchema.safeParse(body);

    if (!result.success) {
      return reply.status(400).send({
        success: false,
        error: result.error.errors.map(e => e.message).join(', '),
      });
    }

    const { email, name, password } = result.data;

    // Check if user exists
    const existing = db.prepare('SELECT id FROM users WHERE email = ?').get(email);
    if (existing) {
      return reply.status(409).send({
        success: false,
        error: 'Email already registered',
      });
    }

    const id = `user-${Date.now()}`;
    const now = new Date().toISOString();
    const passwordHash = hashPassword(password);

    db.prepare(`
      INSERT INTO users (id, email, name, password_hash, created_at, updated_at)
      VALUES (?, ?, ?, ?, ?, ?)
    `).run(id, email, name, passwordHash, now, now);

    // Create session
    const sessionToken = createSessionToken();
    const expiresAt = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString();

    db.prepare(`
      INSERT INTO sessions (id, user_id, expires_at, created_at)
      VALUES (?, ?, ?, ?)
    `).run(sessionToken, id, expiresAt, now);

    return reply.status(201).send({
      success: true,
      data: {
        user: { id, email, name },
        sessionToken,
      },
    });
  });

  // Login
  fastify.post('/login', async (request, reply) => {
    const body = request.body as any;
    const result = LoginSchema.safeParse(body);

    if (!result.success) {
      return reply.status(400).send({
        success: false,
        error: result.error.errors.map(e => e.message).join(', '),
      });
    }

    const { email, password } = result.data;
    const passwordHash = hashPassword(password);

    const user = db.prepare(
      'SELECT id, email, name FROM users WHERE email = ? AND password_hash = ?'
    ).get(email, passwordHash) as any;

    if (!user) {
      return reply.status(401).send({
        success: false,
        error: 'Invalid email or password',
      });
    }

    // Create session
    const sessionToken = createSessionToken();
    const now = new Date().toISOString();
    const expiresAt = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString();

    db.prepare(`
      INSERT INTO sessions (id, user_id, expires_at, created_at)
      VALUES (?, ?, ?, ?)
    `).run(sessionToken, user.id, expiresAt, now);

    return {
      success: true,
      data: {
        user: { id: user.id, email: user.email, name: user.name },
        sessionToken,
      },
    };
  });

  // Logout
  fastify.post('/logout', async (request, reply) => {
    const authHeader = request.headers.authorization;
    if (authHeader?.startsWith('Bearer ')) {
      const token = authHeader.slice(7);
      db.prepare('DELETE FROM sessions WHERE id = ?').run(token);
    }

    return { success: true };
  });

  // Get current user
  fastify.get('/me', async (request, reply) => {
    const authHeader = request.headers.authorization;
    if (!authHeader?.startsWith('Bearer ')) {
      return reply.status(401).send({ success: false, error: 'Not authenticated' });
    }

    const token = authHeader.slice(7);
    const session = db.prepare(`
      SELECT s.user_id, u.email, u.name
      FROM sessions s
      JOIN users u ON s.user_id = u.id
      WHERE s.id = ? AND s.expires_at > datetime('now')
    `).get(token) as any;

    if (!session) {
      return reply.status(401).send({ success: false, error: 'Invalid or expired session' });
    }

    return {
      success: true,
      data: {
        id: session.user_id,
        email: session.email,
        name: session.name,
      },
    };
  });
}
