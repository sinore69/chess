import { MutableRefObject } from "react";
import { isUpperCase } from "../isuppercase";
import { withinbounds } from "../withinbounds";
import { checkKingSafety } from "../undercheck";

export function isRookCheck(
  board: string[][],
  row: number,
  col: number,
  piece: string,
  isCheck: MutableRefObject<boolean>
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
        isCheck.current = true;
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
        isCheck.current = true;
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
        isCheck.current = true;
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
        isCheck.current = true;
        return true;
      }
    }
    break;
  }
  return false;
}
export function allRookMoves(
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

  //up-bottom
  outer: for (let i = row + 1; i < 8; i++) {
    if (withinbounds(i, col)) {
      if (board[i][col] === "1") {
        //pinning situation
        board[i][col] = piece;
        board[row][col] = "1";
        if (!checkKingSafety(board, color, wKingPos, bKingPos)) {
          board[i][col] = "1";
          board[row][col] = piece;
          continue;
        }
        board[i][col] = "1";
        board[row][col] = piece;
        moves.push(ogPos + i + col);
        continue;
      } else {
        if (isUpperCase(board[row][col]) === isUpperCase(board[i][col])) {
          break outer;
        } else {
          //pinning situation
          const dummyPiece = board[i][col];
          board[i][col] = piece;
          board[row][col] = "1";
          if (!checkKingSafety(board, color, wKingPos, bKingPos)) {
            board[i][col] = dummyPiece;
            board[row][col] = piece;
            continue;
          }
          board[i][col] = dummyPiece;
          board[row][col] = piece;
          moves.push(ogPos + i + col);
          break outer;
        }
      }
    }
  }

  //bottom-up
  outer: for (let i = row - 1; i >= 0; i--) {
    if (withinbounds(i, col)) {
      if (board[i][col] === "1") {
        //pinning situation
        board[i][col] = piece;
        board[row][col] = "1";
        if (!checkKingSafety(board, color, wKingPos, bKingPos)) {
          board[i][col] = "1";
          board[row][col] = piece;
          continue;
        }
        board[i][col] = "1";
        board[row][col] = piece;
        moves.push(ogPos + i + col);
        continue;
      } else {
        if (isUpperCase(board[row][col]) === isUpperCase(board[i][col])) {
          break outer;
        } else {
          //pinning situation
          const dummyPiece = board[i][col];
          board[i][col] = piece;
          board[row][col] = "1";
          if (!checkKingSafety(board, color, wKingPos, bKingPos)) {
            board[i][col] = dummyPiece;
            board[row][col] = piece;
            break outer;
          }
          board[i][col] = dummyPiece;
          board[row][col] = piece;
          moves.push(ogPos + i + col);
          break outer;
        }
      }
    }
  }

  //left to right
  outer: for (let i = col + 1; i < 8; i++) {
    if (withinbounds(row, i)) {
      if (board[row][i] === "1") {
        //pinning situation
        board[row][i] = piece;
        board[row][col] = "1";
        if (!checkKingSafety(board, color, wKingPos, bKingPos)) {
          board[row][i] = "1";
          board[row][col] = piece;
          continue;
        }
        board[row][i] = "1";
        board[row][col] = piece;
        moves.push(ogPos + row + i);
        continue;
      } else {
        if (isUpperCase(board[row][col]) === isUpperCase(board[row][i])) {
          break outer;
        } else {
          //pinning situation
          const dummyPiece = board[row][i];
          board[row][i] = piece;
          board[row][col] = "1";
          if (!checkKingSafety(board, color, wKingPos, bKingPos)) {
            board[row][i] = dummyPiece;
            board[row][col] = piece;
            break outer;
          }
          board[row][i] = dummyPiece;
          board[row][col] = piece;
          moves.push(ogPos + row + i);
          break outer;
        }
      }
    }
  }

  //right to left
  outer: for (let i = col - 1; i >= 0; i--) {
    if (withinbounds(row, i)) {
      if (board[row][i] === "1") {
        //pinning situation
        board[row][i] = piece;
        board[row][col] = "1";
        if (!checkKingSafety(board, color, wKingPos, bKingPos)) {
          board[row][i] = "1";
          board[row][col] = piece;
          continue;
        }
        board[row][i] = "1";
        board[row][col] = piece;
        moves.push(ogPos + row + i);
        continue;
      } else {
        if (isUpperCase(board[row][col]) === isUpperCase(board[row][i])) {
          break outer;
        } else {
          //pinning situation
          const dummyPiece = board[row][i];
          board[row][i] = piece;
          board[row][col] = "1";
          if (!checkKingSafety(board, color, wKingPos, bKingPos)) {
            board[row][i] = dummyPiece;
            board[row][col] = piece;
            break outer;
          }
          board[row][i] = dummyPiece;
          board[row][col] = piece;
          moves.push(ogPos + row + i);
          break outer;
        }
      }
    }
  }
  return moves;
}

export function updateCastleString(
  piece: string,
  srcRow: number,
  srcCol: number,
  wCastle: MutableRefObject<"" | "KQ" | "K" | "Q">,
  bCastle: MutableRefObject<"" | "kq" | "k" | "q">
) {
  if (isUpperCase(piece)) {
    //white
    if (srcRow == 7 && srcCol == 7) {
      //king side castle fen string update
      const castleValue = wCastle.current.replace("K", "") as "" | "Q";
      wCastle.current =
        wCastle.current.indexOf("K") !== -1 ? castleValue : wCastle.current;
    }
    if (srcRow == 7 && srcCol == 0) {
      //queen side castle fen string update
      const castleValue = wCastle.current.replace("Q", "") as "" | "K";
      wCastle.current =
        wCastle.current.indexOf("Q") != -1 ? castleValue : wCastle.current;
    }
  }
  if (!isUpperCase(piece)) {
    //black
    if (srcRow == 7 && srcCol == 7) {
      //queen side castle fen string update
      const castleValue = bCastle.current.replace("q", "") as "" | "k";
      bCastle.current =
        bCastle.current.indexOf("q") != -1 ? castleValue : bCastle.current;
    }
    if (srcRow == 7 && srcCol == 0) {
      //king side castle fen string update
      const castleValue = bCastle.current.replace("k", "") as "" | "q";
      bCastle.current =
        bCastle.current.indexOf("k") !== -1 ? castleValue : bCastle.current;
    }
  }
}
