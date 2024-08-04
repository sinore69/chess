package functions


import (
	"math/rand"
)

func NewRoomId() int{
	// Generate a random 4-digit number
	min := 1000
	max := 9999
	randomNumber := rand.Intn(max-min+1) + min
	return randomNumber
}