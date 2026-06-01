'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Gamepad2, Loader2, Wallet, ArrowLeft } from 'lucide-react';
import { useAuth } from '@/lib/auth-context';
import {
  detectWallets,
  getWalletChallenge,
  verifyWalletSignature,
  signSolana,
  signEvm,
} from '@/lib/wallet-auth';

const CHAIN_INFO = {
  solana: { label: 'Solana', color: 'text-purple-400', description: 'Phantom, Solflare, Backpack, Brave' },
  evm: { label: 'EVM', color: 'text-blue-400', description: 'MetaMask, Coinbase Wallet, Rabby, Frame' },
} as const;

type Chain = keyof typeof CHAIN_INFO;

export default function LoginPage() {
  const router = useRouter();
  const { setSession } = useAuth();
  const [chain, setChain] = useState<Chain>('solana');
  const [step, setStep] = useState<'select' | 'sign' | 'submit' | 'email'>('select');
  const [error, setError] = useState<string | null>(null);
  const [address, setAddress] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [signature, setSignature] = useState<string | null>(null);
  const [wallets, setWallets] = useState<{ solana: boolean; evm: boolean }>({ solana: false, evm: false });

  // Email form state
  const [emailInput, setEmailInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const [emailLoading, setEmailLoading] = useState(false);

  useEffect(() => {
    setWallets(detectWallets());
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      if (params.get('email') === '1') {
        setStep('email');
      }
    }
  }, []);

  const verifyAndLogin = async (addr: string, msg: string, sig: string, selectedChain: Chain) => {
    setError(null);
    setStep('submit');
    try {
      const result = await verifyWalletSignature({
        walletAddress: addr,
        chain: selectedChain,
        signature: sig,
        message: msg,
      });
      setSession(result.sessionToken, result.user);
      router.push('/dashboard');
    } catch (err) {
      setError((err as Error).message);
      setStep('sign');
    }
  };

  const handleChainSelect = (c: Chain) => {
    setChain(c);
    setStep('sign');
    setError(null);

    void (async () => {
      try {
        // 1. Get the user's address (no prompt)
        let addr: string | null = null;
        if (c === 'solana') {
          const provider =
            (window as any).solana ||
            ((window as any).phantom && (window as any).phantom.solana) ||
            (window as any).solflare;
          if (!provider) throw new Error('No Solana wallet installed');
          const res = await provider.connect();
          addr = res.publicKey.toBase58();
        } else {
          const provider = (window as any).ethereum;
          if (!provider) throw new Error('No EVM wallet installed');
          const accs = await provider.request({ method: 'eth_requestAccounts' });
          addr = accs?.[0] ?? null;
        }
        if (!addr) throw new Error('No address returned by wallet');

        setAddress(addr);

        // 2. Request the challenge
        const challenge = await getWalletChallenge({ walletAddress: addr, chain: c });
        setMessage(challenge.message);

        // 3. Sign the message
        const sig = c === 'solana' ? await signSolana(challenge.message) : await signEvm(challenge.message, addr);
        setSignature(sig);
        
        // 4. Auto-submit for direct sign-in verification
        await verifyAndLogin(addr, challenge.message, sig, c);
      } catch (err) {
        setError((err as Error).message);
        setStep('select');
      }
    })();
  };

  const handleSubmit = async () => {
    if (!signature || !message || !address) return;
    await verifyAndLogin(address, message, signature, chain);
  };

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailInput || !passwordInput) return;
    setError(null);
    setEmailLoading(true);
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: emailInput,
          password: passwordInput,
        }),
      });
      const data = await res.json();
      if (!data.success) {
        throw new Error(data.error || 'Login failed');
      }
      setSession(data.data.sessionToken, data.data.user);
      router.push('/dashboard');
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setEmailLoading(false);
    }
  };

  const isWorking = step === 'sign' || step === 'submit';

  return (
    <main className="min-h-screen bg-gray-900 flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2">
            <Gamepad2 className="w-10 h-10 text-brand-500" />
            <span className="text-2xl font-bold text-white">
              Browser<span className="text-brand-500">Forge</span>
            </span>
          </Link>
          <h1 className="text-2xl font-bold text-white mt-6">Sign in to your account</h1>
          <p className="text-gray-400 mt-2">
            {step === 'email' ? 'Enter your email and password to log in.' : 'Use your wallet to sign in — no email needed.'}
          </p>
        </div>

        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
          {error && (
            <div className="bg-red-900/50 border border-red-700 text-red-300 px-4 py-3 rounded-lg mb-4 text-sm">
              {error}
            </div>
          )}

          {step === 'select' && (
            <div className="space-y-3">
              {(Object.keys(CHAIN_INFO) as Chain[]).map((c) => {
                const info = CHAIN_INFO[c];
                const available = wallets[c];
                return (
                  <button
                    key={c}
                    onClick={() => handleChainSelect(c)}
                    disabled={!available}
                    className="w-full p-4 rounded-lg border border-gray-700 hover:border-brand-500 hover:bg-brand-500/5 transition-colors text-left flex items-center justify-between disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:border-gray-700 disabled:hover:bg-transparent"
                  >
                    <div>
                      <div className="text-white font-medium flex items-center gap-2">
                        <Wallet className={`w-4 h-4 ${info.color}`} />
                        {info.label}
                      </div>
                      <div className="text-gray-500 text-sm mt-1">{info.description}</div>
                    </div>
                    {!available && (
                      <span className="text-xs text-gray-500">Not installed</span>
                    )}
                  </button>
                );
              })}

              <div className="pt-4 mt-4 border-t border-gray-700 text-center">
                <button
                  type="button"
                  onClick={() => {
                    setStep('email');
                    setError(null);
                  }}
                  className="text-sm text-gray-500 hover:text-gray-300"
                >
                  Or sign in with email →
                </button>
              </div>
            </div>
          )}

          {step === 'email' && (
            <form onSubmit={handleEmailLogin} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  required
                  value={emailInput}
                  onChange={(e) => setEmailInput(e.target.value)}
                  className="w-full px-3 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-brand-500 text-sm"
                  placeholder="you@example.com"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">
                  Password
                </label>
                <input
                  type="password"
                  required
                  value={passwordInput}
                  onChange={(e) => setPasswordInput(e.target.value)}
                  className="w-full px-3 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-brand-500 text-sm"
                  placeholder="••••••••"
                />
              </div>

              <button
                type="submit"
                disabled={emailLoading}
                className="w-full px-4 py-3 bg-brand-600 hover:bg-brand-700 disabled:opacity-50 text-white font-medium rounded-lg transition-colors flex items-center justify-center gap-2 mt-6 text-sm"
              >
                {emailLoading && <Loader2 className="w-4 h-4 animate-spin" />}
                Sign in
              </button>

              <button
                type="button"
                onClick={() => {
                  setStep('select');
                  setError(null);
                }}
                className="w-full text-center text-sm text-gray-500 hover:text-gray-300 flex items-center justify-center gap-1 mt-4"
              >
                <ArrowLeft className="w-3 h-3" /> Back to Wallet Sign-In
              </button>
            </form>
          )}

          {(step === 'sign' || step === 'submit') && (
            <div className="space-y-4 text-center">
              {isWorking && (
                <Loader2 className="w-8 h-8 text-brand-500 animate-spin mx-auto" />
              )}
              <p className="text-gray-300">
                {step === 'sign'
                  ? 'Check your wallet — sign the message to continue.'
                  : 'Verifying signature…'}
              </p>
              {address && (
                <p className="text-xs text-gray-500 font-mono break-all">
                  {address}
                </p>
              )}

              {signature && step === 'submit' && (
                <button
                  onClick={handleSubmit}
                  className="w-full px-4 py-3 bg-brand-600 hover:bg-brand-700 text-white font-medium rounded-lg transition-colors"
                >
                  Complete sign-in
                </button>
              )}

              <button
                onClick={() => {
                  setStep('select');
                  setError(null);
                  setAddress(null);
                  setSignature(null);
                  setMessage(null);
                }}
                className="text-sm text-gray-500 hover:text-gray-300 flex items-center gap-1 mx-auto"
              >
                <ArrowLeft className="w-3 h-3" /> Back
              </button>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
