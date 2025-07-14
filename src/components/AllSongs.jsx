import React, { useEffect, useState } from "react";
import { usePlayerStore } from "../store/usePlayerStore";

const AllSongs = () => {
  const [songs, setSongs] = useState([]);
  const setCurrentSong = usePlayerStore((state) => state.setCurrentSong);
  const setPlayState = usePlayerStore((state) => state.setPlayState);
  const setPlaylist = usePlayerStore((state) => state.setPlaylist);

  useEffect(() => {
    fetch("http://localhost:3000/api/songs")
      .then((res) => res.json())
      .then((data) => {
        const formattedSongs = data.map((song) => ({
          id: song.id,
          title: song.title,
          src: song.url,
        }));
        setSongs(formattedSongs);
        setPlaylist(formattedSongs);
      })
      .catch((err) => console.error("Error fetching songs:", err));
  }, []);

  const handlePlaySong = (song) => {
    setCurrentSong(song);
    setPlayState(true);
  };

  const handleDeleteSong = async (songId) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this song?");
    if (!confirmDelete) return;

    try {
      const res = await fetch(`http://localhost:3000/api/songs/${songId}`, {
        method: "DELETE",
      });

      if (res.ok) {
        setSongs((prev) => prev.filter((song) => song.id !== songId));
        alert("✅ Song deleted.");
      } else {
        alert("❌ Failed to delete song.");
      }
    } catch (err) {
      console.error("❌ Error deleting song:", err);
      alert("❌ Error deleting song.");
    }
  };

  return (
    <div className="h-dvh bg-neutral-950">
      <div className="p-4">
        <h2 className="mb-4 text-2xl font-bold text-[#1ED760]">All Songs</h2>

        <ul className="space-y-2">
          {songs.map((song) => (
            <li
              key={song.id}
              className="flex items-center justify-between rounded-lg bg-stone-900 px-4 py-2 transition hover:bg-green-950"
            >
              <div
                className="flex-1 cursor-pointer"
                onClick={() => handlePlaySong(song)}
              >
                <p className="font-semibold text-white">{song.title}</p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handlePlaySong(song)}
                  className="btn border border-[#1ED760] bg-stone-900 text-[#1ED760] hover:bg-[#1ED760] hover:text-black"
                >
                  Play
                </button>
                <button
                  onClick={() => handleDeleteSong(song.id)}
                  className="btn btn-outline btn-error"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default AllSongs;
