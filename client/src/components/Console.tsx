import GameControl from "./GameControl";
import GameLog from "./GameLog";
function Console(props: { mode: string }) {
  return (
    <div className="bg-black h-[100%] w-[5%] md:w-[40%] lg:w-[85%]">
      {props.mode === "bot" ? (
        <></>
      ) : (
        <div className="lg:w[15%] lg:h-[100%]"></div>
      )}
      {props.mode === "bot" ? <GameControl></GameControl> : <GameLog></GameLog>}
    </div>
  );
}

export default Console;
