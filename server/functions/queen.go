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
	piece string,
) string {

	rookMoves := AllRookMove(board, color, row, col, piece)
	// for _, move := range rookMoves {
	// 	if strings.HasPrefix(move, "R") {
	// 		moves = append(moves, strings.Replace(move, "R", "Q", 1))
	// 	} else {
	// 		moves = append(moves, strings.Replace(move, "r", "q", 1))
	// 	}
	// }
	rookMoves = strings.ReplaceAll(rookMoves, "R", "Q")
	rookMoves = strings.ReplaceAll(rookMoves, "r", "q")
	// for _, move := range bishopMoves {
	// 	if strings.HasPrefix(move, "B") {
	// 		moves = append(moves, strings.Replace(move, "B", "Q", 1))
	// 	} else {
	// 		moves = append(moves, strings.Replace(move, "b", "q", 1))
	// 	}
	// }
	bishopMoves := AllBishopMove(board, color, row, col, piece)
	bishopMoves = strings.ReplaceAll(rookMoves, "B", "Q")
	bishopMoves = strings.ReplaceAll(rookMoves, "b", "q")
	return rookMoves + " " + bishopMoves
}
