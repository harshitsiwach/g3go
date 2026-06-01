import type { FastifyInstance } from 'fastify';
import { z } from 'zod';
import { createHash, randomBytes } from 'crypto';
import nacl from 'tweetnacl';
import { recoverPersonalSignature } from 'eth-sig-util';
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

const SiwsChallengeSchema = z.object({
  walletAddress: z.string().min(32).max(64),
  chain: z.enum(['solana', 'evm']),
});

const SiwsVerifySchema = z.object({
  walletAddress: z.string().min(32).max(64),
  chain: z.enum(['solana', 'evm']),
  signature: z.string().min(1),
  message: z.string().min(1),
  name: z.string().max(100).optional(),
});

function hashPassword(password: string): string {
  return createHash('sha256').update(password).digest('hex');
}

function createSessionToken(): string {
  return randomBytes(32).toString('hex');
}

function buildSiwsMessage(args: {
  walletAddress: string;
  nonce: string;
  issuedAt: string;
}): string {
  return [
    'BrowserForge wants you to sign in with your Solana account',
    '',
    `Wallet: ${args.walletAddress}`,
    `Nonce: ${args.nonce}`,
    `Issued At: ${args.issuedAt}`,
    'URI: https://browserforge.dev',
    'Version: 1',
  ].join('\n');
}

function buildSiweMessage(args: {
  walletAddress: string;
  nonce: string;
  issuedAt: string;
}): string {
  return [
    'browserforge.dev wants you to sign in with your Ethereum account:',
    args.walletAddress,
    '',
    'Sign in to BrowserForge to build, save, and export Web3 games.',
    '',
    `URI: https://browserforge.dev`,
    'Version: 1',
    `Nonce: ${args.nonce}`,
    `Issued At: ${args.issuedAt}`,
    `Expiration Time: ${new Date(Date.now() + 10 * 60 * 1000).toISOString()}`,
  ].join('\n');
}

