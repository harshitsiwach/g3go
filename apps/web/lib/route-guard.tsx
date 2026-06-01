'use client';

import { useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useAuth } from './auth-context';
import { Loader2 } from 'lucide-react';

// Editor and export are guest-accessible so people can start creating
// without an account. Only project management + settings require login.
const PROTECTED_PREFIXES = ['/dashboard', '/settings'];
const AUTH_ROUTES = ['/login', '/signup'];

export function RouteGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const { user, loading } = useAuth();

  useEffect(() => {
    if (loading) return;

    const isProtected = PROTECTED_PREFIXES.some((p) => pathname.startsWith(p));
    const isAuthRoute = AUTH_ROUTES.some((p) => pathname.startsWith(p));

    if (isProtected && !user) {
      router.replace(`/login?redirect=${encodeURIComponent(pathname)}`);
    } else if (isAuthRoute && user) {
      router.replace('/dashboard');
    }
  }, [user, loading, pathname, router]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-brand-500 animate-spin" />
      </div>
    );
  }

  return <>{children}</>;
}
