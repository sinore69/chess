"use client";
import Board from "../components/Board";
import Console from "../components/Console";
import Header from "../components/Header";

export default function Home() {
  return (
    <>
      <div className="">
        <div className="flex p-1 gap-x-4 bg-black min-h-screen overflow-hidden items-center justify-center w-full flex-col">
          <Header></Header>
          <div className="flex max-w-full max-h-full flex-col lg:flex-row gap-x-4 animate-fadeInUp justify-center">
            <Board movable={false} color={"w"}></Board>
            <Console
              mode={"bot"}
              joinCode=""
              joinLink=""
            ></Console>
          </div>
        </div>
      </div>
    </>
  );
}
