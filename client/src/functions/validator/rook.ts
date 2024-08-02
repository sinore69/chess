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
  if (color === "w") {//white
    if (rowindex == 7 && colindex == 7) {//king side castle
      const castleValue = wCastle.current.replace("K", "") as "" | "Q";
      wCastle.current =
        wCastle.current.indexOf("K") !== -1 ? castleValue : wCastle.current;
    }
    if (rowindex == 7 && colindex == 0) {//queen side castle
      const castleValue = wCastle.current.replace("Q", "") as "" | "K";
      wCastle.current =
        wCastle.current.indexOf("Q") != -1 ? castleValue : wCastle.current;
    }
    if(board[x][y]=="r"&&y==0&&x==0){
      const castleValue = bCastle.current.replace("q", "") as "" | "k";
      bCastle.current =
        bCastle.current.indexOf("q") != -1 ? castleValue : bCastle.current;
    }
    if(board[x][y]=="r"&&y==7&&x==0){
      const castleValue = bCastle.current.replace("k", "") as "" | "q";
      bCastle.current =
        bCastle.current.indexOf("k") != -1 ? castleValue : bCastle.current;
    }
  }
  if (color === "b") {//black
    if (rowindex == 7 && colindex == 7) {//queen side castle
      const castleValue = bCastle.current.replace("q", "") as "" | "k";
      bCastle.current =
        bCastle.current.indexOf("q") != -1 ? castleValue : bCastle.current;
    }
    if (rowindex == 7 && colindex == 0) {//king side castle
      const castleValue = bCastle.current.replace("k", "") as "" | "q";
      bCastle.current =
        bCastle.current.indexOf("k") !== -1 ? castleValue : bCastle.current;
    }
  }
  return true;
}

export function isRookCheck(board: string[][], row: number, col: number) {
  //top to bottom
  for (let i = Number(row) + 1; i <= 7; i++) {
    if (board[i][col] === "1") {
      continue;
    }
    if (board[i][col] === "k" || board[i][col] === "K") {
      if (isUpperCase(board[i][col]) !== isUpperCase(board[row][col])) {
        return true;
      }
    }
    break;
  }
  //bottom to top
  for (let i = Number(row) - 1; i >= 0; i--) {
    if (board[i][col] === "1") {
      continue;
    }
    if (board[i][col] === "k" || board[i][col] === "K") {
      if (isUpperCase(board[i][col]) !== isUpperCase(board[row][col])) {
        return true;
      }
    }
    break;
  }
  //left to right
  for (let i = Number(col) + 1; i <= 7; i++) {
    if (board[row][i] === "1") {
      continue;
    }
    if (board[row][i] === "k" || board[row][i] === "K") {
      if (isUpperCase(board[row][i]) !== isUpperCase(board[row][col])) {
        return true;
      }
    }
    break;
  }
  //right to left
  for (let i = Number(col) - 1; i >= 0; i--) {
    if (board[row][i] === "1") {
      continue;
    }
    if (board[row][i] === "k" || board[row][i] === "K") {
      if (isUpperCase(board[row][i]) !== isUpperCase(board[row][col])) {
        return true;
      }
    }
    break;
  }
}
