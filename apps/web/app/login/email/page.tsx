'use client';

import { useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Gamepad2, Loader2, ArrowLeft, Wallet } from 'lucide-react';
import { useAuth } from '@/lib/auth-context';

function EmailLoginInner() {
  const router = useRouter();
  const params = useSearchParams();
  const { setSession } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      if (!data.success) {
        setError(data.error || 'Login failed');
        return;
      }
      setSession(data.data.sessionToken, {
        id: data.data.user.id,
        email: data.data.user.email,
        name: data.data.user.name,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
      router.push(params.get('redirect') || '/dashboard');
    } catch (err) {
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

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
          <h1 className="text-2xl font-bold text-white mt-6">Sign in with email</h1>
        </div>

        <form onSubmit={handleLogin} className="bg-gray-800 rounded-xl p-6 border border-gray-700">
          {error && (
            <div className="bg-red-900/50 border border-red-700 text-red-300 px-4 py-3 rounded-lg mb-4 text-sm">
              {error}
            </div>
          )}

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="demo@browserforge.dev"
                required
                className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-brand-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                required
                className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-brand-500"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full mt-6 px-4 py-3 bg-brand-600 hover:bg-brand-700 text-white font-medium rounded-lg transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Signing in...
              </>
            ) : (
              'Sign In'
            )}
          </button>

          <p className="text-center text-gray-400 text-sm mt-4">
            Don&apos;t have an account?{' '}
            <Link href="/signup" className="text-brand-400 hover:text-brand-300">
              Sign up
            </Link>
          </p>

          <p className="text-center text-gray-500 text-xs mt-3">
            Demo: demo@browserforge.dev / demo123
          </p>

          <div className="mt-4 pt-4 border-t border-gray-700 text-center">
            <Link
              href="/login"
              className="text-sm text-gray-500 hover:text-gray-300 flex items-center gap-1 mx-auto justify-center"
            >
              <ArrowLeft className="w-3 h-3" /> Back to wallet sign-in
            </Link>
          </div>
        </form>
      </div>
    </main>
  );
}

export default function EmailLoginPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-gray-900" />}>
      <EmailLoginInner />
    </Suspense>
  );
}
