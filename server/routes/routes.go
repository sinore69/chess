package routes

import (
	"encoding/json"
	"io"
	"log"
	"net/http"
	"server/gamehub"
	"server/types"
	"strconv"
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
	newfen := gamehub.GetMove(reqbody, body)
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(newfen)
}

func GetFirstMove(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Methods", "POST, GET, OPTIONS, PUT, DELETE")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type")
	if r.Method != http.MethodGet {
		log.Println("error")
		http.Error(w, "Invalid request method", http.StatusMethodNotAllowed)
		return
	}
	allPossibleMove := gamehub.AllPossibleMove("rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1")
	newfen := types.Fen{
		Fen:      "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1",
		LastMove: "",
		Moves:    allPossibleMove,
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
	var result types.Fen
	var gametime types.GameTime
	log.Println("creator connected")
	log.Println(g.GameRoom[1])
outer:
	for {
		_, msg, err := conn.ReadMessage()
		if err != nil {
			log.Println(err)
			conn.Close()
			break outer
		}
		err = json.Unmarshal(msg, &result)
		if err != nil {
			log.Println(err)
			conn.Close()
			break outer
		}
		err = json.Unmarshal(msg, &gametime)
		if err != nil {
			log.Println(err)
			conn.Close()
			break outer
		}
		if gametime.GameTime != "" {
			log.Println(gametime.GameTime)
			time, err := strconv.Atoi(gametime.GameTime)
			room := g.GameRoom[1]
			if err != nil {
				log.Println("Error:", err)
				conn.Close()
				break outer
			} else {
				room.Time = time
				g.GameRoom[1] = room
			}
		}
		if g.GameRoom[1].Player != nil && result.Fen != "" {
			log.Println(result)
			if !result.IsGameOver {
				allPossibleMove := gamehub.AllPossibleMove(result.Fen)
				result.Moves = allPossibleMove
				log.Println(allPossibleMove)
			}
			g.GameRoom[1].Player.WriteJSON(result)
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
		if g.GameRoom[1].Creator != nil {
			log.Println(data)
			if !data.IsGameOver {
				allPossibleMove := gamehub.AllPossibleMove(data.Fen)
				data.Moves = allPossibleMove
				log.Println(allPossibleMove)
			}
			g.GameRoom[1].Creator.WriteJSON(data)
		}
	}
}
