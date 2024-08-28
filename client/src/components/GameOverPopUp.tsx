import React from "react";

function GameOverPopUp(props: { loserColor: string; color: string }) {
  return (
    <div className="absolute top-[275px] left-[255px] h-40 w-52 bg-red-200 rounded-lg">
      {props.color === props.loserColor ? (
        <div className="p-2">Check mate you lost</div>
      ) : (
        <div className="p-2">Check mate you won</div>
      )}
    </div>
  );
}

export default GameOverPopUp;
