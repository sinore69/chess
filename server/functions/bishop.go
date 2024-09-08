package functions

import (
	"strings"
)

// func isBishopCheck(destRow, destCol int, board [][]string, piece string, isCheck *bool) bool {
// 	// 3rd quadrant
// 	for i := 1; i <= 7; i++ {
// 		if destRow+i > 7 || destCol+i > 7 || destRow+i < 0 || destCol+i < 0 {
// 			break
// 		}
// 		if board[destRow+i][destCol+i] == "1" {
// 			continue
// 		}
// 		if (board[destRow+i][destCol+i] == "K" || board[destRow+i][destCol+i] == "k") && IsUpperCase(piece) != IsUpperCase(board[destRow+i][destCol+i]) {
// 			*isCheck = true
// 			return true
// 		}
// 		break
// 	}
// 	// 1st quadrant
// 	for i := 1; i <= 7; i++ {
// 		if destRow-i > 7 || destCol-i > 7 || destRow-i < 0 || destCol-i < 0 {
// 			break
// 		}
// 		if board[destRow-i][destCol-i] == "1" {
// 			continue
// 		}
// 		if (board[destRow-i][destCol-i] == "K" || board[destRow-i][destCol-i] == "k") && IsUpperCase(piece) != IsUpperCase(board[destRow-i][destCol-i]) {
// 			*isCheck = true
// 			return true
// 		}
// 		break
// 	}
// 	// 2nd quadrant
// 	for i := 1; i <= 7; i++ {
// 		if destRow-i > 7 || destCol+i > 7 || destRow-i < 0 || destCol+i < 0 {
// 			break
// 		}
// 		if board[destRow-i][destCol+i] == "1" {
// 			continue
// 		}
// 		if (board[destRow-i][destCol+i] == "K" || board[destRow-i][destCol+i] == "k") && IsUpperCase(piece) != IsUpperCase(board[destRow-i][destCol+i]) {
// 			*isCheck = true
// 			return true
// 		}
// 		break
// 	}
// 	// 4th quadrant
// 	for i := 1; i <= 7; i++ {
// 		if destRow+i > 7 || destCol-i > 7 || destRow+i < 0 || destCol-i < 0 {
// 			break
// 		}
// 		if board[destRow+i][destCol-i] == "1" {
// 			continue
// 		}
// 		if (board[destRow+i][destCol-i] == "K" || board[destRow+i][destCol-i] == "k") && IsUpperCase(piece) != IsUpperCase(board[destRow+i][destCol-i]) {
// 			*isCheck = true
// 			return true
// 		}
// 		break
// 	}
// 	return false
// }

