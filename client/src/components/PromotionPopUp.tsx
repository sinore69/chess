import { promotionData } from "@/types/promotion";
import Image from "next/image";
import React from "react";

function PromotionPopUp(props: {
  promotion: React.MutableRefObject<promotionData>;
}) {
  console.log(props.promotion.current);
  return (
    <div>
      <div className="w-[380px] h-[100px] bg-red-200 flex flex-row gap-2">
        <Image
          src={`/${props.promotion.current.color}q.png`}
          alt=""
          height={90}
          width={90}
        ></Image>
        <Image
          src={`/${props.promotion.current.color}b.png`}
          alt=""
          height={90}
          width={90}
        ></Image>
        <Image
          src={`/${props.promotion.current.color}r.png`}
          alt=""
          height={90}
          width={90}
        ></Image>
        <Image
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
