"use client";
import Board from "@/components/Board";
import React from "react";

function Page({ params }: { params: { color: "w" | "b" } }) {
  return (
    <div className="flex items-center justify-center min-h-screen bg-black sm:p-4">
      <div className="max-w-full max-h-full">
        <Board movable={true} color={params.color} />
      </div>
    </div>
  );
}

export default Page;
