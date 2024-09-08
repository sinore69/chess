package functions

import (
	"strconv"
)

// isKingSafe checks if the king is safe in the given position
func IsKingSafe(board [8][8]string, wKingPos, bKingPos, color string) bool {
	var row, col int
	var piece string
	var err error
	if color == "w" {
		row, err = strconv.Atoi(string(wKingPos[0]))
		if err != nil {
			panic("conversion failed")
		}
		col, err = strconv.Atoi(string(wKingPos[1]))
		if err != nil {
			panic("conversion failed")
		}
		piece = "K"
	}
	if color == "b" {
		row, err = strconv.Atoi(string(bKingPos[0]))
		if err != nil {
			panic("conversion failed")
		}
		col, err = strconv.Atoi(string(bKingPos[1]))
		if err != nil {
			panic("conversion failed")
		}
		piece = "k"
	}
	// downward
	for i := 1; i <= 7; i++ {
		if !WithinBounds(row+i, col) {
			break
		}
		if board[row+i][col] == "1" {
			continue
		}
		if board[row+i][col] == "R" || board[row+i][col] == "r" || board[row+i][col] == "Q" || board[row+i][col] == "q" {
			if IsUpperCase(piece) != IsUpperCase(board[row+i][col]) {
				return false
			}
		}
		break
	}

	// upward
	for i := 1; i <= 7; i++ {
		if !WithinBounds(row-i, col) {
			break
		}
		if board[row-i][col] == "1" {
			continue
		}
		if board[row-i][col] == "R" || board[row-i][col] == "r" || board[row-i][col] == "Q" || board[row-i][col] == "q" {
			if IsUpperCase(piece) != IsUpperCase(board[row-i][col]) {
				return false
			}
		}
		break
	}

	// left to right
	for i := 1; i <= 7; i++ {
		if !WithinBounds(row, col+i) {
			break
		}
		if board[row][col+i] == "1" {
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
		if board[row][col-i] == "1" {
			continue
		}
		if (board[row][col-i] == "R" || board[row][col-i] == "r" || board[row][col-i] == "Q" || board[row][col-i] == "q") &&
			IsUpperCase(piece) != IsUpperCase(board[row][col-i]) {
			return false
		}
		break
	}

	// // diagonal 1st quadrant
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

	// // diagonal 2nd quadrant
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

	// // diagonal 3rd quadrant
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

	// // diagonal 4th quadrant
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
