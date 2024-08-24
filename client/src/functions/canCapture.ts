export function canCapture(board: string[][], lastMove: string, color: string) {
  const row = parseInt(lastMove.charAt(2));
  const col = parseInt(lastMove.charAt(3));
  return true;
}
