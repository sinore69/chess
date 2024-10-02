import { promotionData } from "@/types/promotion";
import { MutableRefObject, Dispatch, SetStateAction } from "react";
import { fengenerator } from "./fengenerator";
import { getMove } from "./getMove";
import { updateposition } from "./updateposition";

export function MakeBotMove(
  board: string[][],
  srcRow: number,
  srcCol: number,
  destRow: number,
  destCol: number,
  piece: string,
  oldfen: string,
  color: string,
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
  setIsGameOver: Dispatch<SetStateAction<boolean>>,
  reason: MutableRefObject<string>,
  loserColor: MutableRefObject<"" | "w" | "b">,
  setLastMove: React.Dispatch<React.SetStateAction<string>>
) {
  const newposition = updateposition(
    board,
    srcRow,
    srcCol,
    destRow,
    destCol,
    piece,
    color,
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
  const lastmove = "" + srcRow + srcCol + destRow + destCol;
  const newfen = fengenerator(newposition, color, wCastle, bCastle);
  if (oldfen !== newfen) {
    setLastMove(lastmove);
    colorToMove.current = color === "w" ? "b" : "w";
    getMove(
      newfen,
      setboard,
      wCastle,
      bCastle,
      colorToMove,
      wKingPos,
      bKingPos,
      validMoves,
      setIsGameOver,
      reason,
      color,
      loserColor,
      setLastMove
    );
  }
}
