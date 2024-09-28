import React, { useState } from "react";
import { useRouter } from "next/navigation";

function GameControl() {
  const [showTimeControl, setShowTimeControl] = useState<boolean>(false);
  const [chooseColor, setChooseColor] = useState<boolean>(true);
  const [gameTime, setGameTime] = useState<3 | 5 | 10>(3);
  const [color, setColor] = useState<"w" | "b">("w");
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);
  function ShowTimeControl() {
    setShowTimeControl(true);
    setChooseColor(false);
  }
  function HideTimeControl() {
    setShowTimeControl(false);
    setChooseColor(true);
  }
  function startGame() {
    if (showTimeControl) {
      setLoading(true);
      router.push("/create");
      sessionStorage.setItem("gameTime", "" + gameTime);
    } else {
      setLoading(true);
      router.push(`/bot/${color}`);
    }
  }
  function handler(e: any) {
    e.preventDefault();
    setLoading(true);
    router.push("/join");
  }
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
    <div className="">
      {loading ? (
        <div className="fixed inset-0 flex items-center justify-center">
          <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : (
        <></>
      )}
      <div className="h-[20px]"></div>
      <div className="p-3 pt-2 lg:h-[100%] lg:w-[100%] bg-gray-900 flex flex-col text-white">
        <div className="p-6 pl-28 text-3xl font-bold border-b-2 border-white">
          Play Against
        </div>
        <div className="flex flex-row p-6 pl-14">
          <button
            className={`border-${
              showTimeControl ? "[1px]" : "[3px]"
            } border-white pt-2 pb-2 pl-6 pr-6 rounded-md font-bold text-lg`}
            onClick={HideTimeControl}
          >
            Computer
          </button>
          <button className="pl-2 pr-2" disabled={true}>
            |
          </button>
          <button
            className={`border-${
              showTimeControl ? "[3px]" : "[1px]"
            } border-white pt-2 pb-2 pl-10 pr-10 rounded-md font-bold text-lg`}
            onClick={ShowTimeControl}
          >
            Friend
          </button>
        </div>
        {showTimeControl ? (
          <div>
            <div className="pl-32 pt-2 text-2xl font-bold border-b-2 border-white pb-4">
              Time Control
            </div>
            <div className="p-6 pl-28">
              <button
                className={`rounded-md border-white p-2 pl-4 pr-4 ${
                  gameTime === 3 ? `border-[3px]` : `border-2`
                }`}
                onClick={() => changeTimeControl(3)}
              >
                3
              </button>
              <button className="p-3" disabled={true}>
                |
              </button>
              <button
                className={`rounded-md border-white p-2 pl-4 pr-4 ${
                  gameTime === 5 ? `border-[3px]` : `border-2`
                }`}
                onClick={() => changeTimeControl(5)}
              >
                5
              </button>
              <button className="p-3" disabled={true}>
                |
              </button>
              <button
                className={`rounded-md border-white p-2 pl-4 pr-4 ${
                  gameTime === 10 ? `border-[3px]` : `border-2`
                }`}
                onClick={() => changeTimeControl(10)}
              >
                10
              </button>
            </div>
          </div>
        ) : (
          <></>
        )}
        {chooseColor ? (
          <div className="">
            <div className="pl-32 pt-2 text-2xl font-bold border-b-2 border-white pb-4">
              Choose Color
            </div>
            <div className="p-6 pl-28">
              <button
                className={` rounded-md border-white p-2 pl-4 pr-4 ${
                  color === "w" ? "border-[3px]" : "border-[1px]"
                }`}
                onClick={changeColorToWhite}
              >
                White
              </button>
              <button className="p-3" disabled={true}>
                |
              </button>
              <button
                className={`border-[1px] rounded-md border-white p-2 pl-4 pr-4 ${
                  color === "b" ? "focus:border-[3px]" : "border-[1px]"
                }`}
                onClick={changeColorToBlack}
              >
                Black
              </button>
            </div>
          </div>
        ) : (
          <></>
        )}
        <div className="flex p-4 pl-24 border-b-2 border-white pb-8">
          <button
            className="border-2 rounded-md border-white p-4 pl-20 pr-20 text-2xl font-semibold hover:bg-gray-700"
            onClick={startGame}
          >
            Play
          </button>
        </div>
        <div className="pl-12 p-12">
          <form onSubmit={handler}>
            <input
              className="p-1"
              type="text"
              id="roomId"
              placeholder="Room Id"
            />
            <button className="pl-3 text-l" type="submit">
              Join Room
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default GameControl;
