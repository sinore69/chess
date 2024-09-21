import { Fen } from "@/types/fen";
import { decodefen } from "./decodefen";
import { updateTurn } from "./turn";

export async function getMove(
  fen: string,
  setboard: React.Dispatch<React.SetStateAction<string[][]>>,
  wCastle: React.MutableRefObject<"" | "KQ" | "K" | "Q">,
  bCastle: React.MutableRefObject<"" | "kq" | "k" | "q">,
  colorToMove: React.MutableRefObject<"w" | "b">,
  wKingPos: React.MutableRefObject<string>,
  bKingPos: React.MutableRefObject<string>,
  validMoves: React.MutableRefObject<string>,
  setIsGameOver: React.Dispatch<React.SetStateAction<boolean>>,
  reason: React.MutableRefObject<string>,
  color: string,
  loserColor: React.MutableRefObject<"" | "w" | "b">
) {
  const data = {
    fen: fen,
  };
  const res = await fetch(`http://${process.env.NEXT_PUBLIC_IP}:5000/bot`, {
    method: "POST",
    body: JSON.stringify(data),
  });
  const resp = (await res.json()) as Fen;
  //player win
  if (resp.isGameOver) {
    setIsGameOver(true);
    reason.current = "CheckMate";
    loserColor.current = color === "w" ? "b" : "w";
    return;
  }
  const newPosition = decodefen(resp.fen, wCastle, bCastle, wKingPos, bKingPos);
  setboard(newPosition);
  colorToMove.current = updateTurn(resp.fen);
  validMoves.current = resp.moves;
  //computer win
  if (validMoves.current.length < 5) {
    setIsGameOver(true);
    reason.current = "CheckMate";
    loserColor.current = color as "w" | "b";
  }
  // console.log(validMoves.current);
}

export async function getFirstMove(validMoves: React.MutableRefObject<string>) {
  const res = await fetch(
    `http://${process.env.NEXT_PUBLIC_IP}:5000/bot/getfirstmove`,
    {
      method: "GET",
    }
  );
  const resp = (await res.json()) as Fen;
  // console.log(resp.moves);
  validMoves.current = resp.moves;
}
