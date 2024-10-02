"use client";
import Board from "../components/Board";
import Console from "../components/Console";
export default function Home() {
  return (
    <>
      <div className="flex bg-black h-full flex-col sm:flex-row overflow-auto">
        <Board movable={false} color={"w"}></Board>
        <Console mode={"bot"}></Console>
      </div>
    </>
  );
}
