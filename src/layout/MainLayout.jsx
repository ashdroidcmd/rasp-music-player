import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import PlayingNow from "../components/PlayingNow";

const MainLayout = () => {
  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        <Outlet />
      </main>

      {/* Fixed Now Playing Bar at the Bottom */}
      <PlayingNow />
    </div>
  );
};

export default MainLayout;
