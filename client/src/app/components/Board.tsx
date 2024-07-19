import { useRef, useEffect, useState } from "react";
import React from "react";
import { updateposition } from "../functions/updateposition";
import { initialgamestate } from "../functions/initialgamestate";
import { fengenerator } from "../functions/fengenerator";
import { calcCoordinates } from "../functions/calccoordinates";
import Image from "next/image";
function Board() {
  const [board, setboard] = useState<string[][]>(initialgamestate);
  const ref = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    if (ref.current) {
      ref.current.focus();
    }
  }, []);
  function onDragStart(
    e: any,
    rowindex: number,
    colindex: number,
    piece: string
  ) {
    e.dataTransfer.effectAllowed = "move";
    e.dataTransfer.setData("text/plain", `${rowindex}${colindex}${piece}`);
    setTimeout(() => {
      e.target.style.display = "none";
    }, 0);
  }
  function onDragEnd(e: any) {
    e.target.style.display = "block";
  }

  function onDrop(e: any) {
    const { x, y } = calcCoordinates(e,ref);
    const [rowindex, colindex, piece] = e.dataTransfer
      .getData("text")
      .split("");
    const newposition = updateposition(board, rowindex, colindex, x, y, piece);
    setboard(newposition);
    const fen=fengenerator(newposition);
    const data={
      fen:fen
    }
    fetch("http://localhost:5000/bot",{
      method:"POST",
      body:JSON.stringify(data)
    }).then((res)=>{console.log(res)}).catch((err)=>{console.log(err)})
  }
  function onDragOver(e: any) {
    e.preventDefault();
  }
  return (
    <div>
      <div
        className="flex justify-start flex-col"
        onDrop={onDrop}
        onDragOver={onDragOver}
        ref={ref}
      >
        {board.map((row: string[], rowindex: number) => (
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
                  className=""
                  draggable={true}
                  onDragEnd={onDragEnd}
                  onDragStart={(e) => onDragStart(e, rowindex, colindex, col)}
                >
                  {col!=='1'?<Image src={col===col.toUpperCase()?`/w${col}.png`:`/b${col}.png`} alt="" height={500} width={500}></Image>:""}
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
