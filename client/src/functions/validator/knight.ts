import { MutableRefObject } from "react";
import { isUpperCase } from "../isuppercase";
import { withinbounds } from "../withinbounds";
export function isvalidknightmove(
  srcRow: number,
  srcCol: number,
  destRow: number,
  destCol: number,
  piece: string,
  board: string[][],
  isCheck: MutableRefObject<boolean>
) {
  if (srcRow == destRow && srcCol == destCol) {
    return false;
  }
  //prevent same color capture
  if (isUpperCase(piece) === isUpperCase(board[destRow][destCol]) && board[destRow][destCol] !== "1") {
    return false;
  }
  const row = [2, 1, -1, -2, -2, -1, 1, 2];
  const col = [1, 2, 2, 1, -1, -2, -2, -1];
  for (let i = 0; i < 8; i++) {
    if (
      destRow == Number(srcRow) + row[i] &&
      destCol == Number(srcCol) + col[i] &&
      withinbounds(destRow, destCol)
    ) {
      if (isKnightCheck(board, destRow, destCol, piece)) {
        isCheck.current = true;
      }
      return true;
    }
  }
  return false;
}
function isKnightCheck(
  board: string[][],
  destRow: number,
  destCol: number,
  piece: string
) {
  let Row: number = 0,
    Col: number = 0;
  const row = [2, 1, -1, -2, -2, -1, 1, 2];
  const col = [1, 2, 2, 1, -1, -2, -2, -1];
  for (let i = 0; i < 8; i++) {
    Row = Number(destRow) + row[i];
    Col = Number(destCol) + col[i];
    if (
      withinbounds(Row, Col) &&
      (board[Row][Col] == "K" || board[Row][Col] == "k") &&
      isUpperCase(piece) !== isUpperCase(board[Row][Col])
    ) {
      return true;
    }
  }
}
