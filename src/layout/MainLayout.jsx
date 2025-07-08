import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import PlayingNow from "../components/PlayingNow";

const MainLayout = () => {
  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <aside className="w-64 bg-base-200 border-r border-base-300">
        <Sidebar />
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto pb-24 bg-base-100 p-6">
        <Outlet />
      </main>

      {/* Fixed Now Playing Bar at the Bottom */}
      <PlayingNow />
    </div>
  );
};

export default MainLayout;
