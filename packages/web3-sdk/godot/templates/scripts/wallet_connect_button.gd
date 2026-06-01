extends Button
## WalletConnectButton — drop into a Godot scene and it handles the full
## connect/disconnect flow. Emits the standard Button signals on connect
## so you can hook them in the editor like any other button.

@export var chain: String = "solana" ## "solana" | "base" | "polygon"
@export var auto_format_address: bool = true


func _ready() -> void:
	refresh_state()
	if Engine.has_singleton("Web3"):
		var w3 = Engine.get_singleton("Web3")
		w3.wallet_connected.connect(_on_wallet_event)
		w3.wallet_disconnected.connect(_on_disconnect_event)
	pressed.connect(_on_pressed)


func refresh_state() -> void:
	if not Engine.has_singleton("Web3"):
		text = "Web3 unavailable"
		disabled = true
		return
	var w3 = Engine.get_singleton("Web3")
	if not w3.is_web3_enabled():
		text = "Web3 disabled in project"
		disabled = true
		return
	if not w3.has_wallet(chain):
		text = "Connect %s wallet" % _chain_label()
		return
	var addr := w3.get_address(chain)
	if addr.is_empty():
		text = "Connect %s wallet" % _chain_label()
	else:
		text = _format_address(addr) if auto_format_address else addr


func _on_pressed() -> void:
	if not Engine.has_singleton("Web3"):
		return
	var w3 = Engine.get_singleton("Web3")
	var addr := w3.get_address(chain)
	if addr.is_empty():
		var res := w3.connect(chain)
		if res.has("error"):
			_show_error(res["error"])
			return
	else:
		w3.disconnect(chain)
	refresh_state()


func _on_wallet_event(_c: String, _a: String) -> void:
	refresh_state()


func _on_disconnect_event(_c: String) -> void:
	refresh_state()


func _chain_label() -> String:
	match chain:
		"solana": return "Solana"
		"base": return "Base"
		"polygon": return "Polygon"
	return chain.capitalize()


func _format_address(addr: String) -> String:
	if addr.length() <= 10:
		return addr
	return "%s…%s" % [addr.substr(0, 4), addr.substr(addr.length() - 4, 4)]


func _show_error(msg: String) -> void:
	# Hook your toast/notification system here
	push_warning("[WalletConnectButton] %s" % msg)
