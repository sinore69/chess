package functions

import (
	"strconv"
	"strings"
)

// isKingSafe checks if the king is safe in the given position
func isKingSafe(board [8][8]string, row, col int, piece, color string) bool {
	// downward
	for i := 1; i <= 7; i++ {
		if !WithinBounds(row+i, col) {
			break
		}
		if board[row+i][col] == "1" || board[row+i][col] == piece {
			continue
		}
		if (board[row+i][col] == "R" || board[row+i][col] == "r" || board[row+i][col] == "Q" || board[row+i][col] == "q") &&
			IsUpperCase(piece) != IsUpperCase(board[row+i][col]) {
			return false
		}
		break
	}

	// upward
	for i := 1; i <= 7; i++ {
		if !WithinBounds(row-i, col) {
			break
		}
		if board[row-i][col] == "1" || board[row-i][col] == piece {
			continue
		}
		if (board[row-i][col] == "R" || board[row-i][col] == "r" || board[row-i][col] == "Q" || board[row-i][col] == "q") &&
			IsUpperCase(piece) != IsUpperCase(board[row-i][col]) {
			return false
		}
		break
	}

	// left to right
	for i := 1; i <= 7; i++ {
		if !WithinBounds(row, col+i) {
			break
		}
		if board[row][col+i] == "1" || board[row][col+i] == piece {
			continue
		}
		if (board[row][col+i] == "R" || board[row][col+i] == "r" || board[row][col+i] == "Q" || board[row][col+i] == "q") &&
			IsUpperCase(piece) != IsUpperCase(board[row][col+i]) {
			return false
		}
		break
	}

	// right to left
	for i := 1; i <= 7; i++ {
		if !WithinBounds(row, col-i) {
			break
		}
		if board[row][col-i] == "1" || board[row][col-i] == piece {
			continue
		}
		if (board[row][col-i] == "R" || board[row][col-i] == "r" || board[row][col-i] == "Q" || board[row][col-i] == "q") &&
			IsUpperCase(piece) != IsUpperCase(board[row][col-i]) {
			return false
		}
		break
	}

	// diagonal 1st quadrant
	for i := 1; i <= 7; i++ {
		if !WithinBounds(row-i, col-i) {
			break
		}
		if board[row-i][col-i] == "1" || board[row-i][col-i] == piece {
			continue
		}
		if (board[row-i][col-i] == "B" || board[row-i][col-i] == "b" || board[row-i][col-i] == "Q" || board[row-i][col-i] == "q") &&
			IsUpperCase(piece) != IsUpperCase(board[row-i][col-i]) {
			return false
		}
		break
	}

	// diagonal 2nd quadrant
	for i := 1; i <= 7; i++ {
		if !WithinBounds(row-i, col+i) {
			break
		}
		if board[row-i][col+i] == "1" || board[row-i][col+i] == piece {
			continue
		}
		if (board[row-i][col+i] == "B" || board[row-i][col+i] == "b" || board[row-i][col+i] == "Q" || board[row-i][col+i] == "q") &&
			IsUpperCase(piece) != IsUpperCase(board[row-i][col+i]) {
			return false
		}
		break
	}

	// diagonal 3rd quadrant
	for i := 1; i <= 7; i++ {
		if !WithinBounds(row+i, col+i) {
			break
		}
		if board[row+i][col+i] == "1" || board[row+i][col+i] == piece {
			continue
		}
		if (board[row+i][col+i] == "B" || board[row+i][col+i] == "b" || board[row+i][col+i] == "Q" || board[row+i][col+i] == "q") &&
			IsUpperCase(piece) != IsUpperCase(board[row+i][col+i]) {
			return false
		}
		break
	}

	// diagonal 4th quadrant
	for i := 1; i <= 7; i++ {
		if !WithinBounds(row+i, col-i) {
			break
		}
		if board[row+i][col-i] == "1" || board[row+i][col-i] == piece {
			continue
		}
		if (board[row+i][col-i] == "B" || board[row+i][col-i] == "b" || board[row+i][col-i] == "Q" || board[row+i][col-i] == "q") &&
			IsUpperCase(piece) != IsUpperCase(board[row+i][col-i]) {
			return false
		}
		break
	}

	// knight
	r := []int{2, 1, -1, -2, -2, -1, 1, 2}
	c := []int{1, 2, 2, 1, -1, -2, -2, -1}
	for i := 0; i < 8; i++ {
		rowOffset := row + r[i]
		colOffset := col + c[i]
		if WithinBounds(rowOffset, colOffset) &&
			(board[rowOffset][colOffset] == "N" || board[rowOffset][colOffset] == "n") &&
			IsUpperCase(piece) != IsUpperCase(board[rowOffset][colOffset]) {
			return false
		}
	}

	// pawn
	if color == "w" {
		if (WithinBounds(row-1, col-1) && board[row-1][col-1] == "p") ||
			(WithinBounds(row-1, col+1) && board[row-1][col+1] == "p") {
			return false
		}
	} else if color == "b" {
		if (WithinBounds(row-1, col-1) && board[row-1][col-1] == "P") ||
			(WithinBounds(row-1, col+1) && board[row-1][col+1] == "P") {
			return false
		}
	}

	return true
}

// Function to get all possible king moves
func AllKingMove(board [8][8]string, color string, row, col int, piece string) string {
	ogPos := piece + strconv.Itoa(row) + strconv.Itoa(col)
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
			moves = append(moves, ogPos+strconv.Itoa(destRow)+strconv.Itoa(destCol))
		}
	}

	return strings.Join(moves, " ")
}
