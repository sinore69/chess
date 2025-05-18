"use client";
import React from "react";
import { useState } from "react";

interface WaitingUIProps {
  opponentJoined: boolean;
  moves: string[];
  joinCode: string;
  joinLink: string;
}

const GameLog: React.FC<WaitingUIProps> = ({
  opponentJoined,
  moves,
  joinCode,
  joinLink,
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(joinLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex items-center justify-center h-screen bg-black text-white">
      {!opponentJoined ? (
        <div className="flex flex-col items-center text-center space-y-4">
          {/* Waiting Message with Blinking Dots */}
          <p className="text-2xl font-semibold">
            Waiting for opponent<span className="animate-blink">...</span>
          </p>
          <p className="text-sm text-gray-400">Share the game link to join</p>

          {/* Joining Code */}
          <div className="bg-gray-700 px-4 py-2 rounded text-lg font-medium">
            Join Code: <span className="font-bold">{joinCode}</span>
          </div>

          {/* Copy Button */}
          <button
            onClick={handleCopy}
            className="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded text-sm transition duration-200"
          >
            {copied ? "Copied!" : "Copy Link"}
          </button>
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
};

export default GameLog;