'use client';

import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { ArrowLeft, Download, Loader2, CheckCircle, XCircle } from 'lucide-react';
import Link from 'next/link';
import type { ExportFormat, ExportStatus } from '@browser-forge/shared';

const exportFormats: { value: ExportFormat; label: string; description: string }[] = [
  { value: 'webgl', label: 'WebGL 2.0', description: 'Browser-compatible, widest support' },
  { value: 'webgpu', label: 'WebGPU', description: 'Next-gen graphics, Chrome/Edge' },
  { value: 'windows', label: 'Windows', description: 'Windows desktop executable' },
  { value: 'macos', label: 'macOS', description: 'macOS desktop application' },
  { value: 'linux', label: 'Linux', description: 'Linux desktop binary' },
];

export default function ExportPage() {
  const params = useParams();
  const router = useRouter();
  const projectId = params.id as string;
  const [selectedFormat, setSelectedFormat] = useState<ExportFormat>('webgl');
  const [exportStatus, setExportStatus] = useState<ExportStatus | null>(null);
  const [exportProgress, setExportProgress] = useState(0);
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleExport = async () => {
    try {
      setExportStatus('pending');
      setExportProgress(0);
      setError(null);

      // Simulate export progress
      const progressInterval = setInterval(() => {
        setExportProgress((prev) => {
          if (prev >= 90) {
            clearInterval(progressInterval);
            return prev;
          }
          return prev + 10;
        });
      }, 500);

      const response = await fetch('/api/export', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ projectId, format: selectedFormat }),
      });

      clearInterval(progressInterval);

      if (!response.ok) {
        throw new Error('Export failed');
      }

      const data = await response.json();
      setExportProgress(100);
      setExportStatus('completed');
      setDownloadUrl(data.downloadUrl);
    } catch (err) {
      setExportStatus('failed');
      setError(err instanceof Error ? err.message : 'Export failed');
    }
  };

  const handleDownload = () => {
    if (downloadUrl) {
      window.open(downloadUrl, '_blank');
    }
  };

  return (
    <main className="min-h-screen bg-gray-900">
      <div className="container mx-auto px-4 py-8 max-w-2xl">
        <div className="flex items-center gap-4 mb-8">
          <Link
            href="/dashboard"
            className="text-gray-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <h1 className="text-3xl font-bold text-white">Export Project</h1>
            <p className="text-gray-400 mt-1">Project: {projectId}</p>
          </div>
        </div>

        <div className="bg-gray-800 rounded-xl border border-gray-700 p-6 mb-6">
          <h2 className="text-lg font-semibold text-white mb-4">Select Export Format</h2>
          <div className="space-y-3">
            {exportFormats.map((format) => (
              <label
                key={format.value}
                className={`flex items-center p-4 rounded-lg border cursor-pointer transition-colors ${
                  selectedFormat === format.value
                    ? 'border-brand-500 bg-brand-500/10'
                    : 'border-gray-700 hover:border-gray-600'
                }`}
              >
                <input
                  type="radio"
                  name="format"
                  value={format.value}
                  checked={selectedFormat === format.value}
                  onChange={(e) => setSelectedFormat(e.target.value as ExportFormat)}
                  className="sr-only"
                />
                <div className="flex-1">
                  <div className="text-white font-medium">{format.label}</div>
                  <div className="text-gray-400 text-sm">{format.description}</div>
                </div>
                {selectedFormat === format.value && (
                  <div className="w-5 h-5 bg-brand-500 rounded-full flex items-center justify-center">
                    <div className="w-2 h-2 bg-white rounded-full" />
                  </div>
                )}
              </label>
            ))}
          </div>
        </div>

        <div className="bg-gray-800 rounded-xl border border-gray-700 p-6 mb-6">
          <h2 className="text-lg font-semibold text-white mb-4">Export Progress</h2>
          {exportStatus === null && (
            <p className="text-gray-400">Select a format and click Export to begin</p>
          )}
          {exportStatus && (
            <div>
              <div className="flex items-center gap-3 mb-3">
                {exportStatus === 'pending' && (
                  <Loader2 className="w-5 h-5 text-yellow-500 animate-spin" />
                )}
                {exportStatus === 'processing' && (
                  <Loader2 className="w-5 h-5 text-blue-500 animate-spin" />
                )}
                {exportStatus === 'completed' && (
                  <CheckCircle className="w-5 h-5 text-green-500" />
                )}
                {exportStatus === 'failed' && (
                  <XCircle className="w-5 h-5 text-red-500" />
                )}
                <span className="text-white capitalize">{exportStatus}</span>
              </div>
              {(exportStatus === 'pending' || exportStatus === 'processing') && (
                <div className="progress-bar">
                  <div
                    className="progress-bar-fill"
                    style={{ width: `${exportProgress}%` }}
                  />
                </div>
              )}
              {error && <p className="text-red-500 mt-2">{error}</p>}
            </div>
          )}
        </div>

        <div className="flex gap-4">
          <button
            onClick={handleExport}
            disabled={exportStatus === 'pending' || exportStatus === 'processing'}
            className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-brand-600 hover:bg-brand-700 text-white font-medium rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Download className="w-5 h-5" />
            {exportStatus === 'completed' ? 'Export Again' : 'Start Export'}
          </button>
          {downloadUrl && (
            <button
              onClick={handleDownload}
              className="flex items-center justify-center gap-2 px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg transition-colors"
            >
              <Download className="w-5 h-5" />
              Download
            </button>
          )}
        </div>
      </div>
    </main>
  );
}
