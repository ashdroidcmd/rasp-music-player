import { useSchedulerSettings } from "../store/useSchedulerSettings";

const Settings = () => {
  const {
    musicStartTime,
    dailyBreadTime,
    musicPauseTime,
    setMusicStartTime,
    setDailyBreadTime,
    setMusicPauseTime,
  } = useSchedulerSettings();

  const handleSave = () => {
    alert("Settings saved!");
  };

  return (
    <div className="h-dvh bg-neutral-950 text-white">
      <div className="mx-auto max-w-xl p-5">
        <h2 className="mb-6 text-center text-3xl font-bold text-[#1ED760]">
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
