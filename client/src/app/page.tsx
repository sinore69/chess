"use client";

import Board from "./components/Board";
import Console from "./components/Console";
import { fengenerator } from "./functions/fengenerator";
import { initialgamestate } from "./functions/initialgamestate";
export default function Home() {
  let board: string[][] = [[]];
  for (let i = 0; i < 8; i++) {
    board[i] = [];
    for (let j = 0; j < 8; j++) {
      board[i][j] = "";
    }
  }
  initialgamestate(board);
  fengenerator(board);
  return (
    <>
      <div className="flex flex-row p-1 gap-x-4 bg-slate-400">
          <Board board={board}></Board>
        <Console></Console>
      </div>
    </>
  );
}
