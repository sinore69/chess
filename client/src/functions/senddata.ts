import { Fen } from "@/types/fen";

export function sendData(fen:string,socket:WebSocket){
    const data:Fen={
        fen:fen,
        lastMove:"ab"
    }
    if(socket.readyState===1){
        socket.send(JSON.stringify(data))
    }
}