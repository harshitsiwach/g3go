import Link from 'next/link';

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      <div className="container mx-auto px-4 py-16">
        <header className="text-center mb-16">
          <h1 className="text-5xl font-bold text-white mb-4">
            Browser<span className="text-brand-500">Forge</span>
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Build games in your browser. No installs required. Powered by Godot WebGPU.
          </p>
        </header>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
          <Link
            href="/dashboard"
            className="px-8 py-4 bg-brand-600 hover:bg-brand-700 text-white font-semibold rounded-lg transition-colors text-center"
          >
            Open Dashboard
          </Link>
          <Link
            href="/editor/new"
            className="px-8 py-4 bg-gray-700 hover:bg-gray-600 text-white font-semibold rounded-lg transition-colors text-center"
          >
            Start Creating
          </Link>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700">
            <div className="w-12 h-12 bg-brand-600/20 rounded-lg flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-brand-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 className="text-white font-semibold mb-2">Browser-Based Editor</h3>
            <p className="text-gray-400 text-sm">
              Full Godot editor running via WebAssembly. No downloads, no installs.
            </p>
          </div>

          <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700">
            <div className="w-12 h-12 bg-brand-600/20 rounded-lg flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-brand-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 className="text-white font-semibold mb-2">WebGPU Powered</h3>
            <p className="text-gray-400 text-sm">
              Next-gen graphics with WebGPU. WebGL 2.0 fallback included.
            </p>
          </div>

          <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700">
            <div className="w-12 h-12 bg-brand-600/20 rounded-lg flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-brand-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
            </div>
            <h3 className="text-white font-semibold mb-2">One-Click Export</h3>
            <p className="text-gray-400 text-sm">
              Export to WebGL, WebGPU, Windows, Mac, or Linux directly from the browser.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
