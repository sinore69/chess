package gamehub

import (
	"server/types"
	"time"
)

func SendInitialGameState(room types.Room) {
	room.Creator.WriteJSON(room)
	time.Sleep(time.Millisecond*150)
	room.Player.WriteJSON(room)
}