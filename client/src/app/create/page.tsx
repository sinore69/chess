"use client";
import Console from "@/components/Console";
import SocketBoard from "@/components/SocketBoard";
import React, { useEffect, useRef, useState } from "react";

function Page() {
  const [joinCode, setJoinCode] = useState<string>("");
  const connectionState = useRef<boolean>(false);
  const socketRef = useRef<WebSocket | null>(null);
  const [opponentJoined, setOpponentJoined] = useState<boolean>(false);
  useEffect(() => {
    if (!socketRef.current) {
      // Initialize WebSocket only once
      socketRef.current = new WebSocket(
        `${process.env.NEXT_PUBLIC_WS}://${process.env.NEXT_PUBLIC_DOMAIN}/create`
      );

      socketRef.current.onopen = () => {
        connectionState.current = true;
        const gameTime =
          typeof window !== "undefined"
            ? sessionStorage.getItem("gameTime")
            : null;
        socketRef.current?.send(JSON.stringify({ gameTime }));
        console.log("WebSocket connection opened");
      };

      socketRef.current.onmessage = (event) => {
        console.log(event.data);
        const res = JSON.parse(event.data);
        setJoinCode(res.code); // This triggers a re-render
      };

      socketRef.current.onclose = () => {
        console.log("connection closed");
        connectionState.current = false;
      };
    }
  }, []); // Empty dependency array ensures this runs only once

  return (
    <>
      {connectionState.current ? (
        <div className="min-h-screen w-full bg-black overflow-x-hidden overflow-y-auto">
          <div className="flex justify-center w-full px-4 md:px-8">
            <div className="flex flex-col md:flex-row gap-y-4 md:gap-x-6 w-full max-w-6xl border border-green-500">
              <SocketBoard
                movable={true}
                socket={socketRef.current!}
                playAs={"Creator"}
                setOpponentJoined={setOpponentJoined}
              />
              <Console
                mode={"friend"}
                joinCode={joinCode}
                joinLink={`${process.env.NEXT_PUBLIC_HTTP}://${process.env.NEXT_PUBLIC_JOIN_URL}/join/${joinCode}`}
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
