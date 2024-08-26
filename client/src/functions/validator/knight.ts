import { MutableRefObject } from "react";
import { isUpperCase } from "../isuppercase";
import { withinbounds } from "../withinbounds";
import { IsRookCapture } from "../IsRookCapture";
import { isKingSafe } from "./king";
import { checkKingSafety } from "../undercheck";
export function isvalidknightmove(
  srcRow: number,
  srcCol: number,
  destRow: number,
  destCol: number,
  piece: string,
  board: string[][],
  isCheck: MutableRefObject<boolean>,
  wCastle: MutableRefObject<"" | "KQ" | "K" | "Q">,
  bCastle: MutableRefObject<"" | "k" | "kq" | "q">,
  color: string
) {
  if (srcRow == destRow && srcCol == destCol) {
    return false;
  }
  //prevent same color capture
  if (
    isUpperCase(piece) === isUpperCase(board[destRow][destCol]) &&
    board[destRow][destCol] !== "1"
  ) {
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
      if (isKnightCheck(board, destRow, destCol, piece, isCheck)) {
        isCheck.current = true;
      }
      IsRookCapture(board, destRow, destCol, wCastle, bCastle, color);
      return true;
    }
  }
  return false;
}
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

export function allKnightMoves(
  board: string[][],
  color: string,
  row: number,
  col: number,
  piece: string,
  wKingPos: MutableRefObject<string>,
  bKingPos: MutableRefObject<string>
) {
  const ogPos = piece + row + col;
  let moves: string[] = [];
  let destRow, destCol;
  const rowArr = [2, 1, -1, -2, -2, -1, 1, 2];
  const colArr = [1, 2, 2, 1, -1, -2, -2, -1];
  for (let i = 0; i < 8; i++) {
    destRow = Number(row) + rowArr[i];
    destCol = Number(col) + colArr[i];
    if (
      withinbounds(destRow, destCol) &&
      (board[destRow][destCol] === "1" ||
        isUpperCase(piece) !== isUpperCase(board[destRow][destCol]))
    ) {
      const dummyPiece = board[destRow][destCol];
      board[row][col] = "1";
      board[destRow][destCol] = piece;
      if (!checkKingSafety(board, color, wKingPos, bKingPos)) {
        board[row][col] = piece;
        board[destRow][destCol] = dummyPiece;
        continue;
      }
      board[row][col] = piece;
      board[destRow][destCol] = dummyPiece;
      moves.push(ogPos + destRow + destCol);
    }
  }
  return moves;
}
