import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import PlayingNow from "../components/PlayingNow";

const MainLayout = () => {
  return (
    <div className="h-screen flex flex-col">
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <Sidebar />

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto">
          <Outlet />
        </main>
      </div>

      {/* Persistent Now Playing Bar */}
      <PlayingNow />
    </div>
  );
};

export default MainLayout;
