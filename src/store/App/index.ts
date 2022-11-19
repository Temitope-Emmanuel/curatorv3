import { createSlice, PayloadAction } from '@reduxjs/toolkit';
// eslint-disable-next-line import/no-cycle
import { RootState } from '..';

interface AppState {
  seenSplashScreen: boolean;
}

const initialState: AppState = {
  seenSplashScreen: false,
};

export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setSeenSplashScreen: (state, action: PayloadAction<boolean>) => {
      state.seenSplashScreen = action.payload;
    },
  },
});

export const { setSeenSplashScreen } = appSlice.actions;

export const getSeenSplashScreen = (state: RootState) => state.app;
export default appSlice.reducer;
