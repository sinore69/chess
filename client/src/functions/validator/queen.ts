import { isBishopCheck, isvalidbishopmove } from "./bishop";
import { isRookCheck, isvalidrookmove } from "./rook";
export function isvalidqueenmove(
  srcRow: number,
  srcCol: number,
  destRow: number,
  destCol: number,
  piece: string,
  board: string[][],
  wCastle: React.MutableRefObject<"" | "KQ" | "K" | "Q">,
  bCastle: React.MutableRefObject<"" | "kq" | "k" | "q">,
  color: string,
  isCheck: React.MutableRefObject<boolean>
) {
  if (
    isvalidbishopmove(srcRow, srcCol, destRow, destCol, piece, board, isCheck) ||
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
    if (isRookCheck(board, destRow, destCol, piece) || isBishopCheck(destRow, destCol, board, piece)) {
      isCheck.current = true;
    }
    return true;
  }
  return false;
}
