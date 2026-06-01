'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { X, Sparkles, Loader2, Wallet, Gamepad2, Puzzle, Rocket, Code2, Coins, Send } from 'lucide-react';
import { PROJECT_TEMPLATES, type ProjectTemplate } from '@browser-forge/shared';
import { cn } from '@/lib/utils';

const ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  '📄': Code2,
  '🏃': Gamepad2,
  '🚀': Rocket,
  '🧩': Puzzle,
  '🔐': Wallet,
  '🪙': Coins,
  '✈️': Send,
};

const CATEGORY_LABEL: Record<ProjectTemplate['category'], string> = {
  starter: 'Starter',
  web3: 'Web3',
  arcade: 'Arcade',
};

interface TemplateGalleryProps {
  open: boolean;
  onClose: () => void;
  onCreate: (templateId: string, name: string) => Promise<void>;
}

export function TemplateGallery({ open, onClose, onCreate }: TemplateGalleryProps) {
  const [selected, setSelected] = useState<ProjectTemplate | null>(null);
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);

  if (!open) return null;

  const handleCreate = async () => {
    if (!selected || !name.trim()) return;
    setLoading(true);
    try {
      await onCreate(selected.id, name.trim());
      onClose();
    } finally {
      setLoading(false);
    }
  };

  const byCategory = PROJECT_TEMPLATES.reduce<Record<string, ProjectTemplate[]>>(
    (acc, t) => {
      acc[t.category] = acc[t.category] ?? [];
      acc[t.category].push(t);
      return acc;
    },
    {},
  );

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
      <div className="bg-gray-900 rounded-2xl border border-gray-700 w-full max-w-3xl max-h-[85vh] flex flex-col">
        <div className="flex items-center justify-between p-4 border-b border-gray-800">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-brand-400" />
            <h2 className="text-lg font-semibold text-white">Choose a template</h2>
          </div>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="overflow-y-auto p-4 flex-1">
          {(Object.entries(byCategory) as [ProjectTemplate['category'], ProjectTemplate[]][]).map(
            ([cat, templates]) => (
              <div key={cat} className="mb-6">
                <h3 className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-3">
                  {CATEGORY_LABEL[cat]}
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {templates.map((t) => {
                    const Icon = ICONS[t.thumbnailEmoji] ?? Code2;
                    const isSel = selected?.id === t.id;
                    const isWeb3 = t.category === 'web3';
                    return (
                      <button
                        key={t.id}
                        onClick={() => {
                          setSelected(t);
                          if (!name) setName(t.name);
                        }}
                        className={cn(
                          'text-left p-4 rounded-xl border transition-colors',
                          isSel
                            ? 'border-brand-500 bg-brand-500/10'
                            : 'border-gray-800 hover:border-gray-700 bg-gray-800/40',
                        )}
                      >
                        <div className="flex items-start gap-3">
                          <div
                            className={cn(
                              'w-10 h-10 rounded-lg flex items-center justify-center',
                              isWeb3 ? 'bg-brand-900/40' : 'bg-gray-700/50',
                            )}
                          >
                            <Icon
                              className={cn(
                                'w-5 h-5',
                                isWeb3 ? 'text-brand-400' : 'text-gray-300',
                              )}
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2">
                              <span className="font-medium text-white">{t.name}</span>
                              {isWeb3 && (
                                <span className="text-xs px-1.5 py-0.5 rounded bg-brand-900/40 text-brand-300">
                                  Web3
                                </span>
                              )}
                            </div>
                            <p className="text-sm text-gray-500 mt-1">{t.description}</p>
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            ),
          )}
        </div>

        {selected && (
          <div className="p-4 border-t border-gray-800">
            <label className="block text-sm text-gray-400 mb-2">Project name</label>
            <div className="flex gap-2">
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="My awesome game"
                className="flex-1 px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-brand-500"
                autoFocus
              />
              <button
                onClick={handleCreate}
                disabled={loading || !name.trim()}
                className="px-6 py-2 bg-brand-600 hover:bg-brand-700 text-white font-medium rounded-lg transition-colors disabled:opacity-50 flex items-center gap-2"
              >
                {loading ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <Sparkles className="w-4 h-4" />
                )}
                Create
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
