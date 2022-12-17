import { createSlice, PayloadAction } from '@reduxjs/toolkit';
// eslint-disable-next-line import/no-cycle
import { RootState } from '..';

export interface ActiveDataType {
  id: string;
  type: 'snippet' | 'note' | '';
  isOwner: boolean;
}
interface AppState {
  showReaction: boolean;
  activeData: ActiveDataType;
}

const defaultActiveData: ActiveDataType = {
  id: '',
  type: '',
  isOwner: false,
};

const initialState: AppState = {
  showReaction: false,
  activeData: defaultActiveData,
};

export const appSlice = createSlice({
  name: 'temp',
  initialState,
  reducers: {
    addData: (state, action: PayloadAction<ActiveDataType>) => {
      state.activeData = action.payload;
    },
    showEmoji: (state, action: PayloadAction<boolean>) => {
      state.showReaction = action.payload;
    },
    clearData: (state) => {
      state.activeData = defaultActiveData;
    },
  },
});

export const { addData, showEmoji, clearData } = appSlice.actions;

export const getData = (state: RootState) => state.temp.activeData;
export const getShowReaction = (state: RootState) => state.temp.showReaction;
export default appSlice.reducer;
