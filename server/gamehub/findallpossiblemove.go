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
	for row := 0; row < 8; row++ {
		for col := 0; col < 8; col++ {
			switch board[row][col] {
			case "1":
			case "p":
				fallthrough
			case "P":
				allpawnmoves := functions.AllPawnMove(board, color, row, col, board[row][col])
				if len(allpawnmoves) > 0 {
					allPossibleMove = allPossibleMove + allpawnmoves + " "
				}
			case "r":
				fallthrough
			case "R":
				allrookmove := functions.AllRookMove(board, color, row, col, board[row][col])
				if len(allrookmove) > 0 {
					allPossibleMove = allPossibleMove + allrookmove + " "
				}
			case "n":
				fallthrough
			case "N":
				allknightmove := functions.AllKnightMoves(board, color, row, col, board[row][col])
				if len(allknightmove) > 0 {
					allPossibleMove = allPossibleMove + allknightmove + " "
				}
			case "b":
				fallthrough
			case "B":
				allbishopmove := functions.AllBishopMove(board, color, row, col, board[row][col])
				if len(allbishopmove) > 0 {
					allPossibleMove = allPossibleMove + allbishopmove + " "
				}
			case "q":
				fallthrough
			case "Q":
				allqueenmovw := functions.AllBishopMove(board, color, row, col, board[row][col])
				if len(allqueenmovw) > 0 {
					allPossibleMove = allPossibleMove + allqueenmovw + " "
				}
			}

		}
	}
	log.Println("**", allPossibleMove)
	return board
}
