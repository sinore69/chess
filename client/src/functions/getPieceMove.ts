export function getPieceMove(
  validMove: string,
  piece: string,
  row: number,
  col: number
) {
  const words = validMove.split(" ");
  const prefix = piece + "" + row + "" + col;
  const matchingWords = words.filter((word) => word.startsWith(prefix));
  const lastTwoChars = matchingWords.map((word) => word.slice(-2));
  return lastTwoChars.join(" ");
}
