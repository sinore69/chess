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
	log.Println("server is running on port 5443")
	err := http.ListenAndServeTLS(":5443", "origin.pem", "key.pem", nil)
	if err != nil {
		panic(err)
	}
}
