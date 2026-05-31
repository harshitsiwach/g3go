import Database from 'better-sqlite3';
import { join } from 'path';
import { createHash } from 'crypto';

const DB_PATH = join(process.cwd(), 'data', 'browserforge.db');

// Ensure data directory exists
import { mkdirSync } from 'fs';
mkdirSync(join(process.cwd(), 'data'), { recursive: true });

const db: InstanceType<typeof Database> = new Database(DB_PATH);

// Enable WAL mode for better performance
db.pragma('journal_mode = WAL');

// Create tables
db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id TEXT PRIMARY KEY,
    email TEXT UNIQUE NOT NULL,
    name TEXT NOT NULL,
    password_hash TEXT NOT NULL,
    created_at TEXT NOT NULL DEFAULT (datetime('now')),
    updated_at TEXT NOT NULL DEFAULT (datetime('now'))
  );

  CREATE TABLE IF NOT EXISTS sessions (
    id TEXT PRIMARY KEY,
    user_id TEXT NOT NULL,
    expires_at TEXT NOT NULL,
    created_at TEXT NOT NULL DEFAULT (datetime('now')),
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
  );

  CREATE TABLE IF NOT EXISTS projects (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    description TEXT DEFAULT '',
    user_id TEXT NOT NULL,
    thumbnail_url TEXT,
    created_at TEXT NOT NULL DEFAULT (datetime('now')),
    updated_at TEXT NOT NULL DEFAULT (datetime('now')),
    last_exported_at TEXT,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
  );

  CREATE TABLE IF NOT EXISTS project_files (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    project_id TEXT NOT NULL,
    path TEXT NOT NULL,
    content BLOB NOT NULL,
    size INTEGER NOT NULL,
    created_at TEXT NOT NULL DEFAULT (datetime('now')),
    FOREIGN KEY (project_id) REFERENCES projects(id) ON DELETE CASCADE,
    UNIQUE(project_id, path)
  );

  CREATE TABLE IF NOT EXISTS export_jobs (
    id TEXT PRIMARY KEY,
    project_id TEXT NOT NULL,
    status TEXT NOT NULL DEFAULT 'pending',
    format TEXT NOT NULL,
    output_url TEXT,
    error TEXT,
    started_at TEXT,
    completed_at TEXT,
    created_at TEXT NOT NULL DEFAULT (datetime('now')),
    FOREIGN KEY (project_id) REFERENCES projects(id) ON DELETE CASCADE
  );
`);

// Seed with default user and projects if empty
const userCount = db.prepare('SELECT COUNT(*) as count FROM users').get() as { count: number };
if (userCount.count === 0) {
  // Create default user (password: "demo123")
  const hash = createHash('sha256').update('demo123').digest('hex');

  db.prepare(`
    INSERT INTO users (id, email, name, password_hash, created_at, updated_at)
    VALUES (?, ?, ?, ?, ?, ?)
  `).run('user-1', 'demo@browserforge.dev', 'Demo User', hash, '2026-05-01T00:00:00.000Z', '2026-05-01T00:00:00.000Z');
}

const projectCount = db.prepare('SELECT COUNT(*) as count FROM projects').get() as { count: number };
if (projectCount.count === 0) {
  const insert = db.prepare(`
    INSERT INTO projects (id, name, description, user_id, created_at, updated_at)
    VALUES (?, ?, ?, ?, ?, ?)
  `);

  insert.run('1', 'Platformer Demo', 'A classic 2D platformer with jump mechanics', 'user-1', '2026-05-01T00:00:00.000Z', '2026-05-29T00:00:00.000Z');
  insert.run('2', 'Top-Down Shooter', 'Space shooter with wave-based enemies', 'user-1', '2026-05-15T00:00:00.000Z', '2026-05-30T00:00:00.000Z');
  insert.run('3', 'Puzzle Game', 'Match-3 puzzle game prototype', 'user-1', '2026-05-20T00:00:00.000Z', '2026-05-25T00:00:00.000Z');
}

export default db;
