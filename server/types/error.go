package types

type Error struct {
	Type  string `json:"type"`
	Error string `json:"error"`
	Text  string `json:"text"`
}
