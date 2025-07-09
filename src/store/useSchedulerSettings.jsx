import { create } from "zustand";

export const useSchedulerSettings = create((set) => ({
  musicStartTime: "20:10",
  dailyBreadTime: "15:00",
  musicPauseTime: "16:50",

  setMusicStartTime: (time) => set({ musicStartTime: time }),
  setDailyBreadTime: (time) => set({ dailyBreadTime: time }),
  setMusicPauseTime: (time) => set({ musicPauseTime: time }),
}));
