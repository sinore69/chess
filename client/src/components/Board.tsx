import { useRef, useEffect, useState } from "react";
import React from "react";
import { updateposition } from "../functions/updateposition";
import { initialgamestate } from "../functions/initialgamestate";
import { fengenerator } from "../functions/fengenerator";
import { calcCoordinates } from "../functions/calccoordinates";
import Image from "next/image";
import { turn } from "../functions/turn";
import { getMove } from "@/functions/getMove";
import { promotionData } from "@/types/promotion";
function Board(props: { movable: boolean }) {
  const [color, setcolor] = useState<"b" | "w">("b");
  const [board, setboard] = useState<string[][]>(initialgamestate(color));
  const [movecount, setmovecount] = useState<number>(1);
  const wCastle = useRef<"KQ" | "K" | "Q" | "">("KQ");
  const bCastle = useRef<"kq" | "k" | "q" | "">("kq");
  const colorToMove = useRef<"b" | "w">("w");
  const isCheck = useRef<true | false>(false);
  const isUnderCheck = useRef<true | false>(false);
  const wKingPos = useRef<string>("");
  const bKingPos = useRef<string>("");
  const ref = useRef<HTMLDivElement | null>(null);
  const Promotion = useRef<promotionData>({
    color: "",
    isPromotion: false,
    position: "",
  });
  const enPassant = useRef<string>("");
  const validMoves = useRef<string>("");
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
  if (movecount === 1 && color === "b" && props.movable) {
    // console.log(movecount);
    setmovecount(movecount + 1);
    getMove(
      fengenerator(board, color, wCastle, bCastle),
      setboard,
      wCastle,
      bCastle,
      isCheck,
      colorToMove,
      wKingPos,
      bKingPos
    );
  }

  function onDrop(e: any) {
    const oldfen = fengenerator(board, color, wCastle, bCastle);
    const { x, y } = calcCoordinates(e, ref);
    const [rowindex, colindex, piece] = e.dataTransfer
      .getData("text")
      .split("");
    if (!turn(colorToMove.current, piece)) {
      return;
    }
    const newposition = updateposition(
      //updating will not work as valid moves is empty add server logic to calculate moves
      board,
      rowindex,
      colindex,
      x,
      y,
      piece,
      color,
      wCastle,
      bCastle,
      isCheck,
      wKingPos,
      bKingPos,
      enPassant,
      Promotion,
      validMoves
    );
    setboard(newposition);
    const newfen = fengenerator(newposition, color, wCastle, bCastle);
    if (oldfen !== newfen) {
      colorToMove.current = color === "w" ? "b" : "w";
      getMove(
        newfen,
        setboard,
        wCastle,
        bCastle,
        isCheck,
        colorToMove,
        wKingPos,
        bKingPos
      );
    }
  }
  function onDragOver(e: any) {
    e.preventDefault();
  }
  return (
    <div>
      <div
        className="flex justify-start flex-col h-screen box-border overflow-hidden"
        onDrop={onDrop}
        onDragOver={onDragOver}
        ref={ref}
      >
        {board.map((row: string[], rowindex: number) => (
          <div key={rowindex} className="flex flex-row ">
            {row.map((col: string, colindex) => (
              <div
                key={colindex}
                className={`h-16 w-16 sm:h-20 sm:w-20 lg:h-[90px] lg:w-[90px] border-black relative ${
                  (colindex + rowindex + 1) % 2 === 0
                    ? "bg-slate-300"
                    : "bg-white"
                }`}
              >
                <div
                  className=""
                  draggable={props.movable}
                  onDragEnd={onDragEnd}
                  onDragStart={(e) => onDragStart(e, rowindex, colindex, col)}
                >
                  {col !== "1" ? (
                    <Image
                      priority
                      draggable={props.movable}
                      src={
                        col === col.toUpperCase()
                          ? `/w${col}.png`
                          : `/b${col}.png`
                      }
                      alt=""
                      height={90}
                      width={90}
                    ></Image>
                  ) : (
                    ""
                  )}
                  {/* {color === "w" ? (
                    <div
                      className={`${calStyle(
                        color,
                        rowindex,
                        colindex
                      )}`}
                    >
                      {calCell(color, rowindex, colindex)}
                    </div>
                  ) : (
                    <div
                      className={`${calStyle(
                        color,
                        rowindex,
                        colindex
                      )}`}
                    >
                      {calCell(color, rowindex, colindex)}
                    </div>
                  )} */}
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
