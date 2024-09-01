package functions

import (
	"strings"
)

// Function to check if a knight move puts the king in check.
func isKnightCheck(board [][]string, destRow, destCol int, piece string, isCheck *bool) bool {
	rowOffsets := []int{2, 1, -1, -2, -2, -1, 1, 2}
	colOffsets := []int{1, 2, 2, 1, -1, -2, -2, -1}

	for i := 0; i < 8; i++ {
		newRow := destRow + rowOffsets[i]
		newCol := destCol + colOffsets[i]

		if WithinBounds(newRow, newCol) && (board[newRow][newCol] == "K" || board[newRow][newCol] == "k") &&
			IsUpperCase(piece) != IsUpperCase(board[newRow][newCol]) {
			*isCheck = true
			return true
		}
	}

	*isCheck = false
	return false
}

// Function to get all valid knight moves.
func AllKnightMoves(board [8][8]string, color string, row int, col int, piece string) string {
	ogPos := piece + string(rune(row+'0')) + string(rune(col+'0'))
	var moves []string
	if color == "w" && !IsUpperCase(piece) {
		return ""
	}
	if color == "b" && IsUpperCase(piece) {
		return ""
	}
	rowOffsets := []int{2, 1, -1, -2, -2, -1, 1, 2}
	colOffsets := []int{1, 2, 2, 1, -1, -2, -2, -1}

	for i := 0; i < 8; i++ {
		destRow := row + rowOffsets[i]
		destCol := col + colOffsets[i]

		if WithinBounds(destRow, destCol) && (board[destRow][destCol] == "1" ||
			IsUpperCase(piece) != IsUpperCase(board[destRow][destCol])) {

			// dummyPiece := board[destRow][destCol]
			// board[row][col] = "1"
			// board[destRow][destCol] = piece

			// if !checkKingSafety(board, color, wKingPos, bKingPos) {
			// 	board[row][col] = piece
			// 	board[destRow][destCol] = dummyPiece
			// 	continue
			// }

			// board[row][col] = piece
			// board[destRow][destCol] = dummyPiece
			move := ogPos + string(rune(destRow+'0')) + string(rune(destCol+'0'))
			moves = append(moves, move)
		}
	}

	return strings.Join(moves, " ")
}
