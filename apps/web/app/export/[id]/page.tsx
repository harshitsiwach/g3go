'use client';

import { useState, useCallback, useRef } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { ArrowLeft, Download, Loader2, CheckCircle, XCircle, Cpu, Share2 } from 'lucide-react';
import Link from 'next/link';
import { PlatformSelector } from '@/components/export/PlatformSelector';
import { runExport, type ExportResult } from '@/lib/godot-export';
import { buildExportZip, downloadZip } from '@/lib/export-builder';
import { checkBrowserSupport } from '@/lib/godot-runtime';
import type { ExportFormat, ExportPlatform, Project } from '@browser-forge/shared';
import { cn } from '@/lib/utils';

type Stage = 'idle' | 'exporting' | 'bundling' | 'completed' | 'failed';

const STAGE_LABEL: Record<Stage, string> = {
  idle: 'Select a format and target, then click Export',
  exporting: 'Running Godot export in your browser…',
  bundling: 'Packaging the platform-specific zip…',
  completed: 'Build ready — download below or share the link',
  failed: 'Export failed',
};

export default function ExportPage() {
  const params = useParams();
  const router = useRouter();
  const projectId = params.id as string;

  const [project, setProject] = useState<Project | null>(null);
  const [format, setFormat] = useState<ExportFormat>('webgl');
  const [platform, setPlatform] = useState<ExportPlatform>('web');
  const [stage, setStage] = useState<Stage>('idle');
  const [progress, setProgress] = useState(0);
  const [progressLabel, setProgressLabel] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [logs, setLogs] = useState<string[]>([]);
  const [result, setResult] = useState<ExportResult | null>(null);
  const [downloadName, setDownloadName] = useState<string | null>(null);
  const [embedSnippet, setEmbedSnippet] = useState<string | null>(null);

  const logsRef = useRef<HTMLDivElement>(null);

  const fetchProject = useCallback(async () => {
    try {
      const res = await fetch(`/api/projects/${projectId}`);
      const data = await res.json();
      if (data.success) {
        setProject({
          ...data.data,
          createdAt: new Date(data.data.createdAt),
          updatedAt: new Date(data.data.updatedAt),
          lastExportedAt: data.data.lastExportedAt
            ? new Date(data.data.lastExportedAt)
            : undefined,
        });
      }
    } catch (err) {
      console.error('Failed to fetch project', err);
    }
  }, [projectId]);

  // load on mount
  if (!project) {
    void fetchProject();
  }

  const appendLog = (line: string) => {
    setLogs((prev) => {
      const next = [...prev, line];
      // cap at 200 lines to keep DOM small
      return next.length > 200 ? next.slice(next.length - 200) : next;
    });
    requestAnimationFrame(() => {
      if (logsRef.current) {
        logsRef.current.scrollTop = logsRef.current.scrollHeight;
      }
    });
  };

  const handleExport = async () => {
    setError(null);
    setResult(null);
    setLogs([]);
    setProgress(0);
    setProgressLabel('Starting…');
    setDownloadName(null);
    setEmbedSnippet(null);

    const support = checkBrowserSupport();
    if (!support.ok) {
      setError(support.reason);
      setStage('failed');
      return;
    }

    setStage('exporting');
    try {
      // Tell the server we started an export (for analytics only)
      void fetch('/api/export', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ projectId, format, platform }),
      }).catch(() => {/* fire-and-forget */});

      // Pull the project's source from the server
      const zipRes = await fetch(`/api/projects/${projectId}/import-zip`);
      let projectZip: Uint8Array | undefined;
      if (zipRes.ok) {
        const buf = await zipRes.arrayBuffer();
        if (buf.byteLength > 0) projectZip = new Uint8Array(buf);
      }

      // Step 1: in-browser Godot export
      const exportRes = await runExport({
        format,
        projectZip,
        onProgress: (p, label) => {
          setProgress(p);
          setProgressLabel(label);
        },
        onLog: appendLog,
      });
      setResult(exportRes);

      // Step 2: bundle into the platform-specific zip
      setStage('bundling');
      setProgress(0);
      setProgressLabel('Packaging…');

      const built = await buildExportZip({
        gameZip: exportRes.zip,
        format,
        platform,
        meta: {
          title: project?.name ?? 'Untitled Game',
          description: project?.description,
          hostedUrl: '',
          walletAddress: project?.web3Config?.enabled ? 'onchain' : undefined,
        },
        web3Config: project?.web3Config ?? null,
        onProgress: (p, label) => {
          setProgress(p);
          setProgressLabel(label);
        },
      });
      setDownloadName(built.filename);
      setEmbedSnippet(built.embedCode ?? null);

      // Auto-download
      downloadZip(built.zip, built.filename);

      setStage('completed');
      setProgress(1);
      setProgressLabel('Done');
    } catch (err) {
      console.error(err);
      setError(err instanceof Error ? err.message : 'Export failed');
      setStage('failed');
    }
  };

  const handleShare = async () => {
    if (!embedSnippet) return;
    if (navigator.share) {
      try {
        await navigator.share({
          title: project?.name ?? 'Game built with BrowserForge',
          text: 'Try this game I built in the browser',
          url: location.href,
        });
      } catch {/* user cancelled */}
    } else {
      await navigator.clipboard.writeText(embedSnippet);
    }
  };

  const isWorking = stage === 'exporting' || stage === 'bundling';

  return (
    <main className="min-h-screen bg-gray-900">
      <div className="container mx-auto px-4 py-8 max-w-3xl">
        <div className="flex items-center gap-4 mb-8">
          <Link
            href="/dashboard"
            className="text-gray-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <h1 className="text-3xl font-bold text-white">Export Project</h1>
            <p className="text-gray-400 mt-1">
              {project?.name ?? `Project ${projectId}`}
              {project?.web3Config?.enabled && (
                <span className="ml-2 inline-flex items-center gap-1 text-xs text-brand-400">
                  · Web3 enabled
                </span>
              )}
            </p>
          </div>
        </div>

        <div className="bg-gray-800 rounded-xl border border-gray-700 p-6 mb-6">
          <h2 className="text-lg font-semibold text-white mb-4">Format</h2>
          <div className="grid grid-cols-2 gap-3">
            {(['webgl', 'webgpu'] as const).map((f) => (
              <label
                key={f}
                className={cn(
                  'flex items-start p-4 rounded-lg border cursor-pointer transition-colors',
                  format === f
                    ? 'border-brand-500 bg-brand-500/10'
                    : 'border-gray-700 hover:border-gray-600',
                )}
              >
                <input
                  type="radio"
                  name="format"
                  value={f}
                  checked={format === f}
                  onChange={() => setFormat(f)}
                  className="sr-only"
                />
                <div className="flex-1">
                  <div className="text-white font-medium">
                    {f === 'webgl' ? 'WebGL 2.0' : 'WebGPU'}
                  </div>
                  <p className="text-gray-400 text-sm">
                    {f === 'webgl'
                      ? 'Wide browser support, good fallback'
                      : 'Next-gen, faster, but Chrome/Edge only'}
                  </p>
                </div>
                {format === f && (
                  <div className="w-5 h-5 bg-brand-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <div className="w-2 h-2 bg-white rounded-full" />
                  </div>
                )}
              </label>
            ))}
          </div>
        </div>

        <div className="bg-gray-800 rounded-xl border border-gray-700 p-6 mb-6">
          <PlatformSelector value={platform} onChange={setPlatform} />
        </div>

        <div className="bg-gray-800 rounded-xl border border-gray-700 p-6 mb-6">
          <h2 className="text-lg font-semibold text-white mb-4">Progress</h2>
          <div className="flex items-center gap-3 mb-3">
            {isWorking && <Loader2 className="w-5 h-5 text-blue-500 animate-spin" />}
            {stage === 'completed' && <CheckCircle className="w-5 h-5 text-green-500" />}
            {stage === 'failed' && <XCircle className="w-5 h-5 text-red-500" />}
            {stage === 'idle' && <Cpu className="w-5 h-5 text-gray-500" />}
            <span className="text-white">{STAGE_LABEL[stage]}</span>
          </div>

          {isWorking && (
            <div>
              <div className="w-full h-2 bg-gray-700 rounded-full overflow-hidden">
                <div
                  className="h-full bg-brand-500 transition-all"
                  style={{ width: `${Math.round(progress * 100)}%` }}
                />
              </div>
              <p className="text-xs text-gray-500 mt-2">{progressLabel}</p>
            </div>
          )}

          {error && <p className="text-red-400 mt-3 text-sm">{error}</p>}

          {stage === 'completed' && result && (
            <div className="mt-3 grid grid-cols-3 gap-3 text-center text-sm">
              <div className="bg-gray-700/50 rounded-lg p-3">
                <div className="text-gray-400 text-xs">Engine log</div>
                <div className="text-white font-medium">{logs.length} lines</div>
              </div>
              <div className="bg-gray-700/50 rounded-lg p-3">
                <div className="text-gray-400 text-xs">Duration</div>
                <div className="text-white font-medium">
                  {(result.durationMs / 1000).toFixed(1)}s
                </div>
              </div>
              <div className="bg-gray-700/50 rounded-lg p-3">
                <div className="text-gray-400 text-xs">Game pck</div>
                <div className="text-white font-medium">
                  {(result.zip.length / 1024).toFixed(0)} KiB
                </div>
              </div>
            </div>
          )}

          {logs.length > 0 && (
            <details className="mt-4">
              <summary className="text-sm text-gray-400 cursor-pointer hover:text-gray-300">
                Show engine logs
              </summary>
              <div
                ref={logsRef}
                className="mt-2 p-3 bg-gray-900 rounded-lg text-xs font-mono text-gray-400 max-h-48 overflow-y-auto"
              >
                {logs.map((line, i) => (
                  <div key={i} className="whitespace-pre-wrap break-all">
                    {line}
                  </div>
                ))}
              </div>
            </details>
          )}
        </div>

        <div className="flex gap-3 flex-wrap">
          <button
            onClick={handleExport}
            disabled={isWorking}
            className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-brand-600 hover:bg-brand-700 text-white font-medium rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed min-w-[200px]"
          >
            {isWorking ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                {stage === 'exporting' ? 'Exporting…' : 'Packaging…'}
              </>
            ) : stage === 'completed' ? (
              <>
                <Download className="w-5 h-5" />
                Export Again
              </>
            ) : (
              <>
                <Cpu className="w-5 h-5" />
                Build in Browser
              </>
            )}
          </button>

          {stage === 'completed' && downloadName && (
            <>
              <button
                onClick={() => result && downloadZip(result.zip, downloadName)}
                className="flex items-center gap-2 px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg transition-colors"
              >
                <Download className="w-5 h-5" />
                Download {downloadName}
              </button>
              {embedSnippet && (
                <button
                  onClick={handleShare}
                  className="flex items-center gap-2 px-6 py-3 bg-gray-700 hover:bg-gray-600 text-white font-medium rounded-lg transition-colors"
                >
                  <Share2 className="w-5 h-5" />
                  Share
                </button>
              )}
            </>
          )}
        </div>

        <div className="mt-6 p-4 bg-gray-800/50 border border-gray-700 rounded-lg text-sm text-gray-400">
          <strong className="text-gray-300">How this works:</strong> the export
          runs the Godot export runtime entirely in your browser via WebAssembly
          — your CPU compiles the project, your machine packages the zip. No
          server compute, no upload step, no waiting.
        </div>
      </div>
    </main>
  );
}
