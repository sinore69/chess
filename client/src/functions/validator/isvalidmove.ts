import { isvalidbishopmove } from "./bishop";
import { isvalidknightmove } from "./knight";
import { isvalidpawnmove } from "./pawn";
import { isvalidqueenmove } from "./queen";
import { isvalidrookmove } from "./rook";

export function isvalidmove(
  rowindex: number,
  colindex: number,
  x: number,
  y: number,
  piece: string,
  board: string[][],
  color: string,
  wCastle: React.MutableRefObject<"" | "KQ" | "K" | "Q">,
  bCastle: React.MutableRefObject<"" | "kq" | "k" | "q">,
  isCheck: React.MutableRefObject<boolean>
) {
  if (
    (piece === "p" || piece === "P") &&
    isvalidpawnmove(rowindex, colindex, x, y, piece, board, color)
  ) {
    return true;
  }
  if (
    (piece === "r" || piece === "R") &&
    isvalidrookmove(
      rowindex,
      colindex,
      x,
      y,
      piece,
      board,
      wCastle,
      bCastle,
      color
    )
  ) {
    return true;
  }
  if (
    (piece === "b" || piece === "B") &&
    isvalidbishopmove(rowindex, colindex, x, y, piece, board, isCheck)
  ) {
    return true;
  }
  if (
    (piece === "q" || piece === "Q") &&
    isvalidqueenmove(
      rowindex,
      colindex,
      x,
      y,
      piece,
      board,
      wCastle,
      bCastle,
      color,
      isCheck
    )
  ) {
    return true;
  }
  if (
    (piece === "n" || piece === "N") &&
    isvalidknightmove(rowindex, colindex, x, y, piece, board)
  ) {
    return true;
  }
  return false;
}
