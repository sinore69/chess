"use client";
import Console from "@/components/Console";
import SocketBoard from "@/components/SocketBoard";
import React, { useRef } from "react";

let socket = new WebSocket(`wss://${process.env.NEXT_PUBLIC_IP}:5000/create`);
let gameTime: string | null;
if (typeof window !== "undefined") {
  gameTime = sessionStorage.getItem("gameTime");
  sessionStorage.getItem("key");
}
function Page() {
  const connectionState = useRef<boolean>(false);
  socket.onopen = (event) => {
    connectionState.current = true;
    socket.send(JSON.stringify({ gameTime: gameTime }));
    console.log("connection opened");
  };
  socket.onclose = (event) => {
    connectionState.current = false;
  };

  return (
    <>
      {connectionState ? (
        <div className="flex p-1 gap-x-4 bg-black box-border max-h-screen min-h-screen">
          <SocketBoard
            movable={true}
            socket={socket}
            playAs={"Creator"}
          ></SocketBoard>
          <Console mode={"friend"}></Console>
        </div>
      ) : (
        <></>
      )}
    </>
  );
}

export default Page;
