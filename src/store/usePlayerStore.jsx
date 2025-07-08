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

  playNext: () => {
    const { playlist, currentSong, isShuffle } = get();
    if (!playlist || playlist.length === 0) return;

    if (isShuffle) {
      const shuffled = playlist.filter((song) => song.id !== currentSong?.id);
      const random = shuffled[Math.floor(Math.random() * shuffled.length)];
      if (random) set({ currentSong: random, isPlaying: true });
    } else {
      const currentIndex = playlist.findIndex(
        (song) => song.id === currentSong?.id
      );
      const nextIndex = (currentIndex + 1) % playlist.length;
      set({ currentSong: playlist[nextIndex], isPlaying: true });
    }
  },

  playPrevious: () => {
    const { playlist, currentSong } = get();
    if (!playlist || playlist.length === 0) return;

    const currentIndex = playlist.findIndex(
      (song) => song.id === currentSong?.id
    );
    const prevIndex =
      (currentIndex - 1 + playlist.length) % playlist.length;
    set({ currentSong: playlist[prevIndex], isPlaying: true });
  },
}));
