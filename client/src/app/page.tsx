"use client";
import Board from "../components/Board";
import Console from "../components/Console";
export default function Home() {
  return (
    <>
      <div className="flex p-1 gap-x-4 bg-black">
        <Board movable={false} color={"w"}></Board>
        <Console mode={"bot"}></Console>
      </div>
    </>
  );
}
