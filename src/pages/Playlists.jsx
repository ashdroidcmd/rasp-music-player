import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

const Playlists = () => {
  const [playlists, setPlaylists] = useState([]);

  useEffect(() => {
    fetchPlaylists();
  }, []);

  const fetchPlaylists = async () => {
    try {
      const res = await fetch("http://localhost:3000/api/playlists");
      const data = await res.json();
      setPlaylists(data);
    } catch (err) {
      console.error("Error fetching playlists:", err);
    }
  };

  const handleDelete = async (id) => {
    const confirm = window.confirm(
      "Are you sure you want to delete this playlist?",
    );
    if (!confirm) return;

    try {
      const res = await fetch(`http://localhost:3000/api/playlists/${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        setPlaylists((prev) => prev.filter((playlist) => playlist.id !== id));
        alert("✅ Playlist deleted.");
      } else {
        alert("❌ Failed to delete playlist.");
      }
    } catch (err) {
      console.error("Delete error:", err);
      alert("❌ Error deleting playlist.");
    }
  };

  return (
    <div className="h-dvh bg-neutral-950">
      <div className="p-4">
        <h1 className="mb-6 text-center text-3xl font-bold text-[#1ED760]">
          Playlists
        </h1>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {playlists.map(({ id, name }) => (
            <div
              key={id}
              className="rounded-xl bg-stone-900 p-6 shadow transition hover:bg-green-950 hover:shadow-lg"
            >
              <Link to={`/playlists/${id}`} className="block">
                <h2 className="mb-2 text-xl font-semibold text-white">
                  {id}. {name}
                </h2>
                <p className="text-sm text-gray-400">Tap to view songs</p>
              </Link>
              <button
                onClick={() => handleDelete(id)}
                className="btn btn-outline btn-error mt-4 w-1/2 rounded px-4 py-2 text-sm font-semibold text-white"
              >
                Delete Playlist
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Playlists;
