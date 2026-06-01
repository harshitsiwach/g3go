/**
 * @browser-forge/web3-sdk — unified in-game Web3 API for BrowserForge games.
 *
 * This SDK is bundled into the exported game zip. The game calls into it
 * from GDScript via the JavaScriptBridge:
 *
 *   JavaScriptBridge.eval("Web3.connect('solana').then(...)")
 *
 * The SDK auto-detects the available wallet (Phantom, Solflare, MetaMask,
 * Coinbase Wallet, WalletConnect, etc.) and surfaces a single `Web3` global
 * with chain-agnostic methods.
 *
 * No npm install required at runtime — the SDK is served from the BrowserForge
 * CDN and cached by the browser. Each game version pins a specific SDK version
 * via the `__BROWSERFORGE_SDK_VERSION__` constant injected by the build.
 */
export const SDK_VERSION = '0.2.0';

export type Chain = 'solana' | 'base' | 'polygon';

export interface Web3Connection {
  chain: Chain;
  address: string;
  /** Display name from the wallet */
  displayName?: string;
}

export interface TokenBalance {
  /** Raw on-chain amount as a string (UI libraries should format) */
  amount: string;
  /** Number of decimals */
  decimals: number;
  /** Token symbol, if known */
  symbol?: string;
  /** Mint or contract address */
  mint: string;
}

export interface SignResult {
  /** Base64 signature */
  signature: string;
  /** Original message or transaction that was signed */
  payload: string;
}

export interface Web3Provider {
  chain: Chain;
  connect(): Promise<Web3Connection>;
  disconnect(): Promise<void>;
  getAddress(): Promise<string | null>;
  getBalance(address?: string, mint?: string): Promise<TokenBalance>;
  signMessage(message: string): Promise<SignResult>;
  sendTransaction?(tx: unknown): Promise<{ signature: string }>;
  /** Whether the user has a wallet installed and authorised this origin */
  isAvailable(): boolean;
}

export interface Web3Config {
  chains: Chain[];
  solana?: { rpcUrl?: string; tokenMint?: string; programId?: string };
  evm?: { chainId?: number; rpcUrl?: string; tokenAddress?: string };
}

export class Web3NotAvailableError extends Error {
  constructor(public chain: Chain) {
    super(`No wallet available for chain: ${chain}`);
    this.name = 'Web3NotAvailableError';
  }
}

export class Web3UserRejectedError extends Error {
  constructor(public chain: Chain, public reason?: string) {
    super(`User rejected the request on ${chain}${reason ? ': ' + reason : ''}`);
    this.name = 'Web3UserRejectedError';
  }
}

export { connectSolana, getSolanaProvider } from './solana';
export { connectEvm, getEvmProvider } from './evm';
export { installWeb3Global } from './runtime';
