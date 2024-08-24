import { MutableRefObject } from "react";
import { allBishopMove, isBishopCheck, isvalidbishopmove } from "./bishop";
import { allRookMoves, isRookCheck, isvalidrookmove } from "./rook";
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
    isvalidbishopmove(
      srcRow,
      srcCol,
      destRow,
      destCol,
      piece,
      board,
      isCheck,
      wCastle,
      bCastle,
      color
    ) ||
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
    isCheck.current = isQueenCheck(board, destRow, destCol, piece);
    return true;
  }
  return false;
}
export function isQueenCheck(
  board: string[][],
  destRow: number,
  destCol: number,
  piece: string
) {
  if (
    isRookCheck(board, destRow, destCol, piece) ||
    isBishopCheck(destRow, destCol, board, piece)
  ) {
    return true;
  }
  return false;
}

export function allQueenMoves(
  board: string[][],
  color: string,
  row: number,
  col: number,
  piece: string
) {
  const ogPos = piece + row + col;
  let moves: string[] = [];
  let rookMoves = allRookMoves(board, color, row, col, piece);
  rookMoves = rookMoves.map((move: string) =>
    move.charAt(0) === "R" ? move.replace("R", "Q") : move.replace("r", "q")
  );
  moves.push(...rookMoves);
  let bishopMoves = allBishopMove(board, color, row, col, piece);
  bishopMoves = bishopMoves.map((move: string) =>
    move.charAt(0) === "B" ? move.replace("B", "Q") : move.replace("b", "q")
  );
  moves.push(...bishopMoves);
  return moves;
}
