import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { usePlayerStore } from "../store/usePlayerStore";

const PlaylistView = () => {
  const { playlistId } = useParams();
  const [songs, setSongs] = useState([]);
  const [playlistName, setPlaylistName] = useState("");

  const setCurrentSong = usePlayerStore((state) => state.setCurrentSong);
  const setPlayState = usePlayerStore((state) => state.setPlayState);
  const setPlaylist = usePlayerStore((state) => state.setPlaylist);

  useEffect(() => {
    const fetchSongs = async () => {
      try {
        const songsRes = await fetch(
          `http://localhost:3000/api/playlists/${playlistId}/songs`,
        );
        const songsData = await songsRes.json();
        setSongs(songsData);
        setPlaylist(songsData);
      } catch (err) {
        console.error("❌ Failed to load songs:", err);
      }
    };

    const fetchPlaylistName = async () => {
      try {
        const playlistRes = await fetch(
          `http://localhost:3000/api/playlists/${playlistId}`,
        );
        const playlistData = await playlistRes.json();
        setPlaylistName(playlistData.name || "");
      } catch (err) {
        console.error("❌ Failed to load playlist name:", err);
      }
    };

    fetchSongs();
    fetchPlaylistName();
  }, [playlistId]);

  const handlePlaySong = (song) => {
    setCurrentSong({
      ...song,
      src: song.url, // Ensures playback works
      artist: "Unknown Artist", // Or fetch artist if available
    });
    setPlayState(true);
  };

  const handlePlayPlaylist = (songsArray) => {
    if (!songsArray.length) return;
    const playlistWithSrc = songsArray.map((song) => ({
      ...song,
      src: song.url,
      artist: "Unknown Artist",
    }));
    setPlaylist(playlistWithSrc);
    setCurrentSong(playlistWithSrc[0]);
    setPlayState(true);
  };

  const handleDeleteSong = async (songId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this song?",
    );
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
      console.error("❌ Delete error:", err);
      alert("❌ Error deleting song.");
    }
  };

  return (
    <div className="h-dvh bg-neutral-950">
      <div className="p-6">
        <div className="mb-4 flex flex-row items-center">
          <h1 className="grow text-2xl font-bold text-[#1ED760] capitalize">
            {playlistName || "Playlist"}
          </h1>
          <div>
            <button
              onClick={() => handlePlayPlaylist(songs)}
              disabled={songs.length === 0}
              className="btn me-4 border border-[#1ED760] bg-transparent text-[#1ED760] hover:bg-[#1ED760] hover:text-black"
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
              className="flex items-center justify-between rounded-lg bg-stone-900 px-4 py-2 transition hover:bg-green-950"
            >
              <div
                className="flex-1 cursor-pointer"
                onClick={() => handlePlaySong(song)}
              >
                <p className="font-semibold text-white">{song.title}</p>
                <p className="text-sm text-white">
                  {song.artist || "Unknown Artist"}
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => handlePlaySong(song)}
                  className="btn border border-[#1ED760] bg-transparent text-[#1ED760] hover:bg-[#1ED760] hover:text-black"
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

export default PlaylistView;
