import { createSlice, PayloadAction } from '@reduxjs/toolkit';
// eslint-disable-next-line import/no-cycle
import { RootState } from '..';
import { IMedia } from '../../interfaces/Media';

export type UploadStatus = 'start' | 'ongoing' | 'completed' | 'error' | 'paused';

interface UploadState {
  uploading: {
    media: IMedia;
    status: UploadStatus;
  }[];
}

const initialState: UploadState = {
  uploading: [],
};

export const uploadSlice = createSlice({
  name: 'upload',
  initialState,
  reducers: {
    startUploading: (state, action: PayloadAction<IMedia>) => {
      const uploadingMediaIdx = state.uploading.findIndex(
        (item) => item.media.id === action.payload.id
      );
      if (uploadingMediaIdx > -1) {
        state.uploading[uploadingMediaIdx].status = 'start';
      } else {
        state.uploading.push({
          media: action.payload,
          status: 'start',
        });
      }
    },
    completeUploading: (state, action: PayloadAction<IMedia>) => {
      const uploadingMediaIdx = state.uploading.findIndex(
        (item) => item.media.id === action.payload.id
      );
      if (uploadingMediaIdx > -1) {
        state.uploading[uploadingMediaIdx].status = 'completed';
      }
    },
    updateUploadStatus: (
      state,
      action: PayloadAction<{
        media: IMedia;
        status: UploadStatus;
      }>
    ) => {
      const uploadingMediaIdx = state.uploading.findIndex(
        (item) => item.media.id === action.payload.media.id
      );
      if (uploadingMediaIdx > -1) {
        state.uploading[uploadingMediaIdx].status = action.payload.status;
      }
    },
    clearUploading: (state) => {
      state.uploading = [];
    },
  },
});

export const { startUploading, completeUploading, updateUploadStatus, clearUploading } =
  uploadSlice.actions;
export const getUpload = (state: RootState) => state.upload.uploading;
export default uploadSlice.reducer;
