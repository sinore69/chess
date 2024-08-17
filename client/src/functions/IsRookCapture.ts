export function IsRookCapture(
  board: string[][],
  destRow: number,
  destCol: number,
  wCastle: React.MutableRefObject<string>,
  bCastle: React.MutableRefObject<string>,
  color: string
) {
  if (color === "b") {
    //rook capture
    if (board[destRow][destCol] == "R" && destCol == 0 && destRow == 0) {
      const castleValue = wCastle.current.replace("K", "") as "" | "Q";
      wCastle.current =
        wCastle.current.indexOf("K") != -1 ? castleValue : wCastle.current;
    }
    //rook capture
    if (board[destRow][destCol] == "R" && destCol == 7 && destRow == 0) {
      const castleValue = wCastle.current.replace("Q", "") as "" | "K";
      wCastle.current =
        wCastle.current.indexOf("Q") != -1 ? castleValue : wCastle.current;
    }
  }
  if (color === "w") {
    //rook capture
    if (board[destRow][destCol] == "r" && destCol == 0 && destRow == 0) {
      const castleValue = bCastle.current.replace("q", "") as "" | "k";
      bCastle.current =
        bCastle.current.indexOf("q") != -1 ? castleValue : bCastle.current;
    }
    //rook capture
    if (board[destRow][destCol] == "r" && destCol == 7 && destRow == 0) {
      const castleValue = bCastle.current.replace("k", "") as "" | "q";
      bCastle.current =
        bCastle.current.indexOf("k") != -1 ? castleValue : bCastle.current;
    }
  }
}
