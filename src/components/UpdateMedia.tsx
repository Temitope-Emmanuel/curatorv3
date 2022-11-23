import React from 'react';
import { State, usePlaybackState, useProgress } from 'react-native-track-player';
import { useInterval } from '../hooks/useInterval';
import usePlayerService from '../providers/TrackPlayer';

export const UpdateMedia = () => {
  const {
    updateMediaStatus,
    playingSnippet,
  } = usePlayerService();
  const playbackState = usePlaybackState();
  const { duration, position } = useProgress();
  useInterval(
    () => {
      updateMediaStatus({
        duration,
        position,
      });
    },
    playbackState === State.Playing && !playingSnippet ? 3000 : null
  );

  return <></>;
};

export default UpdateMedia;
