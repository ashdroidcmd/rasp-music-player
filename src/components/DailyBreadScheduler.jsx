import { useEffect } from "react";
import { usePlayerStore } from "../store/usePlayerStore";
import { useSchedulerSettings } from "../store/useSchedulerSettings";

const DailyBreadScheduler = () => {
  const playDailyBread = usePlayerStore((state) => state.playDailyBread);
  const playNext = usePlayerStore((state) => state.playNext);
  const audioRef = usePlayerStore((state) => state.audioRef);
  const setPlayState = usePlayerStore((state) => state.setPlayState);

  const {
    musicStartTime,
    dailyBreadTime,
    musicPauseTime,
  } = useSchedulerSettings();

  useEffect(() => {
    const checkSchedule = () => {
      const now = new Date();
      const current = `${String(now.getHours()).padStart(2, "0")}:${String(
        now.getMinutes()
      ).padStart(2, "0")}`;

      if (current === musicStartTime) {
        console.log("🎵 Playing music at", musicStartTime);
        playNext(); // Start playing
      }

      if (current === dailyBreadTime) {
        console.log("📖 Playing Daily Bread at", dailyBreadTime);
        playDailyBread();
      }

      if (current === musicPauseTime) {
        if (audioRef?.current) {
          audioRef.current.pause();
          setPlayState(false);
          console.log("⏹️ Paused music at", musicPauseTime);
        }
      }
    };

    const interval = setInterval(checkSchedule, 60 * 1000); // check every minute
    return () => clearInterval(interval);
  }, [musicStartTime, dailyBreadTime, musicPauseTime, playDailyBread, playNext, audioRef]);

  return null;
};

export default DailyBreadScheduler;
