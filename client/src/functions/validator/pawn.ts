import { MutableRefObject } from "react";
import { withinbounds } from "../withinbounds";
import { isUpperCase } from "../isuppercase";
import { promotionData } from "@/types/promotion";
import { IsRookCapture } from "../IsRookCapture";
import { isKingSafe } from "./king";
import { checkKingSafety } from "../undercheck";

export function isValidPawnmove(
  srcRow: number,
  srcCol: number,
  destRow: number,
  destCol: number,
  piece: string,
  board: string[][],
  color: string,
  isCheck: MutableRefObject<boolean>,
  enPassant: React.MutableRefObject<string>,
  promotion: React.MutableRefObject<promotionData>,
  wCastle: React.MutableRefObject<"" | "KQ" | "K" | "Q">,
  bCastle: React.MutableRefObject<"" | "kq" | "k" | "q">
) {
  if (srcRow == destRow && srcCol == destCol) {
    return false;
  }
  if (!withinbounds(destRow, destCol)) {
    return false;
  }
  if (piece === "P" && color === "w") {
    if (
      destRow + 1 == srcRow &&
      srcCol == destCol &&
      board[destRow][destCol] === "1"
    ) {
      //normal move
      if (isPawnCheck(board, destRow, destCol, -1, piece, isCheck)) {
        isCheck.current = true;
      }
      if (destRow === 0) {
        promotion.current.color = color;
        promotion.current.isPromotion = true;
        promotion.current.position = "" + srcRow + srcCol + destRow + destCol;
      }
      return true;
    }
    if (srcRow == 6 && srcCol == destCol) {
      //first move advantage
      if (
        destRow + 2 == srcRow &&
        board[Number(destRow)][destCol] == "1" &&
        board[Number(destRow) + 1][destCol] == "1"
      ) {
        if (isPawnCheck(board, destRow, destCol, -2, piece, isCheck)) {
          isCheck.current = true;
        }
        ifEnpassant(enPassant, destRow, destCol, board, "p", color);
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
      if (isPawnCheck(board, destRow, destCol, -1, piece, isCheck)) {
        isCheck.current = true;
      }
      if (destRow === 0) {
        promotion.current.isPromotion = true;
        promotion.current.color = color;
        promotion.current.position = "" + srcRow + srcCol + destRow + destCol;
      }
      IsRookCapture(board, destRow, destCol, wCastle, bCastle, color);
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
      if (isPawnCheck(board, destRow, destCol, 1, piece, isCheck)) {
        isCheck.current = true;
      }
      return true;
    }
    if (srcRow == 1 && srcCol == destCol) {
      //first move advantage
      if (
        destRow - 2 == srcRow &&
        board[Number(destRow) - 1][destCol] == "1" &&
        board[Number(destRow)][destCol] == "1"
      ) {
        if (isPawnCheck(board, destRow, destCol, 2, piece, isCheck)) {
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
      if (isPawnCheck(board, destRow, destCol, 1, piece, isCheck)) {
        isCheck.current = true;
      }
      IsRookCapture(board, destRow, destCol, wCastle, bCastle, color);
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
      if (isPawnCheck(board, destRow, destCol, -1, piece, isCheck)) {
        isCheck.current = true;
      }
      if (destRow === 0) {
        promotion.current.isPromotion = true;
        promotion.current.color = color;
        promotion.current.position = "" + srcRow + srcCol + destRow + destCol;
      }
      return true;
    }

    if (srcRow == 6 && srcCol == destCol) {
      //first move advantage
      if (
        destRow + 2 == srcRow &&
        board[Number(destRow) + 1][destCol] == "1" &&
        board[Number(destRow)][destCol] == "1"
      ) {
        if (isPawnCheck(board, destRow, destCol, -2, piece, isCheck)) {
          isCheck.current = true;
        }
        ifEnpassant(enPassant, destRow, destCol, board, "P", color);
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
      if (isPawnCheck(board, destRow, destCol, -1, piece, isCheck)) {
        isCheck.current = true;
      }
      if (destRow === 0) {
        promotion.current.isPromotion = true;
        promotion.current.color = color;
        promotion.current.position = "" + srcRow + srcCol + destRow + destCol;
      }
      IsRookCapture(board, destRow, destCol, wCastle, bCastle, color);
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
      if (isPawnCheck(board, destRow, destCol, 1, piece, isCheck)) {
        isCheck.current = true;
      }
      return true;
    }
    if (srcRow == 1 && srcCol == destCol) {
      //first move advantage
      if (
        destRow - 2 == srcRow &&
        board[Number(destRow) - 1][destCol] == "1" &&
        board[Number(destRow)][destCol] == "1"
      ) {
        if (isPawnCheck(board, destRow, destCol, 2, piece, isCheck)) {
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
      if (isPawnCheck(board, destRow, destCol, 1, piece, isCheck)) {
        isCheck.current = true;
      }
      IsRookCapture(board, destRow, destCol, wCastle, bCastle, color);
      return true;
    }
  }
  return false;
}
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

function ifEnpassant(
  enPassant: React.MutableRefObject<string>,
  destRow: number,
  destCol: number,
  board: string[][],
  counterPiece: string,
  color: string
) {
  if (
    withinbounds(destRow, Number(destCol) + 1) &&
    board[destRow][Number(destCol) + 1] === counterPiece
  ) {
    enPassant.current = color + (Number(destRow) + 1) + destCol;
  } else if (
    withinbounds(destRow, Number(destCol) - 1) &&
    board[destRow][Number(destCol) - 1] === counterPiece
  ) {
    enPassant.current = color + (Number(destRow) + 1) + destCol;
  } else {
    enPassant.current = "";
  }
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
      board[row][col] = "1";
      board[row - 1][col - 1] = piece;
      if (checkKingSafety(board, color, wKingPos, bKingPos)) {
        board[row - 1][col - 1] = "1";
        board[row][col] = piece;
        moves.push(ogPos + (row - 1) + (col - 1));
      }
      board[row - 1][col - 1] = "1";
      board[row][col] = piece;
    }
  }
  if (withinbounds(row - 1, col + 1) && board[row - 1][col + 1] !== "1") {
    if (isUpperCase(board[row][col]) !== isUpperCase(board[row - 1][col + 1])) {
      board[row][col] = "1";
      board[row - 1][col + 1] = piece;
      if (checkKingSafety(board, color, wKingPos, bKingPos)) {
        board[row - 1][col + 1] = "1";
        board[row][col] = piece;
        moves.push(ogPos + (row - 1) + (col + 1));
      }
      board[row - 1][col + 1] = "1";
      board[row][col] = piece;
    }
  }
  return moves;
}
