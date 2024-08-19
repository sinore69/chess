import React, { useEffect, useState } from "react";

function TimeControl(props: { time: number; start: boolean }) {
  const [seconds, setSeconds] = useState<number>(0);
  const [minutes, setMinutes] = useState<number>(props.time);
  const [isRunning, setIsRunning] = useState<boolean>(props.start);
  var timer: string | number | NodeJS.Timeout | undefined;
  useEffect(() => {
    if (isRunning) {
      timer = setInterval(() => {
        setSeconds(seconds - 1);
        if (seconds === 0) {
          setMinutes(minutes - 1);
          setSeconds(59);
        }
        if (minutes === 0 && seconds === 0) {
          setMinutes(0);
          setSeconds(0);
          return;
        }
      }, 1000);
    }
    return () => clearInterval(timer);
  });
  function handleRunning() {
    setIsRunning(!isRunning);
  }
  return (
    <div className="flex-grow top-0 left-10 h-14 w-32 lg:h-11 lg:w-28 bg-white border-2 border-black">
      <div className="text-2xl p-1 pl-4 font-semibold">
        {minutes <= 9 ? "0" + minutes : minutes}:
        {seconds <= 9 ? "0" + seconds : seconds}
      </div>
      <button onClick={handleRunning}>stop</button>
    </div>
  );
}

export default TimeControl;
