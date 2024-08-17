export function initialgamestate(color: string) {
  let board = [
    ["1", "1", "1", "1", "1", "1", "1", "1"],
    ["1", "1", "1", "1", "1", "1", "1", "1"],
    ["1", "1", "1", "1", "1", "1", "1", "1"],
    ["1", "1", "1", "1", "1", "1", "1", "1"],
    ["1", "1", "1", "1", "1", "1", "1", "1"],
    ["1", "1", "1", "1", "1", "1", "1", "1"],
    ["1", "1", "1", "1", "1", "1", "1", "1"],
    ["1", "1", "1", "1", "1", "1", "1", "1"],
  ];
  let pieces = "rnbqkbnr";
  const pawn = "p";
  if (color === "w") {
    for (let i = 0; i < 8; i++) {
      board[0][i] = pieces.charAt(i);
      // board[1][i] = pawn;
      // board[6][i] = pawn.toUpperCase();
      board[7][i] = pieces.charAt(i).toUpperCase();
    }
  } else {
    pieces = pieces.split("").reverse().join("");
    for (let i = 0; i < 8; i++) {
      board[0][i] = pieces.charAt(i).toUpperCase();
      // board[1][i] = pawn.toUpperCase();
      // board[6][i] = pawn;
      board[7][i] = pieces.charAt(i);
    }
  }
  // board[1][1]="P"
  // board[6][1]="p"
  // board[1][6]="P"
  // board[6][6]="p"
  return board;
}
