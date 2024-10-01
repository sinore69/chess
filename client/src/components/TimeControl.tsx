import React, {
  Dispatch,
  MutableRefObject,
  SetStateAction,
  useEffect,
  useState,
} from "react";

function TimeControl(props: {
  time: number;
  isGameOver: boolean;
  isRunning: boolean;
  setIsGameOver: Dispatch<SetStateAction<boolean>>;
  loserColor: MutableRefObject<"b" | "w" | "">;
  color: string;
  reason: MutableRefObject<string>;
}) {
  const [seconds, setSeconds] = useState<number>(0);
  const [minutes, setMinutes] = useState<number>(props.time);
  // const [minutes, setMinutes] = useState<number>(1);
  useEffect(() => {
    var timer: string | number | NodeJS.Timeout | undefined;
    if (props.isRunning && !props.isGameOver) {
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
          props.reason.current = "Time out";
          return;
        }
      }, 1000);
    }
    return () => clearInterval(timer);
  });
  return (
    <div className="flex-grow top-0 left-10 w-32 sm:h-9 md:h-9 lg:h-10 lg:w-28 h-10 bg-white border-2 border-black">
      <div className="text-2xl p-1 md:p-0 md:pl-4 pl-4 sm:p-0 sm:pl-4 font-semibold">
        {minutes <= 9 ? "0" + minutes : minutes}:
        {seconds <= 9 ? "0" + seconds : seconds}
      </div>
    </div>
  );
}

export default TimeControl;
