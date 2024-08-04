package functions

import (
	"log"
	"math/rand"
	"server/types"
)

func NewRoomId(m map[int]types.Room) int {
	// Generate a random 4-digit number
	min := 1000
	max := 9999
	var randomNumber int
	for {
		randomNumber = rand.Intn(max-min+1) + min
		if m[randomNumber].Creator == nil {
			break
		}
		log.Println("Duplicate Room Id. Generating new Id")
	}
	return randomNumber
}
