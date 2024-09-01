package functions

import (
	"fmt"
	"strings"
)

func AllPawnMove(board [8][8]string, color string, row int, col int, piece string) string {
	ogPos := fmt.Sprintf("%s%d%d", piece, row, col)
	var moves []string
	if color == "w" && !IsUpperCase(piece) {
		return ""
	}
	if color == "b" && IsUpperCase(piece) {
		return ""
	}
	// board[row][col] = "1"
	// First move advantage
	if row == 6 && board[row-1][col] == "1" && board[row-2][col] == "1" {
		moves = append(moves, fmt.Sprintf("%s%d%d", ogPos, row-1, col))
		moves = append(moves, fmt.Sprintf("%s%d%d", ogPos, row-2, col))
	} else if board[row-1][col] == "1" { // Normal move
		moves = append(moves, fmt.Sprintf("%s%d%d", ogPos, row-1, col))
	}

	// Diagonal capture to the left
	if WithinBounds(row-1, col-1) && board[row-1][col-1] != "1" {
		if IsUpperCase(board[row][col]) != IsUpperCase(board[row-1][col-1]) {
			// dummyPiece := board[row-1][col-1]
			// board[row][col] = "1"
			// board[row-1][col-1] = piece
			// if checkKingSafety(board, color, wKingPos, bKingPos) {
			// 	board[row-1][col-1] = dummyPiece
			// 	board[row][col] = piece
			moves = append(moves, fmt.Sprintf("%s%d%d", ogPos, row-1, col-1))
			// }
			// board[row-1][col-1] = dummyPiece
			// board[row][col] = piece
		}
	}

	// Diagonal capture to the right
	if WithinBounds(row-1, col+1) && board[row-1][col+1] != "1" {
		if IsUpperCase(board[row][col]) != IsUpperCase(board[row-1][col+1]) {
			// dummyPiece := board[row-1][col+1]
			// board[row][col] = "1"
			// board[row-1][col+1] = piece
			// if checkKingSafety(board, color, wKingPos, bKingPos) {
			// 	board[row-1][col+1] = dummyPiece
			// 	board[row][col] = piece
			moves = append(moves, fmt.Sprintf("%s%d%d", ogPos, row-1, col+1))
			// }
			// board[row-1][col+1] = dummyPiece
			// board[row][col] = piece
		}
	}
	return strings.Join(moves, " ")
}
