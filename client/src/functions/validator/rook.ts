import { MutableRefObject } from "react";
import { isUpperCase } from "../isuppercase";
import { withinbounds } from "../withinbounds";
export function isvalidrookmove(
  srcRow: number,
  srcCol: number,
  destRow: number,
  destCol: number,
  piece: string,
  board: string[][],
  wCastle: React.MutableRefObject<"" | "KQ" | "K" | "Q">,
  bCastle: React.MutableRefObject<"" | "kq" | "k" | "q">,
  color: string,
  isCheck: MutableRefObject<boolean>
) {
  if (srcRow == destRow && srcCol == destCol) {
    return false;
  }
  if (withinbounds(destRow, destCol)) {
    //prevent same color capture
    if (
      isUpperCase(piece) === isUpperCase(board[destRow][destCol]) &&
      board[destRow][destCol] !== "1"
    ) {
      return false;
    }
    //prevent any other move other than vertival or hotizontal
    if (srcRow != destRow && srcCol != destCol) {
      return false;
    }
    if (srcCol == destCol) {
      //up-bottom
      for (let i = Number(srcRow) + 1; i < destRow; i++) {
        if (board[i][srcCol] !== "1") {
          return false;
        }
      }
      //bottom-up
      for (let i = Number(srcRow) - 1; i > destRow; i--) {
        if (board[i][srcCol] !== "1") {
          return false;
        }
      }
    }
    if (srcRow == destRow) {
      //left to right
      for (let i = Number(srcCol) + 1; i < destCol; i++) {
        if (board[srcRow][i] !== "1") {
          return false;
        }
      }
      //right to left
      for (let i = Number(srcCol) - 1; i > destCol; i--) {
        if (board[srcRow][i] !== "1") {
          return false;
        }
      }
    }
  }
  if (color === "w") {
    //white
    if (srcRow == 7 && srcCol == 7) {
      //king side castle
      const castleValue = wCastle.current.replace("K", "") as "" | "Q";
      wCastle.current =
        wCastle.current.indexOf("K") !== -1 ? castleValue : wCastle.current;
    }
    if (srcRow == 7 && srcCol == 0) {
      //queen side castle
      const castleValue = wCastle.current.replace("Q", "") as "" | "K";
      wCastle.current =
        wCastle.current.indexOf("Q") != -1 ? castleValue : wCastle.current;
    }
    if (board[destRow][destCol] == "r" && destCol == 0 && destRow == 0) {
      const castleValue = bCastle.current.replace("q", "") as "" | "k";
      bCastle.current =
        bCastle.current.indexOf("q") != -1 ? castleValue : bCastle.current;
    }
    if (board[destRow][destCol] == "r" && destCol == 7 && destRow == 0) {
      const castleValue = bCastle.current.replace("k", "") as "" | "q";
      bCastle.current =
        bCastle.current.indexOf("k") != -1 ? castleValue : bCastle.current;
    }
  }
  if (color === "b") {
    //black
    if (srcRow == 7 && srcCol == 7) {
      //queen side castle
      const castleValue = bCastle.current.replace("q", "") as "" | "k";
      bCastle.current =
        bCastle.current.indexOf("q") != -1 ? castleValue : bCastle.current;
    }
    if (srcRow == 7 && srcCol == 0) {
      //king side castle
      const castleValue = bCastle.current.replace("k", "") as "" | "q";
      bCastle.current =
        bCastle.current.indexOf("k") !== -1 ? castleValue : bCastle.current;
    }
  }
  if (
    (piece === "r" || piece === "R") &&
    isRookCheck(board, destRow, destCol, piece)
  ) {
    isCheck.current = true;
  }
  return true;
}

export function isRookCheck(
  board: string[][],
  row: number,
  col: number,
  piece: string
) {
  //top to bottom
  for (let i = Number(row) + 1; i <= 7; i++) {
    if (!withinbounds(i, col)) {
      break;
    }
    if (board[i][col] === "1") {
      continue;
    }
    if (board[i][col] === "k" || board[i][col] === "K") {
      if (isUpperCase(board[i][col]) !== isUpperCase(piece)) {
        return true;
      }
    }
    break;
  }
  //bottom to top
  for (let i = Number(row) - 1; i >= 0; i--) {
    if (!withinbounds(i, col)) {
      break;
    }
    if (board[i][col] === "1") {
      continue;
    }
    if (board[i][col] === "k" || board[i][col] === "K") {
      if (isUpperCase(board[i][col]) !== isUpperCase(piece)) {
        return true;
      }
    }
    break;
  }
  //left to right
  for (let i = Number(col) + 1; i <= 7; i++) {
    if (!withinbounds(row, i)) {
      break;
    }
    if (board[row][i] === "1") {
      continue;
    }
    if (board[row][i] === "k" || board[row][i] === "K") {
      if (isUpperCase(board[row][i]) !== isUpperCase(piece)) {
        return true;
      }
    }
    break;
  }
  //right to left
  for (let i = Number(col) - 1; i >= 0; i--) {
    if (!withinbounds(row, i)) {
      break;
    }
    if (board[row][i] === "1") {
      continue;
    }
    if (board[row][i] === "k" || board[row][i] === "K") {
      if (isUpperCase(board[row][i]) !== isUpperCase(piece)) {
        return true;
      }
    }
    break;
  }
  return false;
}
