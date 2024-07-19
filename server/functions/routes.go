package functions

import (
	"encoding/json"
	"io"
	"log"
	"net/http"
	"strconv"
	"strings"
	"time"
)

type Fen struct {
	Fen string `json:"fen"`
}
type Evaluation struct {
	Success      bool    `json:"success"`
	Evaluation   float64 `json:"evaluation"`
	Mate         string  `json:"mate"`
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
	//log.Println(fen.Fen)
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
	err = json.Unmarshal(resBody, &eval)
	if err != nil {
		panic(err)
	}
	newfen := Fen{
		Fen: newfen(fen.Fen, eval.Bestmove),
	}
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(newfen)
	//log.Println(eval.Bestmove)
}
func newfen(fen string, evalmove string) string {
	start := time.Now()
	fenarray := strings.Split(fen, " ")
	board := decodefen(fenarray[0])
	log.Println(board)
	newboard := updateposition(board, evalmove)
	log.Println(newboard)
	duration := time.Since(start)
	newfen := genfen(newboard)
	log.Println(duration)
	return newfen
}
func genfen(board *[8][8]string) string {
	var fenRows []string
	for _, row := range board {
		var fenRow strings.Builder
		emptyCount := 0

		for _, square := range row {
			if square == "1" {
				emptyCount++
			} else {
				if emptyCount > 0 {
					emptyCount = 0
				}
				fenRow.WriteString(square)
			}
		}
		fenRows = append(fenRows, fenRow.String())
	}
	return strings.Join(fenRows, "/")
}
func updateposition(board [8][8]string, evalmove string) *[8][8]string {
	m := make(map[string]int)
	m["a"] = 0
	m["b"] = 1
	m["c"] = 2
	m["d"] = 3
	m["e"] = 4
	m["f"] = 5
	m["g"] = 6
	m["h"] = 7
	bestmove := strings.Split(evalmove, " ")[1]
	log.Println(bestmove)
	srcCol := m[string(bestmove[0])]
	srcRow, err := strconv.Atoi(string(bestmove[1]))
	if err != nil {
		panic(err)
	}
	destCol := m[string(bestmove[2])]
	destRow, err := strconv.Atoi(string(bestmove[3]))
	if err != nil {
		panic(err)
	}
	log.Println(8-srcRow, srcCol-1, 8-destRow, destCol-1)
	piece := board[8-srcRow][srcCol-1]
	board[8-srcRow][srcCol] = "1"
	board[8-destRow][destCol] = piece
	return &board
}
func decodefen(fen string) [8][8]string {
	board := [8][8]string{}
	index := 0
	for i := 0; i < 8; i++ {
		for j := 0; j < 8; j++ {
			if index < len(fen) {
				if string(fen[index]) == "/" {
					index++
				}
				num, err := strconv.Atoi(string(fen[index]))
				if err == nil {
					for num >= 1 {
						board[i][j] = "1"
						num--
						j++
					}
					index++
				}
				if j == 8 {
					continue
				}
				board[i][j] = string(fen[index])
				index++
			}
		}
	}
	return board
}
