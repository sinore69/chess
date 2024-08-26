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
      board[1][i] = pawn;
      board[6][i] = pawn.toUpperCase();
      board[7][i] = pieces.charAt(i).toUpperCase();
    }
  } else {
    pieces = pieces.split("").reverse().join("");
    for (let i = 0; i < 8; i++) {
      board[0][i] = pieces.charAt(i).toUpperCase();
      board[1][i] = pawn.toUpperCase();
      board[6][i] = pawn;
      board[7][i] = pieces.charAt(i);
    }
  }
  // board[0][1] = "1";
  // board[0][2] = "1";
  // board[0][5] = "1";
  // board[0][6] = "1";
  // board[7][1] = "1";
  // board[7][2] = "1";
  // board[7][5] = "1";
  // board[7][6] = "1";
  // board[6][3] = "B";
  // board[6][4] = "B";
  // board[1][3] = "r";
  // board[1][4] = "r";
  // board[3][7] = "N";
  // board[3][1] = "N";
  return board;
}
