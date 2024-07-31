import { isUnderCheck } from "./isUnderCheck";
import { isUpperCase } from "./isuppercase";

export function decodefen(
  fen: string,
  lastMove: string,
  underCheck: React.MutableRefObject<boolean>,
  wCastle: React.MutableRefObject<"" | "KQ" | "K" | "Q">,
  bCastle: React.MutableRefObject<"" | "kq" | "k" | "q">
) {
  const rows = fen.split(" ")[0].split("/");
  const color = fen.split(" ")[1];
  const castleValue=fen.split(" ")[2]
  let board = [];
  for (let row of rows) {
    const boardRow = [];
    for (let char of row) {
      if (isNaN(Number(char))) {
        boardRow.push(char);
      } else {
        for (let i = 0; i < parseInt(char); i++) {
          boardRow.push("1");
        }
      }
    }
    board.push(boardRow);
  }
  //check if rook is captured or not and update fen string accordingly
  //underCheck.current=isUnderCheck(board,lastMove,color)
  let wcastlevalue=""
  let bcastlevalue=""
  for(let i=0;i<castleValue.length;i++){
    if(isUpperCase(castleValue.charAt(i))){
      wcastlevalue+=castleValue.charAt(i)
    }else{
      bcastlevalue+=castleValue.charAt(i)
    }
  }
  wCastle.current=wcastlevalue as "" | "KQ" | "K" | "Q"
  bCastle.current=bcastlevalue as "" | "kq" | "k" | "q"
  return color === "w"
    ? board
    : (board.reverse().map((row) => row.reverse()) as string[][]);
}
