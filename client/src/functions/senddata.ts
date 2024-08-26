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
  enPassant: React.MutableRefObject<string>
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
  };
  if (socket.readyState === 1) {
    socket.send(JSON.stringify(data));
  }
}
