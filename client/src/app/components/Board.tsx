import React from "react";
function Board(props: { board: string[][] }) {
  return (
    <div>
      <div className="flex justify-start">
        {props.board.map((row: string[], index: number) => (
          <div key={index} className="flex-row ">
            {row.map((col: string, idx: number) => (
              <div
              id="square"
                key={idx}
                className={`h-16 w-16 sm:h-20 sm:w-20 lg:h-[90px] lg:w-[90px] border-black ${
                  (idx + index + 1) % 2 === 0 ? "bg-slate-300" : "bg-white"
                }`}
              >
                {props.board[index][idx]}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Board;
