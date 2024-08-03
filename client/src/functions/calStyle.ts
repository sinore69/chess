export function calStyle(color: string, rowindex: number, colindex: number) {
  let style = "";
  if (color === "w") {
    if (colindex == 0) {
      style = style + " left-0 top-0 ";
    }
    if (rowindex == 7) {
      style = style + " bottom-0 right-1 ";
    }
  }
  if (color === "b") {
    if (colindex == 0) {
      style = style + " left-0 top-0 ";
    }
    if (rowindex == 7) {
      style = style + " bottom-0 right-1 ";
    }
  }
  return style;
}
