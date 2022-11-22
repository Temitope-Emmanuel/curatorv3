import React from 'react';
import { useProgress } from 'react-native-track-player';
import usePlayerService from '../providers/TrackPlayer';
import { Slider } from './SliderDef';

const PlayerScreenProgressBar = () => {
  const { playlist, playingSnippet } = usePlayerService();
  const { duration, position } = useProgress();

  const handleSeek = (seekTo: number) => {
    playlist.current?.seek(seekTo);
  };

  return <Slider {...{ duration, position, handleSeek }} disabled={playingSnippet} />;
};

export default PlayerScreenProgressBar;
