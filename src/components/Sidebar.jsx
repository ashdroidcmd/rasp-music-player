import { Link } from "react-router-dom";
import { Home, Library } from "lucide-react";
const Sidebar = () => {
  return (
    <aside className="flex h-screen w-64 flex-col justify-between border-e border-e-gray-400 bg-black p-5">
      {/* Logo / App Name */}
      <div>
        <h1 className="mb-6 text-xl font-bold text-[#1ED760]">ACE-Potify</h1>

        {/* Navigation */}
        <nav className="flex flex-col gap-4">
          <div className="flex flex-row items-center space-x-2">
            <Home className="text-[#1ED760]" />
            <Link
              to="/"
              className="flex items-center gap-3 font-semibold hover:text-[#1ED760]"
            >
              Home
            </Link>
          </div>

          <div className="flex flex-row items-center space-x-2">
            <Library className="text-[#1ED760]" />
            <Link
              to="/playlists"
              className="flex items-center gap-3 font-semibold hover:text-[#1ED760]"
            >
              Playlists
            </Link>
          </div>
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;
