package functions

import (
	"io"
	"log"
	"net/http"
)

func Home(w http.ResponseWriter, r *http.Request) {
	io.WriteString(w, "this works")
}
func Bot(w http.ResponseWriter, r *http.Request) {
	res,err:=http.Get("https://stockfish.online/api/s/v2.php?fen=r1bqkb1r/p1p1pppp/1pn2n2/3p4/2P2P2/2N2N2/PP1PP1PP/R1BQKB1R b KQkq - 0 1&depth=15")
	if err!=nil{
		panic(err)
	}
	resBody, err := io.ReadAll(res.Body)
	if err!=nil{
		panic(err)
	}
	log.Println(string(resBody))
}
