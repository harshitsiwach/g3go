import type { ShellTemplate } from '../index';
import { renderShellHtml } from '../_shared';

/**
 * Iframe-friendly shell. Renders with a fixed-aspect wrapper so the game
 * embeds cleanly in any blog / docs / CMS.
 */
export const iframeShell: ShellTemplate = {
  id: 'iframe',
  label: 'Iframe-Embeddable',
  description: 'Fixed 16:9 aspect ratio wrapper. Drop into any blog, docs, or CMS as an iframe.',
  render(args) {
    return renderShellHtml(args, {
      title: args.meta.title,
      extraBody: `
        <style>
          body { background: #000; }
          #canvas {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            width: 100% !important;
            height: 100% !important;
            max-width: 177.78vh; /* 16:9 */
            max-height: 56.25vw; /* 16:9 */
            object-fit: contain;
          }
        </style>
      `,
    });
  },
  extras() {
    return {
      'README.md': `# Iframe-Embeddable Build

Drop this anywhere as an iframe:

\`\`\`html
<iframe src="https://your-host/" width="640" height="360" allowfullscreen></iframe>
\`\`\`
`,
    };
  },
  embedCode(hostedUrl) {
    if (!hostedUrl) return undefined;
    return `<iframe src="${hostedUrl}" width="640" height="360" allow="fullscreen; autoplay" allowfullscreen style="border:0"></iframe>`;
  },
};
