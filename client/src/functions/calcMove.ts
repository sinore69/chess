export function calcLastMove(
  srcRow: number,
  srcCol: number,
  destRow: number,
  destCol: number,
  isCheck: React.MutableRefObject<boolean>
) {
  let lastMove = "" + srcRow + srcCol + destRow + destCol;
  if (isCheck.current) {
    lastMove = lastMove + "+";
  }
  return lastMove;
}

export function fromNumeric(srcRow: number, srcCol: number) {
  return "" + srcRow + srcCol;
}

export function toNumeric(destRow: number, destCol: number) {
  return "" + destRow + destCol;
}
