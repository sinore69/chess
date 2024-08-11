import { isKingSafe } from "./validator/king";

export function IsUnderCheck(lastMove: string) {
  if (lastMove.length === 5) {
    return true;
  }
  return false;
}

export function checkKingSafety(
  board: string[][],
  color: string,
  wKingPos: React.MutableRefObject<string>,
  bKingPos: React.MutableRefObject<string>
) {
  if (color === "w") {
    if (
      isKingSafe(
        board,
        parseInt(wKingPos.current.charAt(0)),
        parseInt(wKingPos.current.charAt(1)),
        "K",
        "w"
      )
    ) {
      return true;
    } else {
      return false;
    }
  }
  if (color === "b") {
    if (
      isKingSafe(
        board,
        parseInt(bKingPos.current.charAt(0)),
        parseInt(bKingPos.current.charAt(1)),
        "k",
        "b"
      )
    ) {
      return true;
    } else {
      return false;
    }
  }
}