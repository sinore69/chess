import React, { useState } from "react";
import { useRouter } from "next/navigation";
function GameControl() {
  const [showTimeControl, setShowTimeControl] = useState<boolean>(true);
  const router = useRouter();
  function ShowTimeControl() {
    setShowTimeControl(true);
  }
  function HideTimeControl() {
    setShowTimeControl(false);
  }
  function startGame() {
    if (showTimeControl) {
      router.push("/create");
    } else {
      router.push("/bot");
    }
  }
  function handler(e: any) {
    e.preventDefault();
    router.push("/join");
    // const data = {
    //   id: Number(e.target.roomId.value),
    // };
    // console.log(data)
  }

  return (
    <div className="">
      <div className="pl-10 pt-2 lg:h-[720px] lg:w-[460px] bg-slate-400 flex flex-col">
        <div className="p-8 pl-36 bg-blue-100 text-2xl font-bold">
          Play Against
        </div>
        <div className="flex flex-row bg-blue-300 p-8 pl-14">
          <button
            className={`border-${
              showTimeControl ? "2" : "[3px]"
            } border-black pt-2 pb-2 pl-6 pr-6 rounded-md font-bold text-lg`}
            onClick={HideTimeControl}
          >
            Computer
          </button>
          <button className="pl-2 pr-2" disabled={true}>
            |
          </button>
          <button
            className={`border-${
              showTimeControl ? "[3px]" : "2"
            } border-black pt-2 pb-2 pl-10 pr-10 rounded-md font-bold text-lg`}
            onClick={ShowTimeControl}
          >
            Friend
          </button>
        </div>
        {showTimeControl ? (
          <div>
            <div className="bg-blue-500 pl-32 pt-2 pb-2 text-2xl font-bold">
              Time Control
            </div>
            <div className="bg-blue-300 p-10 pl-28">
              <button className="border-2 rounded-md border-black p-2 pl-4 pr-4 focus:border-[3px]">
                3
              </button>
              <button className="p-3" disabled={true}>
                |
              </button>
              <button className="border-2 rounded-md border-black pt-2 pb-2 pl-4 pr-4 focus:border-[3px]">
                5
              </button>
              <button className="p-3" disabled={true}>
                |
              </button>
              <button className="border-2 rounded-md border-black p-2 pl-3 pr-3 focus:border-[3px]">
                10
              </button>
            </div>
          </div>
        ) : (
          <></>
        )}

        <div className="bg-blue-200 flex p-10 pl-24">
          <button
            className="border-2 rounded-md border-black p-4 pl-20 pr-20 text-2xl font-semibold"
            onClick={startGame}
          >
            Play
          </button>
        </div>
        <div className="bg-blue-300 p-12">
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
