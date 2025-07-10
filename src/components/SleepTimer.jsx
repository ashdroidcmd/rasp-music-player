import { useEffect, useState } from "react";

const SleepTimer = ({ audioRef, onTimerEnd }) => {
  const [timerMinutes, setTimerMinutes] = useState(0);
  const [countdown, setCountdown] = useState(null);
  const [timerActive, setTimerActive] = useState(false);

  const startTimer = (minutes) => {
    setTimerMinutes(minutes);
    setCountdown(minutes * 60);
    setTimerActive(true);
  };

  const cancelTimer = () => {
    setTimerActive(false);
    setCountdown(null);
  };

  useEffect(() => {
    if (!timerActive || countdown === null) return;

    const interval = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          audioRef.current?.pause();
          onTimerEnd?.();
          setTimerActive(false);
          return null;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timerActive]);

  const formatTime = (secs) => {
    const m = String(Math.floor(secs / 60)).padStart(2, "0");
    const s = String(secs % 60).padStart(2, "0");
    return `${m}:${s}`;
  };

  return (
    <div className="flex flex-col items-end gap-2">
      <div className="flex gap-2">
        <button
          onClick={() => startTimer(1)}
          className="btn btn-xs btn-outline btn-sucess"
        >
          1 min
        </button>
        <button
          onClick={() => startTimer(240)}
          className="btn btn-xs btn-outline btn-sucess"
        >
          4 hours
        </button>
        <button
          onClick={() => startTimer(540)}
          className="btn btn-xs btn-outline btn-sucess"
        >
          9 hours
        </button>
        {timerActive && (
          <button
            onClick={cancelTimer}
            className="btn btn-xs btn-outline btn-error"
          >
            Cancel
          </button>
        )}
      </div>

      {timerActive && countdown !== null && (
        <span className="text-xs text-gray-400">
          Sleep Timer: {formatTime(countdown)} (of {timerMinutes} min)
        </span>
      )}
    </div>
  );
};

export default SleepTimer;
