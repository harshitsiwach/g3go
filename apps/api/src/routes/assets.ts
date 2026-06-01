import { exec } from 'child_process';
import { promises as fs } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import type { FastifyInstance } from 'fastify';

const __dirname = dirname(fileURLToPath(import.meta.url));
const webPublicDir = join(__dirname, '..', '..', '..', 'web', 'public', 'godot-wasm');

let downloadStatus = {
  active: false,
  progress: 0,
  label: '',
  error: null as string | null,
};

export async function assetRoutes(fastify: FastifyInstance) {
  fastify.get('/download-status', async () => {
    return downloadStatus;
  });

  fastify.post('/download-wasm', async (request, reply) => {
    if (downloadStatus.active) {
      return { success: true, message: 'Download already in progress', status: downloadStatus };
    }

    downloadStatus.active = true;
    downloadStatus.progress = 10;
    downloadStatus.label = 'Downloading Godot Editor package (~30MB)...';
    downloadStatus.error = null;

    // Start download in the background
    void (async () => {
      try {
        const zipUrl = 'https://github.com/godotengine/godot-builds/releases/download/4.2.2-stable/Godot_v4.2.2-stable_web_editor.zip';
        const tmpDir = join(__dirname, '..', '..', '..', '..', 'tmp');
        await fs.mkdir(tmpDir, { recursive: true });
        const tmpZipPath = join(tmpDir, 'web_editor.zip');

        // 1. Download the zip file
        const res = await fetch(zipUrl);
        if (!res.ok) throw new Error(`Failed to fetch editor zip: HTTP ${res.status}`);
        
        const fileStream = await res.arrayBuffer();
        await fs.writeFile(tmpZipPath, Buffer.from(fileStream));

        downloadStatus.progress = 60;
        downloadStatus.label = 'Extracting Godot Editor assets...';

        // 2. Extract all files from ZIP using the OS unzip command
        await fs.mkdir(webPublicDir, { recursive: true });

        exec(`unzip -o "${tmpZipPath}" -d "${webPublicDir}"`, async (err, stdout, stderr) => {
          try {
            if (err) {
              throw new Error(`Unzip failed: ${stderr || err.message}`);
            }
            await completeDownload(tmpZipPath);
          } catch (innerErr) {
            failDownload(innerErr as Error);
          }
        });

      } catch (err) {
        failDownload(err as Error);
      }
    })();

    return { success: true, message: 'Download started', status: downloadStatus };
  });
}

async function completeDownload(tmpZipPath: string) {
  downloadStatus.progress = 100;
  downloadStatus.label = 'Asset download and extraction complete!';
  downloadStatus.active = false;
  // Clean up
  await fs.unlink(tmpZipPath).catch(() => {});
}

function failDownload(err: Error) {
  console.error('Download failed:', err);
  downloadStatus.error = err.message || 'Unknown error occurred during download';
  downloadStatus.active = false;
  downloadStatus.progress = 0;
  downloadStatus.label = '';
}
