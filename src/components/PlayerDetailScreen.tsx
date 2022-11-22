import React, { useCallback, useEffect, useMemo, useState } from "react";
import { FlatList, useWindowDimensions, View } from "react-native";
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import { IUser } from "../interfaces/auth";
import { IClique } from "../interfaces/clique";
import { ICurrentNote } from "../interfaces/note";
import { ReactionType } from "../interfaces/reaction";
import { RemoteNote } from "../interfaces/remoteData";
import { SubscriberType } from "../interfaces/Subscriber";
import { PlayerScreenType, PlayerTab } from "../screens/PlayerScreen";
import { getCurrentMedia } from "../store/Media";
import { addNoteReaction, getCurrentNotes, loadNotes } from "../store/Notes";
import { loadSnippets } from "../store/Snippets";
import useFirestore from "../utils/firestore";
import NoteTab from "./NoteTab";
import TabScreen from "./TabScreen";

export const PlayerDetailScreen: React.FC<{
    currentUser: IUser | null;
    currentClique: IClique;
    slideRef: React.RefObject<FlatList<PlayerTab>>;
    setCurrentTab: (label: PlayerScreenType) => void;
}> = ({ setCurrentTab, slideRef, currentUser, currentClique }) => {
    const dispatch = useAppDispatch();
    const { width } = useWindowDimensions();
    const {updateNoteReactions, getAllMediaNote} = useFirestore();
    const currentMedia = useAppSelector(getCurrentMedia);
    const currentUserNotes = useAppSelector(getCurrentNotes);
    const [remoteNote, setRemoteNote] = useState<RemoteNote[]>([]);
    const [subscriber, setSubscriber] = useState<SubscriberType[]>([]);

    const usersIds = useMemo(
        () => currentClique.members.map((item) => item.uid),
        // .filter((item) => item !== currentUser?.uid),
        [currentClique]
      );

      const getRemoteData = useCallback(async () => {
        const remotedMediaNote = getAllMediaNote({
          currentMedia: currentMedia.id,
          setNote: setRemoteNote,
          usersIds,
        });
        // const remotedMediaSnippet = getAllMediaSnippet({
        //   currentMedia: currentMedia.id,
        //   setSnippet: setRemoteSnippet,
        //   usersIds,
        // });
        setSubscriber((prevSt) => [...prevSt, remotedMediaNote]);
      }, [currentMedia.id, getAllMediaNote, usersIds]);

    useEffect(() => {
        if (currentMedia.id && usersIds.length) {
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

      console.log(currentNotes)
    
    return (
        <TabScreen
            {
            ...{ setCurrentTab, slideRef }
            }
            renderItem={({ item: { type } }) => (
                <View style={{ paddingHorizontal: 15, width: width - 30 }}>
                    <NoteTab
                      {...{ currentNotes, currentUser }}
                      handleReactions={handleAddReactionForNote}
                    />
                    {/* {type === 'Note' ? (
              ) : (
                <SnippetTab
                  {...{ currentSnippets, currentUser }}
                  handleReactions={handleAddReactionForSnippet}
                />
              )} */}
                </View>
            )}
        />
    )
}  
export default PlayerDetailScreen;