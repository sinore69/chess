import { fengenerator } from "@/functions/fengenerator";
import IsCheck from "@/functions/IsCheck";
import { sendData } from "@/functions/senddata";
import { promotionData } from "@/types/promotion";
import Image from "next/image";
import React, { Dispatch, SetStateAction } from "react";

function PromotionPopUp(props: {
  promotion: React.MutableRefObject<promotionData>;
  board: string[][];
  setboard: React.Dispatch<React.SetStateAction<string[][]>>;
  setLastMove: Dispatch<SetStateAction<string>>;
  isCheck: React.MutableRefObject<boolean>;
  colorToMove: React.MutableRefObject<"w" | "b">;
  enPassant: React.MutableRefObject<string>;
  wCastle: React.MutableRefObject<"" | "KQ" | "K" | "Q">;
  bCastle: React.MutableRefObject<"" | "kq" | "k" | "q">;
  socket: WebSocket | null;
  player: string;
}) {
  function promote(color: string, piece: string, position: string) {
    const srcRow = parseInt(position.charAt(0));
    const srcCol = parseInt(position.charAt(1));
    const destRow = parseInt(position.charAt(2));
    const destCol = parseInt(position.charAt(3));
    if (color === "w") {
      props.board[destRow][destCol] = piece.toUpperCase();
    } else {
      props.board[destRow][destCol] = piece.toLowerCase();
    }
    props.setboard([...props.board]);
    IsCheck(
      props.board,
      destRow,
      destCol,
      props.board[destRow][destCol],
      props.isCheck
    );

    props.colorToMove.current = props.colorToMove.current === "w" ? "b" : "w";
    props.enPassant.current = "";
    const newfen = fengenerator(
      props.board,
      color,
      props.wCastle,
      props.bCastle
    );
    if (props.player === "player" && props.socket !== null) {
      sendData(
        newfen,
        props.socket,
        srcRow,
        srcCol,
        destRow,
        destCol,
        props.isCheck,
        props.enPassant,
        props.setLastMove
      );
    }
    if (props.player === "bot" && props.socket === null) {
    }
    props.promotion.current.isPromotion = false;
    props.promotion.current.color = "";
    props.promotion.current.position = "";
  }

  return (
    <div className="h-full w-full flex flex-row gap-2">
      <Image
        className="border-2 border-black bg-white"
        onClick={() =>
          promote(
            props.promotion.current.color,
            "q",
            props.promotion.current.position
          )
        }
        src={`/${props.promotion.current.color}q.png`}
        alt=""
        height={90}
        width={90}
      ></Image>
      <Image
        className="border-2 border-black bg-white"
        onClick={() =>
          promote(
            props.promotion.current.color,
            "b",
            props.promotion.current.position
          )
        }
        src={`/${props.promotion.current.color}b.png`}
        alt=""
        height={90}
        width={90}
      ></Image>
      <Image
        className="border-2 border-black bg-white"
        onClick={() =>
          promote(
            props.promotion.current.color,
            "r",
            props.promotion.current.position
          )
        }
        src={`/${props.promotion.current.color}r.png`}
        alt=""
        height={90}
        width={90}
      ></Image>
      <Image
        className="border-2 border-black bg-white"
        onClick={() =>
          promote(
            props.promotion.current.color,
            "n",
            props.promotion.current.position
          )
        }
        src={`/${props.promotion.current.color}n.png`}
        alt=""
        height={90}
        width={90}
      ></Image>
    </div>
  );
}

export default PromotionPopUp;
