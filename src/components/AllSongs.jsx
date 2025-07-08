import React, { useEffect, useState } from "react";

const AllSongs = () => {
  const [songs, setSongs] = useState([]);

  useEffect(() => {
    fetch("/data/Audio.json")
      .then((res) => res.json())
      .then((data) => setSongs(data))
      .catch((err) => console.error("Failed to load songs:", err));
  }, []);

  return (
    <div className="p-4">
      <h2 className="mb-2 text-2xl font-bold">All Songs</h2>
      <ul className="space-y-2">
        {songs.map((song) => (
          <li
            key={song.id}
            className="bg-base-200 flex items-center justify-between rounded-lg p-4"
          >
            <div>
              <p className="font-semibold">{song.title}</p>
              <p className="text-sm text-gray-500">{song.artist}</p>
            </div>
            <audio controls src={song.src} className="w-60" />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AllSongs;