func AllBishopMove(board [8][8]string, color string, row int, col int, piece, wKingPos, bKingPos string) string {
	ogPos := piece + string(rune(row+'0')) + string(rune(col+'0'))
	var moves []string
	if color == "w" && !IsUpperCase(piece) {
		return ""
	}
	if color == "b" && IsUpperCase(piece) {
		return ""
	}
	// First quadrant
	for i := 1; i < 8; i++ {
		if WithinBounds(row-i, col+i) {
			if board[row-i][col+i] == "1" {
				board[row-i][col+i] = piece
				board[row][col] = "1"
				if !IsKingSafe(board, wKingPos, bKingPos, color) {
					board[row-i][col+i] = "1"
					board[row][col] = piece
					continue
				}
				board[row-i][col+i] = "1"
				board[row][col] = piece
				moves = append(moves, ogPos+string(rune(row-i+'0'))+string(rune(col+i+'0')))
				continue
			} else {
				if IsUpperCase(board[row][col]) == IsUpperCase(board[row-i][col+i]) {
					break
				} else {
					dummyPiece := board[row-i][col+i]
					board[row-i][col+i] = piece
					board[row][col] = "1"
					if !IsKingSafe(board, wKingPos, bKingPos, color) {
						board[row-i][col+i] = dummyPiece
						board[row][col] = piece
						break
					}
					board[row-i][col+i] = dummyPiece
					board[row][col] = piece
					moves = append(moves, ogPos+string(rune(row-i+'0'))+string(rune(col+i+'0')))
					break
				}
			}
		}
	}

	// Second quadrant
	for i := 1; i < 8; i++ {
		if WithinBounds(row-i, col-i) {
			if board[row-i][col-i] == "1" {
				board[row-i][col-i] = piece
				board[row][col] = "1"
				if !IsKingSafe(board, wKingPos, bKingPos, color) {
					board[row-i][col-i] = "1"
					board[row][col] = piece
					continue
				}
				board[row-i][col-i] = "1"
				board[row][col] = piece
				moves = append(moves, ogPos+string(rune(row-i+'0'))+string(rune(col-i+'0')))
				continue
			} else {
				if IsUpperCase(board[row][col]) == IsUpperCase(board[row-i][col-i]) {
					break
				} else {
					dummyPiece := board[row-i][col-i]
					board[row-i][col-i] = piece
					board[row][col] = "1"
					if !IsKingSafe(board, wKingPos, bKingPos, color) {
						board[row-i][col-i] = dummyPiece
						board[row][col] = piece
						break
					}
					board[row-i][col-i] = dummyPiece
					board[row][col] = piece
					moves = append(moves, ogPos+string(rune(row-i+'0'))+string(rune(col-i+'0')))
					break
				}
			}
		}
	}

	// Third quadrant
	for i := 1; i < 8; i++ {
		if WithinBounds(row+i, col-i) {
			if board[row+i][col-i] == "1" {
				board[row+i][col-i] = piece
				board[row][col] = "1"
				if !IsKingSafe(board, wKingPos, bKingPos, color) {
					board[row+i][col-i] = "1"
					board[row][col] = piece
					continue
				}
				board[row+i][col-i] = "1"
				board[row][col] = piece
				moves = append(moves, ogPos+string(rune(row+i+'0'))+string(rune(col-i+'0')))
				continue
			} else {
				if IsUpperCase(board[row][col]) == IsUpperCase(board[row+i][col-i]) {
					break
				} else {
					dummyPiece := board[row+i][col-i]
					board[row+i][col-i] = piece
					board[row][col] = "1"
					if !IsKingSafe(board, wKingPos, bKingPos, color) {
						board[row+i][col-i] = dummyPiece
						board[row][col] = piece
						break
					}
					board[row+i][col-i] = dummyPiece
					board[row][col] = piece
					moves = append(moves, ogPos+string(rune(row+i+'0'))+string(rune(col-i+'0')))
					break
				}
			}
		}
	}

	// Fourth quadrant
	for i := 1; i < 8; i++ {
		if WithinBounds(row+i, col+i) {
			if board[row+i][col+i] == "1" {
				board[row+i][col+i] = piece
				board[row][col] = "1"
				if !IsKingSafe(board, wKingPos, bKingPos, color) {
					board[row+i][col+i] = "1"
					board[row][col] = piece
					continue
				}
				board[row+i][col+i] = "1"
				board[row][col] = piece
				moves = append(moves, ogPos+string(rune(row+i+'0'))+string(rune(col+i+'0')))
				continue
			} else {
				if IsUpperCase(board[row][col]) == IsUpperCase(board[row+i][col+i]) {
					break
				} else {
					dummyPiece := board[row+i][col+i]
					board[row+i][col+i] = piece
					board[row][col] = "1"
					if !IsKingSafe(board, wKingPos, bKingPos, color) {
						board[row+i][col+i] = dummyPiece
						board[row][col] = piece
						break
					}
					board[row+i][col+i] = dummyPiece
					board[row][col] = piece
					moves = append(moves, ogPos+string(rune(row+i+'0'))+string(rune(col+i+'0')))
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
