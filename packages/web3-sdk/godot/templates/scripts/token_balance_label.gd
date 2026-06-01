extends Label
## TokenBalanceLabel — auto-refreshes every N seconds with the connected
## wallet's balance for the configured chain + token. Emits `balance_updated`
## when the value changes so you can hook gameplay logic to it.

@export var chain: String = "solana" ## "solana" | "base" | "polygon"
@export var refresh_seconds: float = 30.0
## Optional token mint/address. Leave blank for the native asset (SOL/ETH).
@export var token_address: String = ""


signal balance_updated(amount: float, raw: Dictionary)


func _ready() -> void:
	text = "—"
	if refresh_seconds > 0:
		var t := Timer.new()
		t.wait_time = refresh_seconds
		t.autostart = true
		t.timeout.connect(refresh)
		add_child(t)
	refresh()


func refresh() -> void:
	if not Engine.has_singleton("Web3"):
		text = "Web3 unavailable"
		return
	var w3 = Engine.get_singleton("Web3")
	var addr := w3.get_address(chain)
	if addr.is_empty():
		text = "Not connected"
		return
	var res := w3.get_balance(chain, { "token": token_address } if token_address else {})
	if res.has("error"):
		text = "Error: %s" % res["error"]
		return
	var raw_amount: String = res.get("amount", "0")
	var decimals: int = res.get("decimals", 0)
	var symbol: String = res.get("symbol", "")
	if symbol.is_empty():
		symbol = "SOL" if chain == "solana" else "ETH"
	var human := _format_human(raw_amount, decimals)
	text = "%s %s" % [human, symbol]
	balance_updated.emit(human, res)


func _format_human(raw: String, decimals: int) -> float:
	# Convert a base-10 string of an integer to a human float
	if not raw.is_valid_int():
		return 0.0
	var big := raw.to_float()
	if decimals <= 0:
		return big
	return big / pow(10.0, decimals)
