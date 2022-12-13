import { createSlice, PayloadAction } from '@reduxjs/toolkit';
// eslint-disable-next-line import/no-cycle
import { RootState } from '..';
import { defaultAudio, IMedia } from '../../interfaces/Media';

interface MediaState {
  playlist: IMedia[];
  tags: string[];
  currentMedia: IMedia;
}

const initialState: MediaState = {
  tags: [],
  playlist: [],
  currentMedia: defaultAudio,
};

export const mediaSlice = createSlice({
  name: 'media',
  initialState,
  reducers: {
    addToPlaylist: (state, action: PayloadAction<IMedia>) => ({
      ...state,
      playlist: state.playlist.concat(action.payload).sort((a,b) => a.title < b.title ? -1 : 1),
    }),
    deleteMedia: (state, action: PayloadAction<string>) => {
      state.playlist = state.playlist.filter((item) => item.id !== action.payload);
    },
    editMedia: (state, action: PayloadAction<Partial<IMedia>>) => {
      const foundMediaIdx = state.playlist.findIndex((item) => item.id === action.payload.id);
      if (foundMediaIdx > -1) {
        state.playlist[foundMediaIdx] = {
          ...state.playlist[foundMediaIdx],
          ...action.payload,
        };
      }
    },
    updateCurrentMedia: (state, action: PayloadAction<IMedia>) => {
      const foundMediaIdx = state.playlist.findIndex((item) => item.id === action.payload.id);
      if (foundMediaIdx > -1) {
        return {
          ...state,
          currentMedia: {
            ...state.playlist[foundMediaIdx],
            ...action.payload,
          },
        };
      }
      return state;
    },
    updateMediaDetail: (
      state,
      action: PayloadAction<{
        id: string;
        duration: number;
        progress: number;
      }>
    ) => {
      const foundMediaIdx = state.playlist.findIndex((item) => item.id === action.payload.id);
      if (foundMediaIdx > -1) {
        const { duration, progress } = action.payload;
        const foundMedia = state.playlist[foundMediaIdx];
        const updatedMedia: IMedia = {
          ...foundMedia,
          duration:
            duration && duration > (foundMedia.duration || 0) ? duration : foundMedia.duration,
          position: progress,
        };

        state.playlist[foundMediaIdx] = updatedMedia;
      }
    },
    addTags: (state, action: PayloadAction<string>) => {
      state.tags = [...state.tags, action.payload];
    },
  },
});

export const {
  addToPlaylist,
  deleteMedia,
  editMedia,
  updateCurrentMedia,
  updateMediaDetail,
  addTags,
} = mediaSlice.actions;
export const getTags = (state: RootState) => state.media.tags;
export const getPlaylist = (state: RootState) => state.media.playlist;
export const getCurrentMedia = (state: RootState) => state.media.currentMedia;
export default mediaSlice.reducer;
