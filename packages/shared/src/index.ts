export interface User {
  id: string;
  email: string | null;
  name: string;
  walletAddress?: string;
  walletChain?: 'solana' | 'evm';
  createdAt: Date;
  updatedAt: Date;
}

export interface Project {
  id: string;
  name: string;
  description: string;
  userId: string;
  thumbnailUrl?: string;
  template: string;
  web3Config: Web3Config | null;
  createdAt: Date;
  updatedAt: Date;
  lastExportedAt?: Date;
}

export interface Web3Config {
  enabled: boolean;
  chains: Web3Chain[];
  solana?: SolanaConfig;
  evm?: EvmConfig;
}

export type Web3Chain = 'solana' | 'base' | 'polygon';

export interface SolanaConfig {
  rpcUrl?: string;
  tokenMint?: string;
  programId?: string;
}

export interface EvmConfig {
  chainId?: number;
  rpcUrl?: string;
  tokenAddress?: string;
}

export interface ProjectFile {
  path: string;
  content: ArrayBuffer | string;
  size: number;
  lastModified: Date;
}

export type ExportStatus = 'pending' | 'processing' | 'completed' | 'failed';

/**
 * Build format:
 *  - 'webgl' → standard HTML+JS+wasm web build (auto-falls back from WebGPU)
 *  - 'webgpu' → WebGPU-only HTML build
 */
export type ExportFormat = 'webgl' | 'webgpu';

/**
 * Where the built zip is meant to be hosted. Each preset ships a different
 * index.html shell + manifest; the runtime stays identical.
 */
export type ExportPlatform =
  | 'web'
  | 'telegram'
  | 'x'
  | 'reddit-devvit'
  | 'reddit-host'
  | 'iframe';

export interface ExportRequest {
  projectId: string;
  format: ExportFormat;
  platform: ExportPlatform;
}

export interface ExportArtifact {
  id: string;
  projectId: string;
  status: ExportStatus;
  format: ExportFormat;
  platform: ExportPlatform;
  outputUrl?: string;
  error?: string;
  startedAt?: Date;
  completedAt?: Date;
  createdAt: Date;
  clientSide: boolean;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}

export interface PaginatedResponse<T> extends ApiResponse<T[]> {
  total: number;
  page: number;
  pageSize: number;
}

// ------------------------------------------------------------
// Wallet auth
// ------------------------------------------------------------

export interface WalletChallengeRequest {
  walletAddress: string;
  chain: 'solana' | 'evm';
}

export interface WalletChallenge {
  message: string;
  nonce: string;
  issuedAt: string;
  expiresAt: string;
}

export interface WalletVerifyRequest {
  walletAddress: string;
  chain: 'solana' | 'evm';
  signature: string;
  message: string;
  name?: string;
}

// ------------------------------------------------------------
// Project templates
// ------------------------------------------------------------

export interface ProjectTemplate {
  id: string;
  name: string;
  description: string;
  thumbnailEmoji: string;
  category: 'starter' | 'web3' | 'arcade';
}

export const PROJECT_TEMPLATES: ProjectTemplate[] = [
  {
    id: 'blank',
    name: 'Blank Project',
    description: 'Empty Godot 4 project — start from scratch',
    thumbnailEmoji: '📄',
    category: 'starter',
  },
  {
    id: 'platformer',
    name: '2D Platformer',
    description: 'Player controller, gravity, jump, and a simple level',
    thumbnailEmoji: '🏃',
    category: 'starter',
  },
  {
    id: 'topdown',
    name: 'Top-Down Shooter',
    description: 'Character with WASD movement and click-to-shoot bullets',
    thumbnailEmoji: '🚀',
    category: 'starter',
  },
  {
    id: 'puzzle',
    name: 'Match-3 Puzzle',
    description: 'Grid of tiles; click to swap and match 3 of a kind',
    thumbnailEmoji: '🧩',
    category: 'starter',
  },
  {
    id: 'web3-onboarding',
    name: 'Web3 Onboarding Demo',
    description: 'Connect-wallet flow, token-gated level, and SPL/ERC-20 check',
    thumbnailEmoji: '🔐',
    category: 'web3',
  },
  {
    id: 'web3-coin-collect',
    name: 'Token-Gated Coin Collector',
    description: 'Collect coins on-chain; mint an NFT for high-scorers',
    thumbnailEmoji: '🪙',
    category: 'web3',
  },
  {
    id: 'telegram-invite',
    name: 'Telegram Mini App',
    description: 'Optimised for Telegram in-app browser with MainButton',
    thumbnailEmoji: '✈️',
    category: 'web3',
  },
];
