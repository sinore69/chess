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
        <div className="min-h-screen w-full bg-black overflow-x-hidden overflow-y-auto">
          <div className="flex justify-center w-full px-4 md:px-8">
            <div className="flex flex-col md:flex-row gap-y-4 md:gap-x-6 w-full max-w-6xl">
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
        </div>
      ) : null}
    </>
  );
}

export default Page;
