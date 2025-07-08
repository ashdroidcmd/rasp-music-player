import React, { useEffect, useRef, useState } from "react";
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
import { usePlayerStore } from "../store/usePlayerStore";

const PlayingNow = () => {
  const {
    currentSong,
    isPlaying,
    isShuffle,
    isRepeat,
    togglePlay,
    toggleShuffle,
    toggleRepeat,
    setAudioRef,
    setPlayState,
    playNext,
    playPrevious,
  } = usePlayerStore();

  const localAudioRef = useRef(null);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    setAudioRef(localAudioRef);
  }, [setAudioRef]);

  const handleProgress = (e) => {
    const value = e.target.value;
    const duration = localAudioRef.current.duration || 1;
    localAudioRef.current.currentTime = (value / 100) * duration;
    setProgress(value);
  };

  const handleTimeUpdate = () => {
    const current = localAudioRef.current.currentTime;
    const total = localAudioRef.current.duration || 1;
    setCurrentTime(current);
    setProgress((current / total) * 100);
  };

  const handleLoadedMetadata = () => {
    setDuration(localAudioRef.current.duration);
  };

  const handleEnded = () => {
    if (isRepeat) {
      localAudioRef.current.currentTime = 0;
      localAudioRef.current.play();
    } else {
      playNext();
    }
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
  };

  const handleTimerEnd = () => {
    localAudioRef.current?.pause();
    setPlayState(false);
  };

  useEffect(() => {
    if (currentSong && isPlaying) {
      localAudioRef.current?.play().catch(() => {});
    } else {
      localAudioRef.current?.pause();
    }
  }, [currentSong, isPlaying]);

  return (
    <div className="fixed right-0 bottom-0 left-0 z-50 border-t border-t-gray-400 bg-black p-6">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4">
        {/* Track Info */}
        <div className="flex w-1/3 items-center gap-4">
          <Music4 className="text-[#1ED760]" />
          {currentSong ? (
            <div>
              <p className="font-semibold text-white">{currentSong.title}</p>
              <p className="text-sm text-gray-400">{currentSong.artist}</p>
            </div>
          ) : (
            <p className="text-sm text-gray-500">No song selected</p>
          )}
        </div>

        {/* Controls */}
        <div className="flex w-1/3 flex-col items-center">
          <div className="mb-4 flex items-center gap-6">
            <button
              onClick={toggleShuffle}
              className={isShuffle ? "text-[#1ED760]" : "text-gray-400"}
            >
              <Shuffle size={22} />
            </button>

            <button onClick={playPrevious}>
              <SkipBack className="h-10 w-10 rounded-full p-2 text-white transition-colors hover:bg-[#1ED760] hover:text-black" />
            </button>

            <button
              onClick={togglePlay}
              className="btn rounded-full bg-[#1ED760] text-black"
            >
              {isPlaying ? <Pause size={16} /> : <Play size={16} />}
            </button>

            <button onClick={playNext}>
              <SkipForward className="h-10 w-10 rounded-full p-2 text-white transition-colors hover:bg-[#1ED760] hover:text-black" />
            </button>

            <button
              onClick={toggleRepeat}
              className={isRepeat ? "text-[#1ED760]" : "text-white"}
            >
              <Repeat size={22} />
            </button>
          </div>
          <input
            type="range"
            min="0"
            max="100"
            value={progress}
            onChange={handleProgress}
            className="range range-xs w-full text-[#1ED760]"
          />
          <div className="mt-1 text-xs text-gray-400">
            {formatTime(currentTime)} / {formatTime(duration)}
          </div>
        </div>

        {/* Volume + Timer */}
        <div className="flex w-1/3 flex-col items-center justify-center">
          <div className="mb-4 flex items-center gap-2">
            <Volume2 size={18} />
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              defaultValue="1"
              onChange={(e) => (localAudioRef.current.volume = e.target.value)}
              className="range range-xs w-40 text-[#1ED760]"
            />
          </div>
          <SleepTimer audioRef={localAudioRef} onTimerEnd={handleTimerEnd} />
        </div>

        {/* Audio Element */}
        {currentSong?.src && (
          <audio
            ref={localAudioRef}
            src={currentSong?.src || ""}
            onTimeUpdate={handleTimeUpdate}
            onEnded={handleEnded}
            onLoadedMetadata={handleLoadedMetadata}
          />
        )}
      </div>
    </div>
  );
};

export default PlayingNow;
