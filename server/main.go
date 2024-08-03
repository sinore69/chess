package main

import (
	"log"
	"net/http"
	"server/routes"
)

func main() {
	http.HandleFunc("/", routes.Home)
	http.HandleFunc("/bot", routes.Bot)
	http.HandleFunc("/friend", routes.CreateGame)
	log.Println("server is running on port 5000")
	err := http.ListenAndServe(":5000", nil)
	if err != nil {
		panic(err)
	}
}
