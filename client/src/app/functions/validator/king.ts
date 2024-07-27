import { isUpperCase } from "../isuppercase";
import { withinbounds } from "../withinbounds";

export function isvalidkingmove(
  rowindex: number,
  colindex: number,
  x: number,
  y: number,
  piece: string,
  board: string[][]
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
      withinbounds(x, y)
    ) {
      return true;
    }
  }
  return false;
}

export function iscastle(
  rowindex: number,
  colindex: number,
  x: number,
  y: number,
  board: string[][],
  color: string
) {
  if (color === "w") {
    const king = board[rowindex][colindex] === "K" ? "K" : "k";
    const rook = king === "K" ? "R" : "r";
    if (
      rowindex == x &&
      Number(colindex) + 2 == y /* add fen string logic validation */
    ) {
      if (
        board[rowindex][Number(colindex) + 1] === "1" &&
        board[rowindex][Number(colindex) + 2] === "1"
      ) {
        board[rowindex][colindex] = "1";
        board[rowindex][Number(colindex) + 1] = rook;
        board[rowindex][Number(colindex) + 2] = king;
        board[rowindex][Number(colindex) + 3] = "1";
        return board;
      }
    }
    if (
      rowindex == x &&
      (colindex - 2 == y ||
        colindex - 3 == y) /* add fen string logic validation */
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
        return board;
      }
    }
  }
  if (color === "b") {
    const king = board[rowindex][colindex] === "K" ? "K" : "k";
    const rook = king === "K" ? "R" : "r";
    if (
      rowindex == x &&
      (Number(colindex) + 2 == y ||
        Number(colindex) + 3 == y) /* add fen string logic validation */
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
        return board;
      }
    }
    if (
      rowindex == x &&
      colindex - 2 == y /* add fen string logic validation */
    ) {
      if (
        board[rowindex][colindex - 1] === "1" &&
        board[rowindex][colindex - 2] === "1"
      ) {
        board[rowindex][colindex] = "1";
        board[rowindex][colindex - 1] = rook;
        board[rowindex][colindex - 2] = king;
        board[rowindex][colindex - 3] = "1";
      }
    }
  }

  return board;
}
