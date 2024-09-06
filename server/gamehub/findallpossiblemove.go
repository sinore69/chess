package gamehub

import (
	"server/functions"
	"strings"
)

func AllPossibleMove(fen string) string {
	fenArray := strings.Split(fen, " ")
	color := fenArray[1]
	allPossibleMove := " "
	board, wKingPos, bKingPos := functions.Decodefen(func(fen string, color string) string {
		runes := []rune(fen)
		if color == "b" {
			for i, j := 0, len(runes)-1; i < j; i, j = i+1, j-1 {
				runes[i], runes[j] = runes[j], runes[i]
			}
		}
		return string(runes)
	}(fenArray[0], color))
	for row := 0; row < 8; row++ {
		for col := 0; col < 8; col++ {
			switch board[row][col] {
			case "1":
			case "p":
				fallthrough
			case "P":
				allpawnmoves := functions.AllPawnMove(board, color, row, col, board[row][col], wKingPos, bKingPos)
				if len(allpawnmoves) > 0 {
					allPossibleMove = allPossibleMove + allpawnmoves + " "
				}
			case "r":
				fallthrough
			case "R":
				allrookmove := functions.AllRookMove(board, color, row, col, board[row][col], wKingPos, bKingPos)
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
				allbishopmove := functions.AllBishopMove(board, color, row, col, board[row][col], wKingPos, bKingPos)
				if len(allbishopmove) > 0 {
					allPossibleMove = allPossibleMove + allbishopmove + " "
				}
			// case "q":
			// 	fallthrough
			// case "Q":
			// 	allqueenmove := functions.AllQueenMoves(board, color, row, col, board[row][col], wKingPos, bKingPos)
			// 	if len(allqueenmove) > 0 {
			// 		allPossibleMove = allPossibleMove + allqueenmove + " "
			// 	}
			case "k":
				fallthrough
			case "K":
				allkingmove := functions.AllKingMove(board, color, row, col, board[row][col])
				if len(allkingmove) > 0 {
					allPossibleMove = allPossibleMove + allkingmove + " "
				}
			default:
			}
		}
	}
	return allPossibleMove
}
