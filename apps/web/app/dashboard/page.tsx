'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Plus, Upload, Gamepad2, Clock, MoreVertical, Loader2, Trash2, Wallet, Sparkles } from 'lucide-react';
import { TemplateGallery } from '@/components/TemplateGallery';
import type { Project } from '@browser-forge/shared';

export default function DashboardPage() {
  const router = useRouter();
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [showNewModal, setShowNewModal] = useState(false);
  const [showTemplateGallery, setShowTemplateGallery] = useState(false);
  const [newProjectName, setNewProjectName] = useState('');
  const [importing, setImporting] = useState(false);
  const [importProgress, setImportProgress] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const fetchProjects = useCallback(async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/projects');
      const data = await response.json();
      if (data.success) {
        setProjects(data.data.map((p: any) => ({
          ...p,
          createdAt: new Date(p.createdAt),
          updatedAt: new Date(p.updatedAt),
          lastExportedAt: p.lastExportedAt ? new Date(p.lastExportedAt) : undefined,
        })));
      }
    } catch (err) {
      console.error('Failed to fetch projects:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  const handleCreateProject = async () => {
    if (!newProjectName.trim()) return;
    await createProject('', newProjectName.trim());
  };

  const createProject = async (template: string, name: string) => {
    try {
      const response = await fetch('/api/projects', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, description: '', template }),
      });
      const data = await response.json();
      if (data.success) {
        const newProject = {
          ...data.data,
          createdAt: new Date(data.data.createdAt),
          updatedAt: new Date(data.data.updatedAt),
        };
        setProjects([newProject, ...projects]);
        setNewProjectName('');
        setShowNewModal(false);
        router.push(`/editor/${newProject.id}`);
      } else {
        alert(data.error || 'Failed to create project');
      }
    } catch (err) {
      console.error('Failed to create project:', err);
      alert('Failed to create project');
    }
  };

  const handleDeleteProject = async (id: string) => {
    if (!confirm('Are you sure you want to delete this project?')) return;

    try {
      const response = await fetch(`/api/projects/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setProjects(projects.filter(p => p.id !== id));
      }
    } catch (err) {
      console.error('Failed to delete project:', err);
    }
  };

  const handleImportZip = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.name.endsWith('.zip')) {
      alert('Please select a .zip file');
      return;
    }

    setImporting(true);
    setImportProgress('Creating project...');

    try {
      const projectName = file.name.replace(/\.zip$/i, '').replace(/[-_]/g, ' ');

      const createResponse = await fetch('/api/projects', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: projectName,
          description: `Imported from ${file.name}`,
        }),
      });

      if (!createResponse.ok) {
        throw new Error('Failed to create project');
      }

      const createData = await createResponse.json();
      const projectId = createData.data.id;

      setImportProgress('Uploading ZIP file...');

      const formData = new FormData();
      formData.append('file', file);

      const uploadResponse = await fetch(`/api/projects/${projectId}/import-zip`, {
        method: 'POST',
        body: formData,
      });

      if (!uploadResponse.ok) {
        throw new Error('Failed to upload ZIP');
      }

      await fetchProjects();
      router.push(`/editor/${projectId}?import=true`);
    } catch (error) {
      console.error('Import failed:', error);
      alert(`Import failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
      setImporting(false);
      setImportProgress('');
    }

    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <main className="min-h-screen bg-gray-900">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white">My Projects</h1>
            <p className="text-gray-400 mt-1">Manage your game projects</p>
          </div>
          <div className="flex gap-3">
            <button
              onClick={() => fileInputRef.current?.click()}
              disabled={importing}
              className="flex items-center gap-2 px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white font-medium rounded-lg transition-colors disabled:opacity-50"
            >
              {importing ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  {importProgress}
                </>
              ) : (
                <>
                  <Upload className="w-5 h-5" />
                  Import ZIP
                </>
              )}
            </button>
            <input
              ref={fileInputRef}
              type="file"
              accept=".zip"
              onChange={handleImportZip}
              className="hidden"
            />
            <button
              onClick={() => setShowTemplateGallery(true)}
              className="flex items-center gap-2 px-4 py-2 bg-brand-600 hover:bg-brand-700 text-white font-medium rounded-lg transition-colors"
            >
              <Plus className="w-5 h-5" />
              New Project
            </button>
          </div>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-16">
            <Loader2 className="w-8 h-8 text-brand-500 animate-spin" />
          </div>
        ) : projects.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project) => (
              <div
                key={project.id}
                className="bg-gray-800 rounded-xl border border-gray-700 overflow-hidden hover:border-gray-600 transition-colors"
              >
                <div className="h-40 bg-gradient-to-br from-brand-900/50 to-brand-800/30 flex items-center justify-center relative">
                  <Gamepad2 className="w-16 h-16 text-brand-400/50" />
                  {project.web3Config?.enabled && (
                    <div className="absolute top-2 right-2 flex items-center gap-1 px-2 py-1 rounded bg-black/40 backdrop-blur">
                      <Wallet className="w-3 h-3 text-brand-400" />
                      <span className="text-xs text-brand-300">
                        {project.web3Config.chains.join(' + ')}
                      </span>
                    </div>
                  )}
                </div>
                <div className="p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1 min-w-0">
                      <h3 className="text-white font-semibold truncate">{project.name}</h3>
                      <p className="text-gray-400 text-sm mt-1 truncate">
                        {project.description || 'No description'}
                      </p>
                    </div>
                    <button
                      onClick={() => handleDeleteProject(project.id)}
                      className="p-1 text-gray-400 hover:text-red-500 transition-colors ml-2"
                      title="Delete project"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="flex items-center gap-4 mt-4 text-xs text-gray-500">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {project.updatedAt.toLocaleDateString()}
                    </span>
                    {project.lastExportedAt && (
                      <span className="text-green-500">Exported</span>
                    )}
                  </div>
                  <div className="flex gap-2 mt-4">
                    <Link
                      href={`/editor/${project.id}`}
                      className="flex-1 px-4 py-2 bg-brand-600 hover:bg-brand-700 text-white text-sm font-medium rounded-lg transition-colors text-center"
                    >
                      Open Editor
                    </Link>
                    <Link
                      href={`/export/${project.id}`}
                      className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white text-sm font-medium rounded-lg transition-colors"
                    >
                      Export
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <Gamepad2 className="w-16 h-16 text-gray-600 mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-white mb-2">No projects yet</h2>
            <p className="text-gray-400 mb-6">Create your first game project or import an existing one</p>
            <div className="flex gap-3 justify-center">
              <button
                onClick={() => fileInputRef.current?.click()}
                disabled={importing}
                className="px-6 py-3 bg-gray-700 hover:bg-gray-600 text-white font-medium rounded-lg transition-colors"
              >
                <Upload className="w-5 h-5 inline mr-2" />
                Import ZIP
              </button>
              <button
                onClick={() => setShowTemplateGallery(true)}
                className="px-6 py-3 bg-brand-600 hover:bg-brand-700 text-white font-medium rounded-lg transition-colors"
              >
                <Sparkles className="w-5 h-5 inline mr-2" />
                New from template
              </button>
            </div>
          </div>
        )}
      </div>

      <TemplateGallery
        open={showTemplateGallery}
        onClose={() => setShowTemplateGallery(false)}
        onCreate={createProject}
      />

      {showNewModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-gray-800 rounded-xl p-6 w-full max-w-md mx-4 border border-gray-700">
            <h2 className="text-xl font-semibold text-white mb-4">New Project</h2>
            <input
              type="text"
              value={newProjectName}
              onChange={(e) => setNewProjectName(e.target.value)}
              placeholder="Project name"
              className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-brand-500 mb-4"
              autoFocus
              onKeyDown={(e) => e.key === 'Enter' && handleCreateProject()}
            />
            <div className="flex gap-3 justify-end">
              <button
                onClick={() => {
                  setShowNewModal(false);
                  setNewProjectName('');
                }}
                className="px-4 py-2 text-gray-400 hover:text-white transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleCreateProject}
                disabled={!newProjectName.trim()}
                className="px-4 py-2 bg-brand-600 hover:bg-brand-700 text-white font-medium rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Create
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
