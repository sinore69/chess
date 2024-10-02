package gamehub

import (
	"encoding/json"
	"io"
	"log"
	"net/http"
	"server/functions"
	"server/types"
	"strings"
)

func GetMove(reqbody *strings.Reader, body []byte) types.Fen {
	url := "https://chess-api.com/v1"
	res, err := http.Post(url, "application/json", reqbody)
	if err != nil {
		panic(err)
	}
	var eval types.Evaluation
	resBody, err := io.ReadAll(res.Body)
	if err != nil {
		panic(err)
	}
	log.Println(string(resBody))
	var error types.Error
	err = json.Unmarshal(resBody, &error)
	if err != nil {
		panic(err)
	}
	err = json.Unmarshal(resBody, &eval)
	if err != nil {
		panic(err)
	}
	if error.Text == "extendMoveInfo: move must not be undefined" || error.Error == "INVALID_INPUT" {
		newfen := types.Fen{
			Fen:        string(body)[1 : len(string(body))-1],
			Moves:      "######",
			IsGameOver: true,
		}
		return newfen
	}
	bestmove := eval.From + eval.To
	newFen, lastMove, err := functions.Newfen(eval.Fen, bestmove)
	if err != nil {
		log.Println(err)
	}
	allPossibleMove := AllPossibleMove(newFen)
	newfen := types.Fen{
		Fen:      newFen,
		LastMove: lastMove,
		Moves:    allPossibleMove,
	}
	return newfen
}
