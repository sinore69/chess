package gamehub

import (
	"log"
	"server/functions"
	"strings"
)

func AllPossibleMove(fen string) [8][8]string {
	// log.Println(fen)
	fenArray := strings.Split(fen, " ")
	board := functions.Decodefen(fenArray[0])
	color := fenArray[1]
	var allPossibleMove string
	if color == "b" {
		board = functions.Reverse(board)
	}
	for i := 0; i < 8; i++ {
		for j := 0; j < 8; j++ {
			switch board[i][j] {
			case "1":
			case "p":
				fallthrough
			case "P":
				allpawnmoves := functions.AllPawnMove(board, color, i, j, board[i][j])
				if len(allpawnmoves) > 0 {
					allPossibleMove = allPossibleMove + allpawnmoves + " "
				}
			}
		}
	}
	log.Println("**", allPossibleMove)
	return board
}
