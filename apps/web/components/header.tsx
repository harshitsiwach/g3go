'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Bell, Search, User } from 'lucide-react';

export function Header() {
  const pathname = usePathname();

  return (
    <header className="h-16 bg-gray-900 border-b border-gray-800 flex items-center px-6">
      <div className="flex-1">
        <h1 className="text-lg font-semibold text-white">
          {pathname === '/dashboard' && 'My Projects'}
          {pathname?.startsWith('/editor') && 'Editor'}
          {pathname?.startsWith('/export') && 'Export'}
          {pathname === '/settings' && 'Settings'}
        </h1>
      </div>

      <div className="flex items-center gap-4">
        <button className="p-2 text-gray-400 hover:text-white transition-colors">
          <Search className="w-5 h-5" />
        </button>
        <button className="p-2 text-gray-400 hover:text-white transition-colors relative">
          <Bell className="w-5 h-5" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
        </button>
        <div className="w-8 h-8 bg-brand-600 rounded-full flex items-center justify-center">
          <User className="w-4 h-4 text-white" />
        </div>
      </div>
    </header>
  );
}
