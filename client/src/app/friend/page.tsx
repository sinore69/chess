"use client";
import Console from "@/components/Console";
import SocketBoard from "@/components/SocketBoard";
import React from "react";

function page() {
  const socket=new WebSocket("ws://127.0.0.1:5000/friend")
  socket.onopen=(event)=>{
    socket.send("Here's some text that the server is urgently awaiting!");
    socket.onclose=(event)=>{
      console.log("socket closed")
    }
  }
  return (
    <>
      <div className="flex p-1 gap-x-4 bg-slate-400">
        <SocketBoard movable={true}></SocketBoard>
        <Console mode={"friend"}></Console>
      </div>
    </>
  );
}

export default page;
