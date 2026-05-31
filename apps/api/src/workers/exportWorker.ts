import { Worker, Job } from 'bullmq';
import Docker from 'dockerode';
import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'fs';
import { join } from 'path';
import { execSync } from 'child_process';

interface ExportJobData {
  projectId: string;
  format: 'webgl' | 'webgpu' | 'windows' | 'macos' | 'linux';
  projectFiles: Record<string, Buffer>;
}

const docker = new Docker({ socketPath: process.env.DOCKER_SOCKET || '/var/run/docker.sock' });

const connection = {
  host: process.env.REDIS_HOST || 'localhost',
  port: parseInt(process.env.REDIS_PORT || '6379', 10),
};

const exportWorker = new Worker(
  'export-jobs',
  async (job: Job<ExportJobData>) => {
    const { projectId, format, projectFiles } = job.data;

    console.log(`Starting export for project ${projectId} as ${format}`);

    try {
      // Update job progress
      await job.updateProgress(10);

      // Create temporary directory for the project
      const tmpDir = join('/tmp', `export-${projectId}-${Date.now()}`);
      mkdirSync(tmpDir, { recursive: true });

      // Write project files
      for (const [path, content] of Object.entries(projectFiles)) {
        const fullPath = join(tmpDir, path);
        const dir = fullPath.substring(0, fullPath.lastIndexOf('/'));
        mkdirSync(dir, { recursive: true });
        writeFileSync(fullPath, content);
      }

      await job.updateProgress(30);

      // Determine export command based on format
      let exportCommand: string;
      let outputPath: string;

      switch (format) {
        case 'webgl':
        case 'webgpu':
          exportCommand = `godot --headless --export-release "Web" /output/game.zip`;
          outputPath = '/output/game.zip';
          break;
        case 'windows':
          exportCommand = `godot --headless --export-release "Windows Desktop" /output/game.exe`;
          outputPath = '/output/game.exe';
          break;
        case 'macos':
          exportCommand = `godot --headless --export-release "macOS" /output/game.dmg`;
          outputPath = '/output/game.dmg';
          break;
        case 'linux':
          exportCommand = `godot --headless --export-release "Linux" /output/game.x86_64`;
          outputPath = '/output/game.x86_64';
          break;
        default:
          throw new Error(`Unsupported export format: ${format}`);
      }

      await job.updateProgress(50);

      // Run Godot export in Docker container
      const container = await docker.createContainer({
        Image: 'browserforge-export-worker:latest',
        Cmd: ['/bin/bash', '-c', `${exportCommand} && cp ${outputPath} /output/`],
        HostConfig: {
          Binds: [
            `${tmpDir}:/tmp/project:ro`,
            `/tmp/export-output-${projectId}:/output`,
          ],
          Memory: 4 * 1024 * 1024 * 1024, // 4GB memory limit
        },
        WorkingDir: '/tmp/project',
      });

      await container.start();
      await job.updateProgress(70);

      // Wait for container to finish
      const result = await container.wait();
      if (result.StatusCode !== 0) {
        const logs = await container.logs({ stdout: true, stderr: true });
        throw new Error(`Export failed: ${logs.toString()}`);
      }

      await job.updateProgress(90);

      // In a real implementation, upload the exported file to S3/Supabase Storage
      // and return the download URL
      const downloadUrl = `https://storage.example.com/exports/${projectId}/game.zip`;

      await job.updateProgress(100);

      // Cleanup temporary files
      // In production, this would be handled by a cleanup job

      return { downloadUrl, outputPath };
    } catch (error) {
      console.error('Export failed:', error);
      throw error;
    }
  },
  {
    connection,
    concurrency: parseInt(process.env.MAX_EXPORT_CONCURRENCY || '3', 10),
    limiter: {
      max: 10,
      duration: 60000, // Max 10 jobs per minute
    },
  }
);

// Event handlers
exportWorker.on('completed', (job) => {
  console.log(`Export job ${job.id} completed for project ${job.data.projectId}`);
});

exportWorker.on('failed', (job, err) => {
  console.error(`Export job ${job?.id} failed for project ${job?.data.projectId}:`, err);
});

exportWorker.on('error', (err) => {
  console.error('Export worker error:', err);
});

console.log('Export worker started and waiting for jobs...');

export default exportWorker;
