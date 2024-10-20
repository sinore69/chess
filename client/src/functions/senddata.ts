import { Fen } from "@/types/fen";
import { calcLastMove, fromNumeric, toNumeric } from "./calcMove";
import { Dispatch, SetStateAction } from "react";

export function sendData(
  fen: string,
  socket: WebSocket,
  srcRow: number,
  srcCol: number,
  destRow: number,
  destCol: number,
  isCheck: React.MutableRefObject<boolean>,
  enPassant: React.MutableRefObject<string>,
  setLastMove: Dispatch<SetStateAction<string>>
) {
  const lastmove = calcLastMove(srcRow, srcCol, destRow, destCol, isCheck);
  const fromnumeric = fromNumeric(srcRow, srcCol);
  const tonumeric = toNumeric(destRow, destCol);
  const data: Fen = {
    fen: fen,
    lastMove: lastmove,
    fromNumeric: fromnumeric,
    toNumeric: tonumeric,
    enPassant: enPassant.current,
    isGameOver: false,
    winner: "",
    loser: "",
    moves: "",
    reason: "",
  };
  if (socket.readyState === 1) {
    socket.send(JSON.stringify(data));
    setLastMove(lastmove);
  }
}
