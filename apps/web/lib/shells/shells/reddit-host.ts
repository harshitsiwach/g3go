import type { ShellTemplate } from '../index';
import { renderShellHtml } from '../_shared';

/**
 * Reddit hosted (non-Devvit) shell. For embedding a game in a normal Reddit
 * post via a third-party host (e.g. GitHub Pages, Vercel). Includes oEmbed
 * discovery + Reddit-friendly meta tags.
 */
export const redditHostShell: ShellTemplate = {
  id: 'reddit-host',
  label: 'Reddit (Hosted)',
  description: 'Embed a game in a normal Reddit post via a third-party static host.',
  render(args) {
    return renderShellHtml(args, {
      title: args.meta.title,
      extraHead: `
        <link rel="alternate" type="application/json+oembed" href="${args.meta.hostedUrl ?? ''}oembed.json" title="${args.meta.title}" />
      `,
    });
  },
  extras(meta) {
    const hostedUrl = meta.hostedUrl ?? '';
    return {
      'oembed.json': JSON.stringify(
        {
          version: '1.0',
          type: 'rich',
          provider_name: 'BrowserForge',
          provider_url: 'https://browserforge.dev',
          title: meta.title,
          author_name: meta.author ?? 'Built with BrowserForge',
          html: `<iframe src="${hostedUrl}" width="640" height="480" allowfullscreen></iframe>`,
          width: 640,
          height: 480,
        },
        null,
        2,
      ),
      'README.md': `# ${meta.title} on Reddit

## Hosting

Upload this zip to any static host. Reddit will auto-detect the oEmbed
endpoint and render the game inline in posts.

## Posting

Use Reddit's "link" or "video" post type and paste the hosted URL.
`,
    };
  },
};
