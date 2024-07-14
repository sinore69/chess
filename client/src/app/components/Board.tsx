import React from "react";
function Board(props: { board: string[][] }) {
  function onDragStart(
    e: any,
    rowindex: number,
    colindex: number,
    piece: string
  ) {
    e.dataTransfer.setData('text/plain',`${rowindex}${colindex}${piece}`)
  }
  function onDrop(e:any){
    console.log(e.dataTransfer.getData('text'))
  }
  function onDragOver(e:any){
    e.preventDefault()
  }
  return (
    <div>
      <div className="flex justify-start flex-col" onDrop={onDrop}onDragOver={onDragOver}>
        {props.board.map((row: string[], rowindex: number) => (
          <div key={rowindex} className="flex flex-row ">
            {row.map((col: string, colindex) => (
              <div
                key={colindex}
                className={`h-16 w-16 sm:h-20 sm:w-20 lg:h-[90px] lg:w-[90px] border-black ${
                  (colindex + rowindex + 1) % 2 === 0
                    ? "bg-slate-300"
                    : "bg-white"
                }`}
              >
                <div
                  className="h-10 w-10 bg-slate-400"
                  draggable={true}
                  onDragStart={(e) => onDragStart(e, rowindex, colindex, col)}
                >
                  {col}
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Board;
