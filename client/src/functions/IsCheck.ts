import { isBishopCheck } from "./validator/bishop";
import { isKnightCheck } from "./validator/knight";
import { isQueenCheck } from "./validator/queen";
import { isRookCheck } from "./validator/rook";

function IsCheck(
  board: string[][],
  destRow: number,
  destCol: number,
  piece: string,
  isCheck: React.MutableRefObject<boolean>
) {
  if (piece === "Q" || piece === "q") {
    isCheck.current = isQueenCheck(board, destRow, destCol, piece, isCheck);
    return;
  }
  if (piece === "R" || piece === "r") {
    isCheck.current = isRookCheck(board, destRow, destCol, piece, isCheck);
    return;
  }
  if (piece === "B" || piece === "b") {
    isCheck.current = isBishopCheck(destRow, destCol, board, piece, isCheck);
    return;
  }
  if (piece === "N" || piece === "n") {
    isCheck.current = isKnightCheck(board, destRow, destCol, piece, isCheck);
    return;
  }
}

export default IsCheck;
