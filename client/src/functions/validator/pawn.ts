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

export function allPawnMove(
  board: string[][],
  color: string,
  row: number,
  col: number,
  piece: string,
  wKingPos: MutableRefObject<string>,
  bKingPos: MutableRefObject<string>
) {
  const ogPos = piece + row + col;
  let moves: string[] = [];
  board[row][col] = "1";
  if (!checkKingSafety(board, color, wKingPos, bKingPos)) {
    board[row][col] = piece;
    return moves;
  }
  board[row][col] = piece;
  if (row === 6 && board[row - 1][col] === "1" && board[row - 2][col] === "1") {
    //first move advantage
    moves.push(ogPos + (row - 1) + col);
    moves.push(ogPos + (row - 2) + col);
  }
  //normal move
  else if (board[row - 1][col] === "1") {
    moves.push(ogPos + (row - 1) + col);
  }
  //diagonal capture
  if (withinbounds(row - 1, col - 1) && board[row - 1][col - 1] !== "1") {
    if (isUpperCase(board[row][col]) !== isUpperCase(board[row - 1][col - 1])) {
      const dummyPiece = board[row - 1][col - 1];
      board[row][col] = "1";
      board[row - 1][col - 1] = piece;
      if (checkKingSafety(board, color, wKingPos, bKingPos)) {
        board[row - 1][col - 1] = dummyPiece;
        board[row][col] = piece;
        moves.push(ogPos + (row - 1) + (col - 1));
      }
      board[row - 1][col - 1] = dummyPiece;
      board[row][col] = piece;
    }
  }
  if (withinbounds(row - 1, col + 1) && board[row - 1][col + 1] !== "1") {
    if (isUpperCase(board[row][col]) !== isUpperCase(board[row - 1][col + 1])) {
      const dummyPiece = board[row - 1][col + 1];
      board[row][col] = "1";
      board[row - 1][col + 1] = piece;
      if (checkKingSafety(board, color, wKingPos, bKingPos)) {
        board[row - 1][col + 1] = dummyPiece;
        board[row][col] = piece;
        moves.push(ogPos + (row - 1) + (col + 1));
      }
      board[row - 1][col + 1] = dummyPiece;
      board[row][col] = piece;
    }
  }
  return moves;
}
