package functions

import (
	"strings"
)

type MutableBool struct {
	Value bool
}

type MutableString struct {
	Value string
}

// isQueenCheck checks if the queen is in check using rook and bishop checks.
// func isQueenCheck(
// 	board [][]string,
// 	destRow int,
// 	destCol int,
// 	piece string,
// 	isCheck *MutableBool,
// ) bool {
// 	if isRookCheck(board, destRow, destCol, piece, isCheck) ||
// 		isBishopCheck(destRow, destCol, board, piece, isCheck) {
// 		isCheck.Value = true
// 		return true
// 	}
// 	return false
// }

// allQueenMoves calculates all possible queen moves by combining rook and bishop moves.
func AllQueenMoves(
	board [8][8]string,
	color string,
	row int,
	col int,
	piece, wKingPos, bKingPos string,
) string {
	rookMoves := AllRookMove(board, color, row, col, piece, wKingPos, bKingPos)
	rookMoves = strings.ReplaceAll(rookMoves, "R", "Q")
	rookMoves = strings.ReplaceAll(rookMoves, "r", "q")
	bishopMoves := AllBishopMove(board, color, row, col, piece, wKingPos, bKingPos)
	bishopMoves = strings.ReplaceAll(bishopMoves, "B", "Q")
	bishopMoves = strings.ReplaceAll(bishopMoves, "b", "q")
	return rookMoves + " " + bishopMoves
}