export async function authRoutes(fastify: FastifyInstance) {
  // ============================================================
  // Legacy email/password auth (kept for migration)
  // ============================================================
  fastify.post('/register', async (request, reply) => {
    const body = request.body as any;
    const result = RegisterSchema.safeParse(body);
    if (!result.success) {
      return reply.status(400).send({
        success: false,
        error: result.error.errors.map((e) => e.message).join(', '),
      });
    }

    const { email, name, password } = result.data;
    const existing = db.prepare('SELECT id FROM users WHERE email = ?').get(email);
    if (existing) {
      return reply.status(409).send({ success: false, error: 'Email already registered' });
    }

    const id = `user-${Date.now()}`;
    const now = new Date().toISOString();
    db.prepare(`
      INSERT INTO users (id, email, name, password_hash, created_at, updated_at)
      VALUES (?, ?, ?, ?, ?, ?)
    `).run(id, email, name, hashPassword(password), now, now);

    const sessionToken = createSessionToken();
    const expiresAt = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString();
    db.prepare(`
      INSERT INTO sessions (id, user_id, expires_at, created_at)
      VALUES (?, ?, ?, ?)
    `).run(sessionToken, id, expiresAt, now);

    return reply.status(201).send({
      success: true,
      data: { user: { id, email, name }, sessionToken },
    });
  });

  fastify.post('/login', async (request, reply) => {
    const body = request.body as any;
    const result = LoginSchema.safeParse(body);
    if (!result.success) {
      return reply.status(400).send({
        success: false,
        error: result.error.errors.map((e) => e.message).join(', '),
      });
    }

    const { email, password } = result.data;
    const user = db.prepare(
      'SELECT id, email, name FROM users WHERE email = ? AND password_hash = ?',
    ).get(email, hashPassword(password)) as any;

    if (!user) {
      return reply.status(401).send({ success: false, error: 'Invalid email or password' });
    }

    const sessionToken = createSessionToken();
    const now = new Date().toISOString();
    const expiresAt = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString();
    db.prepare(`
      INSERT INTO sessions (id, user_id, expires_at, created_at)
      VALUES (?, ?, ?, ?)
    `).run(sessionToken, user.id, expiresAt, now);

    return {
      success: true,
      data: { user: { id: user.id, email: user.email, name: user.name }, sessionToken },
    };
  });

  // ============================================================
  // Wallet-based auth: SIWS (Solana) + SIWE (EVM)
  // ============================================================

  // Step 1: request a challenge message signed by the wallet
  fastify.post('/wallet/challenge', async (request, reply) => {
    const body = request.body as any;
    const result = SiwsChallengeSchema.safeParse(body);
    if (!result.success) {
      return reply.status(400).send({ success: false, error: 'Invalid wallet request' });
    }

    const nonce = randomBytes(16).toString('hex');
    const issuedAt = new Date().toISOString();
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000).toISOString();

    db.prepare(`
      INSERT INTO siwe_nonces (nonce, expires_at) VALUES (?, ?)
    `).run(nonce, expiresAt);

    const message =
      result.data.chain === 'solana'
        ? buildSiwsMessage({
            walletAddress: result.data.walletAddress,
            nonce,
            issuedAt,
          })
        : buildSiweMessage({
            walletAddress: result.data.walletAddress,
            nonce,
            issuedAt,
          });

    return { success: true, data: { message, nonce, issuedAt, expiresAt } };
  });

  // Step 2: verify the signature and issue a session
  fastify.post('/wallet/verify', async (request, reply) => {
    const body = request.body as any;
    const result = SiwsVerifySchema.safeParse(body);
    if (!result.success) {
      return reply.status(400).send({ success: false, error: 'Invalid verify request' });
    }

    const { walletAddress, chain, signature, message, name } = result.data;

    // Extract the nonce from the message and verify it exists + hasn't expired
    const nonceMatch = message.match(/Nonce: ([a-f0-9]+)/);
    if (!nonceMatch) {
      return reply.status(400).send({ success: false, error: 'Malformed message' });
    }
    const nonce = nonceMatch[1];

    const nonceRow = db
      .prepare('SELECT expires_at FROM siwe_nonces WHERE nonce = ?')
      .get(nonce) as { expires_at: string } | undefined;
    if (!nonceRow) {
      return reply.status(400).send({ success: false, error: 'Unknown nonce' });
    }
    if (new Date(nonceRow.expires_at).getTime() < Date.now()) {
      return reply.status(400).send({ success: false, error: 'Nonce expired' });
    }

    // Verify the signature for the chosen chain
    let valid = false;
    if (chain === 'solana') {
      try {
        // Solana wallets sign the raw message bytes with ed25519
        const messageBytes = new TextEncoder().encode(message);
        const sigBytes = Buffer.from(signature, 'base64');
        const pubKeyBytes = bs58Decode(walletAddress);
        valid = nacl.sign.detached.verify(messageBytes, sigBytes, pubKeyBytes);
      } catch (err) {
        fastify.log.warn({ err }, 'Solana signature verification failed');
        valid = false;
      }
    } else {
      try {
        // EVM wallets sign via personal_sign (eth-sig-util v3 returns Buffer)
        const recovered = recoverPersonalSignature({
          data: message,
          sig: signature,
        });
        valid = recovered.toLowerCase() === walletAddress.toLowerCase();
      } catch (err) {
        fastify.log.warn({ err }, 'EVM signature verification failed');
        valid = false;
      }
    }

    if (!valid) {
      return reply.status(401).send({ success: false, error: 'Invalid signature' });
    }

    // Consume the nonce
    db.prepare('DELETE FROM siwe_nonces WHERE nonce = ?').run(nonce);

    // Find or create the user
    let user = db
      .prepare('SELECT id, email, name, wallet_address, wallet_chain FROM users WHERE wallet_address = ?')
      .get(walletAddress) as any;

    const now = new Date().toISOString();
    if (!user) {
      const id = `user-${Date.now()}`;
      const displayName = name || `${walletAddress.slice(0, 4)}…${walletAddress.slice(-4)}`;
      db.prepare(`
        INSERT INTO users (id, email, name, wallet_address, wallet_chain, created_at, updated_at)
        VALUES (?, ?, ?, ?, ?, ?, ?)
      `).run(id, null, displayName, walletAddress, chain, now, now);
      user = { id, email: null, name: displayName, wallet_address: walletAddress, wallet_chain: chain };
    }

    const sessionToken = createSessionToken();
    const expiresAt = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString();
    db.prepare(`
      INSERT INTO sessions (id, user_id, expires_at, created_at)
      VALUES (?, ?, ?, ?)
    `).run(sessionToken, user.id, expiresAt, now);

    return {
      success: true,
      data: {
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
          walletAddress: user.wallet_address,
          walletChain: user.wallet_chain,
        },
        sessionToken,
      },
    };
  });

  fastify.post('/logout', async (request, reply) => {
    const authHeader = request.headers.authorization;
    if (authHeader?.startsWith('Bearer ')) {
      db.prepare('DELETE FROM sessions WHERE id = ?').run(authHeader.slice(7));
    }
    return { success: true };
  });

  fastify.get('/me', async (request, reply) => {
    const authHeader = request.headers.authorization;
    if (!authHeader?.startsWith('Bearer ')) {
      return reply.status(401).send({ success: false, error: 'Not authenticated' });
    }

    const token = authHeader.slice(7);
    const session = db
      .prepare(`
        SELECT s.user_id, u.email, u.name, u.wallet_address, u.wallet_chain
        FROM sessions s
        JOIN users u ON s.user_id = u.id
        WHERE s.id = ? AND s.expires_at > datetime('now')
      `)
      .get(token) as any;

    if (!session) {
      return reply.status(401).send({ success: false, error: 'Invalid or expired session' });
    }

    return {
      success: true,
      data: {
        id: session.user_id,
        email: session.email,
        name: session.name,
        walletAddress: session.wallet_address,
        walletChain: session.wallet_chain,
      },
    };
  });
}

// ============================================================
// Helpers
// ============================================================

const BS58_ALPHABET = '123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz';
function bs58Decode(input: string): Uint8Array {
  let zeros = 0;
  while (input[zeros] === '1') zeros++;

  const bytes: number[] = [];
  for (const ch of input) {
    const idx = BS58_ALPHABET.indexOf(ch);
    if (idx < 0) throw new Error('Invalid base58 character');
    let carry = idx;
    for (let i = 0; i < bytes.length; i++) {
      carry += bytes[i] * 58;
      bytes[i] = carry & 0xff;
      carry >>= 8;
    }
    while (carry > 0) {
      bytes.push(carry & 0xff);
      carry >>= 8;
    }
  }

  const out = new Uint8Array(zeros + bytes.length);
  for (let i = 0; i < bytes.length; i++) {
    out[out.length - 1 - i] = bytes[i];
  }
  return out;
}
