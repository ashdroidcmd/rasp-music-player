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
      <div className="bg-neutral-950">
        <div className="p-4">
          <h2 className="mb-4 text-2xl font-bold text-[#1ED760]">All Songs</h2>

          {/* All Songs Lists */}
          <ul className="space-y-2">
            {songs.map((song) => (
              <li
                key={song.id}
                onClick={() => handlePlaySong(song)}
                className="flex cursor-pointer items-center justify-between rounded-lg bg-stone-900 px-4 py-2 transition hover:bg-green-950"
              >
                <div>
                  <p className="font-semibold text-white">{song.title}</p>
                </div>
                <button className="btn border border-[#1ED760] bg-stone-900 text-[#1ED760] hover:bg-[#1ED760] hover:text-black">
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
