import { MakeMove } from "@/functions/makeMove";
import { promotionData } from "@/types/promotion";
import React, { Dispatch, MutableRefObject, SetStateAction } from "react";

function SocketDisc(props: {
  board: string[][];
  pieceMove: string;
  piece: string;
  destRow: number;
  destCol: number;
  color: MutableRefObject<"b" | "w">;
  wCastle: MutableRefObject<"" | "KQ" | "K" | "Q">;
  bCastle: MutableRefObject<"" | "kq" | "k" | "q">;
  isCheck: MutableRefObject<boolean>;
  wKingPos: MutableRefObject<string>;
  bKingPos: MutableRefObject<string>;
  enPassant: MutableRefObject<string>;
  Promotion: MutableRefObject<promotionData>;
  validMoves: MutableRefObject<string>;
  colorToMove: MutableRefObject<"b" | "w">;
  setboard: Dispatch<SetStateAction<string[][]>>;
  setToggleMove: Dispatch<SetStateAction<boolean>>;
  socket: WebSocket;
}) {
  const words = props.pieceMove.split(" ");
  let srcRow: number, srcCol: number, piece: string;
  if (words.length > 0) {
    srcRow = parseInt(words[0].charAt(1));
    srcCol = parseInt(words[0].charAt(2));
    piece = words[0].charAt(0);
  }
  const result = words
    .filter((word) => word.endsWith(props.destRow + "" + props.destCol))
    .join(" ");
  return result.includes(props.destRow + "" + props.destCol) ? (
    <div
      className="h-full w-full absolute grid"
      onClick={() => {
        MakeMove(
          props.board,
          srcRow,
          srcCol,
          props.destRow,
          props.destCol,
          piece,
          "",
          props.color,
          props.wCastle,
          props.bCastle,
          props.isCheck,
          props.wKingPos,
          props.bKingPos,
          props.enPassant,
          props.Promotion,
          props.validMoves,
          props.colorToMove,
          props.setboard,
          props.socket
        );
        props.setToggleMove(false);
      }}
    >
      <div className="h-[55%] w-[55%] rounded-full bg-gray-700 place-self-center opacity-20"></div>
    </div>
  ) : (
    <></>
  );
}

export default SocketDisc;
