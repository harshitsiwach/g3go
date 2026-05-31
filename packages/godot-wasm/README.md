# Godot Wasm assets directory
# Download these files from https://github.com/dwalter/godotwebgpu/releases
# Place them in this directory before starting the app

Required files:
- godot.editor.js
- godot.editor.wasm
- godot.editor.pck

Download commands (when releases are available):
```bash
# Create the directory
mkdir -p packages/godot-wasm/public

# Download the files (replace with actual release URLs)
wget -P packages/godot-wasm/public https://github.com/dwalter/godotwebgpu/releases/download/latest/godot.editor.js
wget -P packages/godot-wasm/public https://github.com/dwalter/godotwebgpu/releases/download/latest/godot.editor.wasm
wget -P packages/godot-wasm/public https://github.com/dwalter/godotwebgpu/releases/download/latest/godot.editor.pck
```

For development, you can use placeholder files or mock the engine loading.
