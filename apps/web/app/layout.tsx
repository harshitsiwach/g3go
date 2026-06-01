import type { Metadata } from 'next';
import './globals.css';
import { AuthProvider } from '@/lib/auth-context';
import { RouteGuard } from '@/lib/route-guard';

export const metadata: Metadata = {
  title: 'BrowserForge — Build Web3 games in your browser',
  description: 'A browser-based Godot engine for building WebGL/WebGPU games with on-chain features. No installs required.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning>
        <AuthProvider>
          <RouteGuard>{children}</RouteGuard>
        </AuthProvider>
      </body>
    </html>
  );
}
