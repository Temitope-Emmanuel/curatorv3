import React, { memo, useMemo } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { TEXT_TERTIARY } from '../constants/colors';
import { useAppSelector } from '../hooks/redux';
import { INote } from '../interfaces/note';
import { BaseTabProps } from '../interfaces/tab';
import { RootState } from '../store';
import { getData } from '../store/App';
import IconImage from './Icon';
import Notes from './Notes';

interface NoteTabProps extends BaseTabProps {
  currentNotes: RootState['notes']['currentNotes'];
}

const NoteTab: React.FC<NoteTabProps> = ({ currentNotes, currentUser, handleReactions, playlist, handleDelete, toggleShowMore }) => {
  const mappedNotes = useMemo(
    () => Object.values(currentNotes.notes).sort((a, b) => a.time - b.time),
    [currentNotes.notes]
  );
  const handleNotePress = (seekNote: { time: number }) => {
    playlist?.seek(seekNote.time);
  };
  const activeData = useAppSelector(getData);

  const renderItem = ({
    item: { description, id, owner, reactions, time, timestamp, status },
  }: {
    item: INote;
  }) => (
    <Notes
      currentUser={currentUser?.uid ?? ''}
      isAuthor={currentUser?.uid === owner?.id}
      handlePress={handleNotePress}
      key={id}
      isActive={activeData.type === 'note'}
      isTheActive={activeData.id === id}
      toggleShowMore={() => toggleShowMore({id, type: 'note'})}
      {...{ description, id, owner, reactions, time, timestamp, handleDelete, handleReactions, status }}
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
