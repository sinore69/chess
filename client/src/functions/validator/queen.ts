import { MutableRefObject } from "react";
import { isBishopCheck, } from "./bishop";
import { isRookCheck, } from "./rook";

export function isQueenCheck(
  board: string[][],
  destRow: number,
  destCol: number,
  piece: string,
  isCheck: MutableRefObject<boolean>
) {
  if (
    isRookCheck(board, destRow, destCol, piece, isCheck) ||
    isBishopCheck(destRow, destCol, board, piece, isCheck)
  ) {
    isCheck.current = true;
    return true;
  }
  return false;
}
