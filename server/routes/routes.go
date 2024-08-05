package routes

import (
	"encoding/json"
	"io"
	"log"
	"net/http"
	"server/functions"
	"server/gamehub"
	"server/types"
	"strings"

	"github.com/gorilla/websocket"
)

type Game struct {
	GameRoom map[int]types.Room
}

func NewGame() *Game {
	return &Game{
		GameRoom: make(map[int]types.Room),
	}
}

func Home(w http.ResponseWriter, r *http.Request) {
	io.WriteString(w, "this works")
}

func Bot(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Methods", "POST, GET, OPTIONS, PUT, DELETE")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type")
	if r.Method != http.MethodPost {
		log.Println("error")
		http.Error(w, "Invalid request method", http.StatusMethodNotAllowed)
		return
	}
	body, err := io.ReadAll(r.Body)
	if err != nil {
		http.Error(w, "Unable to read request body", http.StatusBadRequest)
		return
	}
	defer r.Body.Close()
	reqbody := strings.NewReader(string(body))
	url := "https://chess-api.com/v1"
	//log.Println(reqbody)
	res, err := http.Post(url, "application/json", reqbody)
	if err != nil {
		panic(err)
	}
	var eval types.Evaluation
	resBody, err := io.ReadAll(res.Body)
	if err != nil {
		panic(err)
	}
	err = json.Unmarshal(resBody, &eval)
	if err != nil {
		panic(err)
	}
	log.Println(eval)
	//log.Println(eval.Fen)
	bestmove := eval.From + eval.To
	newFen, lastMove := functions.Newfen(eval.Fen, bestmove)
	newfen := types.Fen{
		Fen:      newFen,
		LastMove: lastMove,
	}
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(newfen)
}

var upgrader = websocket.Upgrader{
	CheckOrigin: func(r *http.Request) bool {
		return true
	},
}

func (g *Game) CreateGame(w http.ResponseWriter, r *http.Request) {
	conn, err := upgrader.Upgrade(w, r, nil)
	if err != nil {
		panic(err)
	}
	//id:=functions.NewRoomId(g.GameRoom)
	g.GameRoom[1] = types.Room{
		Creator:      conn,
		CreatorColor: types.White,
		PlayerColor:  types.Black,
	}
	var data types.Fen
	log.Println("creator connected")
	log.Println(g.GameRoom[1])
outer:
	for {
		if err := conn.ReadJSON(&data); err != nil {
			log.Println(err)
			conn.Close()
			break outer
		}
		if g.GameRoom[1].Player != nil {
			data=functions.UpdateFen(data)
			g.GameRoom[1].Player.WriteJSON(data)
		}
	}
}

func (g *Game) JoinGame(w http.ResponseWriter, r *http.Request) {
	conn, err := upgrader.Upgrade(w, r, nil)
	if err != nil {
		panic(err)
	}
	room := g.GameRoom[1]
	room.Player = conn
	g.GameRoom[1] = room
	log.Println("player connected")
	log.Println(g.GameRoom)
	gamehub.SendInitialGameState(room)
	var data types.Fen
outer:
	for {
		if err := conn.ReadJSON(&data); err != nil {
			log.Println(err)
			conn.Close()
			break outer
		}
		room.Creator.WriteJSON(data)
	}
}
