import { promotionData } from "@/types/promotion";
import { isBishopCheck, } from "./bishop";
import { isKnightCheck, } from "./knight";
import { isPawnCheck, } from "./pawn";
import { isQueenCheck, } from "./queen";
import { isRookCheck, updateCastleString } from "./rook";
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
      case "1":
        break;
      case "p":
      case "P":
        IsRookCapture(board, destRow, destCol, wCastle, bCastle, color);
        isPawnCheck(board, destRow, destCol, -1, piece, isCheck);
        break;
      case "r":
      case "R":
        updateCastleString(piece, srcRow, srcCol, wCastle, bCastle);
        IsRookCapture(board, destRow, destCol, wCastle, bCastle, color);
        isRookCheck(board, destRow, destCol, piece, isCheck);
        break;
      case "n":
      case "N":
        IsRookCapture(board, destRow, destCol, wCastle, bCastle, color);
        isKnightCheck(board, destRow, destCol, piece, isCheck);
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
      case "k":
        IsRookCapture(board, destRow, destCol, wCastle, bCastle, color);
        bCastle.current = "";
        break;
      case "K":
        IsRookCapture(board, destRow, destCol, wCastle, bCastle, color);
        wCastle.current = "";
        break;
      default:
        console.log("something wrong happened");
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
