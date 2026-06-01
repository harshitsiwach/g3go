/**
 * Single source of truth for the Godot Wasm Engine's JS interface.
 * The runtime injects `window.Engine` and the methods below are called from
 * the editor + the export runtime in the same way.
 */
export interface GodotEngineInstance {
  init(executable: string): Promise<void>;
  start(options: { args: string[]; persistentDrops?: boolean }): Promise<void>;
  preloadFile(url: string, path?: string): Promise<void>;
  copyToFS(path: string, data: ArrayBuffer | Uint8Array): void;
  requestQuit(): void;
  /** Optional. Some Godot builds expose this for reading files from the VFS. */
  readFileFromFS?(path: string): Uint8Array | null;
}

declare global {
  interface Window {
    Engine: new (config: Record<string, unknown>) => GodotEngineInstance;
    EngineLoader?: { load(basePath: string): Promise<void> };
  }
}

export {};
