"use client";
import Console from "@/components/Console";
import SocketBoard from "@/components/SocketBoard";
import React, { useRef } from "react";

let socket = new WebSocket(`ws://${process.env.NEXT_PUBLIC_DOMAIN}/join`);
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
    <div className="flex justify-center min-h-screen w-full bg-black overflow-hidden">
      <div className="flex gap-x-4 box-border w-full max-w-[90vw] max-h-[90vh] flex-col sm:flex-row">
        <SocketBoard movable={true} socket={socket} playAs={"Player"} />
        <Console mode={"friend"} />
      </div>
    </div>
  ) : null}
</>

  );
}

export default Page;
