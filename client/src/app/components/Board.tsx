import React from "react";

function Board(props:{board:number[][]}) {
  return (
    <div>
      <div className="flex justify-start">
        {props.board.map((row: number[], index: number) => (
          <div key={index} className="flex-row ">
            {row.map((col: number, idx: number) => (
              <div
                key={idx}
                className={`h-16 w-16 sm:h-20 sm:w-20 lg:h-[90px] lg:w-[90px] border-black border-2 ${
                  (idx + index + 1) % 2 === 0 ? "bg-black" : "bg-white"
                }`}
              >
                {index + idx + 1}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Board;
