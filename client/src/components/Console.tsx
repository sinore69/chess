import { Dispatch, SetStateAction } from "react";
import GameControl from "./GameControl";
import GameLog from "./GameLog";
function Console(props: {
  mode: string;
  joinCode: string;
  joinLink: string;
}) {
  return (
    <div className="h-[100%] w-[387px] sm:w-[640px] md:w-[640px] lg:w-[440px] flex justify-center">
      {props.mode === "bot" ? (
        <GameControl
        ></GameControl>
      ) : (
        <GameLog
          joinCode={props.joinCode}
          joinLink={props.joinLink}
        ></GameLog>
      )}
    </div>
  );
}

export default Console;
