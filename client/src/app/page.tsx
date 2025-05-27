"use client";
import Board from "../components/Board";
import Console from "../components/Console";
export default function Home() {
  return (
    <>
      <div className="flex p-1 gap-x-4 bg-black min-h-screen overflow-auto items-center justify-center w-full">
        <div className="flex max-w-full max-h-full flex-col sm:flex-row gap-x-4">
          <Board movable={false} color={"w"}></Board>
          <Console
            mode={"bot"}
            joinCode=""
            joinLink=""
          ></Console>
        </div>
      </div>
    </>
  );
}
