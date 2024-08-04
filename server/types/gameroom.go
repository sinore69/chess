package types

import "github.com/gorilla/websocket"

type Room struct {
	Creator *websocket.Conn
	Player  *websocket.Conn
}
