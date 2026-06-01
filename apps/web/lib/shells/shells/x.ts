import type { ShellTemplate } from '../index';
import { renderShellHtml } from '../_shared';

/**
 * X / Twitter shell. Optimised for embedding in posts: 1:1 aspect ratio, no
 * chrome, no scrollbars, plays cleanly in the inline preview.
 */
export const xShell: ShellTemplate = {
  id: 'x',
  label: 'X (Twitter)',
  description: 'Square aspect ratio, no chrome, plays in the inline X card preview.',
  render(args) {
    return renderShellHtml(args, {
      title: args.meta.title,
      extraBody: `
        <style>
          /* Force 1:1 play area so the X inline card looks right */
          #canvas {
            width: 100vw !important;
            height: 100vw !important;
            max-height: 100vh !important;
            margin: auto;
          }
        </style>
      `,
    });
  },
  extras(meta) {
    return {
      'README.md': `# ${meta.title} on X

Upload the contents of this zip to any static host. Then in your X post, the
preview will be auto-generated from the og: tags baked into index.html.

Share URL pattern:

\`\`\`
https://your-host.example/${meta.title.replace(/\s+/g, '-').toLowerCase()}/
\`\`\`
`,
    };
  },
};
