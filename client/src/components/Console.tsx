import GameControl from "./GameControl";
import GameLog from "./GameLog";
function Console(props: {
  mode: string;
  joinCode: string;
  joinLink: string;
  opponentJoined: boolean;
}) {
  return (
    <div className="h-[100%] w-[387px] sm:w-[643px] bg-blue-200">
      {props.mode === "bot" ? (
        <GameControl></GameControl>
      ) : (
        <GameLog
          joinCode={props.joinCode}
          joinLink={props.joinLink}
          moves={["1", "1"]}
          opponentJoined={props.opponentJoined}
        ></GameLog>
      )}
    </div>
  );
}

export default Console;
