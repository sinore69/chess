import { MutableRefObject } from "react";
import { allBishopMove, isBishopCheck, } from "./bishop";
import { allRookMoves, isRookCheck, } from "./rook";

export function isQueenCheck(
  board: string[][],
  destRow: number,
  destCol: number,
  piece: string,
  isCheck: MutableRefObject<boolean>
) {
  if (
    isRookCheck(board, destRow, destCol, piece, isCheck) ||
    isBishopCheck(destRow, destCol, board, piece, isCheck)
  ) {
    isCheck.current = true;
    return true;
  }
  return false;
}

export function allQueenMoves(
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
  let rookMoves = allRookMoves(
    board,
    color,
    row,
    col,
    piece,
    wKingPos,
    bKingPos
  );
  rookMoves = rookMoves.map((move: string) =>
    move.charAt(0) === "R" ? move.replace("R", "Q") : move.replace("r", "q")
  );
  moves.push(...rookMoves);
  let bishopMoves = allBishopMove(
    board,
    color,
    row,
    col,
    piece,
    wKingPos,
    bKingPos
  );
  bishopMoves = bishopMoves.map((move: string) =>
    move.charAt(0) === "B" ? move.replace("B", "Q") : move.replace("b", "q")
  );
  moves.push(...bishopMoves);
  return moves;
}
