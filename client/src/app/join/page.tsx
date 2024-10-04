"use client";
import Console from "@/components/Console";
import SocketBoard from "@/components/SocketBoard";
import React, { useRef } from "react";

let socket = new WebSocket(`wss://${process.env.NEXT_PUBLIC_DOMAIN}/join`);
function Page() {
  const connectionState = useRef<boolean>(false);
  socket.onopen = (event) => {
    connectionState.current = true;
    console.log("connection opened");
  };
  socket.onclose = (event) => {
    connectionState.current = false;
  };

  return (
    <>
      {connectionState ? (
        <div className="flex gap-x-4 bg-black box-border h-[100%] w-[100%] flex-col sm:flex-row md:flex-row">
          <SocketBoard
            movable={true}
            socket={socket}
            playAs={"Player"}
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
