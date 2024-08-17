import { useRef, useEffect, useState } from "react";
import React from "react";
import { updateposition } from "../functions/updateposition";
import { initialgamestate } from "../functions/initialgamestate";
import { fengenerator } from "../functions/fengenerator";
import { calcCoordinates } from "../functions/calccoordinates";
import Image from "next/image";
import { socketturn, turn, updateTurn } from "../functions/turn";
import { sendData } from "@/functions/senddata";
import { decodefen } from "@/functions/decodefen";
import { InitialGameStateValidator } from "@/functions/validator/jsonschema/initialgamestate";
import { GameStateValidator } from "@/functions/validator/jsonschema/gamestate";
import { IsUnderCheck } from "@/functions/undercheck";
import { promotionData } from "@/types/promotion";
import PromotionPopUp from "./PromotionPopUp";

function SocketBoard(props: {
  movable: boolean;
  socket: WebSocket;
  playAs: string;
}) {
  const color = useRef<"b" | "w">("w");
  const [board, setboard] = useState<string[][]>(
    initialgamestate(color.current)
  );
  const wCastle = useRef<"KQ" | "K" | "Q" | "">("KQ");
  const bCastle = useRef<"kq" | "k" | "q" | "">("kq");
  const wKingPos = useRef<string>("");
  const bKingPos = useRef<string>("");
  const colorToMove = useRef<"b" | "w">("w");
  const isCheck = useRef<true | false>(false);
  const isUnderCheck = useRef<true | false>(false);
  const enPassant = useRef<string>("");
  const Promotion = useRef<promotionData>({
    color: "",
    isPromotion: false,
    position: "",
  });
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (ref.current) {
      ref.current.focus();
    }
    props.socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      // console.log(data);
      if (InitialGameStateValidator(data)) {
        if (props.playAs === "Player") {
          color.current = data.PlayerColor;
          setboard(initialgamestate(color.current));
        }
        if (props.playAs === "Creator") {
          color.current = data.CreatorColor;
          setboard(initialgamestate(color.current));
        }
      }
      if (GameStateValidator(data)) {
        const newposition = decodefen(
          data.fen,
          data.lastMove,
          isCheck,
          wCastle,
          bCastle,
          wKingPos,
          bKingPos
        );
        enPassant.current = data.enPassant;
        setboard(newposition);
        colorToMove.current = updateTurn(data.fen);
        isCheck.current = false;
        isUnderCheck.current = IsUnderCheck(data.lastMove);
      }
    };
  }, [props.playAs, props.socket]);

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
    const oldfen = fengenerator(board, color.current, wCastle, bCastle);
    const { x, y } = calcCoordinates(e, ref);
    const [rowindex, colindex, piece] = e.dataTransfer
      .getData("text")
      .split("");
    if (!turn(colorToMove.current, piece)) {
      return;
    }
    if (!socketturn(colorToMove.current, color.current)) {
      return;
    }
    const newposition = updateposition(
      board,
      rowindex,
      colindex,
      x,
      y,
      piece,
      color.current,
      wCastle,
      bCastle,
      isCheck,
      wKingPos,
      bKingPos,
      enPassant,
      Promotion
    );
    setboard(newposition);
    const newfen = fengenerator(newposition, color.current, wCastle, bCastle);
    if (
      oldfen !== newfen &&
      color.current === colorToMove.current &&
      Promotion.current.isPromotion === false
    ) {
      colorToMove.current = colorToMove.current === "w" ? "b" : "w";
      sendData(
        newfen,
        props.socket,
        rowindex,
        colindex,
        x,
        y,
        isCheck,
        enPassant
      );
      enPassant.current = "";
    }
  }

  function onDragOver(e: any) {
    e.preventDefault();
  }
  return (
    <div>
      <div
        className="relative flex justify-start flex-col h-screen box-border overflow-hidden"
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
                </div>
              </div>
            ))}
          </div>
        ))}
        {Promotion.current.isPromotion ? (
          <div className="absolute top-[275px] left-[135px]">
            <PromotionPopUp
              promotion={Promotion}
              board={board}
              setboard={setboard}
              isCheck={isCheck}
              colorToMove={colorToMove}
              enPassant={enPassant}
              wCastle={wCastle}
              bCastle={bCastle}
              socket={props.socket}
            ></PromotionPopUp>
          </div>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}

export default SocketBoard;
