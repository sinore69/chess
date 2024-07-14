"use client";
import Board from "./components/Board";
import Console from "./components/Console";
export default function Home() {
  let board: number[][] = [[]];
  for (let i = 0; i < 8; i++) {
    board[i] = [];
    for (let j = 0; j < 8; j++) {
      board[i][j] = 0;
    }
  }
  return (
    <>
      <div className="flex flex-row p-1 gap-x-4">
        <Board board={board}></Board>
        <Console></Console>
      </div>
    </>
  );
}
//launch a ws connection when modal button is clicked
//return back to the main page with default game state
