import { MutableRefObject } from "react";
import { isUpperCase } from "../isuppercase";
import { withinbounds } from "../withinbounds";

export function isKnightCheck(
  board: string[][],
  destRow: number,
  destCol: number,
  piece: string,
  isCheck: MutableRefObject<boolean>
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
      isCheck.current = true;
      return true;
    }
  }
  return false;
}
