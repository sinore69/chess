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
        <div className="p-4 bg-gray-800 rounded-lg shadow-md w-80">
          <h2 className="text-lg font-semibold mb-2">Move List</h2>
          <ul className="text-sm">
            {moves.length === 0 ? (
              <li className="text-gray-400">No moves yet</li>
            ) : (
              moves.map((move, index) => (
                <li key={index} className="border-b border-gray-600 py-1">
                  {index + 1}. {move}
                </li>
              ))
            )}
          </ul>
        </div>
      )}
    </div>
  );
};

export default GameLog;

// export default function GameLog(){
//   const [showTimeControl, setShowTimeControl] = useState<boolean>(false);
//   const [chooseColor, setChooseColor] = useState<boolean>(true);
//   const [gameTime, setGameTime] = useState<3 | 5 | 10>(3);
//   const [color, setColor] = useState<"w" | "b">("w");
//   const router = useRouter();
//   const [loading, setLoading] = useState<boolean>(false);
//   function ShowTimeControl() {
//     setShowTimeControl(true);
//     setChooseColor(false);
//   }
//   function HideTimeControl() {
//     setShowTimeControl(false);
//     setChooseColor(true);
//   }
//   function startGame() {
//     if (showTimeControl) {
//       setLoading(true);
//       router.push("/create");
//       sessionStorage.setItem("gameTime", "" + gameTime);
//     } else {
//       setLoading(true);
//       router.push(`/bot/${color}`);
//     }
//   }
//   function handler(e: any) {
//     e.preventDefault();
//     setLoading(true);
//     router.push("/join");
//   }
//   function changeTimeControl(time: number) {
//     if (time === 3 || time === 5 || time === 10) {
//       setGameTime(time);
//     }
//   }
//   function changeColorToBlack() {
//     setColor("b");
//   }
//   function changeColorToWhite() {
//     setColor("w");
//   }

// return (
//   <div className="w-[375px] sm:w-[420px]">
//       {loading ? (
//         <div className="fixed inset-0 flex items-center justify-center">
//           <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
//         </div>
//       ) : (
//         <></>
//       )}
//       <div className="p-3 lg:h-[100%] lg:w-[100%] bg-gray-800 flex flex-col text-white rounded-lg">
//         <div className="p-6 pl-20 sm:pl-28 text-3xl font-bold border-b-2 border-white">
//           Play Against
//         </div>
//         <div className="flex flex-row p-6 sm:pl-14">
//           <button
//             className={`border-${
//               showTimeControl ? "[1px]" : "[3px]"
//             } border-white pt-2 pb-2 pl-6 pr-6 rounded-md font-bold text-lg hover:bg-gray-700`}
//             onClick={HideTimeControl}
//           >
//             Computer
//           </button>
//           <button className="pl-2 pr-2" disabled={true}>
//             |
//           </button>
//           <button
//             className={`border-${
//               showTimeControl ? "[3px]" : "[1px]"
//             } border-white pt-2 pb-2 pl-10 pr-10 rounded-md font-bold text-lg hover:bg-gray-700`}
//             onClick={ShowTimeControl}
//           >
//             Friend
//           </button>
//         </div>
//         {showTimeControl ? (
//           <div>
//             <div className="pl-24 sm:pl-32 pt-2 text-2xl font-bold border-b-2 border-white pb-4">
//               Time Control
//             </div>
//             <div className="p-6 pl-[70px] sm:pl-28">
//               <button
//                 className={`rounded-md border-white p-2 pl-4 pr-4 ${
//                   gameTime === 3 ? `border-[3px]` : `border-2`
//                 } hover:bg-gray-700`}
//                 onClick={() => changeTimeControl(3)}
//               >
//                 3
//               </button>
//               <button className="p-3" disabled={true}>
//                 |
//               </button>
//               <button
//                 className={`rounded-md border-white p-2 pl-4 pr-4 ${
//                   gameTime === 5 ? `border-[3px]` : `border-2`
//                 } hover:bg-gray-700`}
//                 onClick={() => changeTimeControl(5)}
//               >
//                 5
//               </button>
//               <button className="p-3" disabled={true}>
//                 |
//               </button>
//               <button
//                 className={`rounded-md border-white p-2 pl-4 pr-4 ${
//                   gameTime === 10 ? `border-[3px]` : `border-2`
//                 } hover:bg-gray-700`}
//                 onClick={() => changeTimeControl(10)}
//               >
//                 10
//               </button>
//             </div>
//           </div>
//         ) : (
//           <></>
//         )}
//         {chooseColor ? (
//           <div className="">
//             <div className="pl-24 sm:pl-32 pt-2 text-2xl font-bold border-b-2 border-white pb-4">
//               Choose Color
//             </div>
//             <div className="p-6 pl-20 sm:pl-28">
//               <button
//                 className={`rounded-md border-white p-2 pl-4 pr-4 ${
//                   color === "w" ? "border-[3px]" : "border-[1px]"
//                 } hover:bg-gray-700`}
//                 onClick={changeColorToWhite}
//               >
//                 White
//               </button>
//               <button className="p-3" disabled={true}>
//                 |
//               </button>
//               <button
//                 className={`border-[1px] rounded-md border-white p-2 pl-4 pr-4 ${
//                   color === "b" ? "focus:border-[3px]" : "border-[1px]"
//                 } hover:bg-gray-700`}
//                 onClick={changeColorToBlack}
//               >
//                 Black
//               </button>
//             </div>
//           </div>
//         ) : (
//           <></>
//         )}
//         <div className="flex p-4 pl-16 sm:pl-24 border-b-2 border-white pb-8">
//           <button
//             className="border-2 rounded-md border-white p-4 pl-20 pr-20 text-2xl font-semibold hover:bg-gray-700"
//             onClick={startGame}
//           >
//             Play
//           </button>
//         </div>
//         <div className="pl-14 sm:pl-24 p-12">
//           <form onSubmit={handler}>
//             <input
//               className="p-1"
//               type="text"
//               id="roomId"
//               placeholder="Room Id"
//             />
//             <button className="pl-16 sm:pl-16 text-l" type="submit">
//               Join Room
//             </button>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// }
