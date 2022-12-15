import { createSlice, PayloadAction } from '@reduxjs/toolkit';
// eslint-disable-next-line import/no-cycle
import { RootState } from '..';

export interface ActiveDataType {
  id: string;
  type: 'snippet' | 'note' | '',
  isOwner: boolean;
}
interface AppState {
  seenSplashScreen: boolean;
  showMore: boolean;
  showReaction: boolean;
  activeData: ActiveDataType
}

const initialState: AppState = {
  seenSplashScreen: false,
  showMore: false,
  showReaction: false,
  activeData: {
    id: '',
    type: '',
    isOwner: false
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
    addData: (state, action: PayloadAction<ActiveDataType>) => {
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
