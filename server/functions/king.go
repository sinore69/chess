package functions

import (
	"fmt"
	"strings"
)

// Function to get all possible king moves
func AllKingMove(board [8][8]string, color string, row, col int, piece string) string {
	ogPos := fmt.Sprintf("%s%d%d", piece, row, col)
	var moves []string
	if color == "w" && !IsUpperCase(piece) {
		return ""
	}
	if color == "b" && IsUpperCase(piece) {
		return ""
	}
	rowArr := []int{-1, -1, 0, 1, 1, 1, 0, -1, -1}
	colArr := []int{0, 1, 1, 1, 0, -1, -1, -1}

	// Normal king moves
	for i := 0; i < 8; i++ {
		destRow := row + rowArr[i]
		destCol := col + colArr[i]
		if WithinBounds(destRow, destCol) &&
			(board[destRow][destCol] == "1" || IsUpperCase(piece) != IsUpperCase(board[destRow][destCol])) {
			// && isKingSafe(board, destRow, destCol, piece, color
			//  {
			moves = append(moves, fmt.Sprintf("%s%d%d", ogPos, destRow, destCol))
		}
	}
	return strings.Join(moves, " ")
}
