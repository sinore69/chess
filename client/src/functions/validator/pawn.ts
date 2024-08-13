import { MutableRefObject } from "react";
import { withinbounds } from "../withinbounds";
import { isUpperCase } from "../isuppercase";

export function isValidPawnmove(
  srcRow: number,
  srcCol: number,
  destRow: number,
  destCol: number,
  piece: string,
  board: string[][],
  color: string,
  isCheck: MutableRefObject<boolean>
) {
  if (srcRow == destRow && srcCol == destCol) {
    return false;
  }
  if (!withinbounds(destRow, destCol)) {
    return false;
  }
  if (piece == "P" && color === "w") {
    if (
      destRow + 1 == srcRow &&
      srcCol == destCol &&
      board[destRow][destCol] === "1"
    ) {
      //normal move
      if (isPawnCheck(board, destRow, destCol, -1, piece)) {
        isCheck.current = true;
      }
      return true;
    }
    if (srcRow == 6 && srcCol == destCol) {
      //first move advantage
      if (destRow + 2 == srcRow) {
        if (isPawnCheck(board, destRow, destCol, -2, piece)) {
          isCheck.current = true;
        }
        return true;
      }
    }
    if (
      destRow + 1 == srcRow &&
      (srcCol == destCol - 1 || srcCol == destCol + 1) &&
      board[destRow][destCol] !== "1" &&
      !isUpperCase(board[destRow][destCol])
    ) {
      //diagonal move
      if (isPawnCheck(board, destRow, destCol, -1, piece)) {
        isCheck.current = true;
      }
      return true;
    }
  }
  if (piece == "p" && color === "w") {
    if (
      destRow - 1 == srcRow &&
      srcCol == destCol &&
      board[destRow][destCol] === "1"
    ) {
      //normal move
      if (isPawnCheck(board, destRow, destCol, 1, piece)) {
        isCheck.current = true;
      }
      return true;
    }
    if (srcRow == 1 && srcCol == destCol) {
      //first move advantage
      if (destRow - 2 == srcRow) {
        if (isPawnCheck(board, destRow, destCol, 2, piece)) {
          isCheck.current = true;
        }
        return true;
      }
    }
    if (
      destRow - 1 == srcRow &&
      (srcCol == destCol - 1 || srcCol == destCol + 1) &&
      board[destRow][destCol] !== "1" &&
      isUpperCase(board[destRow][destCol])
    ) {
      //diagonal move
      if (isPawnCheck(board, destRow, destCol, 1, piece)) {
        isCheck.current = true;
      }
      return true;
    }
  }
  if (piece == "p" && color === "b") {
    //normal move
    if (
      destRow + 1 == srcRow &&
      srcCol == destCol &&
      board[destRow][destCol] === "1"
    ) {
      if (isPawnCheck(board, destRow, destCol, -1, piece)) {
        isCheck.current = true;
      }
      return true;
    }

    if (srcRow == 6 && srcCol == destCol) {
      //first move advantage
      if (destRow + 2 == srcRow) {
        if (isPawnCheck(board, destRow, destCol, -2, piece)) {
          isCheck.current = true;
        }
        return true;
      }
    }
    if (
      destRow + 1 == srcRow &&
      (srcCol == destCol - 1 || srcCol == destCol + 1) &&
      board[destRow][destCol] !== "1" &&
      isUpperCase(board[destRow][destCol])
    ) {
      //diagonal move
      if (isPawnCheck(board, destRow, destCol, -1, piece)) {
        isCheck.current = true;
      }
      return true;
    }
  }
  if (piece == "P" && color === "b") {
    if (
      destRow - 1 == srcRow &&
      srcCol == destCol &&
      board[destRow][destCol] === "1"
    ) {
      //normal move
      if (isPawnCheck(board, destRow, destCol, 1, piece)) {
        isCheck.current = true;
      }
      return true;
    }
    if (srcRow == 1 && srcCol == destCol) {
      //first move advantage
      if (destRow - 2 == srcRow) {
        if (isPawnCheck(board, destRow, destCol, 2, piece)) {
          isCheck.current = true;
        }
        return true;
      }
    }
    if (
      destRow - 1 == srcRow &&
      (srcCol == destCol - 1 || srcCol == destCol + 1) &&
      board[destRow][destCol] !== "1" &&
      !isUpperCase(board[destRow][destCol])
    ) {
      //diagonal move
      if (isPawnCheck(board, destRow, destCol, 1, piece)) {
        isCheck.current = true;
      }
      return true;
    }
  }
  return false;
}
function isPawnCheck(
  board: string[][],
  row: number,
  col: number,
  offset: number,
  piece: string
) {
  if (withinbounds(Number(row) + offset, Number(col) + 1)) {
    if (
      (board[Number(row) + offset][Number(col) + 1] == "K" ||
        board[Number(row) + offset][Number(col) + 1] == "k") &&
      isUpperCase(board[Number(row) + offset][Number(col) + 1]) !==
        isUpperCase(piece)
    ) {
      return true;
    }
  }
  if (withinbounds(Number(row) + offset, Number(col) - 1)) {
    if (
      (board[Number(row) + offset][Number(col) - 1] == "K" ||
        board[Number(row) + offset][Number(col) - 1] == "k") &&
      isUpperCase(board[Number(row) + offset][Number(col) - 1]) !==
        isUpperCase(piece)
    ) {
      return true;
    }
  }
  return false;
}
