// components/DailyBreadScheduler.jsx
import { useEffect } from "react";
import { usePlayerStore } from "../store/usePlayerStore";

const DailyBreadScheduler = () => {
  const playDailyBread = usePlayerStore((state) => state.playDailyBread);
  const audioRef = usePlayerStore((state) => state.audioRef);
  const setPlayState = usePlayerStore((state) => state.setPlayState);

  useEffect(() => {
    const checkSchedule = () => {
      const now = new Date();
      const hours = now.getHours();
      const minutes = now.getMinutes();

      // 🕒 Play ODB at 3:00 PM
      if (hours === 15 && minutes === 0) {
        playDailyBread();
      }

      // 🛑 Stop audio at 5:00 PM
      if (hours === 17 && minutes === 0) {
        if (audioRef?.current) {
          audioRef.current.pause();
          setPlayState(false);
          console.log("⏹️ Stopped audio at 5:00 PM");
        }
      }
    };

    const interval = setInterval(checkSchedule, 60 * 1000); // check every minute
    return () => clearInterval(interval);
  }, [playDailyBread, audioRef, setPlayState]);

  return null; // no UI needed
};

export default DailyBreadScheduler;
