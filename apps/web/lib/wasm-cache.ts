/**
 * IndexedDB-backed cache for the Godot Wasm assets.
 *
 * Both the editor and the export runtimes load the same kind of artifacts
 * (`.js`, `.wasm`, `.html`, audio worklets). Caching them locally means the
 * editor opens in ~500ms on the second visit and the export step starts
 * without re-downloading the ~50 MiB export template.
 *
 * Storage layout:
 *   db:    "browserforge-wasm"
 *   store: "files"   (key: url, value: { blob, size, fetchedAt, etag? })
 *   store: "meta"    (key: "etag:<url>", value: server-reported ETag)
 */
const DB_NAME = 'browserforge-wasm';
const DB_VERSION = 1;
const FILES_STORE = 'files';
const META_STORE = 'meta';
const MAX_AGE_MS = 30 * 24 * 60 * 60 * 1000;

interface CachedFile {
  url: string;
  blob: Blob;
  size: number;
  fetchedAt: number;
  etag?: string;
}

let dbPromise: Promise<IDBDatabase> | null = null;

function openDb(): Promise<IDBDatabase> {
  if (dbPromise) return dbPromise;
  dbPromise = new Promise((resolve, reject) => {
    const req = indexedDB.open(DB_NAME, DB_VERSION);
    req.onupgradeneeded = () => {
      const db = req.result;
      if (!db.objectStoreNames.contains(FILES_STORE)) {
        db.createObjectStore(FILES_STORE, { keyPath: 'url' });
      }
      if (!db.objectStoreNames.contains(META_STORE)) {
        db.createObjectStore(META_STORE);
      }
    };
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error);
  });
  return dbPromise;
}

function runTx<T>(
  store: string,
  mode: IDBTransactionMode,
  fn: (s: IDBObjectStore) => IDBRequest<T>,
): Promise<T> {
  return openDb().then(
    (db) =>
      new Promise<T>((resolve, reject) => {
        const tx = db.transaction(store, mode);
        const s = tx.objectStore(store);
        const req = fn(s);
        req.onsuccess = () => resolve(req.result as T);
        req.onerror = () => reject(req.error);
      }),
  );
}

export async function getCachedFile(url: string): Promise<CachedFile | null> {
  try {
    const row = await runTx<CachedFile | undefined>(FILES_STORE, 'readonly', (s) =>
      s.get(url) as IDBRequest<CachedFile | undefined>,
    );
    if (!row) return null;
    if (Date.now() - row.fetchedAt > MAX_AGE_MS) {
      // expired — let the caller re-download
      await runTx(FILES_STORE, 'readwrite', (s) => s.delete(url));
      return null;
    }
    return row;
  } catch {
    return null;
  }
}

export async function putCachedFile(
  url: string,
  blob: Blob,
  etag?: string,
): Promise<void> {
  const row: CachedFile = {
    url,
    blob,
    size: blob.size,
    fetchedAt: Date.now(),
    etag,
  };
  await runTx(FILES_STORE, 'readwrite', (s) => s.put(row));
}

/**
 * Fetches a URL using the IndexedDB cache. The callback receives a Blob that's
 * safe to use with `URL.createObjectURL()` or `Response(blob)`.
 */
export async function fetchCached(
  url: string,
  init?: { cache?: RequestCache; signal?: AbortSignal; skipCache?: boolean },
): Promise<Blob> {
  if (!init?.skipCache) {
    const hit = await getCachedFile(url);
    if (hit) return hit.blob;
  }

  const res = await fetch(url, {
    cache: init?.cache ?? 'force-cache',
    signal: init?.signal,
  });
  if (!res.ok) throw new Error(`fetch ${url}: HTTP ${res.status}`);
  const blob = await res.blob();
  const etag = res.headers.get('etag') ?? undefined;
  // Don't await the cache write — we already have the blob
  void putCachedFile(url, blob, etag);
  return blob;
}

export async function getTotalCacheSize(): Promise<number> {
  try {
    const db = await openDb();
    return new Promise<number>((resolve, reject) => {
      const tx = db.transaction(FILES_STORE, 'readonly');
      const s = tx.objectStore(FILES_STORE);
      const req = s.getAll();
      req.onsuccess = () => {
        const files = (req.result as CachedFile[]) ?? [];
        const total = files.reduce((sum, f) => sum + f.size, 0);
        resolve(total);
      };
      req.onerror = () => reject(req.error);
    });
  } catch {
    return 0;
  }
}

export async function clearCache(): Promise<void> {
  await runTx(FILES_STORE, 'readwrite', (s) => s.clear());
  await runTx(META_STORE, 'readwrite', (s) => s.clear());
}
