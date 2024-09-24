import React from "react";

function Disc(props: {
  pieceMove: string;
  piece: string;
  rowIdx: number;
  colIdx: number;
}) {
  return props.pieceMove.includes(props.rowIdx + "" + props.colIdx) ? (
    <div className="h-full w-full absolute grid">
      <div className="h-[55%] w-[55%] rounded-full bg-gray-700 place-self-center opacity-20"></div>
    </div>
  ) : (
    <></>
  );
}

export default Disc;
