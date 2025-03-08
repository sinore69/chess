import React, { useState } from "react";
import { useRouter } from "next/navigation";

function GameControl() {
  const [showTimeControl, setShowTimeControl] = useState(false);
  const [chooseColor, setChooseColor] = useState(true);
  const [gameTime, setGameTime] = useState<3 | 5 | 10>(3);
  const [color, setColor] = useState<"w" | "b">("w");
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  function ShowTimeControl() {
    setShowTimeControl(true);
    setChooseColor(false);
  }
  function HideTimeControl() {
    setShowTimeControl(false);
    setChooseColor(true);
  }
  function startGame() {
    setLoading(true);
    if (showTimeControl) {
      router.push("/create");
      sessionStorage.setItem("gameTime", "" + gameTime);
    } else {
      router.push(`/bot/${color}`);
    }
  }

  const handler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const roomId = (
      document.getElementById("roomId") as HTMLInputElement
    ).value.trim();
    if (roomId.length !== 4 || isNaN(Number(roomId))) {
      alert("Room ID must be a 4-digit number.");
      return;
    }
    setLoading(true);
    router.push(`/join/${roomId}`);
  };

  function changeTimeControl(time: number) {
    if (time === 3 || time === 5 || time === 10) {
      setGameTime(time);
    }
  }
  function changeColorToBlack() {
    setColor("b");
  }
  function changeColorToWhite() {
    setColor("w");
  }

  return (
    <div className="w-[375px] sm:w-[420px]">
      {loading && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}

      <div className="p-3 bg-gray-900 text-white rounded-lg shadow-md border border-gray-700">
        <div className="p-6 text-center text-3xl font-bold border-b border-gray-700">
          Play Against
        </div>

        <div className="flex justify-center p-6 gap-4">
          <button
            className={`border-2 ${
              !showTimeControl
                ? "border-blue-500 shadow-md shadow-blue-500/30 scale-105"
                : "border-gray-700"
            } bg-gray-800 text-white py-2 px-6 rounded-md font-semibold hover:bg-gray-700 transition-transform`}
            onClick={HideTimeControl}
          >
            Computer
          </button>
          <button
            className={`border-2 ${
              showTimeControl
                ? "border-blue-500 shadow-md shadow-blue-500/30 scale-105"
                : "border-gray-700"
            } bg-gray-800 text-white py-2 px-6 rounded-md font-semibold hover:bg-gray-700 transition-transform`}
            onClick={ShowTimeControl}
          >
            Friend
          </button>
        </div>

        {showTimeControl && (
          <div>
            <div className="text-center text-2xl font-bold border-b border-gray-700 pb-4">
              Time Control
            </div>
            <div className="flex justify-center gap-4 p-6">
              {[3, 5, 10].map((time) => (
                <button
                  key={time}
                  className={`border-2 ${
                    gameTime === time
                      ? "border-blue-500 shadow-md shadow-blue-500/30 scale-105"
                      : "border-gray-700"
                  } bg-gray-800 text-white py-2 px-4 rounded-md font-semibold hover:bg-gray-700 transition-transform`}
                  onClick={() => changeTimeControl(time)}
                >
                  {time}
                </button>
              ))}
            </div>
          </div>
        )}

        {chooseColor && (
          <div>
            <div className="text-center text-2xl font-bold border-b border-gray-700 pb-4">
              Choose Color
            </div>
            <div className="flex justify-center gap-4 p-6">
              <button
                className={`border-2 ${
                  color === "w"
                    ? "border-blue-500 shadow-md shadow-blue-500/30 scale-105"
                    : "border-gray-700"
                } bg-gray-800 text-white py-2 px-4 rounded-md font-semibold hover:bg-gray-700 transition-transform`}
                onClick={changeColorToWhite}
              >
                White
              </button>
              <button
                className={`border-2 ${
                  color === "b"
                    ? "border-blue-500 shadow-md shadow-blue-500/30 scale-105"
                    : "border-gray-700"
                } bg-gray-800 text-white py-2 px-4 rounded-md font-semibold hover:bg-gray-700 transition-transform`}
                onClick={changeColorToBlack}
              >
                Black
              </button>
            </div>
          </div>
        )}

        <div className="flex justify-center p-6 border-b border-gray-700">
          <button
            className="border-2 border-blue-500 bg-gray-800 text-white py-3 px-10 text-2xl font-semibold rounded-md hover:bg-gray-700 shadow-md shadow-blue-500/30 scale-105 transition-transform"
            onClick={startGame}
          >
            Play
          </button>
        </div>

        <div className="">
          <form
            onSubmit={handler}
            className="flex flex-col items-center bg-gray-800 pt-3 pb-6 pr-6 pl-6 rounded-lg shadow-md border border-gray-700"
          >
            <label
              htmlFor="roomId"
              className="text-gray-300 text-lg font-semibold mb-2 pb-2"
            >
              Enter Room ID
            </label>
            <input
              className="w-full p-2 border-2 border-gray-600 rounded-md bg-gray-700 text-white text-center text-lg focus:outline-none focus:border-blue-500 focus:shadow-md focus:shadow-blue-500/30 transition-transform"
              type="text"
              id="roomId"
              placeholder="4-digit Room ID"
              autoComplete="off"
            />
            <button
              className="mt-4 w-full border-2 border-blue-500 bg-gray-800 text-white font-semibold py-2 rounded-md hover:bg-gray-700 shadow-md shadow-blue-500/30 scale-105 transition-transform"
              type="submit"
            >
              Join Room
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default GameControl;
