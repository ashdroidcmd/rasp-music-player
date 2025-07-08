import { usePlayerStore } from "../store/usePlayerStore";
import { useEffect, useState } from "react";

const DailyBreadScheduler = () => {
  const playDailyBread = usePlayerStore((state) => state.playDailyBread);
  const [hasUserInteracted, setHasUserInteracted] = useState(false);
  const [lastPlayedTime, setLastPlayedTime] = useState(null);

  useEffect(() => {
    const handleUserInteraction = () => {
      setHasUserInteracted(true);
      window.removeEventListener("click", handleUserInteraction);
    };

    window.addEventListener("click", handleUserInteraction);
    return () => window.removeEventListener("click", handleUserInteraction);
  }, []);

  useEffect(() => {
    if (!hasUserInteracted) return;

    const checkAndPlay = () => {
      const now = new Date();
      const timeString = `${String(now.getHours()).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}`;
      const times = "15:02";

      if (times.includes(timeString) && timeString !== lastPlayedTime) {
        playDailyBread();
        setLastPlayedTime(timeString);
      }
    };

    checkAndPlay();
    const interval = setInterval(checkAndPlay, 60000);
    return () => clearInterval(interval);
  }, [hasUserInteracted, lastPlayedTime, playDailyBread]);

  return null;
};

export default DailyBreadScheduler;
