import { MutableRefObject } from "react";
import { withinbounds } from "../withinbounds";
import { isUpperCase } from "../isuppercase";
import { checkKingSafety } from "../undercheck";

export function isPawnCheck(
  board: string[][],
  row: number,
  col: number,
  offset: number,
  piece: string,
  isCheck: MutableRefObject<boolean>
) {
  if (withinbounds(Number(row) + offset, Number(col) + 1)) {
    if (
      (board[Number(row) + offset][Number(col) + 1] == "K" ||
        board[Number(row) + offset][Number(col) + 1] == "k") &&
      isUpperCase(board[Number(row) + offset][Number(col) + 1]) !==
        isUpperCase(piece)
    ) {
      isCheck.current = true;
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
      isCheck.current = true;
      return true;
    }
  }
  return false;
}

export function EnPassantMove(
  destRow: number,
  destCol: number,
  color: string,
  enPassant: React.MutableRefObject<string>
) {
  if (color === "w") {
    if (enPassant.current.charAt(0) != color) {
      if (
        Number(destRow) === Number(7 - parseInt(enPassant.current.charAt(1))) &&
        Number(destCol) === Number(7 - parseInt(enPassant.current.charAt(2)))
      ) {
        return true;
      }
    }
  }
  if (color === "b") {
    if (enPassant.current.charAt(0) != color) {
      if (
        Number(destRow) === Number(7 - parseInt(enPassant.current.charAt(1))) &&
        Number(destCol) === Number(7 - parseInt(enPassant.current.charAt(2)))
      ) {
        return true;
      }
    }
  }
  return false;
}
