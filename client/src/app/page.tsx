"use client";

import { useState } from "react";
import Board from "./components/Board";
import Console from "./components/Console";
import { fengenerator } from "./functions/fengenerator";
import { initialgamestate } from "./functions/initialgamestate";
export default function Home() {
  const [board, setboard] = useState<string[][]>([
    ["1", "1", "1", "1", "1", "1", "1", "1"],
    ["1", "1", "1", "1", "1", "1", "1", "1"],
    ["1", "1", "1", "1", "1", "1", "1", "1"],
    ["1", "1", "1", "1", "1", "1", "1", "1"],
    ["1", "1", "1", "1", "1", "1", "1", "1"],
    ["1", "1", "1", "1", "1", "1", "1", "1"],
    ["1", "1", "1", "1", "1", "1", "1", "1"],
    ["1", "1", "1", "1", "1", "1", "1", "1"],
  ]);
  initialgamestate(board);
  fengenerator(board);
  return (
    <>
      <div className="flex p-1 gap-x-4 bg-slate-400">
        <Board board={board}></Board>
        <Console></Console>
      </div>
    </>
  );
}
