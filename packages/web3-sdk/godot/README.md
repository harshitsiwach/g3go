# Godot Web3 Templates

GDScript files you can drop into any Godot 4.x project that ships with
BrowserForge. The runtime SDK is automatically injected into the exported
game's HTML shell — you just use these scripts in your scenes.

## Files

| File | Purpose |
|---|---|
| `scripts/web3.gd` | Autoload singleton — registers the `Web3.*` global API. Add it under **Project Settings → Autoload** as `Web3`. |
| `scripts/wallet_connect_button.gd` | Ready-made `Button` that handles connect/disconnect UI. |
| `scripts/token_balance_label.gd` | `Label` that auto-refreshes a wallet's balance. |
| `scripts/transaction_button.gd` | `Button` that prompts a wallet signature. |
| `scenes/web3_demo.tscn` | Sample scene wiring the nodes together. |

## Quick start

1. Copy `scripts/` into your project's `scripts/` folder.
2. Copy `scenes/web3_demo.tscn` into your project's `scenes/` folder.
3. Open `Project Settings → Autoload` and add `scripts/web3.gd` as the autoload
   `Web3`.
4. In your scripts, call:
   ```gdscript
   var res = Web3.connect("solana")
   if not res.has("error"):
       var balance = Web3.get_balance("solana")
   ```

The autoload is also safe to use in non-Web3 builds — all calls return
`{ "error": "Not running in a web build" }` so you can fall back gracefully.
