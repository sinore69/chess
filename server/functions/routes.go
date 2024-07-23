package functions

import (
	"encoding/json"
	"io"
	"log"
	"net/http"
)

type Fen struct {
	Fen string `json:"fen"`
}
type Evaluation struct {
	Success      bool    `json:"success"`
	Evaluation   float64 `json:"evaluation"`
	Mate         interface{}  `json:"mate"`
	Bestmove     string  `json:"bestmove"`
	Continuation string  `json:"continuation"`
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
	var fen Fen
	err = json.Unmarshal(body, &fen)
	if err != nil {
		http.Error(w, "Invalid JSON format", http.StatusBadRequest)
		return
	}
	url := "https://stockfish.online/api/s/v2.php?fen=" + fen.Fen + "&depth=15"
	res, err := http.Get(url)
	if err != nil {
		panic(err)
	}
	var eval Evaluation
	resBody, err := io.ReadAll(res.Body)
	if err != nil {
		panic(err)
	}
	//log.Println(string(resBody))
	err = json.Unmarshal(resBody, &eval)
	if err != nil {
		panic(err)
	}
	newfen := Fen{
		Fen: Newfen(fen.Fen, eval.Bestmove),
	}
	//log.Println(newfen)
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(newfen)
}
