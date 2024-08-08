package types

type Fen struct {
	Fen         string `json:"fen"`
	LastMove    string `json:"lastMove"`
	FromNumeric string `json:"fromNumeric"`
	ToNumeric   string `json:"toNumeric"`
}
