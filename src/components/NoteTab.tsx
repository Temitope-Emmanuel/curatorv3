import React, { memo, useMemo, useRef } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { TEXT_TERTIARY } from '../constants/colors';
import { INote } from '../interfaces/note';
import { BaseTabProps } from '../interfaces/tab';
import { TrackPlayerClass } from '../providers/TrackPlayer';
import { RootState } from '../store';
import IconImage from './Icon';
import DeleteModal, { DeleteAudioRef } from './modal/DeleteModal';
import Notes from './Notes';

interface NoteTabProps extends BaseTabProps {
  playlist: TrackPlayerClass | null;
  currentNotes: RootState['notes']['currentNotes'];
}

const NoteTab: React.FC<NoteTabProps> = ({ currentNotes, currentUser, handleReactions, playlist }) => {
  const handleDeleteRef = useRef<DeleteAudioRef>(null);
  const mappedNotes = useMemo(
    () => Object.values(currentNotes.notes).sort((a, b) => a.time - b.time),
    [currentNotes.notes]
  );
  const handleNotePress = (seekNote: { time: number }) => {
    playlist?.seek(seekNote.time);
  };

  const handleDelete = (id: string) => {
    const foundNote = currentNotes.notes[id];
    handleDeleteRef.current?.setItemToDelete({
      id: foundNote.id,
      name: foundNote.description,
      type: 'note',
    });
    handleDeleteRef.current?.toggleShowDelete();
  };

  const renderItem = ({
    item: { description, id, owner, reactions, time, timestamp },
  }: {
    item: INote;
  }) => (
    <Notes
      currentUser={currentUser?.uid ?? ''}
      isAuthor={currentUser?.uid === owner?.id}
      handlePress={handleNotePress}
      key={id}
      {...{ description, id, owner, reactions, time, timestamp, handleDelete, handleReactions }}
    />
  );

  return (
    <>
      {mappedNotes.length ? (
        <FlatList data={mappedNotes} renderItem={renderItem} keyExtractor={(item) => item.id} />
      ) : (
        <View style={styles.noAudioContainer}>
          <IconImage name="empty-audio" width={150} />
          <Text style={styles.noAudioText}>
            Highlight parts of your audio to remember easily and bring attention and share with
            others.
          </Text>
        </View>
      )}
      <DeleteModal ref={handleDeleteRef} />
    </>
  );
};

const styles = StyleSheet.create({
  audioContainer: {
    flex: 1,
    marginTop: 'auto',
    marginBottom: 'auto',
  },
  noAudioContainer: {
    alignItems: 'center',
    marginTop: 'auto',
    marginBottom: 'auto',
  },
  noAudioText: {
    textAlign: 'center',
    color: TEXT_TERTIARY,
    marginTop: 38,
    maxWidth: 275,
  },
});

export default memo(NoteTab);
