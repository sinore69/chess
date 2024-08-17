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
    isQueenCheck(board, destRow, destCol, piece, isCheck);
    return true;
  }
  return false;
}
export function isQueenCheck(
  board: string[][],
  destRow: number,
  destCol: number,
  piece: string,
  isCheck: MutableRefObject<boolean>
) {
  if (
    isRookCheck(board, destRow, destCol, piece) ||
    isBishopCheck(destRow, destCol, board, piece)
  ) {
    isCheck.current = true;
  }
  return isCheck.current;
}
