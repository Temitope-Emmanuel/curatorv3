import React, { useEffect, useMemo, useRef, useState } from 'react';
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { BG_PRIMARY, BG_TERTIARY, TEXT_PRIMARY } from "../constants/colors";
import { RootStackParamList } from "../interfaces/navigation";
import SearchBar from '../components/SearchBar';
import { useAppSelector } from '../hooks/redux';
import { getCurrentMedia } from '../store/Media';
import { FONT_TEXT_BODY_2 } from '../constants/fonts';
import ToggleButton from '../components/ToggleButton';
import ActionContainer from '../components/ActionContainer';
import PlayerScreenProgressBar from '../components/PlayerScreenProgressBar';
import CliqueInvite from '../components/modal/CliqueInvite';
import AddDatumModal, { AddDatumModalRef } from '../components/modal/AddDatumModal';
import { getAuth } from '../store/Auth';
import usePlayerService from '../providers/TrackPlayer';
import ToggleContainer from '../components/ToggleContainer';
import { defaultClique, IClique } from '../interfaces/clique';
import useToggle from '../hooks/useToggle';
import toast from '../hooks/useToast';
import useFirestore from '../utils/firestore';
import PlayerDetailScreen from '../components/PlayerDetailScreen';

type Props = NativeStackScreenProps<RootStackParamList, 'PlayerScreen'>;

export type PlayerScreenType = 'Snippet' | 'Note';

export type PlayerTab = {
    type: PlayerScreenType;
    id: string;
};

const PlayerScreen: React.FC<Props> = ({ route }) => {
    const { currentUser } = useAppSelector(getAuth);
    const { addNewTrack, playlist } = usePlayerService();
    const currentMedia = useAppSelector(getCurrentMedia);
    const { sendInvitationToClique, getMediaClique } = useFirestore();
    const slideRef = useRef<FlatList<PlayerTab>>(null);
    const showAddModalRef = useRef<AddDatumModalRef>(null);
    const [currentTab, setCurrentTab] = useState<PlayerScreenType>('Note');
    const [showDropdown, toggleShowDropdown] = useToggle(false);
    const [clique, setClique] = useState<IClique[]>([]);

    useEffect(() => {
        if (currentMedia.id) {
            getMediaClique(currentMedia, setClique);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentMedia.id]);

    const currentClique = useMemo(() => {
        if (clique.length) {
            const foundCliqueId = clique.findIndex((item) => item.type === 'Public');
            return foundCliqueId > -1 ? clique[foundCliqueId] : defaultClique;
        }
        return defaultClique;
    }, [clique]);

    const toggleCurrentTab = (label: PlayerTab['type']) => {
        if (label === 'Note') {
            setCurrentTab('Note');
            slideRef.current?.scrollToIndex({
                index: 1,
                animated: true,
            });
        } else {
            setCurrentTab('Snippet');
            slideRef.current?.scrollToIndex({
                index: 0,
                animated: true,
            });
        }
    };

    const handleInvite = (email: string) =>
        sendInvitationToClique({ currentMedia, email })
            .then(() => {
                toast({
                    type: 'success',
                    text2: 'successfully invited user',
                });
                toggleShowDropdown();
            })
            .catch((err) => {
                toast({
                    type: 'error',
                    text2: `error while inviting user: ${err.message}`,
                });
            });

    const cliqueActive = useMemo(() => {
        if (!currentMedia.availableRemote)
            return {
                disable: true,
                reason: 'You need to upload media first before you can change clique',
            };
        if (currentMedia.owner.id !== currentUser?.uid)
            return { disable: true, reason: "You're not the owner of media" };
        return { disable: false, reason: '' };
    }, [currentMedia.owner, currentMedia.availableRemote, currentUser]);

    const toggleNoteModal = () =>
        showAddModalRef.current ? showAddModalRef.current.toggleNoteModal() : () => { };
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    const toggleSnippetModal = () =>
        showAddModalRef.current ? showAddModalRef.current.toggleSnippetModal() : () => { };

    return (
        <SafeAreaView style={styles.container}>
            <SearchBar />
            <View
                style={{
                    alignItems: 'center',
                }}
            >
                <Text style={styles.title}>{currentMedia.title.split('.')[0]}</Text>
                <Text style={styles.artist}>{currentMedia.author}</Text>
            </View>
            <View style={styles.detailContainer}>
                <PlayerDetailScreen
                    playlist={playlist.current}
                    {...{
                        setCurrentTab,
                        slideRef,
                        currentClique,
                        currentUser,
                    }}
                />
                <ToggleContainer
                    {...{
                        currentTab,
                        cliqueActive,
                        currentClique,
                        showDropdown,
                        toggleShowDropdown,
                        toggleNoteModal,
                        toggleSnippetModal,
                    }}
                />
            </View>
            <ToggleButton
                active={currentTab}
                onPress={toggleCurrentTab as (label: string) => void}
                buttons={[
                    { icon: 'graphic-eq', label: 'Snippet' },
                    { icon: 'note', label: 'Note' },
                ]}
            />
            <PlayerScreenProgressBar />
            <ActionContainer />
            <CliqueInvite
                clique={clique}
                handleInvite={handleInvite}
                isOpen={showDropdown}
                handleClose={toggleShowDropdown}
            />
            <AddDatumModal ref={showAddModalRef} {...{ currentUser, currentMedia }} />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: BG_PRIMARY,
        flex: 1,
        paddingBottom: 10,
        alignItems: 'center',
        position: 'relative',
        paddingHorizontal: 10,
    },
    title: {
        color: TEXT_PRIMARY,
        fontSize: FONT_TEXT_BODY_2,
        fontWeight: '600',
        textAlign: 'center',
    },
    artist: { color: TEXT_PRIMARY, fontSize: 14, fontWeight: '300' },
    detailContainer: {
        borderRadius: 30,
        position: 'relative',
        paddingVertical: 20,
        paddingBottom: 20,
        width: '100%',
        flex: 1,
        backgroundColor: BG_TERTIARY,
        marginVertical: 20,
    },
})

export default PlayerScreen;