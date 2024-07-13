package main

import (
	"log"
	"net/http"
	"server/functions"
)
func main(){
	http.HandleFunc("/",functions.Home)
	log.Println("server is running on port 5000")
	err:=http.ListenAndServe(":5000",nil)
	if err!=nil{
		panic(err)
	}
}