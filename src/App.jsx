import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "./layout/MainLayout";
import Home from "./pages/Home";
import Playlists from "./pages/Playlists";
import PlaylistView from "./pages/PlaylistView";
import Settings from "./pages/Settings";
import AddSong from "./pages/AddSong";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="/playlists" element={<Playlists />} />
          <Route path="playlists/:playlistId" element={<PlaylistView />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/add-song" element={<AddSong />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
