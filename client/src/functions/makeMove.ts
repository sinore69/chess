import { Dispatch, MutableRefObject, SetStateAction } from "react";
import { fengenerator } from "./fengenerator";
import { sendData } from "./senddata";
import { updateposition } from "./updateposition";
import { promotionData } from "@/types/promotion";
import { socketturn } from "./turn";

export function MakeMove(
  board: string[][],
  srcRow: number,
  srcCol: number,
  destRow: number,
  destCol: number,
  piece: string,
  oldfen: string,
  color: MutableRefObject<"b" | "w">,
  wCastle: MutableRefObject<"" | "KQ" | "K" | "Q">,
  bCastle: MutableRefObject<"" | "kq" | "k" | "q">,
  isCheck: MutableRefObject<boolean>,
  wKingPos: MutableRefObject<string>,
  bKingPos: MutableRefObject<string>,
  enPassant: MutableRefObject<string>,
  Promotion: MutableRefObject<promotionData>,
  validMoves: MutableRefObject<string>,
  colorToMove: MutableRefObject<"b" | "w">,
  setboard: Dispatch<SetStateAction<string[][]>>,
  setLastMove: Dispatch<SetStateAction<string>>,
  socket: WebSocket
) {
  if (!socketturn(colorToMove.current, color.current)) {
    return;
  }
  const newposition = updateposition(
    board,
    srcRow,
    srcCol,
    destRow,
    destCol,
    piece,
    color.current,
    wCastle,
    bCastle,
    isCheck,
    wKingPos,
    bKingPos,
    enPassant,
    Promotion,
    validMoves
  );
  setboard(newposition);
  const newfen = fengenerator(newposition, color.current, wCastle, bCastle);
  if (
    oldfen !== newfen &&
    color.current === colorToMove.current &&
    Promotion.current.isPromotion === false
  ) {
    colorToMove.current = colorToMove.current === "w" ? "b" : "w";
    sendData(
      newfen,
      socket,
      srcRow,
      srcCol,
      destRow,
      destCol,
      isCheck,
      enPassant,
      setLastMove
    );
    enPassant.current = "";
  }
}
