import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import PlayingNow from "../components/PlayingNow";
import Hero from "../components/Hero";
import DailyBreadScheduler from "../components/DailyBreadScheduler";

const MainLayout = () => {
  return (
    <div className="h-screen flex flex-col">
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <Sidebar />

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto">
          <Hero />
          <Outlet />
        </main>
      </div>

      <DailyBreadScheduler />
      <PlayingNow />
    </div>
  );
};

export default MainLayout;
