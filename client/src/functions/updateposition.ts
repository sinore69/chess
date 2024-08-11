import { isvalidmove } from "./validator/isvalidmove";
import { iscastle, isvalidkingmove } from "./validator/king";

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
  isUnderCheck: React.MutableRefObject<boolean>,
  wKingPos:React.MutableRefObject<string>,
  bKingPos:React.MutableRefObject<string>
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
      isUnderCheck,
      wKingPos,
      bKingPos
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
        isUnderCheck
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
  return [...newboard];
}
