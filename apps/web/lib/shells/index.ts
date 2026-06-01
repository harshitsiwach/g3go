/**
 * Platform shell registry. Each shell produces the `index.html` for the
 * exported zip and any extra platform-specific files (manifest, mini app
 * bootstrap, Devvit entry, etc.).
 *
 * To add a new platform:
 *   1. Create a new file in ./shells/ (e.g. `discord.ts`)
 *   2. Implement the `ShellTemplate` interface
 *   3. Register it below
 */
import type { ExportPlatform } from '@browser-forge/shared';
import { webShell } from './shells/web';
import { telegramShell } from './shells/telegram';
import { xShell } from './shells/x';
import { redditDevvitShell } from './shells/reddit-devvit';
import { redditHostShell } from './shells/reddit-host';
import { iframeShell } from './shells/iframe';
import type { Web3Config } from '@browser-forge/shared';

export interface ShellRenderArgs {
  format: 'webgl' | 'webgpu';
  meta: {
    title: string;
    description?: string;
    author?: string;
    hostedUrl?: string;
    walletAddress?: string;
  };
  theme?: Record<string, string>;
  web3Config?: Web3Config | null;
}

export interface ShellTemplate {
  id: ExportPlatform;
  label: string;
  description: string;
  /** Render the main `index.html` */
  render(args: ShellRenderArgs): string;
  /** Any extra files the platform needs (manifest.json, devvit.json, etc.) */
  extras(meta: ShellRenderArgs['meta']): Record<string, string>;
  /** Optional embed code generator (for blogs, Reddit text posts, etc.) */
  embedCode?(hostedUrl: string): string | undefined;
}

const REGISTRY: Record<ExportPlatform, ShellTemplate> = {
  web: webShell,
  telegram: telegramShell,
  x: xShell,
  'reddit-devvit': redditDevvitShell,
  'reddit-host': redditHostShell,
  iframe: iframeShell,
};

export function getShellTemplate(platform: ExportPlatform): ShellTemplate {
  const shell = REGISTRY[platform];
  if (!shell) throw new Error(`Unknown export platform: ${platform}`);
  return shell;
}

export function listShells(): ShellTemplate[] {
  return Object.values(REGISTRY);
}
