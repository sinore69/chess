"use client";
import Console from "@/components/Console";
import SocketBoard from "@/components/SocketBoard";
import React, { useRef, useState, useEffect } from "react";

function Page({ params }: { params: { slug: string } }) {
  const socketRef = useRef<WebSocket | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [opponentJoined, setOpponentJoined] = useState<boolean>(false);
  // console.log(params.slug);
  useEffect(() => {
    if (!socketRef.current) {
      const socket = new WebSocket(
        `${process.env.NEXT_PUBLIC_WS}://${process.env.NEXT_PUBLIC_DOMAIN}/join/${params.slug}`
      );
      socketRef.current = socket;

      socket.onopen = () => {
        console.log("WebSocket connection established");
        setIsConnected(true);
      };

      socket.onclose = () => {
        console.log("WebSocket connection closed");
        setIsConnected(false);
      };
    }
  });

  return (
    <>
      {isConnected && socketRef.current ? (
        <div className="flex justify-center min-h-screen w-full bg-black overflow-hidden">
          <div className="flex gap-x-4 box-border w-full max-w-[90vw] max-h-[90vh] flex-col sm:flex-row">
            <SocketBoard
              movable={true}
              socket={socketRef.current}
              playAs={"Player"}
              setOpponentJoined={setOpponentJoined}
            />
            <Console
              mode={"friend"}
              joinCode=""
              joinLink=""
              opponentJoined={opponentJoined}
            />
          </div>
        </div>
      ) : null}
    </>
  );
}

export default Page;
