import GameControl from "./GameControl";
import GameLog from "./GameLog";
function Console(props: {
  mode: string;
  joinCode: string;
  joinLink: string;
}) {
  return (
    <div className="h-[100%] w-[387px] sm:w-[643px]">
      {props.mode === "bot" ? (
        <GameControl></GameControl>
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
