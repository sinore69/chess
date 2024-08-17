import { promotionData } from "@/types/promotion";
import Image from "next/image";
import React from "react";

function PromotionPopUp(props: {
  promotion: React.MutableRefObject<promotionData>;
  board: string[][];
  setboard: React.Dispatch<React.SetStateAction<string[][]>>;
}) {
  console.log(props.promotion.current);
  function promote(color: string, piece: string, position: string) {
    const row = parseInt(position.charAt(0));
    const col = parseInt(position.charAt(1));
    if (color === "w") {
      props.board[row][col] = piece.toUpperCase();
    } else {
      props.board[row][col] = piece.toLowerCase();
    }
    props.setboard([...props.board]);
    props.promotion.current.isPromotion = false;
    props.promotion.current.color = "";
    props.promotion.current.position = "";
  }
  return (
    <div>
      <div className="w-[373px] h-[100px] bg-white flex flex-row gap-1">
        <Image
          className="border-2 border-black"
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
          className="border-2 border-black"
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
          className="border-2 border-black"
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
          className="border-2 border-black"
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
    </div>
  );
}

export default PromotionPopUp;
