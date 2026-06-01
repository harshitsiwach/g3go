/**
 * Installs the `window.Web3` global for the exported game. The game (via
 * GDScript's JavaScriptBridge) calls into this global to connect wallets,
 * sign messages, and read on-chain state.
 *
 * The global surface is intentionally small — a handful of methods that
 * satisfy ~95% of Web3 game use cases. Power users can still import the
 * SDK directly from the bundled ESM file.
 */
import {
  type Chain,
  type Web3Connection,
  type Web3Config,
  type TokenBalance,
  type SignResult,
  getSolanaProvider,
  getEvmProvider,
  Web3NotAvailableError,
  Web3UserRejectedError,
} from './index';

interface Web3Global {
  /** SDK version baked into the build */
  version: string;
  /** Whether the user has any wallet installed */
  hasWallet: (chain?: Chain) => boolean;
  /** Trigger a wallet connection for the given chain */
  connect: (chain: Chain) => Promise<Web3Connection>;
  /** Disconnect the active wallet on the given chain */
  disconnect: (chain: Chain) => Promise<void>;
  /** Current address (no prompt) */
  getAddress: (chain: Chain) => Promise<string | null>;
  /** Get the native or SPL/ERC-20 balance */
  getBalance: (chain: Chain, opts?: { address?: string; token?: string }) => Promise<TokenBalance>;
  /** Sign an arbitrary string. The wallet decides the encoding. */
  signMessage: (chain: Chain, message: string) => Promise<SignResult>;
  /** Listen for wallet events (account/chain changes) */
  on: (event: 'accountsChanged' | 'chainChanged', handler: (data: unknown) => void) => () => void;
  /** Per-project config (rpc urls, default token mints, etc.) */
  config: Web3Config;
  /** Convenience errors */
  errors: {
    NotAvailable: typeof Web3NotAvailableError;
    UserRejected: typeof Web3UserRejectedError;
  };
}

let installed = false;

export function installWeb3Global(initialConfig: Web3Config = { chains: ['solana', 'base'] }): Web3Global {
  if (typeof window === 'undefined') {
    throw new Error('installWeb3Global must be called in the browser');
  }
  if (installed && (window as any).Web3) {
    return (window as any).Web3 as Web3Global;
  }
  installed = true;

  const config: Web3Config = initialConfig;

  const providerFor = (chain: Chain) => {
    if (chain === 'solana') return getSolanaProvider();
    return getEvmProvider(chain);
  };

  const web3: Web3Global = {
    version: '0.2.0',
    config,
    hasWallet: (chain) => (chain ? providerFor(chain).isAvailable() : false),
    connect: async (chain) => providerFor(chain).connect(),
    disconnect: async (chain) => providerFor(chain).disconnect(),
    getAddress: async (chain) => providerFor(chain).getAddress(),
    getBalance: async (chain, opts) => providerFor(chain).getBalance(opts?.address, opts?.token),
    signMessage: async (chain, message) => providerFor(chain).signMessage(message),
    on: (event, handler) => {
      if (event === 'accountsChanged' || event === 'chainChanged') {
        const eth = (window as any).ethereum;
        if (eth?.on) eth.on(event, handler);
        return () => eth?.removeListener?.(event, handler);
      }
      return () => {};
    },
    errors: {
      NotAvailable: Web3NotAvailableError,
      UserRejected: Web3UserRejectedError,
    },
  };

  (window as any).Web3 = web3;
  return web3;
}
