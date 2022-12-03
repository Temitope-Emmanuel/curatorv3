import { nanoid } from 'nanoid/non-secure';
import React, { forwardRef, memo, useCallback, useEffect, useImperativeHandle, useMemo } from 'react';
import { useProgress } from 'react-native-track-player';
import { useAppDispatch } from '../../hooks/redux';
import useTimeFormatter from '../../hooks/useTimeFormatter';
import useToggle from '../../hooks/useToggle';
import { IUser } from '../../interfaces/auth';
import { IMedia } from '../../interfaces/Media';
import { INote, NewNote } from '../../interfaces/note';
import { ISnippet, NewSnippet } from '../../interfaces/snippet';
import usePlayerService from '../../providers/TrackPlayer';
import { addCurrentNotes } from '../../store/Notes';
import { addCurrentSnippets } from '../../store/Snippets';
import useFirestore from '../../utils/firestore';
import AddNote from './AddNote';
import AddSnippet from './AddSnippet';

interface AddDatumModalProps {
  currentUser: IUser | null;
  currentMedia: IMedia;
}

export interface AddDatumModalRef {
  toggleNoteModal: () => void;
  toggleSnippetModal: () => void;
}

// eslint-disable-next-line react/display-name
export const AddDatumModal = forwardRef<AddDatumModalRef, AddDatumModalProps>(
  ({ currentUser, currentMedia }, ref) => {
    const dispatch = useAppDispatch();
    const { position } = useProgress();
    const formatTime = useTimeFormatter();
    const { playlist } = usePlayerService();
    const [showAddNoteModal, toggleNoteModal] = useToggle(false);
    const [showAddSnippetModal, toggleSnippetModal] = useToggle(false);
    const { handleSaveNoteRemote, handleSaveSnippetRemote } = useFirestore();
    useImperativeHandle(ref, () => ({
      toggleNoteModal,
      toggleSnippetModal,
    }));
    useEffect(() => {
      let timer:number = 0;
      if (showAddNoteModal || showAddSnippetModal) {
        timer = setTimeout(() => playlist.current?.pause(), 4000)
      } else {
        playlist.current?.play();
      }
      return () => clearTimeout(timer);
    }, [showAddNoteModal, showAddSnippetModal, playlist]);

    const formattedProgress = useMemo(
      () => formatTime.current?.getMMSSFromMillis(position >= 4 ? position - 4 : position) || '',
      [formatTime, position]
    );
    const formattedEndProgress = useMemo(
      () => formatTime.current?.getMMSSFromMillis(position + 6) || '',
      [formatTime, position]
    );
    const handleNewNoteSubmit = useCallback((note: NewNote) => {
      const { time } = note;
      const newTime = formatTime.current?.convertFormattedTime(time) || 0;
      const timestamp = formatTime.current?.getMMSSFromMillis(newTime) || '';

      const newNote: INote = {
        id: nanoid(),
        description: note.description,
        owner: {
          displayName: currentUser?.displayName ?? '',
          id: currentUser?.uid ?? '',
          email: currentUser?.email ?? '',
          photoURL: currentUser?.photoURL ?? '',
        },
        timestamp,
        time: newTime,
        reactions: {},
      };

      dispatch(addCurrentNotes(newNote));
      if (currentUser?.emailVerified) {
        handleSaveNoteRemote(newNote, currentMedia);
      }
      toggleNoteModal();
    }, [currentMedia, currentUser?.displayName, currentUser?.email, currentUser?.emailVerified, currentUser?.photoURL, currentUser?.uid, dispatch, formatTime, handleSaveNoteRemote, toggleNoteModal]);

    const handleNewSnippetSubmit = useCallback((snippet: NewSnippet) => {
      const { startTime, endTime } = snippet;
      const newStartTime = formatTime.current?.convertFormattedTime(startTime) || 0;
      const newEndTime = formatTime.current?.convertFormattedTime(endTime) || 0;
      const splicedStartTime = formatTime.current?.getMMSSFromMillis(newStartTime) || '';
      const splicedEndTime = formatTime.current?.getMMSSFromMillis(newEndTime) || '';
      const newSnippet: ISnippet = {
        id: nanoid(),
        description: snippet.description,
        owner: {
          displayName: currentUser?.displayName ?? '',
          id: currentUser?.uid ?? '',
          email: currentUser?.email ?? '',
          photoURL: currentUser?.photoURL ?? '',
        },
        time: {
          start: newStartTime,
          end: newEndTime,
        },
        formatTime: {
          start: splicedStartTime,
          end: splicedEndTime,
        },
        reactions: {},
      };
      dispatch(addCurrentSnippets(newSnippet));
      if (currentUser?.emailVerified) {
        handleSaveSnippetRemote(newSnippet, currentMedia);
      }
      toggleSnippetModal();
    }, [currentMedia, currentUser?.displayName, currentUser?.email, currentUser?.emailVerified, currentUser?.photoURL, currentUser?.uid, dispatch, formatTime, handleSaveSnippetRemote, toggleSnippetModal]);
    return (
      <>
        {showAddNoteModal && (
          <AddNote
            progress={position}
            handleSubmit={handleNewNoteSubmit}
            formattedProgress={formattedProgress}
            showAddNoteModal={showAddNoteModal}
            toggleShowAddNoteModal={toggleNoteModal}
          />
        )}
        {showAddSnippetModal && (
          <AddSnippet
            progress={position}
            formattedEndProgress={formattedEndProgress}
            formattedStartProgress={formattedProgress}
            handleSubmit={handleNewSnippetSubmit}
            showAddSnippetModal={showAddSnippetModal}
            toggleShowSnippetModal={toggleSnippetModal}
          />
        )}
      </>
    );
  }
);

export default memo(AddDatumModal);
