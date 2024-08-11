import { isvalidbishopmove } from "./bishop";
import { isKingSafe } from "./king";
import { isvalidknightmove } from "./knight";
import { isvalidpawnmove } from "./pawn";
import { isvalidqueenmove } from "./queen";
import { isvalidrookmove } from "./rook";

export function isvalidmove(
  srcRow: number,
  srcCol: number,
  destRow: number,
  destCol: number,
  piece: string,
  board: string[][],
  color: string,
  wCastle: React.MutableRefObject<"" | "KQ" | "K" | "Q">,
  bCastle: React.MutableRefObject<"" | "kq" | "k" | "q">,
  isCheck: React.MutableRefObject<boolean>,
  isUnderCheck: React.MutableRefObject<boolean>,
  wKingPos: React.MutableRefObject<string>,
  bKingPos: React.MutableRefObject<string>
) {
  if (
    (piece === "p" || piece === "P") &&
    isvalidpawnmove(
      srcRow,
      srcCol,
      destRow,
      destCol,
      piece,
      board,
      color,
      isCheck
    )
  ) {
    board[srcRow][srcCol] = "1";
    board[destRow][destCol] = piece;
    if (color === "w") {
      console.log(wKingPos.current);
      if (
        isKingSafe(
          board,
          parseInt(wKingPos.current.charAt(0)),
          parseInt(wKingPos.current.charAt(1)),
          "K",
          "w"
        )
      ) {
        return true;
      } else {
        return false;
      }
    }
    if (color === "b") {
      if (
        isKingSafe(
          board,
          parseInt(bKingPos.current.charAt(0)),
          parseInt(bKingPos.current.charAt(1)),
          "k",
          "b"
        )
      ) {
        return true;
      } else {
        return false;
      }
    }
  }
  if (
    (piece === "r" || piece === "R") &&
    isvalidrookmove(
      srcRow,
      srcCol,
      destRow,
      destCol,
      piece,
      board,
      wCastle,
      bCastle,
      color,
      isCheck
    )
  ) {
    board[srcRow][srcCol] = "1";
    board[destRow][destCol] = piece;
    if (color === "w") {
      if (
        isKingSafe(
          board,
          parseInt(wKingPos.current.charAt(0)),
          parseInt(wKingPos.current.charAt(1)),
          "K",
          "w"
        )
      ) {
        return true;
      } else {
        return false;
      }
    }
    if (color === "b") {
      if (
        isKingSafe(
          board,
          parseInt(bKingPos.current.charAt(0)),
          parseInt(bKingPos.current.charAt(1)),
          "k",
          "b"
        )
      ) {
        return true;
      } else {
        return false;
      }
    }
  }
  if (
    (piece === "b" || piece === "B") &&
    isvalidbishopmove(srcRow, srcCol, destRow, destCol, piece, board, isCheck)
  ) {
    board[srcRow][srcCol] = "1";
    board[destRow][destCol] = piece;
    if (color === "w") {
      console.log(wKingPos.current);
      if (
        isKingSafe(
          board,
          parseInt(wKingPos.current.charAt(0)),
          parseInt(wKingPos.current.charAt(1)),
          "K",
          "w"
        )
      ) {
        return true;
      } else {
        return false;
      }
    }
    if (color === "b") {
      if (
        isKingSafe(
          board,
          parseInt(bKingPos.current.charAt(0)),
          parseInt(bKingPos.current.charAt(1)),
          "k",
          "b"
        )
      ) {
        return true;
      } else {
        return false;
      }
    }
  }
  if (
    (piece === "q" || piece === "Q") &&
    isvalidqueenmove(
      srcRow,
      srcCol,
      destRow,
      destCol,
      piece,
      board,
      wCastle,
      bCastle,
      color,
      isCheck
    )
  ) {
    board[srcRow][srcCol] = "1";
    board[destRow][destCol] = piece;
    if (color === "w") {
      console.log(wKingPos.current);
      if (
        isKingSafe(
          board,
          parseInt(wKingPos.current.charAt(0)),
          parseInt(wKingPos.current.charAt(1)),
          "K",
          "w"
        )
      ) {
        return true;
      } else {
        return false;
      }
    }
    if (color === "b") {
      if (
        isKingSafe(
          board,
          parseInt(bKingPos.current.charAt(0)),
          parseInt(bKingPos.current.charAt(1)),
          "k",
          "b"
        )
      ) {
        return true;
      } else {
        return false;
      }
    }
  }
  if (
    (piece === "n" || piece === "N") &&
    isvalidknightmove(srcRow, srcCol, destRow, destCol, piece, board, isCheck)
  ) {
    board[srcRow][srcCol] = "1";
    board[destRow][destCol] = piece;
    if (color === "w") {
      console.log(wKingPos.current);
      if (
        isKingSafe(
          board,
          parseInt(wKingPos.current.charAt(0)),
          parseInt(wKingPos.current.charAt(1)),
          "K",
          "w"
        )
      ) {
        return true;
      } else {
        return false;
      }
    }
    if (color === "b") {
      if (
        isKingSafe(
          board,
          parseInt(bKingPos.current.charAt(0)),
          parseInt(bKingPos.current.charAt(1)),
          "k",
          "b"
        )
      ) {
        return true;
      } else {
        return false;
      }
    }
  }
  return false;
}
