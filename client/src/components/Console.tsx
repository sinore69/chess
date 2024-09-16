import GameControl from "./GameControl";
import GameLog from "./GameLog";
function Console(props: { mode: string }) {
  return (
    <div className="bg-black h-[100%]">{props.mode === "bot" ? <GameControl></GameControl> : <GameLog></GameLog>}</div>
  );
}

export default Console;
