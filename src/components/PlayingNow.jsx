import React, { useRef, useState } from "react";
import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Volume2,
  Music4,
  Repeat,
  Shuffle,
} from "lucide-react";
import SleepTimer from "./SleepTimer";

const PlayingNow = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isShuffle, setIsShuffle] = useState(false);
  const [isRepeat, setIsRepeat] = useState(false);

  const audioRef = useRef(null);

  const togglePlay = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleProgress = (e) => {
    const value = e.target.value;
    const duration = audioRef.current.duration || 1;
    audioRef.current.currentTime = (value / 100) * duration;
    setProgress(value);
  };

  const handleTimeUpdate = () => {
    const current = audioRef.current.currentTime;
    const total = audioRef.current.duration || 1;
    setProgress((current / total) * 100);
  };

  const handleEnded = () => {
    if (isRepeat) {
      audioRef.current.currentTime = 0;
      audioRef.current.play();
    } else {
      setIsPlaying(false);
      // For future playlist: if isShuffle, pick random song
    }
  };

  const handleTimerEnd = () => {
    audioRef.current?.pause();
    setIsPlaying(false);
  };

  return (
    <div className="fixed right-0 bottom-0 left-0 z-50 border-t border-t-gray-400 bg-black p-6">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4">
        {/* Left: Track Info */}
        <div className="flex w-1/3 items-center gap-4">
          <Music4 className="text-success" />
          <p className="font-semibold text-white">Song Title</p>
        </div>

        {/* Center: Controls */}
        <div className="flex w-1/3 flex-col items-center">
          <div className="mb-4 flex items-center gap-6">
            <button
              onClick={() => setIsShuffle((prev) => !prev)}
              className={isShuffle ? "text-success" : "text-gray-400"}
              title="Shuffle"
            >
              <Shuffle size={18} />
            </button>

            <button>
              <SkipBack size={18} />
            </button>

            <button
              onClick={togglePlay}
              className="btn btn-sm btn-circle btn-success text-black"
            >
              {isPlaying ? <Pause size={16} /> : <Play size={16} />}
            </button>

            <button>
              <SkipForward size={18} />
            </button>

            <button
              onClick={() => setIsRepeat((prev) => !prev)}
              className={isRepeat ? "text-success" : "text-gray-400"}
              title="Repeat"
            >
              <Repeat size={18} />
            </button>
          </div>

          <input
            type="range"
            min="0"
            max="100"
            value={progress}
            onChange={handleProgress}
            className="range range-xs text-success w-full"
          />
        </div>

        {/* Right: Volume + Timer */}
        <div className="flex w-1/3 flex-col items-center justify-center">
          <div className="mb-4 flex items-center gap-2">
            <Volume2 size={18} />
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              defaultValue="1"
              onChange={(e) => (audioRef.current.volume = e.target.value)}
              className="range range-xs text-success w-40"
            />
          </div>

          {/* Sleep Timer */}
          <SleepTimer audioRef={audioRef} onTimerEnd={handleTimerEnd} />
        </div>

        {/* Audio Element */}
        <audio
          ref={audioRef}
          src="/audio/careless.mp3"
          onTimeUpdate={handleTimeUpdate}
          onEnded={handleEnded}
        />
      </div>
    </div>
  );
};

export default PlayingNow;
