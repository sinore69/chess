package types

type Evaluation struct {
	Text            string      `json:"text"`
	Eval            interface{} `json:"eval"`
	Move            string      `json:"move"`
	Fen             string      `json:"fen"`
	Depth           int         `json:"depth"`
	WinChance       interface{} `json:"winChance"`
	ContinuationArr interface{} `json:"continuationArr"`
	Mate            interface{} `json:"mate"`
	Centipawns      interface{} `json:"centipawns"`
	San             string      `json:"san"`
	Lan             string      `json:"lan"`
	Turn            string      `json:"turn"`
	Color           string      `json:"color"`
	Piece           string      `json:"piece"`
	Flags           string      `json:"flags"`
	IsCapture       bool        `json:"isCapture"`
	IsCastling      bool        `json:"isCastling"`
	IsPromotion     bool        `json:"isPromotion"`
	From            string      `json:"from"`
	To              string      `json:"to"`
	FromNumeric     string      `json:"fromNumeric"`
	ToNumeric       string      `json:"toNumeric"`
	TaskId          string      `json:"taskId"`
	Time            interface{} `json:"time"`
	Type            string      `json:"type"`
}
