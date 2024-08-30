package types

type Fen struct {
	Fen         string `json:"fen"`
	LastMove    string `json:"lastMove"`
	FromNumeric string `json:"fromNumeric"`
	ToNumeric   string `json:"toNumeric"`
	EnPassant   string `json:"enPassant"`
	IsGameOver  bool   `json:"isGameOver"`
	Winner      string `json:"winner"`
	Loser       string `json:"loser"`
	Reason      string `json:"reason"`
}
