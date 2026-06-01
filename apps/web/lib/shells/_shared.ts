/**
 * Shared bits for shell templates — common <head> chunk, theme variables,
 * engine bootstrap. Each shell is just a string template that uses these
 * helpers to keep things DRY.
 */
import type { ShellTemplate, ShellRenderArgs } from './index';

const THEME_CSS_VARS = (theme: Record<string, string> = {}): string => {
  const defaults: Record<string, string> = {
    '--bg': '#0f172a',
    '--fg': '#e2e8f0',
    '--accent': '#6366f1',
    '--muted': '#64748b',
    ...theme,
  };
  return Object.entries(defaults)
    .map(([k, v]) => `${k}: ${v};`)
    .join(' ');
};

const ENGINE_BOOTSTRAP = `
  <script src="./web3.js"></script>
  <script>
    // Apply per-project web3 config before the engine boots so the game
    // can read window.Web3.config the moment JavaScriptBridge is ready.
    window.__BF_WEB3_CONFIG__ = __BF_WEB3_CONFIG__;
  </script>
  <script src="./godot.js"></script>
  <script>
    (function () {
      var engine = new Engine({
        executable: 'godot',
        mainPack: 'game.pck',
        canvas: document.getElementById('canvas'),
        canvasResizePolicy: 2,
        focusCanvas: true,
        experimentalVK: false,
        onPrint: function () { console.log.apply(console, arguments); },
        onPrintError: function () { console.error.apply(console, arguments); },
        onProgress: function (loaded, total) {
          var pct = total > 0 ? Math.round((loaded / total) * 100) : 0;
          var bar = document.getElementById('bf-progress-bar');
          var label = document.getElementById('bf-progress-label');
          if (bar) bar.style.width = pct + '%';
          if (label) label.textContent = 'Loading ' + pct + '%';
        },
      });
      engine.init('godot').then(function () {
        var loader = document.getElementById('bf-loader');
        if (loader) loader.style.display = 'none';
        engine.start({ args: [], persistentDrops: true });
      }).catch(function (err) {
        var label = document.getElementById('bf-progress-label');
        if (label) label.textContent = 'Failed to load: ' + err;
      });
    })();
  </script>
`;

const PROGRESS_HTML = `
  <div id="bf-loader" class="bf-loader">
    <div class="bf-loader-card">
      <div class="bf-loader-title">__TITLE__</div>
      <div class="bf-loader-bar">
        <div id="bf-progress-bar" class="bf-loader-bar-fill"></div>
      </div>
      <div id="bf-progress-label" class="bf-loader-label">Loading 0%</div>
      <div class="bf-loader-brand">Built with BrowserForge</div>
    </div>
  </div>
`;

const SHELL_CSS = `
  :root { __THEME__ }
  * { box-sizing: border-box; }
  html, body {
    margin: 0;
    padding: 0;
    height: 100%;
    background: var(--bg);
    color: var(--fg);
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', system-ui, sans-serif;
    overflow: hidden;
  }
  #canvas {
    display: block;
    width: 100vw;
    height: 100vh;
    touch-action: none;
  }
  .bf-loader {
    position: fixed; inset: 0;
    display: flex; align-items: center; justify-content: center;
    background: var(--bg);
    z-index: 9999;
  }
  .bf-loader-card {
    width: min(360px, 90vw);
    text-align: center;
    padding: 24px;
  }
  .bf-loader-title {
    font-size: 18px;
    font-weight: 600;
    margin-bottom: 16px;
  }
  .bf-loader-bar {
    width: 100%;
    height: 8px;
    background: rgba(255, 255, 255, 0.08);
    border-radius: 4px;
    overflow: hidden;
  }
  .bf-loader-bar-fill {
    height: 100%;
    width: 0%;
    background: var(--accent);
    transition: width 0.2s ease-out;
  }
  .bf-loader-label {
    font-size: 13px;
    color: var(--muted);
    margin-top: 8px;
  }
  .bf-loader-brand {
    font-size: 11px;
    color: var(--muted);
    margin-top: 24px;
    opacity: 0.6;
  }
`;

export function renderShellHtml(args: ShellRenderArgs, opts: {
  title: string;
  extraHead?: string;
  extraBody?: string;
}): string {
  const { format, meta, theme } = args;
  const ogTags = `
    <meta property="og:title" content="${escapeAttr(meta.title)}" />
    <meta property="og:description" content="${escapeAttr(meta.description ?? 'A game built with BrowserForge')}" />
    <meta property="og:type" content="game" />
    ${meta.hostedUrl ? `<meta property="og:url" content="${escapeAttr(meta.hostedUrl)}" />` : ''}
    <meta name="twitter:card" content="player" />
    <meta name="theme-color" content="${escapeAttr(theme?.['--accent'] ?? '#6366f1')}" />
  `;
  const walletMeta = meta.walletAddress
    ? `<meta name="bf:wallet" content="${escapeAttr(meta.walletAddress)}" />`
    : '';

  // Per-project web3 config. Always emit an object even if the project doesn't
  // use web3 — the SDK reads chains:[] and the game can detect "disabled".
  const web3Config = (args as any).web3Config ?? { enabled: false, chains: [] };
  const bootstrap = ENGINE_BOOTSTRAP.replace(
    '__BF_WEB3_CONFIG__',
    JSON.stringify(web3Config),
  );

  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
  <title>${escapeAttr(meta.title)}</title>
  ${ogTags}
  ${walletMeta}
  <style>${SHELL_CSS.replace('__THEME__', THEME_CSS_VARS(theme))}</style>
  ${opts.extraHead ?? ''}
</head>
<body>
  <canvas id="canvas" touch-action="none"></canvas>
  ${PROGRESS_HTML.replace('__TITLE__', escapeAttr(meta.title))}
  ${opts.extraBody ?? ''}
  ${bootstrap}
</body>
</html>`;
}

function escapeAttr(s: string): string {
  return s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');
}

export const SHARED_HELPERS = {
  renderShellHtml,
  THEME_CSS_VARS,
  ENGINE_BOOTSTRAP,
  PROGRESS_HTML,
  SHELL_CSS,
};

export type { ShellTemplate, ShellRenderArgs };
