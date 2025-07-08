import React, { useEffect, useState } from "react";
import { usePlayerStore } from "../store/usePlayerStore";

const AllSongs = () => {
  const [songs, setSongs] = useState([]);
  const setCurrentSong = usePlayerStore((state) => state.setCurrentSong);
  const setPlayState = usePlayerStore((state) => state.setPlayState);
  const setPlaylist = usePlayerStore((state) => state.setPlaylist);

  // Fetch from Audio.json
  useEffect(() => {
    fetch("/data/Audio.json")
      .then((res) => res.json())
      .then((data) => {
        setSongs(data);
        setPlaylist(data);
      });
  }, [setPlaylist]);

  const handlePlaySong = (song) => {
    setCurrentSong(song);
    setPlayState(true);
  };

  return (
    <>
      <div className="h-dvh bg-neutral-950">
        <div className="p-4">
          <h2 className="mb-4 text-2xl font-bold text-[#1ED760]">All Songs</h2>

          {/* All Songs Lists */}
          <ul className="space-y-2">
            {songs.map((song) => (
              <li
                key={song.id}
                onClick={() => handlePlaySong(song)}
                className="bg-base-100 hover:bg-base-300 flex cursor-pointer items-center justify-between rounded-lg px-4 py-2 transition"
              >
                <div>
                  <p className="font-semibold">{song.title}</p>
                </div>
                <button className="btn bg-ghost border border-[#1ED760] text-[#1ED760] hover:bg-[#1ED760] hover:text-black">
                  Play
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};

export default AllSongs;
