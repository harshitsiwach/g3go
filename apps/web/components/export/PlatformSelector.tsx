'use client';

import { useState } from 'react';
import { Globe, Send, Twitter, Github, Code2, ExternalLink, Check } from 'lucide-react';
import type { ExportPlatform } from '@browser-forge/shared';
import { listShells } from '@/lib/shells';
import { cn } from '@/lib/utils';

interface PlatformSelectorProps {
  value: ExportPlatform;
  onChange: (p: ExportPlatform) => void;
  hostedUrl?: string;
}

const ICONS: Record<ExportPlatform, React.ComponentType<{ className?: string }>> = {
  web: Globe,
  telegram: Send,
  x: Twitter,
  'reddit-devvit': Github,
  'reddit-host': Github,
  iframe: Code2,
};

export function PlatformSelector({ value, onChange, hostedUrl }: PlatformSelectorProps) {
  const [copied, setCopied] = useState(false);
  const shells = listShells();
  const selected = shells.find((s) => s.id === value);

  const embedCode = selected?.embedCode?.(hostedUrl ?? '');

  const copyEmbed = async () => {
    if (!embedCode) return;
    await navigator.clipboard.writeText(embedCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div>
      <h2 className="text-lg font-semibold text-white mb-4">Target Platform</h2>
      <p className="text-sm text-gray-400 mb-4">
        Same engine, different shell. Choose where you want to host the build.
      </p>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {shells.map((shell) => {
          const Icon = ICONS[shell.id];
          const isSelected = shell.id === value;
          return (
            <button
              key={shell.id}
              onClick={() => onChange(shell.id)}
              className={cn(
                'text-left p-3 rounded-lg border transition-colors',
                isSelected
                  ? 'border-brand-500 bg-brand-500/10'
                  : 'border-gray-700 hover:border-gray-600 bg-gray-800/50',
              )}
            >
              <div className="flex items-center gap-2 mb-1">
                <Icon className={cn('w-4 h-4', isSelected ? 'text-brand-400' : 'text-gray-400')} />
                <span className="text-sm font-medium text-white">{shell.label}</span>
              </div>
              <p className="text-xs text-gray-500 line-clamp-3">{shell.description}</p>
            </button>
          );
        })}
      </div>

      {embedCode && (
        <div className="mt-4 p-3 bg-gray-800/70 rounded-lg border border-gray-700">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-gray-400">Embed snippet</span>
            <div className="flex gap-2">
              <button
                onClick={copyEmbed}
                className="text-xs text-brand-400 hover:text-brand-300 flex items-center gap-1"
              >
                {copied ? (
                  <>
                    <Check className="w-3 h-3" /> Copied
                  </>
                ) : (
                  'Copy'
                )}
              </button>
              {hostedUrl && (
                <a
                  href={hostedUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-gray-400 hover:text-gray-300 flex items-center gap-1"
                >
                  <ExternalLink className="w-3 h-3" /> Preview
                </a>
              )}
            </div>
          </div>
          <pre className="text-xs text-gray-300 font-mono overflow-x-auto whitespace-pre-wrap break-all">
            {embedCode}
          </pre>
        </div>
      )}
    </div>
  );
}
