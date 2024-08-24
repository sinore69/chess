import { Fen } from "@/types/fen";
import { decodefen } from "./decodefen";
import { updateTurn } from "./turn";

export async function getMove(
  fen: string,
  setboard: React.Dispatch<React.SetStateAction<string[][]>>,
  wCastle: React.MutableRefObject<"" | "KQ" | "K" | "Q">,
  bCastle: React.MutableRefObject<"" | "kq" | "k" | "q">,
  isCheck: React.MutableRefObject<boolean>,
  colorToMove: React.MutableRefObject<"w" | "b">,
  wKingPos:React.MutableRefObject<string>,
  bKingPos:React.MutableRefObject<string>
) {
  const data = {
    fen: fen,
  };
  const res = await fetch("http://localhost:5000/bot", {
    method: "POST",
    body: JSON.stringify(data),
  });
  const resp = (await res.json()) as Fen;
  const newPosition = decodefen(
    resp.fen,
    wCastle,
    bCastle,
    wKingPos,
    bKingPos
  );
  setboard(newPosition);
  colorToMove.current = updateTurn(resp.fen);
}
