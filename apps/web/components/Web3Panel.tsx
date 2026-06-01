'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { Wallet, ChevronDown, ChevronUp, Check, X, Loader2, ExternalLink } from 'lucide-react';
import type { Web3Config, Web3Chain, Project } from '@browser-forge/shared';
import { cn } from '@/lib/utils';

const CHAIN_INFO: Record<Web3Chain, { label: string; explorer: string; color: string }> = {
  solana: { label: 'Solana', explorer: 'https://solscan.io', color: 'text-purple-400' },
  base: { label: 'Base', explorer: 'https://basescan.org', color: 'text-blue-400' },
  polygon: { label: 'Polygon', explorer: 'https://polygonscan.com', color: 'text-violet-400' },
};

const ALL_CHAINS: Web3Chain[] = ['solana', 'base', 'polygon'];

export function Web3Panel() {
  const params = useParams();
  const projectId = params.id as string;

  const [config, setConfig] = useState<Web3Config | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [expanded, setExpanded] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Load project web3 config
  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const res = await fetch(`/api/projects/${projectId}`);
        const data = await res.json();
        if (mounted && data.success) {
          setConfig(
            data.data.web3Config ?? { enabled: false, chains: [] },
          );
        }
      } catch (err) {
        console.error(err);
        setError('Failed to load project config');
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => {
      mounted = false;
    };
  }, [projectId]);

  const update = (patch: Partial<Web3Config>) => {
    setConfig((prev) => ({ ...(prev ?? { enabled: false, chains: [] }), ...patch }));
    setSaved(false);
  };

  const save = async () => {
    if (!config) return;
    setSaving(true);
    setError(null);
    try {
      const res = await fetch(`/api/projects/${projectId}/web3`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(config),
      });
      const data = await res.json();
      if (!data.success) throw new Error(data.error);
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="p-4 text-sm text-gray-400 flex items-center gap-2">
        <Loader2 className="w-4 h-4 animate-spin" /> Loading web3 config…
      </div>
    );
  }

  if (!config) return null;

  return (
    <div className="border-t border-gray-800">
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full flex items-center justify-between px-4 py-3 hover:bg-gray-800/50 transition-colors"
      >
        <div className="flex items-center gap-2 text-sm font-medium text-white">
          <Wallet className="w-4 h-4" />
          Web3
          {config.enabled && (
            <span className="ml-2 inline-flex items-center px-1.5 py-0.5 rounded text-xs bg-green-900/40 text-green-400">
              ON
            </span>
          )}
        </div>
        {expanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
      </button>

      {expanded && (
        <div className="px-4 pb-4 space-y-3">
          <label className="flex items-center justify-between cursor-pointer">
            <span className="text-sm text-gray-300">Enable Web3 in this game</span>
            <input
              type="checkbox"
              checked={config.enabled}
              onChange={(e) => update({ enabled: e.target.checked })}
              className="w-4 h-4 rounded bg-gray-700 border-gray-600 text-brand-500 focus:ring-brand-500"
            />
          </label>

          {config.enabled && (
            <>
              <div>
                <label className="block text-xs text-gray-400 mb-2">Chains</label>
                <div className="space-y-1">
                  {ALL_CHAINS.map((chain) => {
                    const info = CHAIN_INFO[chain];
                    const checked = config.chains.includes(chain);
                    return (
                      <label
                        key={chain}
                        className={cn(
                          'flex items-center gap-2 px-2 py-1.5 rounded cursor-pointer transition-colors',
                          checked ? 'bg-gray-700/50' : 'hover:bg-gray-800/50',
                        )}
                      >
                        <input
                          type="checkbox"
                          checked={checked}
                          onChange={(e) => {
                            const chains = e.target.checked
                              ? Array.from(new Set([...config.chains, chain]))
                              : config.chains.filter((c) => c !== chain);
                            update({ chains });
                          }}
                          className="w-3.5 h-3.5 rounded bg-gray-700 border-gray-600 text-brand-500"
                        />
                        <span className={cn('text-sm', info.color)}>{info.label}</span>
                      </label>
                    );
                  })}
                </div>
              </div>

              {config.chains.includes('solana') && (
                <ChainSettings
                  chain="solana"
                  info={CHAIN_INFO.solana}
                  values={config.solana as unknown as Record<string, string | number | undefined>}
                  onChange={(v) => update({ solana: { ...(config.solana ?? {}), ...v } })}
                />
              )}
              {(config.chains.includes('base') || config.chains.includes('polygon')) && (
                <ChainSettings
                  chain="evm"
                  info={config.chains.includes('base') ? CHAIN_INFO.base : CHAIN_INFO.polygon}
                  values={config.evm as unknown as Record<string, string | number | undefined>}
                  onChange={(v) => update({ evm: { ...(config.evm ?? {}), ...v } })}
                />
              )}
            </>
          )}

          {error && (
            <p className="text-xs text-red-400 flex items-center gap-1">
              <X className="w-3 h-3" /> {error}
            </p>
          )}

          <button
            onClick={save}
            disabled={saving}
            className="w-full flex items-center justify-center gap-2 px-3 py-1.5 bg-brand-600 hover:bg-brand-700 text-white text-sm font-medium rounded transition-colors disabled:opacity-50"
          >
            {saving ? (
              <Loader2 className="w-3.5 h-3.5 animate-spin" />
            ) : saved ? (
              <>
                <Check className="w-3.5 h-3.5" /> Saved
              </>
            ) : (
              'Save Web3 config'
            )}
          </button>

          <p className="text-xs text-gray-500">
            Saved to the project metadata. The exported game reads this and
            auto-configures the in-game Web3 SDK with these values.
          </p>

          <a
            href="https://docs.browserforge.dev/web3"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-xs text-brand-400 hover:text-brand-300"
          >
            Web3 SDK docs <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      )}
    </div>
  );
}

