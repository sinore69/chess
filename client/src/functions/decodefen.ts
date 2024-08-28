import { isUpperCase } from "./isuppercase";

export function decodefen(
  fen: string,
  wCastle: React.MutableRefObject<"" | "KQ" | "K" | "Q">,
  bCastle: React.MutableRefObject<"" | "kq" | "k" | "q">,
  wKingPos: React.MutableRefObject<string>,
  bKingPos: React.MutableRefObject<string>
) {
  let rows = fen.split(" ")[0].split("/");
  let color = fen.split(" ")[1];
  let castleValue = fen.split(" ")[2];
  let board: string[][] = [];
  let r = 0,
    c = 0;
    console.log(rows)
  rows.forEach((row) => {
    let boardRow: string[] = []; // Initialize each row in the 2D array
    for (let char of row) {
      if (!isNaN(Number(char))) {
        if (char === "k") {
          if (color === "w") {
            bKingPos.current = "" + r + c;
          } else {
            bKingPos.current = "" + (7 - r) + (7 - c);
          }
        }
        if (char === "K") {
          if (color === "w") {
            wKingPos.current = "" + r + c;
          } else {
            wKingPos.current = "" + (7 - r) + (7 - c);
          }
        }
        // If the character is a number, add that many empty squares
        for (let i = 0; i < parseInt(char); i++) {
          boardRow.push("1"); // Using null to represent empty squares
        }
      } else {
        // If the character is a piece, add it to the row
        boardRow.push(char);
      }
    }
    board.push(boardRow); // Add the row to the 2D array
  });
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
