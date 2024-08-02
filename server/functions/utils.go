package functions

import (
	"fmt"
	"log"
	"strconv"
	"strings"
)

func Newfen(fen string, evalmove string) (string, string) {
	fenarray := strings.Split(fen, " ")
	board := Decodefen(fenarray[0])
	//log.Println(board)
	color := fenarray[1]
	castleInfo := fenarray[2]
	newboard, lastMove, castleValue := Updateposition(board, evalmove, color, castleInfo)
	if len(lastMove) != 4 {
		panic("invalid last move generation")
	}
	newfen := Genfen(newboard, color, castleValue)
	log.Println(newfen, lastMove)
	return newfen, lastMove
}

func Decodefen(fen string) [8][8]string {
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

func Updateposition(board [8][8]string, bestmove string, color string, castleInfo string) (*[8][8]string, string, string) {
	m := make(map[string]int)
	m["a"] = 0
	m["b"] = 1
	m["c"] = 2
	m["d"] = 3
	m["e"] = 4
	m["f"] = 5
	m["g"] = 6
	m["h"] = 7
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
	castleValue := castleInfo
	//rook moved by bot
	if 8-srcRow == 7 && srcCol == 0 && board[8-srcRow][srcCol] == "R" {
		castleValue = strings.ReplaceAll(castleInfo, "Q", "")
	}
	if 8-srcRow == 7 && srcCol == 7 && board[8-srcRow][srcCol] == "R" {
		castleValue = strings.ReplaceAll(castleInfo, "K", "")
	}
	if 8-srcRow == 0 && srcCol == 0 && board[8-srcRow][srcCol] == "r" {
		castleValue = strings.ReplaceAll(castleInfo, "q", "")
	}
	if 8-srcRow == 0 && srcCol == 7 && board[8-srcRow][srcCol] == "r" {
		castleValue = strings.ReplaceAll(castleInfo, "k", "")
	}
	//castled by bot
	if bestmove == "e8g8" { //black king side
		piece := board[8-srcRow][srcCol]
		board[8-srcRow][srcCol] = "1"
		board[8-destRow][destCol] = piece
		piece = board[0][7]
		board[0][5] = piece
		board[0][7] = "1"
		move := fmt.Sprintf("%d%d%d%d", 8-srcRow, srcCol, 8-destRow, destCol)
		castleValue = strings.ReplaceAll(castleValue, "k", "")
		castleValue = strings.ReplaceAll(castleValue, "q", "")
		return &board, move, castleValue
	}
	if bestmove == "e8c8" { //black queen side
		piece := board[8-srcRow][srcCol]
		board[8-srcRow][srcCol] = "1"
		board[8-destRow][destCol] = piece
		piece = board[0][0]
		board[0][3] = piece
		board[0][0] = "1"
		move := fmt.Sprintf("%d%d%d%d", 8-srcRow, srcCol, 8-destRow, destCol)
		castleValue = strings.ReplaceAll(castleValue, "k", "")
		castleValue = strings.ReplaceAll(castleValue, "q", "")
		return &board, move, castleValue
	}
	if bestmove == "e1g1" { //white king side
		piece := board[8-srcRow][srcCol]
		board[8-srcRow][srcCol] = "1"
		board[8-destRow][destCol] = piece
		piece = board[7][7]
		board[7][5] = piece
		board[7][7] = "1"
		move := fmt.Sprintf("%d%d%d%d", 8-srcRow, srcCol, 8-destRow, destCol)
		castleValue = strings.ReplaceAll(castleValue, "K", "")
		castleValue = strings.ReplaceAll(castleValue, "Q", "")
		return &board, move, castleValue
	}
	if bestmove == "e1c1" { //white queen side
		piece := board[8-srcRow][srcCol]
		board[8-srcRow][srcCol] = "1"
		board[8-destRow][destCol] = piece
		piece = board[7][0]
		board[7][3] = piece
		board[7][0] = "1"
		move := fmt.Sprintf("%d%d%d%d", 8-srcRow, srcCol, 8-destRow, destCol)
		castleValue = strings.ReplaceAll(castleValue, "K", "")
		castleValue = strings.ReplaceAll(castleValue, "Q", "")
		return &board, move, castleValue
	}
	if board[8-destRow][destCol] == "R" && 8-destRow == 7 && destCol == 7 {
		castleValue = strings.ReplaceAll(castleValue, "K", "")
	}
	if board[8-destRow][destCol] == "R" && 8-destRow == 0 && destCol == 7 {
		castleValue = strings.ReplaceAll(castleValue, "Q", "")
	}
	if board[8-destRow][destCol] == "r" && 8-destRow == 7 && destCol == 7 {
		castleValue = strings.ReplaceAll(castleValue, "k", "")
	}
	if board[8-destRow][destCol] == "r" && 8-destRow == 0 && destCol == 7 {
		castleValue = strings.ReplaceAll(castleValue, "q", "")
	}
	piece := board[8-srcRow][srcCol]
	board[8-srcRow][srcCol] = "1"
	board[8-destRow][destCol] = piece
	move := fmt.Sprintf("%d%d%d%d", 8-srcRow, srcCol, 8-destRow, destCol)
	return &board, move, castleValue
}

func Genfen(board *[8][8]string, color string, castleValue string) string {
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
	if color == "w" {
		return fen.String() + " b " + castleValue
	}
	//fen.WriteString(" w KQkq - 0 1") // Hard-coded for w to move, full castling rights, no en passant target, halfmove clock, fullmove number
	return fen.String() + " w " + castleValue
}