function ChainSettings({
  chain,
  info,
  values,
  onChange,
}: {
  chain: 'solana' | 'evm';
  info: { label: string; explorer: string; color: string };
  values?: Record<string, string | number | undefined>;
  onChange: (v: Record<string, string | number>) => void;
}) {
  return (
    <div className="space-y-2 pt-2 border-t border-gray-800">
      <div className={cn('text-xs font-medium', info.color)}>{info.label} settings</div>

      {chain === 'solana' ? (
        <>
          <Field
            label="RPC URL"
            placeholder="https://api.mainnet-beta.solana.com"
            value={values?.rpcUrl as string ?? ''}
            onChange={(v) => onChange({ rpcUrl: v })}
          />
          <Field
            label="Token mint (optional)"
            placeholder="EPjFW...Dt2v"
            value={values?.tokenMint as string ?? ''}
            onChange={(v) => onChange({ tokenMint: v })}
          />
          <Field
            label="Program ID (optional)"
            placeholder="1111...1111"
            value={values?.programId as string ?? ''}
            onChange={(v) => onChange({ programId: v })}
          />
        </>
      ) : (
        <>
          <Field
            label="RPC URL"
            placeholder="https://mainnet.base.org"
            value={values?.rpcUrl as string ?? ''}
            onChange={(v) => onChange({ rpcUrl: v })}
          />
          <Field
            label="Token address (optional)"
            placeholder="0x... or leave blank for native"
            value={values?.tokenAddress as string ?? ''}
            onChange={(v) => onChange({ tokenAddress: v })}
          />
        </>
      )}
    </div>
  );
}

function Field({
  label,
  placeholder,
  value,
  onChange,
}: {
  label: string;
  placeholder: string;
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div>
      <label className="block text-xs text-gray-500 mb-1">{label}</label>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full px-2 py-1 bg-gray-800 border border-gray-700 rounded text-xs text-white placeholder-gray-500 focus:outline-none focus:border-brand-500 font-mono"
      />
    </div>
  );
}
