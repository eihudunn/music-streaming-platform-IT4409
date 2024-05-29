import { configureStore, createSlice, PayloadAction } from "@reduxjs/toolkit"

interface Track {
  name: string;
  artists: string[];
  image: string;
  album: string;
  id: string;
  soundType: string;
}

interface MusicState {
  currentTrack: Track;
  currentPlaylist: string;
  isPlaying: boolean;
  isPlayingRandom: boolean;
  loopMode: string;
  time: number;
  duration: number;
  volume: number;
  prevVolume: number;
  musicIndexInQueue: number;
  tracksQueue: Track[];
}

const initialState: MusicState = {
  currentTrack: {
    name: "",
    artists: [""],
    image: "",
    album: "",
    id: "",
    soundType: "track",
  },
  currentPlaylist: "",
  isPlaying: false,
  isPlayingRandom: false,
  loopMode: "no_loop",
  time: 0,
  duration: 180,
  volume: 60,
  prevVolume: 50,
  musicIndexInQueue: 0,
  tracksQueue: [],
};

const musicSlice = createSlice({
  name: "music",
  initialState,
  reducers: {
    changeCurrentMusic(state, action: PayloadAction<Partial<Track>>) {
      state.currentTrack = { ...state.currentTrack, ...action.payload };
    },
    changeCurrentMusicId(state, action: PayloadAction<string>) {
      state.currentTrack.id = action.payload;
    },
    changeCurrentPlaylist(state, action: PayloadAction<string>) {
      state.currentPlaylist = action.payload;
    },
    togglePlaying(state) {
      state.isPlaying = !state.isPlaying;
    },
    playMusic(state) {
      state.isPlaying = true;
    },
    togglePlayingRandom(state) {
      state.isPlayingRandom = !state.isPlayingRandom;
    },
    changeLoopMode(state, action: PayloadAction<string>) {
      state.loopMode = action.payload;
    },
    incrementLoopMode(state) {
      switch (state.loopMode) {
        case 'no_loop':
          state.loopMode = 'loop_1';
          break;
        case 'loop_1':
          state.loopMode = 'loop_2';
          break;
        case 'loop_2':
          state.loopMode = 'no_loop';
          break;
      }
    },
    changeTime(state, action: PayloadAction<number>) {
      state.time = action.payload;
    },
    changeDuration(state, action: PayloadAction<number>) {
      state.duration = action.payload;
    },
    changeSoundType(state, action: PayloadAction<string>) {
      state.currentTrack.soundType = action.payload;
    },
    changeVolume(state, action: PayloadAction<number>) {
      state.volume = action.payload;
    },
    changePrevVolume(state, action: PayloadAction<number>) {
      state.prevVolume = action.payload;
    },
    changeMusicIndexInQueue(state, action: PayloadAction<number>) {
      state.musicIndexInQueue = action.payload;
    },
    changeTracksQueue(state, action: PayloadAction<Track[]>) {
      state.tracksQueue = action.payload;
    },
    addToQueue(state, action: PayloadAction<Track>) {
      state.tracksQueue = [...state.tracksQueue, action.payload];
    }
  }
});

export const {
  changeCurrentMusic,
  changeCurrentMusicId,
  changeCurrentPlaylist,
  togglePlaying,
  playMusic,
  togglePlayingRandom,
  incrementLoopMode,
  changeLoopMode,
  changeTime,
  changeDuration,
  changeSoundType,
  changeVolume,
  changePrevVolume,
  changeMusicIndexInQueue,
  changeTracksQueue,
  addToQueue
} = musicSlice.actions;

export const store = configureStore({
  reducer: {
    music: musicSlice.reducer
  }
});
