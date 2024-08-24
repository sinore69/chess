import { promotionData } from "@/types/promotion";
import { checkKingSafety } from "./undercheck";
import { isvalidmove } from "./validator/isvalidmove";
import { iscastle, isvalidkingmove } from "./validator/king";
import { EnPassantMove } from "./validator/pawn";
import AllValidMove from "./AllValidMove";

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
  promotion: React.MutableRefObject<promotionData>
) {
  let kingSafety: boolean = true;
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
  let allValidMove = new Set<string>();
  AllValidMove(board, color, allValidMove);
  console.log(allValidMove)

  // if (
  //   (piece === "p" || piece === "P") &&
  //   enPassant.current !== "" &&
  //   EnPassantMove(destRow, destCol, color, enPassant)
  // ) {
  //   newboard[srcRow][srcCol] = "1";
  //   newboard[destRow][destCol] = piece;
  //   newboard[Number(7 - parseInt(enPassant.current.charAt(1)) + 1)][
  //     Number(7 - parseInt(enPassant.current.charAt(2)))
  //   ] = "1";
  //   enPassant.current = "";
  //   kingSafety = checkKingSafety(newboard, color, wKingPos, bKingPos);
  // }
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
      wKingPos,
      bKingPos,
      enPassant,
      promotion,
      allValidMove
    )
  ) {
    newboard[srcRow][srcCol] = "1";
    newboard[destRow][destCol] = piece;
  }

  if (piece === "k" || piece === "K") {
    newboard = iscastle(
      srcRow,
      srcCol,
      destRow,
      destCol,
      board,
      color,
      wCastle,
      bCastle
    );
    if (
      isvalidkingmove(
        srcRow,
        srcCol,
        destRow,
        destCol,
        piece,
        color,
        board,
        wCastle,
        bCastle
      )
    ) {
      newboard[srcRow][srcCol] = "1";
      newboard[destRow][destCol] = piece;
      if (color === "w") {
        wCastle.current = "";
      }
      if (color === "b") {
        bCastle.current = "";
      }
    }
  }
  return kingSafety ? [...newboard] : [...board];
}
