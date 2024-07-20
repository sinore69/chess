package functions

import (
	"encoding/json"
	"fmt"
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
	log.Println(newfen)
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(newfen)
}
func newfen(fen string, evalmove string) string {
	start := time.Now()
	fenarray := strings.Split(fen, " ")
	board := decodefen(fenarray[0])
	newboard := updateposition(board, evalmove)
	duration := time.Since(start)
	newfen := genfen(newboard)
	log.Println(duration)
	return newfen
}
func genfen(board *[8][8]string) string {
	var fen strings.Builder
	for row := 0; row < 8; row++ {
		emptyCount := 0
		for col := 0; col < 8; col++ {
			piece := board[row][col]
			if piece == "1" {
				emptyCount++
			} else {
				if emptyCount > 0 {
					fen.WriteString(fmt.Sprintf("%d", emptyCount))
					emptyCount = 0
				}
				fen.WriteString(piece)
			}
		}
		if emptyCount > 0 {
			fen.WriteString(fmt.Sprintf("%d", emptyCount))
		}
		if row < 7 {
			fen.WriteRune('/')
		}
	}
	//fen.WriteString(" w KQkq - 0 1") // Hard-coded for white to move, full castling rights, no en passant target, halfmove clock, fullmove number
	return fen.String()
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
	log.Println(8-srcRow, srcCol, 8-destRow, destCol)
	//black castle king side
	if bestmove == "e8g8" && board[0][4]=="k"{
		piece := board[8-srcRow][srcCol]
		board[8-srcRow][srcCol] = "1"
		board[8-destRow][destCol] = piece
		piece=board[0][7]
		board[0][7]="1"
		board[0][5]=piece
		return &board
	}
	//black castle queen side
	if bestmove == "e8c8" && board[0][4]=="k"{
		piece := board[8-srcRow][srcCol]
		board[8-srcRow][srcCol] = "1"
		board[8-destRow][destCol] = piece
		piece=board[0][0]
		board[0][0]="1"
		board[0][3]=piece
		return &board
	}
	piece := board[8-srcRow][srcCol]
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
