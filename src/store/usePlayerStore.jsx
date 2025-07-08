import { create } from "zustand";

export const usePlayerStore = create((set, get) => ({
  playlist: [],
  currentSong: null,
  isPlaying: false,
  isShuffle: false,
  isRepeat: false,
  audioRef: null,
  setAudioRef: (ref) => set({ audioRef: ref }),
  setPlaylist: (songs) => set({ playlist: songs }),
  setCurrentSong: (song) => set({ currentSong: song }),
  setPlayState: (state) => set({ isPlaying: state }),
  togglePlay: () => set((state) => ({ isPlaying: !state.isPlaying })),
  toggleShuffle: () => set((state) => ({ isShuffle: !state.isShuffle })),
  toggleRepeat: () => set((state) => ({ isRepeat: !state.isRepeat })),

  // Make sure the SYSTEM DATE IS ON CURRENT Date
  playDailyBread: () => {
    const today = new Date();
    const year = today.getFullYear(); // e.g., 2025
    const month = String(today.getMonth() + 1).padStart(2, "0"); // e.g., '07'
    const day = String(today.getDate()).padStart(2, "0"); // e.g., '08'
    const shortYear = String(year).slice(2); // e.g., '25'

    const fileName = `odb-${month}-${day}-${shortYear}.mp3`; // 'odb-07-08-25.mp3'
    const url = `https://dzxuyknqkmi1e.cloudfront.net/odb/${year}/${month}/${fileName}`;

    console.log("[DailyBread] Playing Our Daily Bread audio:");
    console.log("  ▶️ File Name:", fileName);
    console.log("  📅 Date:", `${year}-${month}-${day}`);
    console.log("  🔗 URL:", url);

    set({
      currentSong: {
        id: `odb-${year}-${month}-${day}`,
        title: "Our Daily Bread",
        artist: "Daily Devotional",
        src: url,
      },
      isPlaying: true,
    });
  },

  playNext: () => {
    const { playlist, currentSong, isShuffle } = get();
    if (!playlist || playlist.length === 0) return;

    if (isShuffle) {
      const shuffled = playlist.filter((song) => song.id !== currentSong?.id);
      const random = shuffled[Math.floor(Math.random() * shuffled.length)];
      if (random) set({ currentSong: random, isPlaying: true });
    } else {
      const currentIndex = playlist.findIndex(
        (song) => song.id === currentSong?.id,
      );
      const nextIndex = (currentIndex + 1) % playlist.length;
      set({ currentSong: playlist[nextIndex], isPlaying: true });
    }
  },

  playPrevious: () => {
    const { playlist, currentSong } = get();
    if (!playlist || playlist.length === 0) return;

    const currentIndex = playlist.findIndex(
      (song) => song.id === currentSong?.id,
    );
    const prevIndex = (currentIndex - 1 + playlist.length) % playlist.length;
    set({ currentSong: playlist[prevIndex], isPlaying: true });
  },
}));
