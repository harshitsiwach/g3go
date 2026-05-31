/**
 * Storage utilities for syncing files between Godot VFS and cloud storage
 */

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

export interface StoredFile {
  path: string;
  size: number;
  lastModified: Date;
}

/**
 * Upload a file to the project's cloud storage
 */
export async function uploadFile(
  projectId: string,
  path: string,
  data: ArrayBuffer | Blob
): Promise<StoredFile> {
  const formData = new FormData();
  const blob = data instanceof Blob ? data : new Blob([data]);
  formData.append('file', blob, path.split('/').pop() || 'file');
  formData.append('path', path);

  const response = await fetch(`${API_BASE}/api/projects/${projectId}/files`, {
    method: 'POST',
    body: formData,
  });

  if (!response.ok) {
    throw new Error(`Failed to upload file: ${response.statusText}`);
  }

  const result = await response.json();
  return {
    path: result.data.path,
    size: result.data.size,
    lastModified: new Date(result.data.lastModified),
  };
}

/**
 * Download a file from the project's cloud storage
 */
export async function downloadFile(
  projectId: string,
  path: string
): Promise<ArrayBuffer> {
  const response = await fetch(
    `${API_BASE}/api/projects/${projectId}/files/${encodeURIComponent(path)}`
  );

  if (!response.ok) {
    throw new Error(`Failed to download file: ${response.statusText}`);
  }

  return response.arrayBuffer();
}

/**
 * Delete a file from the project's cloud storage
 */
export async function deleteFile(
  projectId: string,
  path: string
): Promise<void> {
  const response = await fetch(
    `${API_BASE}/api/projects/${projectId}/files/${encodeURIComponent(path)}`,
    { method: 'DELETE' }
  );

  if (!response.ok) {
    throw new Error(`Failed to delete file: ${response.statusText}`);
  }
}

/**
 * List all files in the project's cloud storage
 */
export async function listFiles(projectId: string): Promise<StoredFile[]> {
  const response = await fetch(`${API_BASE}/api/projects/${projectId}/files`);

  if (!response.ok) {
    throw new Error(`Failed to list files: ${response.statusText}`);
  }

  const result = await response.json();
  return result.data.map((f: any) => ({
    path: f.path,
    size: f.size,
    lastModified: new Date(),
  }));
}

/**
 * Upload a project ZIP file
 */
export async function uploadProjectZip(
  projectId: string,
  zipData: ArrayBuffer
): Promise<StoredFile> {
  const blob = new Blob([zipData], { type: 'application/zip' });
  const formData = new FormData();
  formData.append('file', blob, 'project.zip');

  const response = await fetch(`${API_BASE}/api/projects/${projectId}/import-zip`, {
    method: 'POST',
    body: formData,
  });

  if (!response.ok) {
    throw new Error(`Failed to upload ZIP: ${response.statusText}`);
  }

  const result = await response.json();
  return {
    path: result.data.path,
    size: result.data.size,
    lastModified: new Date(result.data.lastModified),
  };
}

/**
 * Download a project ZIP file
 */
export async function downloadProjectZip(projectId: string): Promise<ArrayBuffer> {
  const response = await fetch(`${API_BASE}/api/projects/${projectId}/import-zip`);

  if (!response.ok) {
    throw new Error(`Failed to download ZIP: ${response.statusText}`);
  }

  return response.arrayBuffer();
}

/**
 * Sync a file from Godot VFS to cloud storage
 */
export async function syncFileToCloud(
  projectId: string,
  path: string,
  data: ArrayBuffer
): Promise<StoredFile> {
  return uploadFile(projectId, path, data);
}

/**
 * Sync a file from cloud storage to Godot VFS
 */
export async function syncFileFromCloud(
  projectId: string,
  path: string,
  copyToFS: (path: string, data: ArrayBuffer) => void
): Promise<void> {
  const data = await downloadFile(projectId, path);
  copyToFS(path, data);
}

/**
 * Sync all project files from cloud to VFS
 */
export async function syncAllFilesFromCloud(
  projectId: string,
  copyToFS: (path: string, data: ArrayBuffer) => void
): Promise<number> {
  const files = await listFiles(projectId);
  let synced = 0;

  for (const file of files) {
    try {
      await syncFileFromCloud(projectId, file.path, copyToFS);
      synced++;
    } catch (err) {
      console.warn(`Failed to sync file ${file.path}:`, err);
    }
  }

  return synced;
}
