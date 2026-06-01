import type { ShellTemplate } from '../index';
import { renderShellHtml } from '../_shared';

/**
 * Telegram Mini App shell. Adds the Telegram Web App SDK, fills the viewport
 * to Telegram's reported size, and exposes a `MainButton` + theme colour
 * sync. The user must register the app with @BotFather to publish.
 */
export const telegramShell: ShellTemplate = {
  id: 'telegram',
  label: 'Telegram Mini App',
  description: 'Optimised for Telegram\'s in-app browser. Adds a MainButton and syncs Telegram\'s theme colors.',
  render(args) {
    return renderShellHtml(args, {
      title: args.meta.title,
      extraHead: `<script src="https://telegram.org/js/telegram-web-app.js"></script>`,
      extraBody: `
        <script>
          (function () {
            if (!window.Telegram || !window.Telegram.WebApp) return;
            var tg = window.Telegram.WebApp;
            tg.ready();
            tg.expand();

            function syncTheme() {
              var root = document.documentElement;
              if (tg.themeParams.bg_color) root.style.setProperty('--bg', tg.themeParams.bg_color);
              if (tg.themeParams.text_color) root.style.setProperty('--fg', tg.themeParams.text_color);
              if (tg.themeParams.button_color) root.style.setProperty('--accent', tg.themeParams.button_color);
              if (tg.themeParams.hint_color) root.style.setProperty('--muted', tg.themeParams.hint_color);
            }
            syncTheme();
            tg.onEvent('themeChanged', syncTheme);

            // Optional: a MainButton that the game can call via window.bf.tg
            window.bf = window.bf || {};
            window.bf.tg = {
              showMainButton: function (text) { tg.MainButton.setText(text); tg.MainButton.show(); },
              hideMainButton: function () { tg.MainButton.hide(); },
              onMainButtonClick: function (cb) { tg.MainButton.onClick(cb); },
              sendData: function (data) { tg.sendData(JSON.stringify(data)); },
              getUser: function () { return tg.initDataUnsafe && tg.initDataUnsafe.user; },
            };
          })();
        </script>
      `,
    });
  },
  extras(meta) {
    return {
      'README.md': `# ${meta.title} — Telegram Mini App

## Publishing

1. Create a bot with [@BotFather](https://t.me/BotFather) on Telegram
2. Use \`/newapp\` to register a Mini App and upload this zip
3. Set the Mini App URL to wherever you host the contents

The game auto-detects Telegram's WebApp SDK and uses native UI elements.
`,
    };
  },
};
