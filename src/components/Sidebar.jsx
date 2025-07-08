const Sidebar = () => {
  return (
    <aside className="w-64 h-screen bg-black p-4 flex flex-col justify-between border-e border-e-gray-400">
      {/* Logo / App Name */}
      <div>
        <h1 className="text-xl font-bold mb-6">Music Player</h1>

        {/* Navigation */}
        <nav className="flex flex-col gap-4">
          <a href="#" className="flex items-center gap-3 hover:text-primary">
            Home
          </a>
          <a href="#" className="flex items-center gap-3 hover:text-primary">
            Playlist
          </a>
          <a href="#" className="flex items-center gap-3 hover:text-primary">
            Settings
          </a>
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;
