"use client";
import Console from "@/components/Console";
import SocketBoard from "@/components/SocketBoard";
import useWebSocket from "@/hooks/useWebSocket";
import React from "react";

function page() {
  const socket = useWebSocket("http://127.0.0.1:5000/friend");
  return (
    <>
      <div className="flex p-1 gap-x-4 bg-slate-400">
        <SocketBoard movable={true} socket={socket}></SocketBoard>
        <Console mode={"friend"}></Console>
      </div>
    </>
  );
}

export default page;
