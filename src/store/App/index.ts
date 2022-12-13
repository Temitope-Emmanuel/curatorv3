import { createSlice, PayloadAction } from '@reduxjs/toolkit';
// eslint-disable-next-line import/no-cycle
import { RootState } from '..';

interface AppState {
  seenSplashScreen: boolean;
  showMore: boolean;
  showReaction: boolean;
  activeData: {
    id: string;
    type: 'snippet' | 'note' | ''
  }
}

const initialState: AppState = {
  seenSplashScreen: false,
  showMore: false,
  showReaction: false,
  activeData: {
    id: '',
    type: ''
  }
};

export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setSeenSplashScreen: (state, action: PayloadAction<boolean>) => {
      state.seenSplashScreen = action.payload;
    },
    toggleShowMore: (state, action: PayloadAction<{show?: boolean}>) => {
      state.showMore = action.payload?.show ?? !state.showMore;
    },
    addData: (state, action: PayloadAction<{id: string;type: 'note' | 'snippet' | ''}>) => {
      state.activeData = action.payload;
    },
    showEmoji: (state, action: PayloadAction<boolean>) => {
      state.showReaction = action.payload;
    }
  },
});

export const { setSeenSplashScreen, toggleShowMore, addData, showEmoji } = appSlice.actions;

export const getSeenSplashScreen = (state: RootState) => state.app;
export const getShowMore = (state: RootState) => state.app.showMore;
export const getData = (state: RootState) => state.app.activeData;
export const getShowReaction = (state: RootState) => state.app.showReaction;
export default appSlice.reducer;
