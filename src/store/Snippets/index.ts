import { createSlice, PayloadAction } from '@reduxjs/toolkit';
// eslint-disable-next-line import/no-cycle
import { RootState } from '..';
import { ReactionType } from '../../interfaces/reaction';
import { defaultSnippet, ICurrentSnippet, ISnippet } from '../../interfaces/snippet';

interface SnippetState {
  currentSnippets: ICurrentSnippet;
  snippets: {
    [mediaId: string]: {
      [snippetId: string]: ISnippet;
    };
  };
  currentPlayingSnippet: ISnippet;
}

const initialState: SnippetState = {
  currentSnippets: {
    mediaId: '',
    snippets: {},
  },
  snippets: {},
  currentPlayingSnippet: defaultSnippet,
};

export const snippetSlice = createSlice({
  name: 'snippet',
  initialState,
  reducers: {
    loadSnippets: (state, action: PayloadAction<{ id: string }>) => {
      if (state.snippets[action.payload.id]) {
        return {
          snippets: state.snippets,
          currentPlayingSnippet: state.currentPlayingSnippet,
          currentSnippets: {
            mediaId: action.payload.id,
            snippets: state.snippets[action.payload.id],
          },
        };
      }
      return {
        currentSnippets: {
          mediaId: action.payload.id,
          snippets: {},
        },
        snippets: {
          ...state.snippets,
          [action.payload.id]: {},
        },
        currentPlayingSnippet: state.currentPlayingSnippet,
      };
    },
    addCurrentSnippets: (state, action: PayloadAction<ISnippet>) => ({
      ...state,
      snippets: {
        ...state.snippets,
        [state.currentSnippets.mediaId]: {
          ...state.currentSnippets.snippets,
          [action.payload.id]: action.payload,
        },
      },
      currentSnippets: {
        mediaId: state.currentSnippets.mediaId,
        snippets: {
          ...state.currentSnippets.snippets,
          [action.payload.id]: action.payload,
        },
      },
    }),
    addSnippetReaction: (
      state,
      action: PayloadAction<{ snippetId: string; reaction: ReactionType; userId: string }>
    ) => {
      const currentSnippet = state.currentSnippets.snippets[action.payload.snippetId];
      if (currentSnippet) {
        currentSnippet.reactions = {
          [action.payload.userId]: action.payload.reaction,
        };
        state.snippets[state.currentSnippets.mediaId][action.payload.snippetId] = currentSnippet;
      }
    },
    setCurrentPlayingSnippet: (state, action: PayloadAction<ISnippet>) => {
      state.currentPlayingSnippet = action.payload;
    },
    deleteSnippet: (state, action: PayloadAction<{ id: string }>) => {
      const newCurrentSnippets = { ...state.currentSnippets };
      delete newCurrentSnippets.snippets[action.payload.id];
      state.currentSnippets = newCurrentSnippets;
      state.snippets[newCurrentSnippets.mediaId] = newCurrentSnippets.snippets;
    },
    clearSnippets: () => initialState,
  },
});

export const {
  addCurrentSnippets,
  addSnippetReaction,
  clearSnippets,
  loadSnippets,
  deleteSnippet,
} = snippetSlice.actions;
export const getCurrentSnippets = (state: RootState) => state.snippets.currentSnippets;
export const getCurrentSnippetCount = (state:  RootState) => Object.keys(state.snippets.currentSnippets.snippets).length
export const getCurrentPlayingSnippet = (state: RootState) => state.snippets.currentPlayingSnippet;
export default snippetSlice.reducer;
