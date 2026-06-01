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
        const zipUrl = 'https://downloads.tuxfamily.org/godotengine/4.2.2/Godot_v4.2.2-stable_web_editor.zip';
        const tmpDir = join(__dirname, '..', '..', '..', '..', 'tmp');
        await fs.mkdir(tmpDir, { recursive: true });
        const tmpZipPath = join(tmpDir, 'web_editor.zip');

        // 1. Download the zip file
        const res = await fetch(zipUrl);
        if (!res.ok) throw new Error(`Failed to fetch editor zip: HTTP ${res.status}`);
        
        const fileStream = await res.arrayBuffer();
        await fs.writeFile(tmpZipPath, Buffer.from(fileStream));

        downloadStatus.progress = 60;
        downloadStatus.label = 'Extracting godot.editor.pck...';

        // 2. Extract godot.editor.pck using the OS unzip command
        const destPckPath = join(webPublicDir, 'godot.editor.pck');
        await fs.mkdir(webPublicDir, { recursive: true });

        // Unzip just the godot.editor.pck file to the target directory
        exec(`unzip -o "${tmpZipPath}" "godot.editor.pck" -d "${webPublicDir}"`, async (err, stdout, stderr) => {
          try {
            if (err) {
              // Try standard fallback where the name matches the ZIP name
              exec(`unzip -o "${tmpZipPath}" "*.pck" -d "${webPublicDir}"`, async (err2, stdout2, stderr2) => {
                try {
                  if (err2) {
                    throw new Error(`Unzip failed: ${stderr2 || err2.message}`);
                  }
                  
                  // If it extracted a file with a different name, rename it to godot.editor.pck
                  const files = await fs.readdir(webPublicDir);
                  const pckFile = files.find(f => f.endsWith('.pck') && f !== 'godot.editor.pck');
                  if (pckFile) {
                    await fs.rename(join(webPublicDir, pckFile), destPckPath);
                  }
                  await completeDownload(tmpZipPath);
                } catch (innerErr) {
                  failDownload(innerErr as Error);
                }
              });
            } else {
              await completeDownload(tmpZipPath);
            }
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
