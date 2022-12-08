import { createSlice, PayloadAction } from '@reduxjs/toolkit';
// eslint-disable-next-line import/no-cycle
import { RootState } from '..';
import { ICurrentNote, INote } from '../../interfaces/note';
import { ReactionType } from '../../interfaces/reaction';

interface NoteState {
  currentNotes: ICurrentNote;
  notes: {
    [mediaId: string]: {
      [noteId: string]: INote;
    };
  };
}

const initialState: NoteState = {
  currentNotes: {
    mediaId: '',
    notes: {},
  },
  notes: {},
};

export const noteSlice = createSlice({
  name: 'notes',
  initialState,
  reducers: {
    loadNotes: (state, action: PayloadAction<{ id: string }>) => {
      if (state.notes[action.payload.id]) {
        return {
          notes: state.notes,
          currentNotes: {
            mediaId: action.payload.id,
            notes: state.notes[action.payload.id],
          },
        };
      }
      return {
        currentNotes: {
          mediaId: action.payload.id,
          notes: {},
        },
        notes: {
          ...state.notes,
          [action.payload.id]: {},
        },
      };
    },
    addCurrentNotes: (state, action: PayloadAction<INote>) => {
      const {type, status, ...newNote} = action.payload;
      return({
        ...state,
        notes: {
          ...state.notes,
          [state.currentNotes.mediaId]: {
            ...state.currentNotes.notes,
            [action.payload.id]: {
              ...newNote,
              // type: 'local',
            },
          },
        },
        currentNotes: {
          mediaId: state.currentNotes.mediaId,
          notes: {
            ...state.currentNotes.notes,
            [action.payload.id]: {
              ...action.payload,
              // type: 'local',
            },
          },
        },
      })
    },
    addNoteReaction: (
      state,
      action: PayloadAction<{ noteId: string; reaction: ReactionType; userId: string }>
    ) => {
      const currentNote = state.currentNotes.notes[action.payload.noteId];
      if (currentNote) {
        currentNote.reactions = {
          [action.payload.userId]: action.payload.reaction,
        };
        state.notes[state.currentNotes.mediaId][action.payload.noteId] = currentNote;
      }
    },
    clearNotes: () => ({
      ...initialState,
    }),
    deleteNotes: (state, action: PayloadAction<{ id: string }>) => {
      const newCurrentNotes = { ...state.currentNotes };
      delete newCurrentNotes.notes[action.payload.id];
      state.currentNotes = newCurrentNotes;
      state.notes[newCurrentNotes.mediaId] = newCurrentNotes.notes;
    },
  },
});
export const { addCurrentNotes, loadNotes, addNoteReaction, clearNotes, deleteNotes } =
  noteSlice.actions;
export const getCurrentNotes = (state: RootState) => state.notes.currentNotes;
export const getCurrentNoteCount = (state:  RootState) => Object.keys(state.notes.currentNotes.notes).length;
export default noteSlice.reducer;
