extends Button
## TransactionButton — prompts a wallet signature for the configured message.
## Use for "Sign in to play", NFT mint auth, leaderboard submissions, etc.

@export var chain: String = "solana" ## "solana" | "base" | "polygon"
@export var message: String = "Sign in to play" ## Plain-text message to sign


signal signed(signature: String, payload: String)
signal failed(reason: String)


func _ready() -> void:
	pressed.connect(_on_pressed)


func _on_pressed() -> void:
	if not Engine.has_singleton("Web3"):
		failed.emit("Web3 unavailable")
		return
	var w3 = Engine.get_singleton("Web3")
	var addr := w3.get_address(chain)
	if addr.is_empty():
		var res := w3.connect(chain)
		if res.has("error"):
			failed.emit(res["error"])
			return
	var sign := w3.sign_message(chain, message)
	if sign.has("error"):
		failed.emit(sign["error"])
		return
	signed.emit(sign["signature"], sign["payload"])
