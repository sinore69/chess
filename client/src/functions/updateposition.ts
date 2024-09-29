import { promotionData } from "@/types/promotion";
import { isvalidmove } from "./validator/isvalidmove";
import { iscastle } from "./validator/king";
import { MutableRefObject } from "react";

export function updateposition(
  board: string[][],
  srcRow: number,
  srcCol: number,
  destRow: number,
  destCol: number,
  piece: string,
  color: string,
  wCastle: React.MutableRefObject<"" | "KQ" | "K" | "Q">,
  bCastle: React.MutableRefObject<"" | "kq" | "k" | "q">,
  isCheck: React.MutableRefObject<boolean>,
  wKingPos: React.MutableRefObject<string>,
  bKingPos: React.MutableRefObject<string>,
  enPassant: React.MutableRefObject<string>,
  promotion: React.MutableRefObject<promotionData>,
  validMoves: MutableRefObject<string>
) {
  let newboard = [
    ["1", "1", "1", "1", "1", "1", "1", "1"],
    ["1", "1", "1", "1", "1", "1", "1", "1"],
    ["1", "1", "1", "1", "1", "1", "1", "1"],
    ["1", "1", "1", "1", "1", "1", "1", "1"],
    ["1", "1", "1", "1", "1", "1", "1", "1"],
    ["1", "1", "1", "1", "1", "1", "1", "1"],
    ["1", "1", "1", "1", "1", "1", "1", "1"],
    ["1", "1", "1", "1", "1", "1", "1", "1"],
  ];
  for (let i = 0; i < 8; i++) {
    for (let j = 0; j < 8; j++) {
      newboard[i][j] = board[i][j];
    }
  }
  if (piece === "k" || piece === "K") {
    newboard = iscastle(
      srcRow,
      srcCol,
      destRow,
      destCol,
      newboard,
      color,
      wCastle,
      bCastle
    );
  }
  if (
    isvalidmove(
      srcRow,
      srcCol,
      destRow,
      destCol,
      piece,
      board,
      color,
      wCastle,
      bCastle,
      isCheck,
      validMoves
    )
  ) {
    if ((piece === "p" || piece === "P") && destRow === 0) {
      promotion.current.isPromotion = true;
      promotion.current.color = color;
      promotion.current.position = "" + srcRow + srcCol + destRow + destCol;
    }
    newboard[srcRow][srcCol] = "1";
    newboard[destRow][destCol] = piece;
  }
  return [...newboard];
}
