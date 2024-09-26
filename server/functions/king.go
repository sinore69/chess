package functions

import (
	"fmt"
	"strings"
)

// Function to get all possible king moves
func AllKingMove(board [8][8]string, color string, row, col int, piece, wKingPos, bKingPos, wCastle, bCastle string) string {
	ogPos := fmt.Sprintf("%s%d%d", piece, row, col)
	var moves []string
	if color == "w" && !IsUpperCase(piece) {
		return ""
	}
	if color == "b" && IsUpperCase(piece) {
		return ""
	}
	rowArr := []int{-1, -1, 0, 1, 1, 1, 0, -1}
	colArr := []int{0, 1, 1, 1, 0, -1, -1, -1}

	// Normal king moves
	for i := 0; i < 8; i++ {
		destRow := row + rowArr[i]
		destCol := col + colArr[i]
		if WithinBounds(destRow, destCol) {
			if board[destRow][destCol] == "1" || IsUpperCase(piece) != IsUpperCase(board[destRow][destCol]) {
				dummyPiece := board[destRow][destCol]
				board[row][col] = "1"
				board[destRow][destCol] = piece
				if color == "w" {
					wKingPos = fmt.Sprintf("%d%d", destRow, destCol)
				}
				if color == "b" {
					bKingPos = fmt.Sprintf("%d%d", destRow, destCol)
				}
				if IsKingSafe(board, wKingPos, bKingPos, color) {
					moves = append(moves, fmt.Sprintf("%s%d%d", ogPos, destRow, destCol))
				}
				board[row][col] = piece
				board[destRow][destCol] = dummyPiece
			}
		}
	}
	if color == "w" {
		if strings.Contains(wCastle, "K") {
			if board[7][5] == "1" && board[7][6] == "1" {
				moves = append(moves, fmt.Sprintf("%s%d%d", ogPos, 7, 6))
			}
		}
		if strings.Contains(wCastle, "Q") {
			if board[7][1] == "1" && board[7][2] == "1" && board[7][3] == "1" {
				moves = append(moves, fmt.Sprintf("%s%d%d", ogPos, 7, 2))
			}
		}
	}
	if color == "b" {
		if strings.Contains(bCastle, "k") {
			if board[7][1] == "1" && board[7][2] == "1" {
				moves = append(moves, fmt.Sprintf("%s%d%d", ogPos, 7, 1))
			}
		}
		if strings.Contains(bCastle, "q") {
			if board[7][4] == "1" && board[7][5] == "1" && board[7][6] == "1" {
				moves = append(moves, fmt.Sprintf("%s%d%d", ogPos, 7, 5))
			}
		}
	}
	if len(moves) == 0 {
		return ""
	}
	return strings.Join(moves, " ")
}
