"use client";
import Board from "@/components/Board";
import React from "react";

function page({ params }: { params: { color: "w" | "b" } }) {
  return (
    <>
      <div className="flex p-1 gap-x-4 bg-black min-h-screen overflow-auto items-center justify-center w-full">
        <div className="max-w-full max-h-full">
          <Board movable={true} color={params.color} />
        </div>
      </div>
    </>
  );
}

export default page;
