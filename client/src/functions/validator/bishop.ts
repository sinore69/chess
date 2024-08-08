import { isUpperCase } from "../isuppercase";
import { withinbounds } from "../withinbounds";
export function isvalidbishopmove(
  srcRow: number,
  srcCol: number,
  destRow: number,
  destCol: number,
  piece: string,
  board: string[][],
  isCheck: React.MutableRefObject<boolean>
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
    //is a diagonal move
    if (Math.abs(srcRow - destRow) == Math.abs(srcCol - destCol)) {
      //3rd quadrant-no block
      if (destRow > Number(srcRow) && destCol > Number(srcCol))
        for (let i = 1; i < destRow - Number(srcRow); i++) {
          if (board[Number(srcRow) + i][Number(srcCol) + i] != "1") {
            return false;
          }
        }
      //1st quadrant-no block
      if (destRow < Number(srcRow) && destCol < Number(srcCol))
        for (let i = 1; i < Number(srcRow) - destRow; i++) {
          if (board[Number(srcRow) - i][Number(srcCol) - i] != "1") {
            return false;
          }
        }
      //2nd quadrant-no block
      if (destCol > Number(srcCol) && destRow < Number(srcRow))
        for (let i = 1; i < Number(srcRow) - destRow; i++) {
          if (board[Number(srcRow) - i][Number(srcCol) + i] != "1") {
            return false;
          }
        }
      //4th quadrant-no block
      if (destCol < Number(srcCol) && destRow > Number(srcRow))
        for (let i = 1; i < destRow - Number(srcRow); i++) {
          if (board[Number(srcRow) + i][Number(srcCol) - i] != "1") {
            return false;
          }
        }
      if (isBishopCheck(destRow, destCol, board)) {
        isCheck.current = true;
      }
      return true;
    }
  }
  return false;
}

function isBishopCheck(destRow: number, destCol: number, board: string[][]) {
  //3rd quadrant
  for (let i = 1; i < 7; i++) {
    if (
      Number(destRow) + i > 7 ||
      Number(destCol) + i > 7 ||
      Number(destRow) + i < 0 ||
      Number(destCol) + i < 0
    ) {
      break;
    }
    if (board[Number(destRow) + i][Number(destCol) + i] == "1") {
      continue;
    }
    if (
      board[Number(destRow) + i][Number(destCol) + i] == "K" ||
      board[Number(destRow) + i][Number(destCol) + i] == "k"
    ) {
      return true;
    }
  }
  //1st quadrant
  for (let i = 1; i < 7; i++) {
    if (
      Number(destRow) - i > 7 ||
      Number(destCol) - i > 7 ||
      Number(destRow) - i < 0 ||
      Number(destCol) - i < 0
    ) {
      break;
    }
    if (board[Number(destRow) - i][Number(destCol) - i] == "1") {
      continue;
    }
    if (
      board[Number(destRow) - i][Number(destCol) - i] == "K" ||
      board[Number(destRow) - i][Number(destCol) - i] == "k"
    ) {
      return true;
    }
  }
  //2nd quadrant-no block
  for (let i = 1; i < 7; i++) {
    if (
      Number(destRow) - i > 7 ||
      Number(destCol) + i > 7 ||
      Number(destRow) - i < 0 ||
      Number(destCol) + i < 0
    ) {
      break;
    }
    if (board[Number(destRow) - i][Number(destCol) + i] == "1") {
      continue;
    }
    if (
      board[Number(destRow) - i][Number(destCol) + i] == "K" ||
      board[Number(destRow) - i][Number(destCol) + i] == "k"
    ) {
      return true;
    }
  }
  //4th quadrant-no block
  for (let i = 1; i < 7; i++) {
    if (
      Number(destRow) + i > 7 ||
      Number(destCol) - i > 7 ||
      Number(destRow) + i < 0 ||
      Number(destCol) - i < 0
    ) {
      break;
    }
    if (board[Number(destRow) + i][Number(destCol) - i] == "1") {
      continue;
    }
    if (
      board[Number(destRow) + i][Number(destCol) - i] == "K" ||
      board[Number(destRow) + i][Number(destCol) - i] == "k"
    ) {
      return true;
    }
  }
  return false;
}
