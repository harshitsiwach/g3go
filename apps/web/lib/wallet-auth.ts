/**
 * Browser-side wallet auth helpers. Wraps the SIWS (Solana) and SIWE (EVM)
 * challenge-response flow against the BrowserForge API.
 */
import type { WalletChallenge, WalletChallengeRequest, WalletVerifyRequest } from '@browser-forge/shared';

const API_BASE = '';

export async function getWalletChallenge(
  req: WalletChallengeRequest,
): Promise<WalletChallenge> {
  const res = await fetch(`${API_BASE}/api/auth/wallet/challenge`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(req),
  });
  const data = await res.json();
  if (!data.success) throw new Error(data.error || 'Challenge failed');
  return data.data;
}

export async function verifyWalletSignature(
  req: WalletVerifyRequest,
): Promise<{ user: any; sessionToken: string }> {
  const res = await fetch(`${API_BASE}/api/auth/wallet/verify`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(req),
  });
  const data = await res.json();
  if (!data.success) throw new Error(data.error || 'Verification failed');
  return data.data;
}

/**
 * Detects installed wallets in the current browser.
 * Returns a record of chain → boolean. Does not prompt the user.
 */
export function detectWallets(): { solana: boolean; evm: boolean } {
  if (typeof window === 'undefined') return { solana: false, evm: false };
  const solana =
    !!(window as any).solana ||
    !!((window as any).phantom && (window as any).phantom.solana) ||
    !!(window as any).solflare;
  const evm = !!(window as any).ethereum;
  return { solana, evm };
}

// ------------------------------------------------------------
// Wallet signing helpers
// ------------------------------------------------------------

export async function signSolana(message: string): Promise<string> {
  if (typeof window === 'undefined') throw new Error('No window');
  const provider =
    (window as any).solana ||
    ((window as any).phantom && (window as any).phantom.solana) ||
    (window as any).solflare;
  if (!provider) throw new Error('No Solana wallet installed');
  const encoded = new TextEncoder().encode(message);
  const res = await provider.signMessage(encoded, 'utf8');
  // Base64-encode the signature so it survives JSON transport
  let bin = '';
  // Handle both { signature: Uint8Array } and raw Uint8Array / Buffer signatures
  const bytes: Uint8Array = res.signature ?? res;
  for (let i = 0; i < bytes.length; i++) bin += String.fromCharCode(bytes[i]);
  return btoa(bin);
}

export async function signEvm(message: string, address: string): Promise<string> {
  if (typeof window === 'undefined') throw new Error('No window');
  const provider = (window as any).ethereum;
  if (!provider) throw new Error('No EVM wallet installed');
  return provider.request({
    method: 'personal_sign',
    params: [message, address],
  });
}
