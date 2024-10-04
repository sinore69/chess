import { useRef, useEffect, useState } from "react";
import React from "react";
import { initialgamestate } from "../functions/initialgamestate";
import { fengenerator } from "../functions/fengenerator";
import { calcCoordinates } from "../functions/calccoordinates";
import Image from "next/image";
import { turn } from "../functions/turn";
import { getFirstMove, getMove } from "@/functions/getMove";
import { promotionData } from "@/types/promotion";
import GameOverPopUp from "./GameOverPopUp";
import Disc from "./Disc";
import { getPieceMove } from "@/functions/getPieceMove";
import { isUpperCase } from "@/functions/isuppercase";
import { MakeBotMove } from "@/functions/botmove";
import PromotionPopUp from "./PromotionPopUp";

function Board(props: { movable: boolean; color: "w" | "b" }) {
  const [color, setcolor] = useState<"b" | "w">(props.color);
  const [board, setboard] = useState<string[][]>(initialgamestate(color));
  const [movecount, setmovecount] = useState<number>(1);
  const [isGameOver, setIsGameOver] = useState<boolean>(false);
  const [toggleMove, setToggleMove] = useState<boolean>(false);
  const [reRender, setReRender] = useState<boolean>(true);
  const pieceMove = useRef<string>("");
  const wCastle = useRef<"KQ" | "K" | "Q" | "">("KQ");
  const bCastle = useRef<"kq" | "k" | "q" | "">("kq");
  const colorToMove = useRef<"b" | "w">("w");
  const isCheck = useRef<true | false>(false);
  const wKingPos = useRef<string>("");
  const bKingPos = useRef<string>("");
  const ref = useRef<HTMLDivElement | null>(null);
  const Promotion = useRef<promotionData>({
    color: "w",
    isPromotion: true,
    position: "",
  });
  const enPassant = useRef<string>("");
  const validMoves = useRef<string>("");
  const reason = useRef<string>("");
  const loserColor = useRef<"w" | "b" | "">("");
  const colorCase = color === "w" ? "C" : "c";
  const [lastMove, setLastMove] = useState<string>("");
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
      loserColor,
      setLastMove
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
    MakeBotMove(
      board,
      rowindex,
      colindex,
      x,
      y,
      piece,
      oldfen,
      color,
      wCastle,
      bCastle,
      isCheck,
      wKingPos,
      bKingPos,
      enPassant,
      Promotion,
      validMoves,
      colorToMove,
      setboard,
      setIsGameOver,
      reason,
      loserColor,
      setLastMove
    );
  }

  function onDragOver(e: any) {
    e.preventDefault();
  }

  function toggle(piece: string, rowIdx: number, colIdx: number) {
    pieceMove.current = getPieceMove(validMoves.current, piece, rowIdx, colIdx);
    setToggleMove(true);
    setReRender(!reRender);
  }

  return (
    <div className="justify-start flex-col box-border h-full inline-block">
      <div
        className="flex justify-start flex-col h-full w-full box-border"
        onDrop={onDrop}
        onDragOver={onDragOver}
        ref={ref}
      >
        <div className="relative">
          {board.map((row: string[], rowindex: number) => (
            <div key={rowindex} className="flex flex-row ">
              {row.map((col: string, colindex) => (
                <div
                  key={colindex}
                  className={`h-12 w-12 sm:h-20 sm:w-20 lg:h-[80px] lg:w-[80px] border-black relative ${
                    "" + rowindex + colindex === lastMove.substring(0, 2) ||
                    "" + rowindex + colindex === lastMove.substring(2, 4)
                      ? "bg-blue-200"
                      : (colindex + rowindex + 1) % 2 === 0
                      ? "bg-slate-300"
                      : "bg-white"
                  }`}
                >
                  <div
                    className="h-full w-full"
                    draggable={props.movable}
                    onDragEnd={onDragEnd}
                    onDragStart={(e) => onDragStart(e, rowindex, colindex, col)}
                  >
                    {col !== "1" ? (
                      <Image
                        className="h-full w-full"
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
                        onClick={() =>
                          toggle(board[rowindex][colindex], rowindex, colindex)
                        }
                      ></Image>
                    ) : (
                      <></>
                    )}
                    {toggleMove &&
                    (board[rowindex][colindex] === "1" ||
                      isUpperCase(colorCase) !==
                        isUpperCase(board[rowindex][colindex])) ? (
                      <div className="h-full w-full grid absolute top-0 left-0">
                        <Disc
                          board={board}
                          pieceMove={pieceMove.current}
                          piece={board[rowindex][colindex]}
                          destRow={rowindex}
                          destCol={colindex}
                          color={color}
                          wCastle={wCastle}
                          bCastle={bCastle}
                          isCheck={isCheck}
                          wKingPos={wKingPos}
                          bKingPos={bKingPos}
                          enPassant={enPassant}
                          Promotion={Promotion}
                          validMoves={validMoves}
                          colorToMove={colorToMove}
                          setboard={setboard}
                          setToggleMove={setToggleMove}
                          setIsGameOver={setIsGameOver}
                          setLastMove={setLastMove}
                          reason={reason}
                          loserColor={loserColor}
                        ></Disc>
                      </div>
                    ) : (
                      <></>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ))}
          {Promotion.current.isPromotion ? (
            <div className="absolute top-[38%] sm:top-[275px] sm:left-[135px]">
              <PromotionPopUp
                promotion={Promotion}
                board={board}
                setboard={setboard}
                setLastMove={setLastMove}
                isCheck={isCheck}
                colorToMove={colorToMove}
                enPassant={enPassant}
                wCastle={wCastle}
                bCastle={bCastle}
                socket={null}
                player={"bot"}
              ></PromotionPopUp>
            </div>
          ) : (
            <></>
          )}
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
    </div>
  );
}

export default Board;
