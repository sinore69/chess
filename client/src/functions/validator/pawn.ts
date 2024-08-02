import { withinbounds } from "../withinbounds";

export function isvalidpawnmove(
  rowindex: number,
  colindex: number,
  x: number,
  y: number,
  piece: string,
  board: string[][],
  color: string
) {
  if (rowindex == x && colindex == y) {
    return false;
  }
  if (!withinbounds(x, y)) {
    return false;
  }
  if (piece == "P" && color === "w") {
    if (x + 1 == rowindex && colindex == y && board[x][y] === "1") {
      //normal move
      return true;
    }
    if (rowindex == 6 && colindex == y) {
      //first move advantage
      if (x + 2 == rowindex) {
        return true;
      }
    }
    if (
      x + 1 == rowindex &&
      (colindex == y - 1 || colindex == y + 1) &&
      board[x][y] !== "1" &&
      !isUpperCase(board[x][y])
    ) {
      //diagonal move
      return true;
    }
  }
  if (piece == "p" && color === "w") {
    if (x - 1 == rowindex && colindex == y && board[x][y] === "1") {
      //normal move
      return true;
    }
    if (rowindex == 1 && colindex == y) {
      //first move advantage
      if (x - 2 == rowindex) {
        return true;
      }
    }
    if (
      x - 1 == rowindex &&
      (colindex == y - 1 || colindex == y + 1) &&
      board[x][y] !== "1" &&
      isUpperCase(board[x][y])
    ) {
      //diagonal move
      return true;
    }
  }
  if (piece == "p" && color === "b") {
    //normal move
    if (x + 1 == rowindex && colindex == y && board[x][y] === "1") {
      return true;
    }

    if (rowindex == 6 && colindex == y) {
      //first move advantage
      if (x + 2 == rowindex) {
        return true;
      }
    }
    if (
      x + 1 == rowindex &&
      (colindex == y - 1 || colindex == y + 1) &&
      board[x][y] !== "1" &&
      isUpperCase(board[x][y])
    ) {
      //diagonal move
      return true;
    }
  }
  if (piece == "P" && color === "b") {
    if (x - 1 == rowindex && colindex == y && board[x][y] === "1") {
      //normal move
      return true;
    }
    if (rowindex == 1 && colindex == y) {
      //first move advantage
      if (x - 2 == rowindex) {
        return true;
      }
    }
    if (
      x - 1 == rowindex &&
      (colindex == y - 1 || colindex == y + 1) &&
      board[x][y] !== "1" &&
      !isUpperCase(board[x][y])
    ) {
      //diagonal move
      return true;
    }
  }
  return false;
}
function isUpperCase(letter: string) {
  return letter === letter.toUpperCase();
}
