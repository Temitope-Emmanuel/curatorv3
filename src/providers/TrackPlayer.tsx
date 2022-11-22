import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import TrackPlayer, {
  Capability,
  RepeatMode,
  State,
} from 'react-native-track-player';
import { useAppDispatch, useAppSelector } from '../hooks/redux';
import createGenericContext from '../hooks/useGenericContext';
import { IMedia } from '../interfaces/Media';
import { defaultSnippet, ISnippet } from '../interfaces/snippet';
import { getCurrentMedia, getPlaylist, updateCurrentMedia, updateMediaDetail } from '../store/Media';

export class TrackPlayerClass {
  currentMedia: Omit<IMedia, 'owner'> | undefined;

  initialized = false;

  constructor() {
    if (!this.initialized) {
      this.start();
      this.initialized = true;
    }
  }

  start = async () => {
    await TrackPlayer.setupPlayer({
    });
    await TrackPlayer.updateOptions({
      backwardJumpInterval: 5,
      forwardJumpInterval: 5,
      capabilities: [
        Capability.Play,
        Capability.Pause,
        Capability.SkipToNext,
        Capability.SkipToPrevious,
        Capability.Stop,
      ],
      compactCapabilities: [
        Capability.Play,
        Capability.Pause,
        Capability.SkipToNext,
        Capability.JumpBackward,
        Capability.JumpForward,
      ],
    });
  };

  addNewTrack = async ({
    author,
    createdAt,
    description,
    id,
    url,
    title,
    isOwner,
  }: IMedia) => {
    try {
      this.currentMedia = {
        id,
        author,
        createdAt,
        description,
        title,
        url,
        isOwner,
      };
      await TrackPlayer.reset();
      await TrackPlayer.add({
        ...this.currentMedia,
        artist: author
      });
      // await TrackPlayer.setRepeatMode(RepeatMode.Off);
      await TrackPlayer.setVolume(1);
    } catch (err) {
      console.log('there\'s been an err', { err });
    }
  };

  seek = async (seekTo: number) => {
    await TrackPlayer.pause();
    await TrackPlayer.seekTo(seekTo);
    await TrackPlayer.play();
  };

  togglePlaying = async () => {
    const state = await TrackPlayer.getState();
    if (state === State.Paused) {
      await this.play();
    } else if (state === State.Playing) {
      await this.pause();
    } else {
      await TrackPlayer.play();
    }
  };

  pause = async () => {
    await TrackPlayer.pause();
  };

  play = async () => {
    await TrackPlayer.play();
  };

  stop = async () => {
    await TrackPlayer.reset();
  };
}

const [usePlayerService, PlayerServiceContextProvider] = createGenericContext<{
  playlist: React.MutableRefObject<TrackPlayerClass | null>;
  updateMediaStatus: (arg: { duration: number; position: number }) => void;
  currentMedia: IMedia;
  addNewTrack: (arg: {
    newMedia: IMedia;
    resetProgress?: boolean;
  }) => Promise<void>;
  canPlayNext: boolean;
  canPlayPrevious: boolean;
  handlePlayNext: () => void;
  handlePlayPrevious: () => void;
  playingSnippet: boolean;
  startPlayer: () => void;
  // currentPlayingSnippet: ISnippet;
  // setCurrentPlayingSnippet: (arg: ISnippet) => void;
  // handlePlaySnippet: (arg: ISnippet) => void;
}>();

export const PlayerServiceProvider = <P extends object>(
  Component: React.ComponentType<P>,
) =>
  function Provider({ ...props }) {
    const dispatch = useAppDispatch();
    const playlist = useRef<TrackPlayerClass | null>(null);
    const currentMedia = useAppSelector(getCurrentMedia);
    const playlistMedia = useAppSelector(getPlaylist);
    const [currentPlayingSnippet, setCurrentPlayingSnippet] = useState<ISnippet>(defaultSnippet);

    const startPlayer = useCallback(() => {
      if (!playlist.current) {
        const trackPlayer = new TrackPlayerClass();
        playlist.current = trackPlayer;
      }
    }, []);

    useEffect(
      () => () => {
        playlist.current?.stop();
      },
      [],
    );

    const playingSnippet = useMemo(
      () => !!currentPlayingSnippet.id.length,
      [currentPlayingSnippet]
    );
    const currentMediaIdx = useMemo(
      () => playlistMedia.findIndex((item) => currentMedia.id === item.id),
      [currentMedia.id, playlistMedia]
    );
    const canPlayPrevious = useMemo(
      () => !!playlistMedia[currentMediaIdx - 1] || playingSnippet,
      [playlistMedia, currentMediaIdx, playingSnippet]
    );
    const canPlayNext = useMemo(
      () => !!playlistMedia[currentMediaIdx + 1] || playingSnippet,
      [playlistMedia, currentMediaIdx, playingSnippet]
    );

    const addNewTrack =
      async ({
        newMedia,
        resetProgress = true,
      }: {
        newMedia: IMedia;
        resetProgress?: boolean;
      }) => {
        try {
          if (currentMedia.id !== newMedia.id) {
            dispatch(updateCurrentMedia(newMedia));
          }
          await playlist.current?.addNewTrack(newMedia);
          if (newMedia.position && newMedia.position > 0) {
            await playlist.current?.seek(newMedia.position);
          } else {
            await playlist.current?.play();
          }
        } catch (err) {
          console.log('this is the err', err)
        }
      };

    const handlePlayNext = useCallback(() => {
      if (canPlayNext) {
        addNewTrack({ newMedia: playlistMedia[currentMediaIdx + 1] });
      }
    }, [canPlayNext, addNewTrack, playlistMedia, currentMediaIdx]);
    const handlePlayPrevious = useCallback(() => {
      if (canPlayPrevious) {
        addNewTrack({ newMedia: playlistMedia[currentMediaIdx - 1] });
      }
    }, [canPlayPrevious, addNewTrack, playlistMedia, currentMediaIdx]);

    const updateMediaStatus = useCallback(
      async ({
        duration: newDuration,
        position: newProgress,
      }: {
        duration: number;
        position: number;
      }) => {
        dispatch(
          updateMediaDetail({
            duration: newDuration,
            progress: newProgress,
            id: currentMedia.id,
          })
        );
      },
      [dispatch, currentMedia]
    );

    return (
      <PlayerServiceContextProvider
        value={{
          startPlayer,
          addNewTrack,
          canPlayNext,
          canPlayPrevious,
          currentMedia,
          handlePlayNext,
          handlePlayPrevious,
          playingSnippet,
          playlist,
          updateMediaStatus
        }}>
        <Component {...(props as P)} />
      </PlayerServiceContextProvider>
    );
  };

export type PlayerServiceType = ReturnType<typeof usePlayerService>;
export default usePlayerService;
