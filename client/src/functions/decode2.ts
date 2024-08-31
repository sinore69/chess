import { MutableRefObject } from "react";

export function decode(
  rows: string[],
  color: string,
  wKingPos: MutableRefObject<string>,
  bKingPos: MutableRefObject<string>
) {
  let board = [];
  for (let i = 0; i < rows.length; i++) {
    let row = rows[i];
    let boardRow = [];
    for (let j = 0; j < row.length; j++) {
      let char = row[j];
      if (isNaN(Number(char))) {
        if (char === "k") {
          if (color === "w") {
            bKingPos.current = "" + i + j;
          } else {
            bKingPos.current = "" + (7 - i) + (7 - j);
          }
        }
        if (char === "K") {
          if (color === "w") {
            wKingPos.current = "" + i + j;
          } else {
            wKingPos.current = "" + (7 - i) + (7 - j);
          }
        }
        boardRow.push(char);
      } else {
        for (let k = 0; k < parseInt(char); k++) {
          boardRow.push("1");
        }
      }
    }
    board.push(boardRow);
  }
  return board;
}

export function reverse(board: string[][]) {
  console.log(board);
  let newBoard = [
    ["1", "1", "1", "1", "1", "1", "1", "1"],
    ["1", "1", "1", "1", "1", "1", "1", "1"],
    ["1", "1", "1", "1", "1", "1", "1", "1"],
    ["1", "1", "1", "1", "1", "1", "1", "1"],
    ["1", "1", "1", "1", "1", "1", "1", "1"],
    ["1", "1", "1", "1", "1", "1", "1", "1"],
    ["1", "1", "1", "1", "1", "1", "1", "1"],
    ["1", "1", "1", "1", "1", "1", "1", "1"],
  ];
  for (let i = 0; i < 8; i++) {
    for (let j = 0; j < 8; j++) {
      newBoard[i][j] = board[7 - i][7 - j];
    }
  }
  console.log(newBoard);
  return newBoard;
}
