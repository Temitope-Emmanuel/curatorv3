import React, { memo, useCallback, useMemo } from 'react';
import { StyleSheet, View } from 'react-native';
import { State, usePlaybackState, useProgress } from 'react-native-track-player';
import { BG_SECONDARY } from '../constants/colors';
import usePlayerService from '../providers/TrackPlayer';
import IconButton from './IconButton';

const ActionContainer = () => {
  const playbackState = usePlaybackState();
  const {
    playlist,
    currentMedia,
    addNewTrack,
    canPlayNext,
    canPlayPrevious,
    handlePlayNext,
    handlePlayPrevious,
    playingSnippet,
  } = usePlayerService();
  const { position } = useProgress();
  const isPlaying = useMemo(
    () => playbackState === State.Playing || playbackState === State.Buffering,
    [playbackState]
  );
  const isStopped = useMemo(() => playbackState === State.Stopped, [playbackState]);
  const isLoading = useMemo(
    () => playbackState === State.Buffering || playbackState === State.Connecting,
    [playbackState]
  );

  const handleSkip = useCallback(
    (time: number) => async () => {
      // await playlist?.togglePlaying();
      await playlist.current?.seek(position + time);
      // await playlist?.togglePlaying();
    },
    [playlist, position]
  );

  const handleSkipForward = handleSkip(10);
  const handleSkipBackward = handleSkip(-10);

  return (
    <View style={styles.actionContainer}>
      <IconButton
        disabled={!canPlayPrevious || playingSnippet}
        onPress={handlePlayPrevious}
        style={{ backgroundColor: BG_SECONDARY, borderRadius: 20 }}
        name="fast-rewind"
        size={20}
        width={40}
      />
      <IconButton
        disabled={!(position - 10 > 0) || isStopped || playingSnippet}
        onPress={handleSkipBackward}
        style={{ backgroundColor: BG_SECONDARY, borderRadius: 30 }}
        name="replay-10"
        size={35}
        width={60}
      />
      <IconButton
        disabled={isLoading || playingSnippet}
        onPress={isStopped ? () => addNewTrack({newMedia: currentMedia}) : playlist.current?.togglePlaying}
        style={{ backgroundColor: BG_SECONDARY, borderRadius: 45 }}
        name={isPlaying ? 'pause' : 'play'}
        size={40}
        width={90}
      />
      <IconButton
        disabled={!(position > 10) || isStopped || playingSnippet}
        onPress={handleSkipForward}
        style={{ backgroundColor: BG_SECONDARY, borderRadius: 30 }}
        name="forward-10"
        size={35}
        width={60}
      />
      <IconButton
        disabled={!canPlayNext || playingSnippet}
        onPress={handlePlayNext}
        style={{ backgroundColor: BG_SECONDARY, borderRadius: 20 }}
        name="fast-forward"
        size={20}
        width={40}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  actionContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});

export default memo(ActionContainer);
