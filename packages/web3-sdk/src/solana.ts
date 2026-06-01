/**
 * Solana provider. Auto-detects Phantom, Solflare, Backpack, Brave, and any
 * other wallet that injects the standard Wallet Standard interface
 * (window.solana) or the legacy `window.phantom.solana` shim.
 */
import {
  Connection,
  PublicKey,
  clusterApiUrl,
} from '@solana/web3.js';
import type {
  Web3Connection,
  Web3Provider,
  TokenBalance,
  SignResult,
} from './index';
import { Web3NotAvailableError, Web3UserRejectedError } from './index';

interface SolanaWindowProvider {
  isPhantom?: boolean;
  isSolflare?: boolean;
  publicKey?: { toBase58(): string } | null;
  connect(opts?: { onlyIfTrusted?: boolean }): Promise<{ publicKey: { toBase58(): string } }>;
  disconnect(): Promise<void>;
  signMessage(message: Uint8Array, display?: 'utf8' | 'hex'): Promise<{ signature: Uint8Array }>;
  signTransaction?(tx: unknown): Promise<unknown>;
  signAndSendTransaction?(tx: unknown): Promise<{ signature: Uint8Array | string }>;
}

declare global {
  interface Window {
    solana?: SolanaWindowProvider;
    phantom?: { solana?: SolanaWindowProvider };
    solflare?: SolanaWindowProvider;
  }
}

function detectProvider(): SolanaWindowProvider | null {
  if (typeof window === 'undefined') return null;
  if (window.solana) return window.solana;
  if (window.phantom?.solana) return window.phantom.solana;
  if (window.solflare) return window.solflare;
  return null;
}

export function getSolanaProvider(): Web3Provider {
  return {
    chain: 'solana',
    isAvailable: () => detectProvider() !== null,

    async connect(): Promise<Web3Connection> {
      const provider = detectProvider();
      if (!provider) throw new Web3NotAvailableError('solana');
      try {
        const res = await provider.connect();
        return {
          chain: 'solana',
          address: res.publicKey.toBase58(),
        };
      } catch (err) {
        throw new Web3UserRejectedError('solana', (err as Error)?.message);
      }
    },

    async disconnect(): Promise<void> {
      const provider = detectProvider();
      if (provider) await provider.disconnect();
    },

    async getAddress(): Promise<string | null> {
      const provider = detectProvider();
      return provider?.publicKey?.toBase58() ?? null;
    },

    async getBalance(address?: string, mint?: string): Promise<TokenBalance> {
      const provider = detectProvider();
      const addr = address ?? provider?.publicKey?.toBase58();
      if (!addr) throw new Web3NotAvailableError('solana');

      const conn = new Connection(clusterApiUrl('mainnet-beta'));
      if (!mint) {
        // Native SOL
        const lamports = await conn.getBalance(new PublicKey(addr));
        return { amount: String(lamports), decimals: 9, symbol: 'SOL', mint: 'SOL' };
      }
      // SPL token balance — return the raw amount; UI should format
      const tokenAccounts = await conn.getParsedTokenAccountsByOwner(new PublicKey(addr), {
        mint: new PublicKey(mint),
      });
      const uiAmount = tokenAccounts.value[0]?.account.data.parsed?.info?.tokenAmount;
      return {
        amount: uiAmount?.amount ?? '0',
        decimals: uiAmount?.decimals ?? 0,
        mint,
      };
    },

    async signMessage(message: string): Promise<SignResult> {
      const provider = detectProvider();
      if (!provider) throw new Web3NotAvailableError('solana');
      try {
        const encoded = new TextEncoder().encode(message);
        const res = await provider.signMessage(encoded, 'utf8');
        return {
          signature: uint8ToBase64(res.signature),
          payload: message,
        };
      } catch (err) {
        throw new Web3UserRejectedError('solana', (err as Error)?.message);
      }
    },
  };
}

export async function connectSolana(): Promise<Web3Connection> {
  return getSolanaProvider().connect();
}

function uint8ToBase64(arr: Uint8Array): string {
  let bin = '';
  for (let i = 0; i < arr.length; i++) bin += String.fromCharCode(arr[i]);
  return btoa(bin);
}
