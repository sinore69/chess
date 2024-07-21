export function decodefen(fen: string) {
  const rows = fen.split(" ")[0].split("/");
  const color = fen.split(" ")[1];
  let board = [];
  if (color === "w") {
    for (let row of rows) {
      const boardRow = [];
      for (let char of row) {
        if (isNaN(Number(char))) {
          boardRow.push(char);
        } else {
          for (let i = 0; i < parseInt(char); i++) {
            boardRow.push("1");
          }
        }
      }
      board.push(boardRow);
    }
  }
  if (color === "b") {
    board = board.reverse().map((row) => row.reverse());
  }
  //console.log(board.reverse().map((row) => row.reverse()))
  return board as string[][];
}
