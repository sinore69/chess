package functions

import (
	"strings"
)

func AllRookMove(board [8][8]string, color string, row int, col int, piece, wKingPos, bKingPos string) string {
	ogPos := piece + string(rune(row+'0')) + string(rune(col+'0'))
	var moves []string
	if color == "w" && !IsUpperCase(piece) {
		return ""
	}
	if color == "b" && IsUpperCase(piece) {
		return ""
	}
	// Up-bottom
	for i := row + 1; i < 8; i++ {
		if WithinBounds(i, col) {
			if board[i][col] == "1" {
				// Pinning situation
				board[i][col] = piece
				board[row][col] = "1"
				if IsKingSafe(board, wKingPos, bKingPos, color) {
					moves = append(moves, ogPos+string(rune(i+'0'))+string(rune(col+'0')))
				}
				board[i][col] = "1"
				board[row][col] = piece
				continue
			} else {
				if IsUpperCase(board[row][col]) == IsUpperCase(board[i][col]) {
					break
				} else {
					// Pinning situation
					dummyPiece := board[i][col]
					board[i][col] = piece
					board[row][col] = "1"
					if IsKingSafe(board, wKingPos, bKingPos, color) {
						moves = append(moves, ogPos+string(rune(i+'0'))+string(rune(col+'0')))
					}
					board[i][col] = dummyPiece
					board[row][col] = piece
					break
				}
			}
		}
	}

	// Bottom-up
	for i := row - 1; i >= 0; i-- {
		if WithinBounds(i, col) {
			if board[i][col] == "1" {
				// Pinning situation
				board[i][col] = piece
				board[row][col] = "1"
				if IsKingSafe(board, wKingPos, bKingPos, color) {
					moves = append(moves, ogPos+string(rune(i+'0'))+string(rune(col+'0')))
				}
				board[i][col] = "1"
				board[row][col] = piece
				continue
			} else {
				if IsUpperCase(board[row][col]) == IsUpperCase(board[i][col]) {
					break
				} else {
					// Pinning situation
					dummyPiece := board[i][col]
					board[i][col] = piece
					board[row][col] = "1"
					if IsKingSafe(board, wKingPos, bKingPos, color) {
						moves = append(moves, ogPos+string(rune(i+'0'))+string(rune(col+'0')))
					}
					board[i][col] = dummyPiece
					board[row][col] = piece
					break
				}
			}
		}
	}

	// Left to right
	for i := col + 1; i < 8; i++ {
		if WithinBounds(row, i) {
			if board[row][i] == "1" {
				// Pinning situation
				board[row][i] = piece
				board[row][col] = "1"
				if IsKingSafe(board, wKingPos, bKingPos, color) {
					moves = append(moves, ogPos+string(rune(row+'0'))+string(rune(i+'0')))
				}
				board[row][i] = "1"
				board[row][col] = piece
				continue
			} else {
				if IsUpperCase(board[row][col]) == IsUpperCase(board[row][i]) {
					break
				} else {
					// Pinning situation
					dummyPiece := board[row][i]
					board[row][i] = piece
					board[row][col] = "1"
					if IsKingSafe(board, wKingPos, bKingPos, color) {
						moves = append(moves, ogPos+string(rune(row+'0'))+string(rune(i+'0')))
					}
					board[row][i] = dummyPiece
					board[row][col] = piece
					break
				}
			}
		}
	}

	// Right to left
	for i := col - 1; i >= 0; i-- {
		if WithinBounds(row, i) {
			if board[row][i] == "1" {
				// Pinning situation
				board[row][i] = piece
				board[row][col] = "1"
				if IsKingSafe(board, wKingPos, bKingPos, color) {
					moves = append(moves, ogPos+string(rune(row+'0'))+string(rune(i+'0')))
				}
				board[row][i] = "1"
				board[row][col] = piece
				continue
			} else {
				if IsUpperCase(board[row][col]) == IsUpperCase(board[row][i]) {
					break
				} else {
					// Pinning situation
					dummyPiece := board[row][i]
					board[row][i] = piece
					board[row][col] = "1"
					if IsKingSafe(board, color, wKingPos, bKingPos) {
						moves = append(moves, ogPos+string(rune(row+'0'))+string(rune(i+'0')))
					}
					board[row][i] = dummyPiece
					board[row][col] = piece
					break
				}
			}
		}
	}
	if len(moves) == 0 {
		return ""
	}
	return strings.Join(moves, " ")
}
