import { useRef, useState } from "react";

export default function Stopwatch() {
  const [startTime, setStartTime] = useState<number>();
  const [now, setNow] = useState<number>();
  const [stopwatchList, setStopwatchList] = useState<number[]>([]);
  const intervalRef = useRef<number>();

  let secondsPassed = 0;

  if (startTime != null && now != null) {
    secondsPassed = (now - startTime) / 1000;
  }

  function handleStart() {
    // Start counting.
    setStartTime(Date.now());
    setNow(Date.now());

    clearInterval(intervalRef.current);

    intervalRef.current = setInterval(() => {
      // Update the current time every 10ms.
      setNow(Date.now());
    }, 10);
  }

  function handleStop() {
    clearInterval(intervalRef.current);

    setStopwatchList((state) => [secondsPassed, ...state]);
  }

  return (
    <div className="bg-slate-900 p-5">
      <div className="flex">
        <div className="w-2/3 flex gap-4 border-r pr-3 border-slate-500">
          <div className="w-full flex flex-col flex-1 gap-2 justify-center">
            <h2 className="text-xl">cronometer</h2>

            <span
              className="text-6xl"
              style={{ fontFamily: "Orbitron, sans-serif" }}
            >
              {secondsPassed.toFixed(3)}
            </span>
          </div>

          <div className="flex w-1/3 flex-1 gap-4">
            <button
              className="w-1/2 bg-pink-700 px-6 py-2 hover:brightness-90"
              onClick={handleStart}
            >
              Start
            </button>

            <button
              className="w-1/2 text-white px-6 py-2 hover:bg-slate-700"
              onClick={handleStop}
            >
              Stop
            </button>
          </div>
        </div>

        <div className="h-40 w-1/3 flex flex-col pl-4 overflow-y-scroll text-lg">
          {stopwatchList.map((stopwath) => (
            <span
              className="bg-slate-800 px-4 mt-1 text-2xl"
              key={stopwatchList.indexOf(stopwath)}
            >
              {stopwath.toFixed(3)} sec
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
