"use client";
import Board from "@/components/Board";
import React from "react";

function page({ params }: { params: { color: "w" | "b" } }) {
  return (
    <>
      <div className="flex p-1 gap-x-4 bg-black h-full">
        <Board movable={true} color={params.color}></Board>
      </div>
    </>
  );
}

export default page;
