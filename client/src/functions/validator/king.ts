import { MutableRefObject } from "react";
import { isUpperCase } from "../isuppercase";
import { withinbounds } from "../withinbounds";

export function isvalidkingmove(
  srcRow: number,
  srcCol: number,
  destRow: number,
  destCol: number,
  piece: string,
  color: string,
  board: string[][],
  isUnderCheck: MutableRefObject<boolean>
) {
  if (srcRow == destRow && srcCol == destCol) {
    return false;
  }
  if (
    isUpperCase(piece) === isUpperCase(board[destRow][destCol]) &&
    board[destRow][destCol] !== "1"
  ) {
    return false;
  }
  const row = [-1, -1, 0, 1, 1, 1, 0, -1, -1];
  const col = [0, 1, 1, 1, 0, -1, -1, -1];
  for (let i = 0; i < 8; i++) {
    if (
      destRow == Number(srcRow) + row[i] &&
      destCol == Number(srcCol) + col[i] &&
      withinbounds(destRow, destCol) &&
      isKingSafe(board, destRow, destCol, piece, color)
    ) {
      return true;
    }
  }
  return false;
}
export function isKingSafe(
  board: string[][],
  row: number,
  col: number,
  piece: string,
  color: string
) {
  //downward
  for (let i = 1; i <= 7; i++) {
    if (!withinbounds(Number(row) + i, Number(col))) {
      break;
    }
    if (
      board[Number(row) + i][Number(col)] == "1" ||
      board[Number(row) + i][Number(col)] == piece
    ) {
      continue;
    }
    if (
      board[Number(row) + i][Number(col)] == "R" ||
      board[Number(row) + i][Number(col)] == "r" ||
      board[Number(row) + i][Number(col)] == "Q" ||
      (board[Number(row) + i][Number(col)] == "q" &&
        isUpperCase(piece) !== isUpperCase(board[Number(row) + i][Number(col)]))
    ) {
      return false;
    }
    break;
  }
  //upward
  for (let i = 1; i <= 7; i++) {
    if (!withinbounds(Number(row) - i, Number(col))) {
      break;
    }
    if (
      board[Number(row) - i][Number(col)] == "1" ||
      board[Number(row) - i][Number(col)] == piece
    ) {
      continue;
    }
    if (
      (board[Number(row) - i][Number(col)] == "R" ||
        board[Number(row) - i][Number(col)] == "r" ||
        board[Number(row) - i][Number(col)] == "Q" ||
        board[Number(row) - i][Number(col)] == "q") &&
      isUpperCase(piece) !== isUpperCase(board[Number(row) - i][Number(col)])
    ) {
      return false;
    }
    break;
  }
  //left to right
  for (let i = 1; i <= 7; i++) {
    if (!withinbounds(Number(row), Number(col) + i)) {
      break;
    }
    if (
      board[Number(row)][Number(col) + i] == "1" ||
      board[Number(row)][Number(col) + i] == piece
    ) {
      continue;
    }
    if (
      (board[Number(row)][Number(col) + i] == "R" ||
        board[Number(row)][Number(col) + i] == "r" ||
        board[Number(row)][Number(col) + i] == "Q" ||
        board[Number(row)][Number(col) + i] == "q") &&
      isUpperCase(piece) !== isUpperCase(board[Number(row)][Number(col) + i])
    ) {
      return false;
    }
    break;
  }
  //right to left
  for (let i = 1; i <= 7; i++) {
    if (!withinbounds(Number(row), Number(col) - i)) {
      break;
    }
    if (
      board[Number(row)][Number(col) - i] == "1" ||
      board[Number(row)][Number(col) - i] == piece
    ) {
      continue;
    }
    if (
      (board[Number(row)][Number(col) - i] == "R" ||
        board[Number(row)][Number(col) - i] == "r" ||
        board[Number(row)][Number(col) - i] == "Q" ||
        board[Number(row)][Number(col) - i] == "q") &&
      isUpperCase(piece) !== isUpperCase(board[Number(row)][Number(col) - i])
    ) {
      return false;
    }
    break;
  }
  //diagonal 1st quadrant
  for (let i = 1; i <= 7; i++) {
    if (!withinbounds(Number(row) - i, Number(col) - i)) {
      break;
    }
    if (
      board[Number(row) - i][Number(col) - i] == "1" ||
      board[Number(row) - i][Number(col) - i] == piece
    ) {
      continue;
    }
    if (
      (board[Number(row) - i][Number(col) - i] == "B" ||
        board[Number(row) - i][Number(col) - i] == "b" ||
        board[Number(row) - i][Number(col) - i] == "Q" ||
        board[Number(row) - i][Number(col) - i] == "q") &&
      isUpperCase(piece) !==
        isUpperCase(board[Number(row) - i][Number(col) - i])
    ) {
      return false;
    }
    break;
  }
  //diagonal 2nd quadrant
  for (let i = 1; i <= 7; i++) {
    console.log(Number(row) - i, Number(col) + i)
    if (!withinbounds(Number(row) - i, Number(col) + i)) {
      break;
    }
    if (
      board[Number(row) - i][Number(col) + i] == "1" ||
      board[Number(row) - i][Number(col) + i] == piece
    ) {
      continue;
    }
    if (
      (board[Number(row) - i][Number(col) + i] == "B" ||
        board[Number(row) - i][Number(col) + i] == "b" ||
        board[Number(row) - i][Number(col) + i] == "Q" ||
        board[Number(row) - i][Number(col) + i] == "q") &&
      isUpperCase(piece) !==
        isUpperCase(board[Number(row) - i][Number(col) + i])
    ) {
      return false;
    }
    break;
  }
  //diagonal 3rd quadrant
  for (let i = 1; i <= 7; i++) {
    if (!withinbounds(Number(row) + i, Number(col) + i)) {
      break;
    }
    if (
      board[Number(row) + i][Number(col) + i] == "1" ||
      board[Number(row) + i][Number(col) + i] == piece
    ) {
      continue;
    }
    if (
      (board[Number(row) + i][Number(col) + i] == "B" ||
        board[Number(row) + i][Number(col) + i] == "b" ||
        board[Number(row) + i][Number(col) + i] == "Q" ||
        board[Number(row) + i][Number(col) + i] == "q") &&
      isUpperCase(piece) !==
        isUpperCase(board[Number(row) + i][Number(col) + i])
    ) {
      return false;
    }
    break;
  }
  //diagonal 4th quadrant
  for (let i = 1; i <= 7; i++) {
    if (!withinbounds(Number(row) + i, Number(col) - i)) {
      break;
    }
    if (
      board[Number(row) + i][Number(col) - i] == "1" ||
      board[Number(row) + i][Number(col) - i] == piece
    ) {
      continue;
    }
    if (
      (board[Number(row) + i][Number(col) - i] == "B" ||
        board[Number(row) + i][Number(col) - i] == "b" ||
        board[Number(row) + i][Number(col) - i] == "Q" ||
        board[Number(row) + i][Number(col) - i] == "q") &&
      isUpperCase(piece) !==
        isUpperCase(board[Number(row) + i][Number(col) - i])
    ) {
      return false;
    }
    break;
  }
  //knight
  let Row: number = 0,
    Col: number = 0;
  const r = [2, 1, -1, -2, -2, -1, 1, 2];
  const c = [1, 2, 2, 1, -1, -2, -2, -1];
  for (let i = 0; i < 8; i++) {
    Row = Number(row) + r[i];
    Col = Number(col) + c[i];
    if (
      withinbounds(Row, Col) &&
      (board[Row][Col] == "N" || board[Row][Col] == "n") &&
      isUpperCase(piece) !== isUpperCase(board[Row][Col])
    ) {
      return false;
    }
  }
  //pawn
  if (color === "w") {
    if (
      (withinbounds(Number(row) - 1, Number(col) - 1) &&
        board[Number(row) - 1][Number(col) - 1] === "p") ||
      (withinbounds(Number(row) - 1, Number(col) + 1) &&
        board[Number(row) - 1][Number(col) + 1] === "p")
    ) {
      return false;
    }
  }
  if (color === "b") {
    if (
      (withinbounds(Number(row) - 1, Number(col) - 1) &&
        board[Number(row) - 1][Number(col) - 1] === "P") ||
      (withinbounds(Number(row) - 1, Number(col) + 1) &&
        board[Number(row) - 1][Number(col) + 1] === "P")
    ) {
      return false;
    }
  }
  return true;
}

