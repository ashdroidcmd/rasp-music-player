import React, { useState } from "react";

const Settings = () => {
  const [musicStartTime, setMusicStartTime] = useState("20:10"); // 8:10 PM
  const [dailyBreadTime, setDailyBreadTime] = useState("15:00"); // 3:00 PM
  const [musicPauseTime, setMusicPauseTime] = useState("16:50"); // 4:50 PM

  const handleSave = () => {
    console.log("🎵 Music Start:", musicStartTime);
    console.log("📖 Daily Bread:", dailyBreadTime);
    console.log("⏸️ Music Pause:", musicPauseTime);
    // TODO: Save to Zustand or localStorage here
    alert("Settings saved!");
  };

  return (
    <div className="bg-neutral-950 text-white">
      <div className="mx-auto max-w-xl p-6">
        <h2 className="mb-8 text-center text-4xl font-bold text-[#1ED760]">
          Settings
        </h2>

        <div className="space-y-6">
          <div className="bg-base-200 space-y-4 rounded-lg p-6 shadow">
            <div>
              <label className="mb-1 block text-sm font-medium text-[#1ED760]">
                Play Music Time
              </label>
              <input
                type="time"
                value={musicStartTime}
                onChange={(e) => setMusicStartTime(e.target.value)}
                className="input input-bordered w-full"
              />
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-[#1ED760]">
                Our Daily Bread Time
              </label>
              <input
                type="time"
                value={dailyBreadTime}
                onChange={(e) => setDailyBreadTime(e.target.value)}
                className="input input-bordered w-full"
              />
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-[#1ED760]">
                Pause Music Time
              </label>
              <input
                type="time"
                value={musicPauseTime}
                onChange={(e) => setMusicPauseTime(e.target.value)}
                className="input input-bordered w-full"
              />
            </div>
          </div>

          <button
            className="btn mb-6 w-full bg-[#1ED760] text-black"
            onClick={handleSave}
          >
            Save Settings
          </button>
        </div>
      </div>
    </div>
  );
};

export default Settings;
