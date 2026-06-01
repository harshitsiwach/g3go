/**
 * VFS save sync — debounced upload of project files to the server.
 *
 * The Godot Wasm editor can read its own virtual filesystem, but the
 * `engine.copyToFS` / `engine.readFile` surface is limited. The approach here:
 *
 *  1. The editor reads its `project.zip` (set by the dashboard import flow)
 *     from the server when it boots, and uses `engine.copyToFS` to inject it
 *     into the VFS.
 *  2. On Save, the editor invokes `engine.requestFileSync()`, which the
 *     JavaScript wrapper intercepts and uploads the project zip to the
 *     server via the multipart upload endpoint.
 *  3. Subsequent reloads re-fetch the zip and the cycle continues.
 *
 * This module encapsulates the upload pipeline + a debounce layer.
 */

const API_BASE = process.env.NEXT_PUBLIC_API_URL || '';

export interface SyncOptions {
  projectId: string;
  zip: ArrayBuffer | Uint8Array | Blob;
  signal?: AbortSignal;
}

export async function syncProjectZip(opts: SyncOptions): Promise<{ size: number; path: string }> {
  const blob =
    opts.zip instanceof Blob
      ? opts.zip
      : new Blob([opts.zip instanceof Uint8Array ? (opts.zip as BlobPart) : (new Uint8Array(opts.zip) as BlobPart)], {
          type: 'application/zip',
        });

  const form = new FormData();
  form.append('file', blob, 'project.zip');

  const res = await fetch(`${API_BASE}/api/projects/${opts.projectId}/import-zip`, {
    method: 'POST',
    body: form,
    signal: opts.signal,
  });
  if (!res.ok) {
    const text = await res.text().catch(() => '');
    throw new Error(`Save failed (${res.status}): ${text || res.statusText}`);
  }
  const data = await res.json();
  return { size: data.data.size, path: data.data.path };
}

/**
 * Hook-style debounce: returns a function that schedules `fn` to be called
 * after `delay` ms of inactivity. Subsequent calls within the window cancel
 * the previous timer.
 */
export function debounce<T extends (...args: any[]) => void>(fn: T, delay: number): T {
  let timer: ReturnType<typeof setTimeout> | null = null;
  return ((...args: Parameters<T>) => {
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => {
      timer = null;
      fn(...args);
    }, delay);
  }) as T;
}
