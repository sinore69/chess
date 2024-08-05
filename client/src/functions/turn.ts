export function turn(colorToMove: string, value: string) {
  if (colorToMove === "w" && value === value.toUpperCase()) {
    return true;
  }
  if (colorToMove === "b" && value === value.toLowerCase()) {
    return true;
  }
  return false;
}
export function socketturn(colorToMove: string, color: string){
  return color===colorToMove
}
export function updateTurn(fen:string){
    const fenarray=fen.split(" ")
    return fenarray[1] as "w"|"b"
}