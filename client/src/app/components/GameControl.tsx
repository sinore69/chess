import React from "react";

function GameControl() {
  return (
    <div className="">
      <div className="pl-40 pt-2 lg:h-[720px] lg:w-[460px] bg-red-200 flex flex-col">
        <div className="pt-16  bg-blue-100">Play against</div>
        <div className="flex flex-row bg-blue-300">
          <button className="">bot</button>
          <button disabled={true}>|</button>
          <button>friend</button>
        </div>
        <div className="bg-blue-500">time control</div>
        <div className="bg-blue-300">3|5|10</div>
        <button className="bg-blue-200 flex">start</button>
      </div>
    </div>
  );
}

export default GameControl;