export function iscastle(
  srcRow: number,
  srcCol: number,
  destRow: number,
  destCol: number,
  board: string[][],
  color: string,
  wCastle: React.MutableRefObject<"" | "KQ" | "K" | "Q">,
  bCastle: React.MutableRefObject<"" | "kq" | "k" | "q">
) {
  if (color === "w") {
    const king = board[srcRow][srcCol] === "K" ? "K" : "k";
    const rook = king === "K" ? "R" : "r";
    if (
      srcRow == destRow &&
      Number(srcCol) + 2 == destCol &&
      (wCastle.current === "K" ||
        wCastle.current === "KQ") /* add fen string logic validation */
    ) {
      if (
        board[srcRow][Number(srcCol) + 1] === "1" &&
        board[srcRow][Number(srcCol) + 2] === "1"
      ) {
        board[srcRow][srcCol] = "1";
        board[srcRow][Number(srcCol) + 1] = rook;
        board[srcRow][Number(srcCol) + 2] = king;
        board[srcRow][Number(srcCol) + 3] = "1";
        wCastle.current = "";
        return board;
      }
    }
    if (
      srcRow == destRow &&
      (srcCol - 2 == destCol || srcCol - 3 == destCol) &&
      (wCastle.current === "Q" ||
        wCastle.current === "KQ") /* add fen string logic validation */
    ) {
      if (
        board[srcRow][srcCol - 1] === "1" &&
        board[srcRow][srcCol - 2] === "1" &&
        board[srcRow][srcCol - 3] === "1"
      ) {
        board[srcRow][srcCol] = "1";
        board[srcRow][srcCol - 1] = rook;
        board[srcRow][srcCol - 2] = king;
        board[srcRow][srcCol - 4] = "1";
        wCastle.current = "";
        return board;
      }
    }
  }
  if (color === "b") {
    const king = board[srcRow][srcCol] === "K" ? "K" : "k";
    const rook = king === "K" ? "R" : "r";
    if (
      srcRow == destRow &&
      (Number(srcCol) + 2 == destCol || Number(srcCol) + 3 == destCol) &&
      (bCastle.current === "k" ||
        bCastle.current === "kq") /* add fen string logic validation */
    ) {
      if (
        board[srcRow][Number(srcCol) + 1] === "1" &&
        board[srcRow][Number(srcCol) + 2] === "1" &&
        board[srcRow][Number(srcCol) + 3] === "1"
      ) {
        board[srcRow][srcCol] = "1";
        board[srcRow][Number(srcCol) + 1] = rook;
        board[srcRow][Number(srcCol) + 2] = king;
        board[srcRow][Number(srcCol) + 4] = "1";
        bCastle.current = "";
        return board;
      }
    }
    if (
      srcRow == destRow &&
      srcCol - 2 == destCol &&
      (bCastle.current === "k" ||
        bCastle.current === "kq") /* add fen string logic validation */
    ) {
      if (
        board[srcRow][srcCol - 1] === "1" &&
        board[srcRow][srcCol - 2] === "1"
      ) {
        board[srcRow][srcCol] = "1";
        board[srcRow][srcCol - 1] = rook;
        board[srcRow][srcCol - 2] = king;
        board[srcRow][srcCol - 3] = "1";
        bCastle.current = "";
        return board;
      }
    }
  }
  return board;
}
