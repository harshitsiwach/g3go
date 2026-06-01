import { create } from 'zustand';
import type { Project, ExportArtifact } from '@browser-forge/shared';

interface AppState {
  // Projects
  projects: Project[];
  currentProject: Project | null;
  setProjects: (projects: Project[]) => void;
  setCurrentProject: (project: Project | null) => void;
  addProject: (project: Project) => void;
  updateProject: (id: string, updates: Partial<Project>) => void;
  removeProject: (id: string) => void;

  // Export jobs
  exportJobs: ExportArtifact[];
  currentExportJob: ExportArtifact | null;
  setExportJobs: (jobs: ExportArtifact[]) => void;
  setCurrentExportJob: (job: ExportArtifact | null) => void;
  addExportJob: (job: ExportArtifact) => void;
  updateExportJob: (id: string, updates: Partial<ExportArtifact>) => void;

  // UI state
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
  error: string | null;
  setError: (error: string | null) => void;
}

export const useAppStore = create<AppState>((set) => ({
  // Projects
  projects: [],
  currentProject: null,
  setProjects: (projects) => set({ projects }),
  setCurrentProject: (project) => set({ currentProject: project }),
  addProject: (project) => set((state) => ({ projects: [project, ...state.projects] })),
  updateProject: (id, updates) =>
    set((state) => ({
      projects: state.projects.map((p) => (p.id === id ? { ...p, ...updates } : p)),
      currentProject: state.currentProject?.id === id
        ? { ...state.currentProject, ...updates }
        : state.currentProject,
    })),
  removeProject: (id) =>
    set((state) => ({
      projects: state.projects.filter((p) => p.id !== id),
      currentProject: state.currentProject?.id === id ? null : state.currentProject,
    })),

  // Export jobs
  exportJobs: [],
  currentExportJob: null,
  setExportJobs: (jobs) => set({ exportJobs: jobs }),
  setCurrentExportJob: (job) => set({ currentExportJob: job }),
  addExportJob: (job) => set((state) => ({ exportJobs: [job, ...state.exportJobs] })),
  updateExportJob: (id, updates) =>
    set((state) => ({
      exportJobs: state.exportJobs.map((j) => (j.id === id ? { ...j, ...updates } : j)),
      currentExportJob: state.currentExportJob?.id === id
        ? { ...state.currentExportJob, ...updates }
        : state.currentExportJob,
    })),

  // UI state
  isLoading: false,
  setIsLoading: (loading) => set({ isLoading: loading }),
  error: null,
  setError: (error) => set({ error }),
}));
