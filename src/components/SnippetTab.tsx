import React, { memo, useCallback, useEffect, useMemo, useState } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { useProgress } from 'react-native-track-player';
import { BG_TERTIARY, TEXT_TERTIARY } from '../constants/colors';
import { defaultSnippet, ISnippet } from '../interfaces/snippet';
import { BaseTabProps } from '../interfaces/tab';
import usePlayerService from '../providers/TrackPlayer';
import { RootState } from '../store';
import IconImage from './Icon';
import Snippet from './Snippet';

interface SnippetTabProps extends BaseTabProps {
  currentSnippets: RootState['snippets']['currentSnippets'];
}

const SnippetTab: React.FC<SnippetTabProps> = ({ handleReactions, currentSnippets, currentUser, playlist, toggleShowMore, activeData }) => {
  const { position } = useProgress();
  const { setPlayingSnippet } = usePlayerService();
  const [currentPlayingSnippet, setCurrentPlayingSnippet] = useState<ISnippet>(defaultSnippet);
  const mappedSnippets = useMemo(
    () => Object.values(currentSnippets.snippets).sort((a, b) => a.time.start - b.time.start),
    [currentSnippets]
  );
  
  useEffect(() => {
    if (currentPlayingSnippet.id) {
      setPlayingSnippet(true)
    } else {
      setPlayingSnippet(false)
    }
  }, [currentPlayingSnippet])
  useEffect(() => {
    if (currentPlayingSnippet.time.end && position >= currentPlayingSnippet.time.end) {
      setCurrentPlayingSnippet(defaultSnippet);
      playlist?.pause();
    }
  }, [position, currentPlayingSnippet.time.end, playlist, setCurrentPlayingSnippet]);
  const handlePlaySnippet = useCallback(
    async (newPlayingSnippet: ISnippet) => {
      setCurrentPlayingSnippet(newPlayingSnippet);
      await playlist?.pause();
      await playlist?.seek(newPlayingSnippet.time.start);
      await playlist?.play();
    },
    [playlist, setCurrentPlayingSnippet]
  );

  const renderItem = ({
    item: { description, id, owner, reactions, time, formatTime, status },
  }: {
    item: ISnippet;
  }) => (
    <Snippet
      progress={currentPlayingSnippet.id === id ? position - time.start : undefined}
      duration={currentPlayingSnippet.id === id ? time.end - time.start : undefined}
      currentUser={currentUser?.uid ?? ''}
      disabled={!!currentPlayingSnippet.id}
      handlePlaySnippet={handlePlaySnippet}
      isActive={activeData.type === 'snippet'}
      isTheActive={activeData.id === id}
      active={currentPlayingSnippet.id === id}
      isAuthor={currentUser?.uid === owner?.id}
      toggleShowMore={() => toggleShowMore({id, type: 'snippet', isOwner: currentUser?.uid === owner.id})}
      {...{ description, formatTime, id, owner, reactions, time, handleReactions, status }}
    />
  );

  return (
    <>
      {mappedSnippets.length ? (
        <FlatList data={mappedSnippets} renderItem={renderItem} keyExtractor={(item) => item.id} />
      ) : (
        <View style={styles.noAudioContainer}>
          <IconImage name="empty-snippet" width={150} />
          <Text style={styles.noAudioText}>
            Create Snippets to easily remember parts of audio to note.
          </Text>
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  detailContainer: {
    borderRadius: 30,
    position: 'relative',
    paddingVertical: 20,
    paddingHorizontal: 15,
    paddingBottom: 20,
    width: '100%',
    flex: 1,
    backgroundColor: BG_TERTIARY,
    marginVertical: 20,
  },
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

export default memo(SnippetTab);
