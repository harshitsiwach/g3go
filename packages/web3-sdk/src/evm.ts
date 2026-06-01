/**
 * EVM provider. Uses viem's injected connector so it works with MetaMask,
 * Coinbase Wallet, Brave Wallet, Rabby, Frame, and any other EIP-1193
 * provider. WalletConnect is supported by adding the walletConnect connector
 * to the in-game wallet modal.
 */
import { createPublicClient, http, formatUnits, type Address, type Hex, type Chain as ViemChain } from 'viem';
import { base, polygon, mainnet } from 'viem/chains';
import type {
  Chain,
  Web3Connection,
  Web3Provider,
  TokenBalance,
  SignResult,
} from './index';
import { Web3NotAvailableError, Web3UserRejectedError } from './index';

interface Eip1193Provider {
  request(args: { method: string; params?: unknown[] }): Promise<unknown>;
  on?(event: 'accountsChanged' | 'chainChanged' | 'disconnect', handler: (...args: unknown[]) => void): void;
  removeListener?(event: string, handler: (...args: unknown[]) => void): void;
}

declare global {
  interface Window {
    ethereum?: Eip1193Provider;
  }
}

function getViemChain(chain: Chain): ViemChain {
  switch (chain) {
    case 'base':
      return base as unknown as ViemChain;
    case 'polygon':
      return polygon as unknown as ViemChain;
    case 'solana':
    default:
      return mainnet as unknown as ViemChain;
  }
}

function getProvider(): Eip1193Provider | null {
  if (typeof window === 'undefined') return null;
  return window.ethereum ?? null;
}

export function getEvmProvider(chain: Chain): Web3Provider {
  return {
    chain,
    isAvailable: () => getProvider() !== null,

    async connect(): Promise<Web3Connection> {
      const provider = getProvider();
      if (!provider) throw new Web3NotAvailableError(chain);
      try {
        const accounts = (await provider.request({ method: 'eth_requestAccounts' })) as Address[];
        if (!accounts || accounts.length === 0) {
          throw new Web3UserRejectedError(chain, 'No accounts returned');
        }
        return { chain, address: accounts[0] };
      } catch (err) {
        if ((err as { code?: number })?.code === 4001) {
          throw new Web3UserRejectedError(chain);
        }
        throw new Web3UserRejectedError(chain, (err as Error)?.message);
      }
    },

    async disconnect(): Promise<void> {
      // EIP-1193 doesn't define disconnect; wallets manage their own state.
      // Best we can do is revoke permissions if the wallet supports it.
      const provider = getProvider();
      if (!provider) return;
      try {
        await provider.request({
          method: 'wallet_revokePermissions',
          params: [{ eth_accounts: {} }],
        });
      } catch {
        // Older wallets don't support revokePermissions — ignore
      }
    },

    async getAddress(): Promise<string | null> {
      const provider = getProvider();
      if (!provider) return null;
      const accounts = (await provider.request({ method: 'eth_accounts' })) as Address[];
      return accounts?.[0] ?? null;
    },

    async getBalance(address?: string, tokenAddress?: string): Promise<TokenBalance> {
      const provider = getProvider();
      const addr = (address ?? (await this.getAddress() as string)) as Address | null;
      if (!addr) throw new Web3NotAvailableError(chain);

      const viemChain = getViemChain(chain);
      const client = createPublicClient({ chain: viemChain, transport: http() });

      if (!tokenAddress) {
        const bal = await client.getBalance({ address: addr });
        return { amount: bal.toString(), decimals: 18, mint: 'native' };
      }

      // ERC-20 balanceOf
      const data = ('0x70a08231' + addr.slice(2).padStart(64, '0')) as Hex;
      const result = await client.call({
        to: tokenAddress as Address,
        data,
      });
      const hex = (result.data ?? '0x0') as Hex;
      const raw = BigInt(hex);
      return {
        amount: raw.toString(),
        decimals: 18, // Default; UI should look up the real decimals
        mint: tokenAddress,
      };
    },

    async signMessage(message: string): Promise<SignResult> {
      const provider = getProvider();
      if (!provider) throw new Web3NotAvailableError(chain);
      try {
        const signature = (await provider.request({
          method: 'personal_sign',
          params: [message, (await this.getAddress()) as string],
        })) as Hex;
        return { signature, payload: message };
      } catch (err) {
        if ((err as { code?: number })?.code === 4001) {
          throw new Web3UserRejectedError(chain);
        }
        throw new Web3UserRejectedError(chain, (err as Error)?.message);
      }
    },
  };
}

export async function connectEvm(chain: 'base' | 'polygon' = 'base'): Promise<Web3Connection> {
  return getEvmProvider(chain).connect();
}
