import { Fen } from "@/types/fen";
import { calcLastMove, fromNumeric, toNumeric } from "./calcMove";

export function sendData(
  fen: string,
  socket: WebSocket,
  srcRow: number,
  srcCol: number,
  destRow: number,
  destCol: number,
  isCheck: React.MutableRefObject<boolean>,
  isUnderCheck:React.MutableRefObject<boolean>
) {
  const lastmove = calcLastMove(srcRow, srcCol, destRow, destCol, isCheck);
  const fromnumeric = fromNumeric(srcRow, srcCol);
  const tonumeric = toNumeric(destRow, destCol);
  const data: Fen = {
    fen: fen,
    lastMove: lastmove,
    fromNumeric: fromnumeric,
    toNumeric: tonumeric,
  };
  if (socket.readyState === 1) {
    console.log(data)
    socket.send(JSON.stringify(data));
  }
}
