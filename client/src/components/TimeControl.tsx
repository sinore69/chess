import React, {
  Dispatch,
  MutableRefObject,
  SetStateAction,
  useEffect,
  useState,
} from "react";

function TimeControl(props: {
  time: number;
  isRunning: boolean;
  setIsGameOver: Dispatch<SetStateAction<boolean>>;
  loserColor: MutableRefObject<"b" | "w" | "">;
  color: string;
  reason: MutableRefObject<string>;
}) {
  const [seconds, setSeconds] = useState<number>(0);
  const [minutes, setMinutes] = useState<number>(props.time);
  // const [minutes, setMinutes] = useState<number>(0);
  useEffect(() => {
    var timer: string | number | NodeJS.Timeout | undefined;
    if (props.isRunning) {
      timer = setInterval(() => {
        setSeconds(seconds - 1);
        if (seconds === 0) {
          setMinutes(minutes - 1);
          setSeconds(59);
        }
        if (minutes === 0 && seconds === 0) {
          setMinutes(0);
          setSeconds(0);
          props.setIsGameOver(true);
          props.loserColor.current = props.color as "w" | "b";
          props.reason.current = "time out";
          return;
        }
      }, 1000);
    }
    return () => clearInterval(timer);
  });
  return (
    <div className="flex-grow top-0 left-10 h-14 w-32 lg:h-11 lg:w-28 bg-white border-2 border-black">
      <div className="text-2xl p-1 pl-4 font-semibold">
        {minutes <= 9 ? "0" + minutes : minutes}:
        {seconds <= 9 ? "0" + seconds : seconds}
      </div>
    </div>
  );
}

export default TimeControl;
