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
  validMoves: React.MutableRefObject<string>
) {
  const data = {
    fen: fen,
  };
  const res = await fetch(`https://${process.env.NEXT_PUBLIC_IP}:5443/bot`, {
    method: "POST",
    body: JSON.stringify(data),
  });
  const resp = (await res.json()) as Fen;
  const newPosition = decodefen(resp.fen, wCastle, bCastle, wKingPos, bKingPos);
  setboard(newPosition);
  colorToMove.current = updateTurn(resp.fen);
  validMoves.current = resp.moves;
  // console.log(validMoves.current);
}

export async function getFirstMove(validMoves: React.MutableRefObject<string>) {
  const res = await fetch(
    `https://${process.env.NEXT_PUBLIC_IP}:5443/bot/getfirstmove`,
    {
      method: "GET",
    }
  );
  const resp = (await res.json()) as Fen;
  // console.log(resp.moves);
  validMoves.current = resp.moves;
}
