import React from "react";

function GameOverPopUp(props: {
  loserColor: string;
  color: string;
  reason: string;
}) {
  return (
    <div className="absolute top-[35%] left-[25%] sm:top-[37%] sm:left-[34%] h-40 w-52 bg-white border-2 border-black rounded-lg">
      {props.color === props.loserColor ? (
        <div className="pt-14 flex justify-center font-bold">
          {props.reason} You Lost
        </div>
      ) : (
        <div className="pt-14 flex justify-center font-bold">
          {props.reason} You Won
        </div>
      )}
    </div>
  );
}

export default GameOverPopUp;
