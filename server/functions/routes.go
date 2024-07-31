package functions

import (
	"encoding/json"
	"io"
	"log"
	"net/http"
	"strings"
)

type Fen struct {
	Fen      string `json:"fen"`
	LastMove string `json:"lastMove"`
}
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

func Home(w http.ResponseWriter, r *http.Request) {
	io.WriteString(w, "this works")
}
func Bot(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Methods", "POST, GET, OPTIONS, PUT, DELETE")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type")
	if r.Method != http.MethodPost {
		log.Println("error")
		http.Error(w, "Invalid request method", http.StatusMethodNotAllowed)
		return
	}
	body, err := io.ReadAll(r.Body)
	if err != nil {
		http.Error(w, "Unable to read request body", http.StatusBadRequest)
		return
	}
	defer r.Body.Close()
	reqbody := strings.NewReader(string(body))
	url := "https://chess-api.com/v1"
	//log.Println(reqbody)
	res, err := http.Post(url, "application/json", reqbody)
	if err != nil {
		panic(err)
	}
	var eval Evaluation
	resBody, err := io.ReadAll(res.Body)
	if err != nil {
		panic(err)
	}
	err = json.Unmarshal(resBody, &eval)
	if err != nil {
		panic(err)
	}
	log.Println(eval)
	//log.Println(eval.Fen)
	bestmove := eval.From + eval.To
	newFen, lastMove := Newfen(eval.Fen, bestmove)
	newfen := Fen{
		Fen:      newFen,
		LastMove: lastMove,
	}
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(newfen)
}
