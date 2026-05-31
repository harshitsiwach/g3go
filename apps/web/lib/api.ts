import type { ApiResponse } from '@browser-forge/shared';

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

async function fetchApi<T>(
  endpoint: string,
  options?: RequestInit
): Promise<ApiResponse<T>> {
  try {
    const response = await fetch(`${API_BASE}${endpoint}`, {
      headers: {
        'Content-Type': 'application/json',
        ...options?.headers,
      },
      ...options,
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      return {
        success: false,
        error: errorData.error || `HTTP ${response.status}`,
      };
    }

    const data = await response.json();
    return { success: true, data };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Network error',
    };
  }
}

// Project API
export const projectApi = {
  list: () => fetchApi<any[]>('/api/projects'),

  get: (id: string) => fetchApi<any>(`/api/projects/${id}`),

  create: (data: { name: string; description?: string }) =>
    fetchApi<any>('/api/projects', {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  update: (id: string, data: { name?: string; description?: string }) =>
    fetchApi<any>(`/api/projects/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(data),
    }),

  delete: (id: string) =>
    fetchApi<void>(`/api/projects/${id}`, {
      method: 'DELETE',
    }),
};

// Export API
export const exportApi = {
  start: (data: { projectId: string; format: string }) =>
    fetchApi<any>('/api/export', {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  getStatus: (jobId: string) => fetchApi<any>(`/api/export/${jobId}`),
};

// Storage API
export const storageApi = {
  uploadFile: async (projectId: string, path: string, file: File) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('path', path);

    const response = await fetch(`${API_BASE}/api/projects/${projectId}/files`, {
      method: 'POST',
      body: formData,
    });

    return response.json();
  },

  getFile: (projectId: string, path: string) =>
    fetch(`${API_BASE}/api/projects/${projectId}/files/${encodeURIComponent(path)}`),

  deleteFile: (projectId: string, path: string) =>
    fetchApi<void>(`/api/projects/${projectId}/files/${encodeURIComponent(path)}`, {
      method: 'DELETE',
    }),
};
