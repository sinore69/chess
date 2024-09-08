package gamehub

import (
	"server/types"
	"time"
)

func SendInitialGameState(room types.Room) {
	fen := "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1"
	// fen := "rnbqkbnr/pppppppp/8/7Q/2B5/4P3/PPPP1PPP/RNB1K1NR w KQkq - 0 1"
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
	time.Sleep(time.Millisecond * 100)
	room.Player.WriteJSON(room)
	time.Sleep(time.Millisecond * 80)
	room.Creator.WriteJSON(initialMoves)
}
