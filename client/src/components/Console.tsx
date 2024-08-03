import GameControl from "./GameControl";
import GameLog from "./GameLog";
function Console(props: { mode: string }) {
  return (
    <div>{props.mode === "bot" ? <GameControl></GameControl> : <GameLog></GameLog>}</div>
  );
}

export default Console;
