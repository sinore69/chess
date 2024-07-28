import { MutableRefObject } from "react";
import { isUpperCase } from "../isuppercase";
import { withinbounds } from "../withinbounds";
export function isvalidrookmove(
  rowindex: number,
  colindex: number,
  x: number,
  y: number,
  piece: string,
  board: string[][],
  wCastle: React.MutableRefObject<"" | "KQ" | "K" | "Q">,
  bCastle: React.MutableRefObject<"" | "kq" | "k" | "q">,
  color: string
) {
  if (rowindex == x && colindex == y) {
    return false;
  }
  if (withinbounds(x, y)) {
    //prevent same color capture
    if (
      isUpperCase(piece) === isUpperCase(board[x][y]) &&
      board[x][y] !== "1"
    ) {
      return false;
    }
    //prevent any other move other than vertival or hotizontal
    if (rowindex != x && colindex != y) {
      return false;
    }
    if (colindex == y) {
      //up-bottom
      for (let i = Number(rowindex) + 1; i < x; i++) {
        if (board[i][colindex] !== "1") {
          return false;
        }
      }
      //bottom-up
      for (let i = Number(rowindex) - 1; i > x; i--) {
        if (board[i][colindex] !== "1") {
          return false;
        }
      }
    }
    if (rowindex == x) {
      //left to right
      for (let i = Number(colindex) + 1; i < y; i++) {
        if (board[rowindex][i] !== "1") {
          return false;
        }
      }
      //right to left
      for (let i = Number(colindex) - 1; i > y; i--) {
        if (board[rowindex][i] !== "1") {
          return false;
        }
      }
    }
  }
  if (color === "w") {
    if (rowindex == 7 && colindex == 7) {
      const castleValue = wCastle.current.replace("K", "") as "" | "Q";
      wCastle.current =
        wCastle.current.indexOf("K") !== -1 ? castleValue : wCastle.current;
    }
    if (rowindex == 7 && colindex == 0) {
      const castleValue = wCastle.current.replace("Q", "") as "" | "K";
      wCastle.current =
        wCastle.current.indexOf("Q") != -1 ? castleValue : wCastle.current;
    }
  }
  if (color === "b") {
    if (rowindex == 7 && colindex == 7) {
      const castleValue = bCastle.current.replace("q", "") as "" | "k";
      bCastle.current =
        bCastle.current.indexOf("q") != -1 ? castleValue : bCastle.current;
    }
    if (rowindex == 7 && colindex == 0) {
      const castleValue = bCastle.current.replace("k", "") as "" | "q";
      bCastle.current =
        bCastle.current.indexOf("k") !== -1 ? castleValue : bCastle.current;
    }
  }
  return true;
}
