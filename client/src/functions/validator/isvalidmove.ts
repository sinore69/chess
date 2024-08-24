import { promotionData } from "@/types/promotion";
import { checkKingSafety } from "../undercheck";
import { isBishopCheck, isvalidbishopmove } from "./bishop";
import { isKnightCheck, isvalidknightmove } from "./knight";
import { isValidPawnmove } from "./pawn";
import { isQueenCheck, isvalidqueenmove } from "./queen";
import { isRookCheck, isvalidrookmove, updateCastleString } from "./rook";
import { IsRookCapture } from "../IsRookCapture";

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
  wKingPos: React.MutableRefObject<string>,
  bKingPos: React.MutableRefObject<string>,
  enPassant: React.MutableRefObject<string>,
  promotion: React.MutableRefObject<promotionData>,
  allPossibleMove: Set<string>
) {
  const moveMade = piece + srcRow + srcCol + destRow + destCol;
  if (allPossibleMove.has(moveMade)) {
    switch (piece) {
      case "r":
      case "R":
        updateCastleString(piece, srcRow, srcCol, wCastle, bCastle);
        IsRookCapture(board, destRow, destCol, wCastle, bCastle, color);
        isRookCheck(board, destRow, destCol, piece, isCheck);
        break;
      case "n":
      case "N":
        IsRookCapture(board, destRow, destCol, wCastle, bCastle, color);
        isKnightCheck(board,destRow,destCol,piece,isCheck)
        break;
      case "b":
      case "B":
        IsRookCapture(board, destRow, destCol, wCastle, bCastle, color);
        isBishopCheck(destRow, destCol, board, piece, isCheck);
        break;
      case "q":
      case "Q":
        isQueenCheck(board, destRow, destCol, piece, isCheck);
        IsRookCapture(board, destRow, destCol, wCastle, bCastle, color);
        break;
    }
    return true;
  }
  // if (
  //   (piece === "p" || piece === "P") &&
  //   isValidPawnmove(
  //     srcRow,
  //     srcCol,
  //     destRow,
  //     destCol,
  //     piece,
  //     board,
  //     color,
  //     isCheck,
  //     enPassant,
  //     promotion,
  //     wCastle,
  //     bCastle
  //   )
  // ) {
  //   board[srcRow][srcCol] = "1";
  //   board[destRow][destCol] = piece;
  //   return checkKingSafety(board, color, wKingPos, bKingPos);
  // }
  // if (
  //   (piece === "r" || piece === "R") &&
  //   isvalidrookmove(
  //     srcRow,
  //     srcCol,
  //     destRow,
  //     destCol,
  //     piece,
  //     board,
  //     wCastle,
  //     bCastle,
  //     color,
  //     isCheck
  //   )
  // ) {
  //   board[srcRow][srcCol] = "1";
  //   board[destRow][destCol] = piece;
  //   return checkKingSafety(board, color, wKingPos, bKingPos);
  // }
  // if (
  //   (piece === "b" || piece === "B") &&
  //   isvalidbishopmove(
  //     srcRow,
  //     srcCol,
  //     destRow,
  //     destCol,
  //     piece,
  //     board,
  //     isCheck,
  //     wCastle,
  //     bCastle,
  //     color
  //   )
  // ) {
  //   board[srcRow][srcCol] = "1";
  //   board[destRow][destCol] = piece;
  //   return checkKingSafety(board, color, wKingPos, bKingPos);
  // }
  // if (
  //   (piece === "q" || piece === "Q") &&
  //   isvalidqueenmove(
  //     srcRow,
  //     srcCol,
  //     destRow,
  //     destCol,
  //     piece,
  //     board,
  //     wCastle,
  //     bCastle,
  //     color,
  //     isCheck
  //   )
  // ) {
  //   board[srcRow][srcCol] = "1";
  //   board[destRow][destCol] = piece;
  //   return checkKingSafety(board, color, wKingPos, bKingPos);
  // }
  // if (
  //   (piece === "n" || piece === "N") &&
  //   isvalidknightmove(
  //     srcRow,
  //     srcCol,
  //     destRow,
  //     destCol,
  //     piece,
  //     board,
  //     isCheck,
  //     wCastle,
  //     bCastle,
  //     color
  //   )
  // ) {
  //   board[srcRow][srcCol] = "1";
  //   board[destRow][destCol] = piece;
  //   return checkKingSafety(board, color, wKingPos, bKingPos);
  // }
  return false;
}
