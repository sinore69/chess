import { useRef, useEffect, useState } from "react";
import React from "react";
import { updateposition } from "../functions/updateposition";
import { initialgamestate } from "../functions/initialgamestate";
import { fengenerator } from "../functions/fengenerator";
import { calcCoordinates } from "../functions/calccoordinates";
import Image from "next/image";
import { turn } from "../functions/turn";
import { getFirstMove, getMove } from "@/functions/getMove";
import { promotionData } from "@/types/promotion";
import GameOverPopUp from "./GameOverPopUp";

function Board(props: { movable: boolean; color: "w" | "b" }) {
  const [color, setcolor] = useState<"b" | "w">(props.color);
  const [board, setboard] = useState<string[][]>(initialgamestate(color));
  const [movecount, setmovecount] = useState<number>(1);
  const [isGameOver, setIsGameOver] = useState<boolean>(false);
  const wCastle = useRef<"KQ" | "K" | "Q" | "">("KQ");
  const bCastle = useRef<"kq" | "k" | "q" | "">("kq");
  const colorToMove = useRef<"b" | "w">("w");
  const isCheck = useRef<true | false>(false);
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
  const reason = useRef<string>("");
  const loserColor = useRef<"w" | "b" | "">("");
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
    setmovecount(movecount + 1);
    getMove(
      fengenerator(board, color, wCastle, bCastle),
      setboard,
      wCastle,
      bCastle,
      colorToMove,
      wKingPos,
      bKingPos,
      validMoves,
      setIsGameOver,
      reason,
      color,
      loserColor
    );
  }

  if (movecount === 1 && color === "w") {
    setmovecount(movecount + 1);
    getFirstMove(validMoves);
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
    // console.log(validMoves.current, "**");
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
        colorToMove,
        wKingPos,
        bKingPos,
        validMoves,
        setIsGameOver,
        reason,
        color,
        loserColor
      );
    }
  }
  function onDragOver(e: any) {
    e.preventDefault();
  }

  // Touch Handlers
  function onTouchStart(
    e: any,
    rowindex: number,
    colindex: number,
    piece: string
  ) {
    e.target.style.opacity = 0.5;
    e.target.dataset.touch = `${rowindex}${colindex}${piece}`;
  }

  function onTouchMove(e: any) {
    const touch = e.touches[0];
    const element = e.target;
    element.style.position = "absolute";
    element.style.left = `${touch.clientX - element.clientWidth / 2}px`;
    element.style.top = `${touch.clientY - element.clientHeight / 2}px`;
  }

  function onTouchEnd(e: any) {
    e.target.style.opacity = 1;
    const { x, y } = calcCoordinates(e, ref);
    const [rowindex, colindex, piece] = e.target.dataset.touch.split("");
    if (!turn(colorToMove.current, piece)) return;

    const newposition = updateposition(
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
    e.target.style.position = "static";
  }

  return (
    <div>
      <div
        className="flex justify-start flex-col h-full box-border"
        onDrop={onDrop}
        onDragOver={onDragOver}
        ref={ref}
      >
        {board.map((row: string[], rowindex: number) => (
          <div key={rowindex} className="flex flex-row ">
            {row.map((col: string, colindex) => (
              <div
                key={colindex}
                className={`h-12 w-12 sm:h-20 sm:w-20 lg:h-[90px] lg:w-[90px] border-black relative ${
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
                  onTouchStart={(e) => onTouchStart(e, rowindex, colindex, col)}
                  onTouchMove={onTouchMove}
                  onTouchEnd={onTouchEnd}
                >
                  {col !== "1" ? (
                    <Image
                      priority
                      draggable={props.movable}
                      src={
                        col === col.toUpperCase()
                          ? `/w${col.toLowerCase()}.png`
                          : `/b${col.toLowerCase()}.png`
                      }
                      alt=""
                      height={90}
                      width={90}
                    ></Image>
                  ) : (
                    ""
                  )}
                </div>
              </div>
            ))}
          </div>
        ))}
        {isGameOver ? (
          <GameOverPopUp
            loserColor={loserColor.current}
            color={color}
            reason={reason.current}
          ></GameOverPopUp>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}

export default Board;
