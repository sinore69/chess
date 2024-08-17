import { MutableRefObject } from "react";
import { isBishopCheck, isvalidbishopmove } from "./bishop";
import { isRookCheck, isvalidrookmove } from "./rook";
export function isvalidqueenmove(
  srcRow: number,
  srcCol: number,
  destRow: number,
  destCol: number,
  piece: string,
  board: string[][],
  wCastle: React.MutableRefObject<"" | "KQ" | "K" | "Q">,
  bCastle: React.MutableRefObject<"" | "kq" | "k" | "q">,
  color: string,
  isCheck: React.MutableRefObject<boolean>
) {
  if (
    isvalidbishopmove(
      srcRow,
      srcCol,
      destRow,
      destCol,
      piece,
      board,
      isCheck,
      wCastle,
      bCastle,
      color
    ) ||
    isvalidrookmove(
      srcRow,
      srcCol,
      destRow,
      destCol,
      piece,
      board,
      wCastle,
      bCastle,
      color,
      isCheck
    )
  ) {
    isCheck.current = isQueenCheck(board, destRow, destCol, piece);
    return true;
  }
  return false;
}
export function isQueenCheck(
  board: string[][],
  destRow: number,
  destCol: number,
  piece: string
) {
  if (
    isRookCheck(board, destRow, destCol, piece) ||
    isBishopCheck(destRow, destCol, board, piece)
  ) {
    return true;
  }
  return false;
}
