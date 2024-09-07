package gamehub

import (
	"server/types"
	"time"
)

func SendInitialGameState(room types.Room) {
	fen := "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1"
	// fen := "rnbqkbnr/8/8/8/8/8/8/RNBQKBNR w KQkq d3 0 1"
	moves := AllPossibleMove(fen)
	initialMoves := types.Fen{
		Fen:         fen,
		LastMove:    "",
		FromNumeric: "",
		ToNumeric:   "",
		EnPassant:   "",
		Winner:      "",
		Loser:       "",
		Moves:       moves,
		IsGameOver:  false,
		Reason:      "",
	}
	room.Creator.WriteJSON(room)
	time.Sleep(time.Millisecond * 80)
	room.Player.WriteJSON(room)
	time.Sleep(time.Millisecond * 80)
	room.Creator.WriteJSON(initialMoves)
}
