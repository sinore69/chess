"use client";
import Console from "@/components/Console";
import SocketBoard from "@/components/SocketBoard";
import React, { useRef } from "react";

function page() {
  const socket=useRef(new WebSocket("ws://127.0.0.1:5000/friend"))
  socket.current.onopen=(event)=>{
    socket.current.onclose=(event)=>{
      console.log("socket closed")
    }
  }
  return (
    <>
      <div className="flex p-1 gap-x-4 bg-slate-400">
        <SocketBoard movable={true} socket={socket.current}></SocketBoard>
        <Console mode={"friend"}></Console>
      </div>
    </>
  );
}

export default page;
