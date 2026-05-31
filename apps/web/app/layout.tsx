import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'BrowserForge - Cloud Game Engine',
  description: 'Build games in your browser with Godot-powered editor',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
