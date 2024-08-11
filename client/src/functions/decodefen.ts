import { isUpperCase } from "./isuppercase";

export function decodefen(
  fen: string,
  lastMove: string,
  isCheck: React.MutableRefObject<boolean>,
  wCastle: React.MutableRefObject<"" | "KQ" | "K" | "Q">,
  bCastle: React.MutableRefObject<"" | "kq" | "k" | "q">,
  wKingPos: React.MutableRefObject<string>,
  bKingPos: React.MutableRefObject<string>
) {
  const rows = fen.split(" ")[0].split("/");
  const color = fen.split(" ")[1];
  const castleValue = fen.split(" ")[2];
  let board = [];
  let r = 0,
    c = 0;
  for (let row of rows) {
    const boardRow = [];
    for (let char of row) {
      if (isNaN(Number(char))) {
        if (char === "k") {
          if (color === "w") {
            bKingPos.current = "" + r + c;
          } else {
            bKingPos.current = "" + (7 - r) + (7-c);
          }
        }
        if (char === "K") {
          if (color === "w") {
            wKingPos.current = "" + r + c;
          } else {
            wKingPos.current = "" + (7 - r) + (7 - c);
          }
        }
        boardRow.push(char);
        c++
      } else {
        for (let i = 0; i < parseInt(char); i++) {
          boardRow.push("1");
          c++
        }
      }
    }
    r++;
    c = 0;
    board.push(boardRow);
  }
  //check if rook is captured or not and update fen string accordingly
  let wcastlevalue = "";
  let bcastlevalue = "";
  if (castleValue) {
    for (let i = 0; i < castleValue.length; i++) {
      if (isUpperCase(castleValue.charAt(i))) {
        wcastlevalue += castleValue.charAt(i);
      } else {
        bcastlevalue += castleValue.charAt(i);
      }
    }
  }
  wCastle.current = wcastlevalue as "" | "KQ" | "K" | "Q";
  bCastle.current = bcastlevalue as "" | "kq" | "k" | "q";
  if (color === "w") {
    return board;
  } else {
    return board.reverse().map((row) => row.reverse()) as string[][];
  }
}
