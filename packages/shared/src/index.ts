export interface User {
  id: string;
  email: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Project {
  id: string;
  name: string;
  description: string;
  userId: string;
  thumbnailUrl?: string;
  createdAt: Date;
  updatedAt: Date;
  lastExportedAt?: Date;
}

export interface ProjectFile {
  path: string;
  content: ArrayBuffer | string;
  size: number;
  lastModified: Date;
}

export interface ExportJob {
  id: string;
  projectId: string;
  status: ExportStatus;
  format: ExportFormat;
  outputUrl?: string;
  error?: string;
  startedAt?: Date;
  completedAt?: Date;
  createdAt: Date;
}

export type ExportStatus = 'pending' | 'processing' | 'completed' | 'failed';

export type ExportFormat = 'webgl' | 'webgpu' | 'windows' | 'macos' | 'linux';

export interface ExportRequest {
  projectId: string;
  format: ExportFormat;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}

export interface PaginatedResponse<T> extends ApiResponse<T[]> {
  total: number;
  page: number;
  pageSize: number;
}
