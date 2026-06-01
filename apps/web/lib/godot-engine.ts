/**
 * Typed wrapper around the Godot Engine JavaScript API
 * Provides a clean interface for interacting with the Godot Wasm editor
 */

import type { GodotEngineInstance } from './godot-engine-types';

export type { GodotEngineInstance } from './godot-engine-types';

export interface GodotEngineConfig {
  executable: string;
  canvas?: HTMLCanvasElement | null;
  experimentalVK?: boolean;
  focusCanvas?: boolean;
  canvasResizePolicy?: number;
  persistentDrops?: boolean;
  onProgress?: (loaded: number, total: number) => void;
  onPrintError?: (...args: unknown[]) => void;
  onExit?: (exitCode: number) => void;
}

export class GodotEngine {
  private engine: GodotEngineInstance | null = null;
  private config: GodotEngineConfig;
  private canvas: HTMLCanvasElement | null = null;
  private initialized = false;

  constructor(config: GodotEngineConfig) {
    this.config = {
      experimentalVK: false,
      focusCanvas: true,
      canvasResizePolicy: 0,
      persistentDrops: true,
      ...config,
    };
    this.canvas = config.canvas || null;
  }

  /**
   * Check if Godot Engine is available in the browser
   */
  static isAvailable(): boolean {
    return typeof window !== 'undefined' && 'Engine' in window;
  }

  /**
   * Check if required browser features are supported
   */
  static getMissingFeatures(): string[] {
    const features: string[] = [];

    if (!window.SharedArrayBuffer) {
      features.push('SharedArrayBuffer (requires COOP/COEP headers)');
    }

    if (!window.crossOriginIsolated) {
      features.push('Cross-Origin Isolation (requires COOP/COEP headers)');
    }

    const canvas = document.createElement('canvas');
    const gl2 = canvas.getContext('webgl2');
    if (!gl2) {
      features.push('WebGL 2.0');
    }

    return features;
  }

  /**
   * Initialize the Godot engine
   */
  async init(): Promise<void> {
    if (this.initialized) {
      return;
    }

    if (!GodotEngine.isAvailable()) {
      throw new Error('Godot Engine is not available. Ensure godot.editor.js is loaded.');
    }

    const missingFeatures = GodotEngine.getMissingFeatures();
    if (missingFeatures.length > 0) {
      console.warn('Missing features:', missingFeatures);
    }

    // Create engine instance
    this.engine = new window.Engine({
      executable: this.config.executable,
      canvas: this.canvas,
      experimentalVK: this.config.experimentalVK,
      focusCanvas: this.config.focusCanvas,
      canvasResizePolicy: this.config.canvasResizePolicy,
      persistentDrops: this.config.persistentDrops,
      onProgress: this.config.onProgress,
      onPrintError: this.config.onPrintError,
      onExit: this.config.onExit,
    });

    // Initialize (loads wasm)
    await this.engine.init(this.config.executable);

    this.initialized = true;
  }

  /**
   * Start the Godot editor
   */
  async startEditor(): Promise<void> {
    if (!this.engine) {
      throw new Error('Engine not initialized. Call init() first.');
    }

    await this.engine.start({
      args: ['--editor', '--path', '/home/web_user'],
      persistentDrops: true,
    });
  }

  /**
   * Start the Godot project manager
   */
  async startProjectManager(importZip?: ArrayBuffer): Promise<void> {
    if (!this.engine) {
      throw new Error('Engine not initialized. Call init() first.');
    }

    // If importing a ZIP, inject it into the VFS
    if (importZip) {
      this.engine.copyToFS('/tmp/preload.zip', new Uint8Array(importZip));
    }

    await this.engine.start({
      args: ['--project-manager', '--single-window'],
      persistentDrops: true,
    });
  }

  /**
   * Copy files to the Godot virtual filesystem
   */
  copyToFS(path: string, data: ArrayBuffer | Uint8Array): void {
    if (!this.engine) {
      throw new Error('Engine not initialized. Call init() first.');
    }

    this.engine.copyToFS(path, data);
  }

  /**
   * Preload a file from URL
   */
  async preloadFile(url: string, path?: string): Promise<void> {
    if (!this.engine) {
      throw new Error('Engine not initialized. Call init() first.');
    }

    await this.engine.preloadFile(url, path);
  }

  /**
   * Request graceful shutdown
   */
  requestQuit(): void {
    if (this.engine) {
      try {
        this.engine.requestQuit();
      } catch {
        // Ignore cleanup errors
      }
    }
  }

  /**
   * Check if engine is initialized
   */
  isInitialized(): boolean {
    return this.initialized;
  }

  /**
   * Get the underlying engine instance
   */
  getEngine(): GodotEngineInstance | null {
    return this.engine;
  }
}
