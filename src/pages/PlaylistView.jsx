import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { usePlayerStore } from "../store/usePlayerStore";
import Hero from "../components/Hero";

const PlaylistView = () => {
  const { playlistId } = useParams();
  const [songs, setSongs] = useState([]);
  const setCurrentSong = usePlayerStore((state) => state.setCurrentSong);
  const setPlayState = usePlayerStore((state) => state.setPlayState);
  const setPlaylist = usePlayerStore((state) => state.setPlaylist);

  useEffect(() => {
    fetch(`/data/${playlistId}.json`)
      .then((res) => res.json())
      .then((data) => {
        setSongs(data);
        setPlaylist(data);
      })
      .catch((err) => console.error("Failed to load playlist:", err));
  }, [playlistId]);

  const handlePlaySong = (song) => {
    setCurrentSong(song);
    setPlayState(true);
  };

  return (
    <>
      <Hero />
      <div className="p-6">
        <h1 className="mb-4 text-2xl font-bold capitalize">
          {playlistId} Playlist
        </h1>
        <ul className="space-y-2">
          {songs.map((song) => (
            <li
              key={song.id}
              onClick={() => handlePlaySong(song)}
              className="bg-base-100 hover:bg-base-300 flex cursor-pointer items-center justify-between rounded-lg px-4 py-2 transition"
            >
              <div>
                <p className="font-semibold">{song.title}</p>
                <p className="text-sm text-white">{song.artist}</p>
              </div>
              <button className="btn btn-sm btn-outline btn-success">
                Play
              </button>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default PlaylistView;
