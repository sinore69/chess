package types

type Fen struct {
	Fen         string `json:"fen"`
	LastMove    string `json:"lastMove"`
	FromNumeric string `json:"fromNumeric"`
	ToNumeric   string `json:"toNumeric"`
	EnPassant   string `json:"enPassant"`
	Winner      string `json:"winner"`
	Loser       string `json:"loser"`
	Moves       string `json:"moves"`
	IsGameOver  bool   `json:"isGameOver"`
	Reason      string `json:"reason"`
}
