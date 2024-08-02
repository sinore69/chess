import React, { useState } from "react";

function GameControl() {
  const [showTimeControl, setShowTimeControl] = useState<boolean>(true);
  function ShowTimeControl() {
    setShowTimeControl(true);
  }
  function HideTimeControl() {
    setShowTimeControl(false);
  }
  return (
    <div className="">
      <div className="pl-24 pt-2 lg:h-[720px] lg:w-[460px] bg-red-200 flex flex-col">
        <div className="p-14  bg-blue-100">Play against</div>
        <div className="flex flex-row bg-blue-300 p-10">
          <button className="border border-black p-2" onClick={HideTimeControl}>
            bot
          </button>
          <button className="p-3" disabled={true}>
            |
          </button>
          <button className="border border-black p-2" onClick={ShowTimeControl}>
            friend
          </button>
        </div>
        {showTimeControl ? (
          <div>
            <div className="bg-blue-500 pl-14 pt-4 pb-4">time control</div>
            <div className="bg-blue-300 p-10">
              <button className="border border-black p-2">3</button>
              <button className="p-3" disabled={true}>
                |
              </button>
              <button className="border border-black p-2">5</button>
              <button className="p-3" disabled={true}>
                |
              </button>
              <button className="border border-black p-2">10</button>
            </div>
          </div>
        ) : (
          <></>
        )}

        <div className="bg-blue-200 flex p-14">
          <button className="border border-black p-2">Play</button>
        </div>
      </div>
    </div>
  );
}

export default GameControl;
