import type { ApiResponse } from '@browser-forge/shared';

const API_BASE = '';

async function fetchApi<T>(
  endpoint: string,
  options?: RequestInit
): Promise<ApiResponse<T>> {
  try {
    const headers = new Headers(options?.headers);
    headers.set('Content-Type', 'application/json');

    // Read the session token from local storage dynamically
    if (typeof window !== 'undefined') {
      const raw = localStorage.getItem('browserforge.session');
      if (raw) {
        try {
          const { token } = JSON.parse(raw);
          if (token) {
            headers.set('Authorization', `Bearer ${token}`);
          }
        } catch {}
      }
    }

    const response = await fetch(`${API_BASE}${endpoint}`, {
      ...options,
      headers,
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      return {
        success: false,
        error: errorData.error || `HTTP ${response.status}`,
      };
    }

    const json = await response.json();
    return json as ApiResponse<T>;
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

    const headers = new Headers();
    if (typeof window !== 'undefined') {
      const raw = localStorage.getItem('browserforge.session');
      if (raw) {
        try {
          const { token } = JSON.parse(raw);
          if (token) {
            headers.set('Authorization', `Bearer ${token}`);
          }
        } catch {}
      }
    }

    const response = await fetch(`${API_BASE}/api/projects/${projectId}/files`, {
      method: 'POST',
      body: formData,
      headers,
    });

    return response.json();
  },

  getFile: (projectId: string, path: string) => {
    const headers = new Headers();
    if (typeof window !== 'undefined') {
      const raw = localStorage.getItem('browserforge.session');
      if (raw) {
        try {
          const { token } = JSON.parse(raw);
          if (token) {
            headers.set('Authorization', `Bearer ${token}`);
          }
        } catch {}
      }
    }
    return fetch(`${API_BASE}/api/projects/${projectId}/files/${encodeURIComponent(path)}`, {
      headers,
    });
  },

  deleteFile: (projectId: string, path: string) =>
    fetchApi<void>(`/api/projects/${projectId}/files/${encodeURIComponent(path)}`, {
      method: 'DELETE',
    }),
};
