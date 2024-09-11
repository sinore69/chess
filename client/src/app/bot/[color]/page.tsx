"use client";
import Board from "@/components/Board";
import React from "react";

export const runtime = "edge";
function page({ params }: { params: { color: "w" | "b" } }) {
  return (
    <>
      <div className="flex p-1 gap-x-4 bg-black">
        <Board movable={true} color={params.color}></Board>
      </div>
    </>
  );
}

export default page;
