package gamehub

import (
	"log"

	"github.com/gorilla/websocket"
)

type Game struct {
	list []*websocket.Conn
}

func (g *Game) CreateGame(conn *websocket.Conn) {
	g.list = append(g.list, conn)
	log.Println(g.list)
}
func NewGame() Game {
	return Game{
		list: []*websocket.Conn{},
	}
}
