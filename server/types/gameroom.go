package types

import "github.com/gorilla/websocket"

type Color string

const (
	White Color = "w"
	Black Color = "b"
)

type Room struct {
	Creator      *websocket.Conn
	CreatorColor Color
	Player       *websocket.Conn
	PlayerColor  Color
	Time         int
}
