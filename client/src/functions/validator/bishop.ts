import { MutableRefObject } from "react";
import { isUpperCase } from "../isuppercase";
export function isBishopCheck(
  destRow: number,
  destCol: number,
  board: string[][],
  piece: string,
  isCheck: MutableRefObject<boolean>
) {
  //3rd quadrant
  for (let i = 1; i <= 7; i++) {
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
      (board[Number(destRow) + i][Number(destCol) + i] == "K" ||
        board[Number(destRow) + i][Number(destCol) + i] == "k") &&
      isUpperCase(piece) !==
        isUpperCase(board[Number(destRow) + i][Number(destCol) + i])
    ) {
      isCheck.current = true;
      return true;
    }
    break;
  }
  //1st quadrant
  for (let i = 1; i <= 7; i++) {
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
      (board[Number(destRow) - i][Number(destCol) - i] == "K" ||
        board[Number(destRow) - i][Number(destCol) - i] == "k") &&
      isUpperCase(piece) !==
        isUpperCase(board[Number(destRow) - i][Number(destCol) - i])
    ) {
      isCheck.current = true;
      return true;
    }
    break;
  }
  //2nd quadrant-no block
  for (let i = 1; i <= 7; i++) {
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
      (board[Number(destRow) - i][Number(destCol) + i] == "k" &&
        isUpperCase(piece) !==
          isUpperCase(board[Number(destRow) - i][Number(destCol) + i]))
    ) {
      isCheck.current = true;
      return true;
    }
    break;
  }
  //4th quadrant-no block
  for (let i = 1; i <= 7; i++) {
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
      (board[Number(destRow) + i][Number(destCol) - i] == "k" &&
        isUpperCase(piece) !==
          isUpperCase(board[Number(destRow) + i][Number(destCol) - i]))
    ) {
      isCheck.current = true;
      return true;
    }
    break;
  }
  return false;
}
