import React, { useState } from "react";

const AddSong = () => {
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [playlistId, setPlaylistId] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newSong = { title, url, playlistId: Number(playlistId) };

    try {
      const res = await fetch("http://localhost:3000/api/songs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newSong),
      });

      if (res.ok) {
        alert("✅ Song added successfully!");
        setTitle("");
        setUrl("");
        setPlaylistId("");
      } else {
        alert("❌ Failed to add song.");
      }
    } catch (err) {
      console.error("Error adding song:", err);
      alert("❌ Error connecting to backend.");
    }
  };

  return (
    <div className="flex items-center justify-center bg-neutral-950 py-10 text-white">
      <div className="w-full max-w-md rounded-xl bg-stone-900 p-6 shadow-lg">
        <h2 className="mb-3 text-center text-2xl font-bold text-[#1ED760]">
          Add New Song
        </h2>
        <p className="text-center text-sm font-semibold text-white italic">
          NOTES:
        </p>
        <p className="text-center text-sm text-white italic">
          Playlist Id in Playlist Page
        </p>
        <p className="mb-6 text-center text-sm text-white italic">
          Change also the ending of Dropbox Url from "dl=0" to "raw=1"
        </p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="label text-[#1ED760]">Title</label>
            <input
              type="text"
              className="input input-bordered w-full bg-black text-white"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="label text-[#1ED760]">URL (Dropbox .mp3)</label>
            <input
              type="url"
              className="input input-bordered w-full bg-black text-white"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="label text-[#1ED760]">Playlist ID</label>
            <input
              type="number"
              className="input input-bordered w-full bg-black text-white"
              value={playlistId}
              onChange={(e) => setPlaylistId(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="btn w-full bg-[#1ED760] text-black">
            Add Song
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddSong;
