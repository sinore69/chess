package main

import (
	"log"
	"net/http"
	"server/routes"
)

func main() {
	game := routes.NewGame()
	http.HandleFunc("/", routes.Home)
	http.HandleFunc("/bot", routes.Bot)
	http.HandleFunc("/bot/getfirstmove", routes.GetFirstMove)
	http.HandleFunc("/create", game.CreateGame)
	http.HandleFunc("/join", game.JoinGame)
	log.Println("server is running on port 5000")
	certfile:="/etc/letsencrypt/live/chessapi.kydo.fun/fullchain.pem"
	key:=" /etc/letsencrypt/live/chessapi.kydo.fun/privkey.pem"
	err := http.ListenAndServeTLS(":5000",certfile,key, nil)
	if err != nil {
		panic(err)
	}
}
