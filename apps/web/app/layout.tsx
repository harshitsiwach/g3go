import type { Metadata } from 'next';
import './globals.css';
import { AuthProvider } from '@/lib/auth-context';
import { RouteGuard } from '@/lib/route-guard';

export const metadata: Metadata = {
  title: 'BrowserForge — Build Web3 games in your browser',
  description: 'A browser-based Godot engine for building WebGL/WebGPU games with on-chain features. No installs required.',
};

// Runs before React hydrates. Strips attributes that browser extensions
// (Bitwarden, password managers, accessibility tools) inject onto DOM nodes
// after SSR. Without this, React's hydration check fires a warning for every
// node an extension touches. We only strip the prefixes we know about — not a
// blanket `getAttributeNames().forEach(remove)` — to avoid mutating real
// React state.
const stripExtensionAttrs = `
(function(){
  if (typeof document === 'undefined') return;
  var prefixes = ['bis_', '__processed_', 'data-extension-', 'data-lastpass-', 'data-gramm', 'data-1p-'];
  function clean(root) {
    if (!root || !root.querySelectorAll) return;
    var nodes = root.querySelectorAll('*');
    for (var i = 0; i < nodes.length; i++) {
      var el = nodes[i];
      var attrs = el.attributes;
      for (var j = attrs.length - 1; j >= 0; j--) {
        var name = attrs[j].name;
        if (prefixes.some(function (p) { return name.indexOf(p) === 0; })) {
          el.removeAttribute(name);
        }
      }
    }
  }
  // Run on every parse — the script is small enough that this is cheap.
  new MutationObserver(function (mutations) {
    for (var k = 0; k < mutations.length; k++) {
      var m = mutations[k];
      for (var n = 0; n < m.addedNodes.length; n++) {
        var node = m.addedNodes[n];
        if (node.nodeType === 1) clean(node);
      }
      if (m.type === 'attributes' && m.target) {
        var name = m.attributeName || '';
        if (prefixes.some(function (p) { return name.indexOf(p) === 0; })) {
          m.target.removeAttribute(name);
        }
      }
    }
  }).observe(document.documentElement, { childList: true, subtree: true, attributes: true });
})();
`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: stripExtensionAttrs }} />
      </head>
      <body suppressHydrationWarning>
        <AuthProvider>
          <RouteGuard>{children}</RouteGuard>
        </AuthProvider>
      </body>
    </html>
  );
}
