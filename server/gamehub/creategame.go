package gamehub

import (
	"log"

	"github.com/gorilla/websocket"
)

func CreateGame(conn *websocket.Conn) {
	list:=[]*websocket.Conn{}
	list = append(list, conn)
	log.Println(list)
}
