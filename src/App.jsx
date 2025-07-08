import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "./layout/MainLayout";
import Home from "./pages/Home";
import Playlists from "./pages/Playlists";
import PlaylistView from "./pages/PlaylistView";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="/playlists" element={<Playlists />} />
          <Route path="playlists/:playlistId" element={<PlaylistView />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
