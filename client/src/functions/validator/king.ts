import { MutableRefObject } from "react";
import { isUpperCase } from "../isuppercase";
import { withinbounds } from "../withinbounds";

export function isvalidkingmove(
  rowindex: number,
  colindex: number,
  x: number,
  y: number,
  piece: string,
  board: string[][],
  isUnderCheck: MutableRefObject<boolean>
) {
  if (rowindex == x && colindex == y) {
    return false;
  }
  if (isUpperCase(piece) === isUpperCase(board[x][y]) && board[x][y] !== "1") {
    return false;
  }
  const row = [-1, -1, 0, 1, 1, 1, 0, -1, -1];
  const col = [0, 1, 1, 1, 0, -1, -1, -1];
  for (let i = 0; i < 8; i++) {
    if (
      x == Number(rowindex) + row[i] &&
      y == Number(colindex) + col[i] &&
      withinbounds(x, y) &&
      safeKingMove(board, x, y, piece)
    ) {
      return true;
    }
  }
  return false;
}
function safeKingMove(
  board: string[][],
  row: number,
  col: number,
  piece: string
) {
  //downward
  for (let i = 1; i <= 7; i++) {
    if (!withinbounds(Number(row) + i, Number(col))) {
      break;
    }
    if (board[Number(row) + i][Number(col)] == "1") {
      continue;
    }
    if (
      board[Number(row) + i][Number(col)] == "R" ||
      board[Number(row) + i][Number(col)] == "r" ||
      board[Number(row) + i][Number(col)] == "Q" ||
      board[Number(row) + i][Number(col)] == "q" //&&
      // isUpperCase(piece) !== isUpperCase(board[Number(row) + i][Number(col)])
    ) {
      return false;
    }
    break;
  }
  //upward
  for (let i = 1; i <= 7; i++) {
    if (board[Number(row) - i][Number(col)] == "1") {
      continue;
    }
    if (
      board[Number(row) - i][Number(col)] == "R" ||
      board[Number(row) - i][Number(col)] == "r" ||
      board[Number(row) - i][Number(col)] == "Q" ||
      board[Number(row) - i][Number(col)] == "q" //&&
      // // isUpperCase(piece) !== isUpperCase(board[Number(row) - i][Number(col)])
    ) {
      return false;
    }
    break;
  }
  //left to right
  for (let i = 1; i <= 7; i++) {
    console.log(Number(row),Number(col) + 1)
    if (board[Number(row)][Number(col) + 1] == "1") {
      continue;
    }
    if (
      board[Number(row)][Number(col) + 1] == "R" ||
      board[Number(row)][Number(col) + 1] == "r" ||
      board[Number(row)][Number(col) + 1] == "Q" ||
      board[Number(row)][Number(col) + 1] == "q" //&&
      // // isUpperCase(piece) !== isUpperCase(board[Number(row)][Number(col) + 1])
    ) {
      return false;
    }
    break;
  }
  //right to left
  for (let i = 1; i <= 7; i++) {
    if (board[Number(row)][Number(col) - 1] == "1") {
      continue;
    }
    if (
      board[Number(row)][Number(col) - 1] == "R" ||
      board[Number(row)][Number(col) - 1] == "r" ||
      board[Number(row)][Number(col) - 1] == "Q" ||
      board[Number(row)][Number(col) - 1] == "q" //&&
      // // isUpperCase(piece) !== isUpperCase(board[Number(row)][Number(col) - 1])
    ) {
      return false;
    }
    break;
  }
  return true;
}

export function iscastle(
  rowindex: number,
  colindex: number,
  x: number,
  y: number,
  board: string[][],
  color: string,
  wCastle: React.MutableRefObject<"" | "KQ" | "K" | "Q">,
  bCastle: React.MutableRefObject<"" | "kq" | "k" | "q">
) {
  if (color === "w") {
    const king = board[rowindex][colindex] === "K" ? "K" : "k";
    const rook = king === "K" ? "R" : "r";
    if (
      rowindex == x &&
      Number(colindex) + 2 == y &&
      (wCastle.current === "K" ||
        wCastle.current === "KQ") /* add fen string logic validation */
    ) {
      if (
        board[rowindex][Number(colindex) + 1] === "1" &&
        board[rowindex][Number(colindex) + 2] === "1"
      ) {
        board[rowindex][colindex] = "1";
        board[rowindex][Number(colindex) + 1] = rook;
        board[rowindex][Number(colindex) + 2] = king;
        board[rowindex][Number(colindex) + 3] = "1";
        wCastle.current = "";
        return board;
      }
    }
    if (
      rowindex == x &&
      (colindex - 2 == y || colindex - 3 == y) &&
      (wCastle.current === "Q" ||
        wCastle.current === "KQ") /* add fen string logic validation */
    ) {
      if (
        board[rowindex][colindex - 1] === "1" &&
        board[rowindex][colindex - 2] === "1" &&
        board[rowindex][colindex - 3] === "1"
      ) {
        board[rowindex][colindex] = "1";
        board[rowindex][colindex - 1] = rook;
        board[rowindex][colindex - 2] = king;
        board[rowindex][colindex - 4] = "1";
        wCastle.current = "";
        return board;
      }
    }
  }
  if (color === "b") {
    const king = board[rowindex][colindex] === "K" ? "K" : "k";
    const rook = king === "K" ? "R" : "r";
    if (
      rowindex == x &&
      (Number(colindex) + 2 == y || Number(colindex) + 3 == y) &&
      (bCastle.current === "k" ||
        bCastle.current === "kq") /* add fen string logic validation */
    ) {
      if (
        board[rowindex][Number(colindex) + 1] === "1" &&
        board[rowindex][Number(colindex) + 2] === "1" &&
        board[rowindex][Number(colindex) + 3] === "1"
      ) {
        board[rowindex][colindex] = "1";
        board[rowindex][Number(colindex) + 1] = rook;
        board[rowindex][Number(colindex) + 2] = king;
        board[rowindex][Number(colindex) + 4] = "1";
        bCastle.current = "";
        return board;
      }
    }
    if (
      rowindex == x &&
      colindex - 2 == y &&
      (bCastle.current === "k" ||
        bCastle.current === "kq") /* add fen string logic validation */
    ) {
      if (
        board[rowindex][colindex - 1] === "1" &&
        board[rowindex][colindex - 2] === "1"
      ) {
        board[rowindex][colindex] = "1";
        board[rowindex][colindex - 1] = rook;
        board[rowindex][colindex - 2] = king;
        board[rowindex][colindex - 3] = "1";
        bCastle.current = "";
        return board;
      }
    }
  }

  return board;
}
