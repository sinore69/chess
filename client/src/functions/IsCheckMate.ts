import { MutableRefObject } from "react";
import { withinbounds } from "./withinbounds";
import { isKingSafe } from "./validator/king";
import { isUpperCase } from "./isuppercase";
import { canBlock } from "./canBlock";
import { canCapture } from "./canCapture";

export function IsCheckMate(
  board: string[][],
  wKingPos: MutableRefObject<string>,
  bKingPos: MutableRefObject<string>,
  color: MutableRefObject<"b" | "w">,
  lastMove: string
) {
  //king has no legal move
  let srcRow,
    srcCol,
    destRow,
    destCol,
    piece,
    validMoveCount = 0;
  if (color.current === "w") {
    srcRow = parseInt(wKingPos.current.charAt(0));
    srcCol = parseInt(wKingPos.current.charAt(1));
    piece = "K";
  } else {
    srcRow = parseInt(bKingPos.current.charAt(0));
    srcCol = parseInt(bKingPos.current.charAt(1));
    piece = "k";
  }
  const row = [-1, -1, 0, 1, 1, 1, 0, -1, -1];
  const col = [0, 1, 1, 1, 0, -1, -1, -1];
  for (let i = 0; i < 8; i++) {
    destRow = Number(srcRow) + row[i];
    destCol = Number(srcCol) + col[i];
    if (
      withinbounds(destRow, destCol) &&
      isKingSafe(board, destRow, destCol, piece, color.current)
    ) {
      if (board[destRow][destCol] === "1") {
        validMoveCount++;
        continue;
      } else if (isUpperCase(piece) !== isUpperCase(board[destRow][destCol])) {
        validMoveCount++;
      }
    }
  }
  if (validMoveCount === 0) {
    //attacking piece can be captured or check can be blocked
    if (canBlock() || canCapture(board, lastMove, color.current)) {
      return false;
    }
    console.log("checkmate");
    return true;
  }
}
