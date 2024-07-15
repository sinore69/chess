"use client";
import Board from "./components/Board";
import Console from "./components/Console";
export default function Home() {
  return (
    <>
      <div className="flex p-1 gap-x-4 bg-slate-400">
        <Board></Board>
        <Console></Console>
      </div>
    </>
  );
}
