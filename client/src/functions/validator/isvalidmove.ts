import { checkKingSafety } from "../undercheck";
import { isvalidbishopmove } from "./bishop";
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
    return checkKingSafety(board,color,wKingPos,bKingPos)
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
    return checkKingSafety(board,color,wKingPos,bKingPos)
  }
  if (
    (piece === "b" || piece === "B") &&
    isvalidbishopmove(srcRow, srcCol, destRow, destCol, piece, board, isCheck)
  ) {
    board[srcRow][srcCol] = "1";
    board[destRow][destCol] = piece;
    return checkKingSafety(board,color,wKingPos,bKingPos)
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
    return checkKingSafety(board,color,wKingPos,bKingPos)
  }
  if (
    (piece === "n" || piece === "N") &&
    isvalidknightmove(srcRow, srcCol, destRow, destCol, piece, board, isCheck)
  ) {
    board[srcRow][srcCol] = "1";
    board[destRow][destCol] = piece;
    return checkKingSafety(board,color,wKingPos,bKingPos)
  }
  return false;
}
