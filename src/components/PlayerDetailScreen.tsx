import React, { useCallback, useEffect, useMemo, useState } from "react";
import { FlatList, useWindowDimensions, View } from "react-native";
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import { IUser } from "../interfaces/auth";
import { IClique } from "../interfaces/clique";
import { ICurrentNote } from "../interfaces/note";
import { ReactionType } from "../interfaces/reaction";
import { RemoteNote, RemoteSnippet } from "../interfaces/remoteData";
import { ICurrentSnippet } from "../interfaces/snippet";
import { SubscriberType } from "../interfaces/Subscriber";
import { TrackPlayerClass } from "../providers/TrackPlayer";
import { playerScreenContent } from "../screens/data";
import { PlayerScreenType, PlayerTab } from "../screens/PlayerScreen";
import { getCurrentMedia } from "../store/Media";
import { addNoteReaction, getCurrentNotes, loadNotes } from "../store/Notes";
import { addSnippetReaction, getCurrentSnippets, loadSnippets } from "../store/Snippets";
import useFirestore from "../utils/firestore";
import NoteTab from "./NoteTab";
import SnippetTab from "./SnippetTab";
import TabScreen from "./TabScreen";

export const PlayerDetailScreen: React.FC<{
  currentUser: IUser | null;
  currentClique: IClique;
  playlist: TrackPlayerClass | null;
  slideRef: React.RefObject<FlatList<PlayerTab>>;
  setCurrentTab: (label: PlayerScreenType) => void;
}> = ({ setCurrentTab, slideRef, currentUser, currentClique, playlist }) => {
  const dispatch = useAppDispatch();
  const { width } = useWindowDimensions();
  const { updateNoteReactions, getAllMediaNote, updateSnippetReactions, getAllMediaSnippet } = useFirestore();
  const currentMedia = useAppSelector(getCurrentMedia);
  const currentUserNotes = useAppSelector(getCurrentNotes);
  const currentUserSnippets = useAppSelector(getCurrentSnippets);
  const [remoteNote, setRemoteNote] = useState<RemoteNote[]>([]);
  const [remoteSnippet, setRemoteSnippet] = useState<RemoteSnippet[]>([]);
  const [subscriber, setSubscriber] = useState<SubscriberType[]>([]);

  const usersIds = useMemo(
    () => currentClique.members.map((item) => item.uid),
    // .filter((item) => item !== currentUser?.uid),
    [currentClique]
  );

  const getRemoteData = useCallback(async () => {
    const remotedMediaNote = getAllMediaNote({
      currentMedia: currentMedia.id,
      currentUser: currentUser as IUser,
      setNote: setRemoteNote,
      usersIds,
    });
    const remotedMediaSnippet = getAllMediaSnippet({
      currentMedia: currentMedia.id,
      setSnippet: setRemoteSnippet,
      currentUser: currentUser as IUser,
      usersIds,
    });
    setSubscriber((prevSt) => [...prevSt, remotedMediaNote, remotedMediaSnippet]);
  }, [currentMedia.id, getAllMediaNote, currentUser, usersIds, getAllMediaSnippet]);

  useEffect(() => {
    if (currentMedia.id) {
      dispatch(loadNotes({ id: currentMedia.id }));
      dispatch(loadSnippets({ id: currentMedia.id }));
      getRemoteData();
      return () => {
        subscriber.map((item) => item());
      };
    }
    return undefined;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentMedia, usersIds, dispatch]);

  const currentNotes = useMemo(
    () =>
    ({
      mediaId: currentMedia.id,
      notes: {
        ...currentUserNotes.notes,
        ...remoteNote.reduce(
          (acc, curVal) => ({
            ...acc,
            ...curVal.data,
          }),
          {} as ICurrentNote['notes']
        ),
      },
    } as ICurrentNote),
    [currentMedia, remoteNote, currentUserNotes]
  );

  const currentSnippets = useMemo(() => {
    const currentSnippet = {
      mediaId: currentMedia.id,
      snippets: {
        ...currentUserSnippets.snippets,
        ...remoteSnippet.reduce(
          (acc, curVal) => ({
            ...acc,
            ...curVal.data,
          }),
          {} as ICurrentSnippet['snippets']
        ),
      },
    } as ICurrentSnippet;
    return currentSnippet;
  }, [currentMedia, remoteSnippet, currentUserSnippets]);

  const handleAddReactionForNote = (arg: {
    id: string;
    reaction: ReactionType;
    userId: string;
  }) => {
    const { id, reaction, userId } = arg;
    if (userId === currentUser?.uid) {
      dispatch(addNoteReaction({ noteId: id, reaction, userId: currentUser?.uid || '' }));
    }
    const foundNote = remoteNote.find((item) => item.user.id === userId);
    if (foundNote) {
      const { owner, ...note } = foundNote.data[id];
      updateNoteReactions({
        mediaId: currentMedia.id,
        userId,
        note: {
          ...note,
          reactions: {
            ...note.reactions,
            [currentUser?.uid ?? '']: reaction,
          },
        },
      });
    }
  };
  const handleAddReactionForSnippet = (arg: {
    id: string;
    reaction: ReactionType;
    userId: string;
  }) => {
    const { id, reaction, userId } = arg;
    if (userId === currentUser?.uid) {
      dispatch(addSnippetReaction({ snippetId: id, reaction, userId: currentUser?.uid || '' }));
    }
    const foundSnippet = remoteSnippet.find((item) => item.user.id === userId);
    if (foundSnippet) {
      const { owner, ...snippet } = foundSnippet.data[id];
      updateSnippetReactions({
        mediaId: currentMedia.id,
        userId,
        snippet: {
          ...snippet,
          reactions: {
            ...snippet.reactions,
            [currentUser?.uid ?? '']: reaction,
          },
        },
      });
    }
  };

  return (
    <TabScreen
      {
      ...{ setCurrentTab, slideRef }
      }
      data={playerScreenContent}
      renderItem={({ item: { type } }) => (
        <View style={{ paddingHorizontal: 15, width: width - 30 }}>
          {type === 'Note' ? (
            <NoteTab
              {...{ currentNotes, currentUser, playlist }}
              handleReactions={handleAddReactionForNote}
            />
          ) : (
            <SnippetTab
              {...{ currentSnippets, currentUser, playlist }}
              handleReactions={handleAddReactionForSnippet}
            />
          )}
        </View>
      )}
    />
  )
}
export default PlayerDetailScreen;