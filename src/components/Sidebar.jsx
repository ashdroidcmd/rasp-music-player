import { Home, Library } from "lucide-react";
const Sidebar = () => {
  return (
    <aside className="flex h-screen w-64 flex-col justify-between border-e border-e-gray-400 bg-black p-5">
      {/* Logo / App Name */}
      <div>
        <h1 className="mb-6 text-xl font-bold">ACE-Potify</h1>

        {/* Navigation */}
        <nav className="flex flex-col gap-4">
          <div className="flex flex-row items-center space-x-2">
            <Home className="text-success" />
            <a
              href="/"
              className="hover:text-success flex items-center gap-3 font-semibold"
            >
              Home
            </a>
          </div>

          <div className="flex flex-row items-center space-x-2">
            <Library className="text-success" />
            <a
              href="/library"
              className="hover:text-success flex items-center gap-3 font-semibold"
            >
              Library
            </a>
          </div>
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;
