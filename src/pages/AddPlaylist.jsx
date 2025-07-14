import React, { useState } from "react";

const AddPlaylist = () => {
  const [name, setName] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name.trim()) return alert("Playlist name is required.");
    setIsLoading(true);

    try {
      const res = await fetch("http://localhost:3000/api/playlists", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name }),
      });

      const data = await res.json();

      if (res.ok) {
        alert(`✅ Playlist "${data.name}" created!`);
        setName("");
      } else {
        alert(`❌ Failed: ${data.error || "Unknown error"}`);
      }
    } catch (err) {
      console.error("Fetch error:", err);
      alert("❌ Error connecting to server.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center bg-neutral-950 pt-24 pb-80 text-white">
      <div className="w-full max-w-md rounded-xl bg-stone-900 p-6 shadow-lg">
        <h2 className="mb-6 text-center text-2xl font-bold text-[#1ED760]">
          Add New Playlist
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="label text-[#1ED760]">Playlist Name</label>
            <input
              type="text"
              className="input input-bordered w-full bg-black text-white"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              disabled={isLoading}
            />
          </div>

          <button
            type="submit"
            className="btn w-full bg-[#1ED760] text-black"
            disabled={isLoading}
          >
            {isLoading ? "Creating..." : "Create Playlist"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddPlaylist;
