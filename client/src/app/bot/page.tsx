"use client";
import Board from "@/components/Board";
import React from "react";

function page() {
  return (
    <>
      <div className="flex p-1 gap-x-4 bg-slate-400">
        <Board movable={true}></Board>
      </div>
    </>
  );
}

export default page;
