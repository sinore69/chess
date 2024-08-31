import { decode, reverse } from "./decode2";
import { isUpperCase } from "./isuppercase";

export function decodefen(
  fen: string,
  wCastle: React.MutableRefObject<"" | "KQ" | "K" | "Q">,
  bCastle: React.MutableRefObject<"" | "kq" | "k" | "q">,
  wKingPos: React.MutableRefObject<string>,
  bKingPos: React.MutableRefObject<string>
) {
  const rows = fen.split(" ")[0].split("/");
  const color = fen.split(" ")[1];
  const castleValue = fen.split(" ")[2];
  let dummyBoard = decode(rows, color, wKingPos, bKingPos);
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
  return dummyBoard;
}
