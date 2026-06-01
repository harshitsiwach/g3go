import type { ShellTemplate } from '../index';
import { renderShellHtml } from '../_shared';

/**
 * Reddit Devvit shell. The user publishes this as a Devvit Web View app via
 * the Reddit developer portal at developers.reddit.com.
 */
export const redditDevvitShell: ShellTemplate = {
  id: 'reddit-devvit',
  label: 'Reddit (Devvit)',
  description: 'Packaged for Reddit Devvit Web View. Submit via developers.reddit.com.',
  render(args) {
    return renderShellHtml(args, {
      title: args.meta.title,
      extraHead: `
        <script>
          // Devvit provides a global 'reddit' object for posting to the feed,
          // getting the current user, etc. See https://developers.reddit.com/docs/devvit
          window.devvit = {
            postCreate: function (data) { return window.reddit && window.reddit.postData ? window.reddit.postData : null; },
            getUser: function () { return window.reddit && window.reddit.getCurrentUser ? window.reddit.getCurrentUser() : null; },
            setPostData: function (data) { if (window.reddit) window.reddit.postData = data; },
          };
        </script>
      `,
    });
  },
  extras(meta) {
    return {
      'devvit.json': JSON.stringify(
        {
          name: meta.title,
          description: meta.description ?? 'A game built with BrowserForge',
          entry: 'index.html',
          permissions: { reddit: { scope: ['identity'] } },
        },
        null,
        2,
      ),
      'README.md': `# ${meta.title} on Reddit Devvit

## Publishing

1. Install the Devvit CLI: \`npm i -g @devvit/cli\`
2. Run \`devvit login\` and \`devvit new\` in this directory
3. Copy the contents of this zip into the new project
4. \`devvit upload\` to publish to your test subreddit
5. \`devvit publish\` to roll out to your app

More info: https://developers.reddit.com/docs/devvit
`,
    };
  },
};
