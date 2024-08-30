import React from "react";

function GameOverPopUp(props: {
  loserColor: string;
  color: string;
  reason: string;
}) {
  return (
    <div className="absolute top-[275px] left-[255px] h-40 w-52 bg-red-200 rounded-lg">
      {props.color === props.loserColor ? (
        <div className="p-2">{props.reason} you lost</div>
      ) : (
        <div className="p-2">{props.reason} you won</div>
      )}
    </div>
  );
}

export default GameOverPopUp;
