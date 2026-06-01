'use client';

import { createContext, useContext, useEffect, useState, useCallback } from 'react';
import type { User } from '@browser-forge/shared';

interface AuthState {
  user: User | null;
  sessionToken: string | null;
  loading: boolean;
}

interface AuthContextValue extends AuthState {
  setSession: (token: string, user: User) => void;
  logout: () => Promise<void>;
  refresh: () => Promise<void>;
  fetchWithAuth: (input: RequestInfo | URL, init?: RequestInit) => Promise<Response>;
}

const AuthContext = createContext<AuthContextValue | null>(null);

const STORAGE_KEY = 'browserforge.session';

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<AuthState>({ user: null, sessionToken: null, loading: true });

  const setSession = useCallback((token: string, user: User) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ token, user }));
    setState({ user, sessionToken: token, loading: false });
  }, []);

  const logout = useCallback(async () => {
    const token = state.sessionToken;
    if (token) {
      await fetch('/api/auth/logout', {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
      }).catch(() => {});
    }
    localStorage.removeItem(STORAGE_KEY);
    setState({ user: null, sessionToken: null, loading: false });
  }, [state.sessionToken]);

  const refresh = useCallback(async () => {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      setState({ user: null, sessionToken: null, loading: false });
      return;
    }
    try {
      const { token } = JSON.parse(raw);
      const res = await fetch('/api/auth/me', {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) {
        localStorage.removeItem(STORAGE_KEY);
        setState({ user: null, sessionToken: null, loading: false });
        return;
      }
      const data = await res.json();
      setState({ user: data.data, sessionToken: token, loading: false });
    } catch {
      setState({ user: null, sessionToken: null, loading: false });
    }
  }, []);

  const fetchWithAuth = useCallback(async (input: RequestInfo | URL, init?: RequestInit): Promise<Response> => {
    let token = state.sessionToken;
    if (!token && typeof window !== 'undefined') {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        try {
          token = JSON.parse(raw).token;
        } catch {}
      }
    }
    const headers = new Headers(init?.headers);
    if (token) {
      headers.set('Authorization', `Bearer ${token}`);
    }
    return fetch(input, {
      ...init,
      headers,
    });
  }, [state.sessionToken]);

  useEffect(() => {
    void refresh();
  }, [refresh]);

  return (
    <AuthContext.Provider value={{ ...state, setSession, logout, refresh, fetchWithAuth }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
