import { MutableRefObject } from "react";
import { allBishopMove } from "./validator/bishop";
import { allKingMove } from "./validator/king";
import { allKnightMoves } from "./validator/knight";
import { allPawnMove } from "./validator/pawn";
import { allQueenMoves } from "./validator/queen";
import { allRookMoves } from "./validator/rook";

function AllValidMove(
  board: string[][],
  color: string,
  set: Set<string>,
  wKingPos: MutableRefObject<string>,
  bKingPos: MutableRefObject<string>
) {
  let pawn = "p",
    rook = "r",
    knight = "n",
    bishop = "b",
    queen = "q",
    king = "k";
  if (color === "w") {
    pawn = pawn.toUpperCase();
    rook = rook.toUpperCase();
    knight = knight.toUpperCase();
    bishop = bishop.toUpperCase();
    queen = queen.toUpperCase();
    king = king.toUpperCase();
  }
  for (let row = 0; row < 8; row++) {
    for (let col = 0; col < 8; col++) {
      switch (board[row][col]) {
        case "1":
          break;
        case pawn:
          const pawnMoves = allPawnMove(
            board,
            color,
            row,
            col,
            board[row][col],
            wKingPos,
            bKingPos
          );
          addToSet(set, pawnMoves);
          break;
        case rook:
          const rookMoves = allRookMoves(
            board,
            color,
            row,
            col,
            board[row][col],
            wKingPos,
            bKingPos
          );
          addToSet(set, rookMoves);
          break;
        case knight:
          const knightMoves = allKnightMoves(
            board,
            color,
            row,
            col,
            board[row][col],
            wKingPos,
            bKingPos
          );
          addToSet(set, knightMoves);
          break;
        case bishop:
          const bishopMoves = allBishopMove(
            board,
            color,
            row,
            col,
            board[row][col],
            wKingPos,
            bKingPos
          );
          addToSet(set, bishopMoves);
          break;
        case queen:
          const queenMoves = allQueenMoves(
            board,
            color,
            row,
            col,
            board[row][col],
            wKingPos,
            bKingPos
          );
          addToSet(set, queenMoves);
          break;
        case king:
          const kingMoves = allKingMove(
            board,
            color,
            row,
            col,
            board[row][col]
          );
          addToSet(set, kingMoves);
          break;
        default:
          console.log("something unexpected happened");
          break;
      }
    }
  }

  return set;
}
function addToSet(set: Set<string>, moves: string[]) {
  for (let i = 0; i < moves.length; i++) {
    set.add(moves[i]);
  }
}
export default AllValidMove;
