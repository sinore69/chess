import { isvalidbishopmove } from "./bishop";
import { isvalidrookmove } from "./rook";
export function isvalidqueenmove(
  rowindex: number,
  colindex: number,
  x: number,
  y: number,
  piece: string,
  board: string[][],
  wCastle: React.MutableRefObject<"" | "KQ" | "K" | "Q">,
  bCastle: React.MutableRefObject<"" | "kq" | "k" | "q">,
  color: string,
  isCheck:React.MutableRefObject<boolean>
) {
  if (
    isvalidbishopmove(rowindex, colindex, x, y, piece, board,isCheck) ||
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
  return false;
}
