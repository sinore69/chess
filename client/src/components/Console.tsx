import GameControl from "./GameControl";
import GameLog from "./GameLog";
function Console(props: {
  mode: string;
  joinCode: string;
  joinLink: string;
  opponentJoined: boolean;
}) {
  return (
    <div className="h-[100%] w-[5%] md:w-[40%] lg:w-[85%]">
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
