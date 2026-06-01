import type { ShellTemplate, ShellRenderArgs } from '../index';
import { renderShellHtml } from '../_shared';

export const webShell: ShellTemplate = {
  id: 'web',
  label: 'Web (Generic)',
  description: 'Self-contained HTML+JS zip. Host on any static server (Vercel, Netlify, GitHub Pages, S3, etc.).',
  render(args) {
    return renderShellHtml(args, {
      title: args.meta.title,
      extraHead: `<meta name="description" content="${args.meta.description ?? 'Built with BrowserForge'}" />`,
    });
  },
  extras() {
    return {
      'README.md': `# ${'{TITLE}'}

This is a self-contained game built with BrowserForge.

## Hosting

Upload the contents of this zip to any static host:

\`\`\`
vercel deploy --prod
netlify deploy --prod
aws s3 sync . s3://your-bucket/
\`\`\`

The game is fully client-side — no server needed.
`,
    };
  },
  embedCode(hostedUrl) {
    if (!hostedUrl) return undefined;
    return `<iframe src="${hostedUrl}" width="640" height="480" allow="fullscreen; autoplay" allowfullscreen></iframe>`;
  },
};
