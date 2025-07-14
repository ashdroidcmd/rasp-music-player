import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

const Playlists = () => {
  const [playlists, setPlaylists] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/api/playlists")
      .then((res) => res.json())
      .then((data) => setPlaylists(data))
      .catch((err) => console.error("Error fetching playlists:", err));
  }, []);

  return (
    <div className="h-dvh bg-neutral-950">
      <div className="p-4">
        <h1 className="mb-6 text-center text-3xl font-bold text-[#1ED760]">
          Playlists
        </h1>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {playlists.map(({ id, name }) => (
            <Link
              to={`/playlists/${id}`}
              key={id}
              className="cursor-pointer rounded-xl bg-stone-900 p-6 shadow transition hover:bg-green-950 hover:shadow-lg"
            >
              <h2 className="mb-2 text-xl font-semibold text-white">
                {name}
              </h2>
              <p className="text-sm text-gray-400">Tap to view songs</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Playlists;
