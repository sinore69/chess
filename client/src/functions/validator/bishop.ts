import { MutableRefObject } from "react";
import { isUpperCase } from "../isuppercase";
import { withinbounds } from "../withinbounds";
import { checkKingSafety } from "../undercheck";
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

export function allBishopMove(
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

  //first quadrant
  outer: for (let i = 1; i < 8; i++) {
    if (withinbounds(row - i, col + i)) {
      if (board[row - i][col + i] === "1") {
        //pinning situation
        board[row - i][col + i] = piece;
        board[row][col] = "1";
        if (!checkKingSafety(board, color, wKingPos, bKingPos)) {
          board[row - i][col + i] = "1";
          board[row][col] = piece;
          continue;
        }
        board[row - i][col + i] = "1";
        board[row][col] = piece;
        moves.push(ogPos + (row - i) + (col + i));
        continue;
      } else {
        if (
          isUpperCase(board[row][col]) === isUpperCase(board[row - i][col + i])
        ) {
          break outer;
        } else {
          //pinning situation
          const dummyPiece = board[row - i][col + 1];
          board[row - i][col + i] = piece;
          board[row][col] = "1";
          if (!checkKingSafety(board, color, wKingPos, bKingPos)) {
            board[row - i][col + i] = dummyPiece;
            board[row][col] = piece;
            break outer;
          }
          board[row - i][col + i] = dummyPiece;
          board[row][col] = piece;
          moves.push(ogPos + (row - i) + (col + i));
          break outer;
        }
      }
    }
  }

  //second qudrant
  outer: for (let i = 1; i < 8; i++) {
    if (withinbounds(row - i, col - i)) {
      if (board[row - i][col - i] === "1") {
        board[row - i][col - i] = piece;
        board[row][col] = "1";
        if (!checkKingSafety(board, color, wKingPos, bKingPos)) {
          board[row - i][col - i] = "1";
          board[row][col] = piece;
          continue;
        }
        board[row - i][col - i] = "1";
        board[row][col] = piece;
        moves.push(ogPos + (row - i) + (col - i));
        continue;
      } else {
        if (
          isUpperCase(board[row][col]) === isUpperCase(board[row - i][col - i])
        ) {
          break outer;
        } else {
          const dummyPiece = board[row - i][col - i];
          board[row - i][col - i] = piece;
          board[row][col] = "1";
          if (!checkKingSafety(board, color, wKingPos, bKingPos)) {
            board[row - i][col - i] = dummyPiece;
            board[row][col] = piece;
            break outer;
          }
          board[row - i][col - i] = dummyPiece;
          board[row][col] = piece;
          moves.push(ogPos + (row - i) + (col - i));
          break outer;
        }
      }
    }
  }

  //third quadrant
  outer: for (let i = 1; i < 8; i++) {
    if (withinbounds(row + i, col - i)) {
      if (board[row + i][col - i] === "1") {
        board[row + i][col - i] = piece;
        board[row][col] = "1";
        if (!checkKingSafety(board, color, wKingPos, bKingPos)) {
          board[row + i][col - i] = "1";
          board[row][col] = piece;
          continue;
        }
        board[row + i][col - i] = "1";
        board[row][col] = piece;
        moves.push(ogPos + (row + i) + (col - i));
        continue;
      } else {
        if (
          isUpperCase(board[row][col]) === isUpperCase(board[row + i][col - i])
        ) {
          break outer;
        } else {
          const dummyPiece = board[row + i][col - i];
          board[row + i][col - i] = piece;
          board[row][col] = "1";
          if (!checkKingSafety(board, color, wKingPos, bKingPos)) {
            board[row + i][col - i] = dummyPiece;
            board[row][col] = piece;
            break outer;
          }
          board[row + i][col - i] = dummyPiece;
          board[row][col] = piece;
          moves.push(ogPos + (row + i) + (col - i));
          break outer;
        }
      }
    }
  }

  //fourth quadrant
  outer: for (let i = 1; i < 8; i++) {
    if (withinbounds(row + i, col + i)) {
      if (board[row + i][col + i] === "1") {
        board[row + i][col + i] = piece;
        board[row][col] = "1";
        if (!checkKingSafety(board, color, wKingPos, bKingPos)) {
          board[row + i][col + i] = "1";
          board[row][col] = piece;
          continue;
        }
        board[row + i][col + i] = "1";
        board[row][col] = piece;
        moves.push(ogPos + (row + i) + (col + i));
        continue;
      } else {
        if (
          isUpperCase(board[row][col]) === isUpperCase(board[row + i][col + i])
        ) {
          break outer;
        } else {
          const dummyPiece = board[row + i][col + i];
          board[row + i][col + i] = piece;
          board[row][col] = "1";
          if (!checkKingSafety(board, color, wKingPos, bKingPos)) {
            board[row + i][col + i] = dummyPiece;
            board[row][col] = piece;
            break outer;
          }
          board[row + i][col + i] = dummyPiece;
          board[row][col] = piece;
          moves.push(ogPos + (row + i) + (col + i));
          break outer;
        }
      }
    }
  }

  return moves;
}
