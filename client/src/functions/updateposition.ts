import { isvalidmove } from "./validator/isvalidmove";
import { iscastle, isvalidkingmove } from "./validator/king";

export function updateposition(
  board: string[][],
  rowindex: number,
  colindex: number,
  x: number,
  y: number,
  piece: string,
  color: string,
  wCastle: React.MutableRefObject<"" | "KQ" | "K" | "Q">,
  bCastle: React.MutableRefObject<"" | "kq" | "k" | "q">
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
  if (isvalidmove(rowindex, colindex, x, y, piece, board, color,wCastle,bCastle)) {
    newboard[rowindex][colindex] = "1";
    newboard[x][y] = piece;
  }
  if (piece === "k" || piece === "K") {
    newboard = iscastle(
      rowindex,
      colindex,
      x,
      y,
      board,
      color,
      wCastle,
      bCastle
    );
    if (isvalidkingmove(rowindex, colindex, x, y, piece, board)) {
      newboard[rowindex][colindex] = "1";
      newboard[x][y] = piece;
      if(color==="w"){
        wCastle.current=""
      }
      if(color==="b"){
        bCastle.current=""
      }
    }
  }
  return [...newboard];
}
