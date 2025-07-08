import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { usePlayerStore } from "../store/usePlayerStore";
import { Link } from "react-router-dom";

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

  const handlePlayPlaylist = (songsArray) => {
    if (songsArray.length === 0) return;
    setPlaylist(songsArray);
    setCurrentSong(songsArray[0]);
    setPlayState(true);
  };

  return (
    <>
      <div className="h-dvh bg-neutral-950">
        <div className="p-6">
          <div className="mb-4 flex flex-row items-center">
            <h1 className="grow text-2xl font-bold text-[#1ED760] capitalize">
              {playlistId} Playlist
            </h1>
            <div>
              <button
                onClick={() => handlePlayPlaylist(songs)}
                disabled={songs.length === 0}
                className="btn bg-ghost me-4 border border-[#1ED760] text-[#1ED760] hover:bg-[#1ED760] hover:text-black"
              >
                Play Entire Playlist
              </button>
              <Link to="/playlists">
                <button className="btn btn-error btn-outline">Back</button>
              </Link>
            </div>
          </div>

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

export default PlaylistView;
