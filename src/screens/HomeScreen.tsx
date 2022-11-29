import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Platform, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import DocumentPicker, { types } from 'react-native-document-picker';
import getPath from '@flyerhq/react-native-android-uri-path';
import { nanoid } from 'nanoid/non-secure';
import { BG_PRIMARY, BG_SECONDARY, TEXT_TERTIARY } from '../constants/colors';
import { IconImage } from '../components/Icon';
import { ICON_SIZE_L, ICON_SIZE_XL } from '../constants/spacing';
import { ActionSheetRef } from 'react-native-actions-sheet';
import usePlayerService from '../providers/TrackPlayer';
import { defaultAudio, IMedia } from '../interfaces/Media';
import Header from '../components/Header';
import { useAppDispatch, useAppSelector } from '../hooks/redux';
import useTimeFormatter from '../hooks/useTimeFormatter';
import { getAuth } from '../store/Auth';
import useFirestore from '../utils/firestore';
import { addToPlaylist, deleteMedia, editMedia, getCurrentMedia, getPlaylist, getTags } from '../store/Media';
import { ITag } from '../interfaces/Tag';
import DownloadModal, { DownloadModalRef } from '../components/modal/Download';
import { FONT_HEADER_2, FONT_TEXT_BODY_2 } from '../constants/fonts';
import UpdateAudio, { UpdateAudioRef } from '../components/modal/UpdateAudio';
import Chips from '../components/Chips';
import AddTags from '../components/AddTags';
import { checkNormalizedData, handleError } from '../utils/helper';
import { NormalizedData } from '../interfaces/normalizedData';
import { SubscriberType } from '../interfaces/Subscriber';
import AudioDisplay from '../components/AudioDisplay';
import toast from '../hooks/useToast';
import ActionSheet, { ActionType } from '../components/ActionSheet';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '../interfaces/navigation';
import * as ROUTES from '../constants/routes';
import useUploadService from '../providers/Uploading';

type Props = StackScreenProps<RootStackParamList, 'HomeScreen'>;

export const HomeScreen: React.FC<Props> = ({ navigation }) => {
    const dispatch = useAppDispatch();
    const { addNewTrack } = usePlayerService();
    const { toggleShowUploadModal, handleSetUploadingMedia } = useUploadService();

    const tagContainerRef = useRef<ScrollView>(null);
    const updateAudioRef = useRef<UpdateAudioRef>(null);
    const downloadModalRef = useRef<DownloadModalRef>(null);
    const actionSheetRef = useRef<Pick<ActionSheetRef, 'hide' | 'show'>>(null);

    const [tags, setTags] = useState<ITag[]>([]);
    const [remotePlaylist, setRemotePlaylist] = useState<IMedia[]>([]);
    const [subscriber, setSubscriber] = useState<SubscriberType[]>([]);
    const [displayPlaylist, setDisplayPlaylist] = useState<IMedia[]>([]);
    const [normalizedData, setNormalizedData] = useState<NormalizedData>({});
    const [selectedAudio, setSelectedAudio] = useState<IMedia>(defaultAudio);

    const formatTime = useTimeFormatter();
    const { getRemoteAudioFiles } = useFirestore();

    const defaultTags = useAppSelector(getTags);
    const { currentUser } = useAppSelector(getAuth);
    const localPlaylist = useAppSelector(getPlaylist);

    const isAndroid = useMemo(() => Platform.OS === 'android', [])
    const playlist = useMemo(() => Object.values(normalizedData), [normalizedData]);
    const selectedTags = useMemo(() => tags.filter((item) => item.selected), [tags]);
    const allTags = useMemo(
        () =>
            playlist
                .map((item) => item.tags)
                .flat()
                .filter((item) => !!item)
                .map((item) => item?.trim().toLowerCase()),
        [playlist]
    );

    const mergeAudioFilesDetails = () => {
        let currentNormalized: {
            [key: string]: IMedia;
        } = {};
        localPlaylist.forEach((item) => {
            if (!checkNormalizedData(item.id, currentNormalized)) {
                const timeObj = item.duration
                    ? formatTime.current?.getTimeDuration(item.duration)
                    : undefined;
                const formattedDuration = formatTime.current?.formatTime({
                    Hour: timeObj?.Hour || 0,
                    Minute: timeObj?.Minute || 0,
                    Second: timeObj?.Second || 0
                })
                currentNormalized = {
                    ...currentNormalized,
                    [item.id]: {
                        ...item,
                        availableLocal: true,
                        isOwner: true,
                        formattedDuration: timeObj ? formattedDuration : undefined,
                    },
                };
            }
        });
        remotePlaylist.forEach((item) => {
            if (!checkNormalizedData(item.id, currentNormalized)) {
                currentNormalized = {
                    ...currentNormalized,
                    [item.id]: {
                        ...item,
                        url: item.url,
                        isOwner: item.owner.id === currentUser?.uid,
                        availableRemote: true,
                    },
                };
            } else {
                currentNormalized = {
                    ...currentNormalized,
                    [item.id]: {
                        ...currentNormalized[item.id],
                        tags: [...new Set([...(currentNormalized[item.id].tags || []), ...(item.tags || [])])],
                        isOwner: item.owner.id === currentUser?.uid,
                        availableRemote: true,
                    },
                };
            }
        });
        setNormalizedData(currentNormalized);
    };

    const handleGetRemoteAudioFiles = useCallback(async () => {
        const newSubscriber = await getRemoteAudioFiles(setRemotePlaylist);
        setSubscriber((prev) => [...prev, newSubscriber]);
    }, [setRemotePlaylist, getRemoteAudioFiles]);

    // 1. Merge the remote and local files together
    useEffect(() => {
        mergeAudioFilesDetails();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [remotePlaylist, localPlaylist]);
    // 0. Get the remote audio files;
    useEffect(() => {
        if (currentUser?.uid) {
            handleGetRemoteAudioFiles();
        }else {
            setRemotePlaylist([])
        }
        return () => {
            subscriber.map((item) => item());
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentUser]);
    // 2. For when the tag / playlist changes to recreate the newDisplay
    useEffect(() => {
        if (selectedTags.length) {
            const newDisplayPlaylist = playlist.filter((item) =>
                selectedTags.some((selectedTag) =>
                    item.tags?.map((tag) => tag.trim().toLocaleLowerCase())?.includes(selectedTag.value)
                )
            );
            setDisplayPlaylist(newDisplayPlaylist);
        } else {
            setDisplayPlaylist(playlist);
        }
    }, [playlist, selectedTags]);

    useEffect(() => {
        // check for duplicate and add type-safety to only string[]
        const newTags = [...new Set([...defaultTags, ...(allTags as string[])])].map((item) => ({
            value: item,
            selected: false,
        }));
        setTags(newTags);
    }, [defaultTags, allTags]);

    const getAudio = useCallback(async () => {
        try {
            const pickerResult = await DocumentPicker.pickSingle({
                presentationStyle: 'fullScreen',
                type: [types.audio],
            });
            const path = getPath(pickerResult.uri);
            const audio: IMedia = {
                id: nanoid(),
                url: path ?? pickerResult.uri,
                title: pickerResult.name ?? '',
                author: '',
                owner: {
                    name: currentUser?.displayName || '',
                    id: currentUser?.uid || '',
                },
                isOwner: true,
                description: '',
                createdAt: new Date().toJSON(),
            };
            updateAudioRef.current?.setMedia(audio);
            updateAudioRef.current?.toggleOpen();
        } catch (err) {
            handleError(err);
        }
    }, [currentUser?.displayName, currentUser?.uid]);

    const handleNewAudio = useCallback(
        ({ author, description, tags: newTags, id, title, url, createdAt, owner, isOwner }: IMedia) => {
            dispatch(
                addToPlaylist({
                    author,
                    description,
                    id,
                    title,
                    url,
                    tags: newTags,
                    createdAt,
                    isOwner,
                    owner,
                })
            );
        },
        [dispatch]
    );

    const handleEditAudio = useCallback(
        ({ author, description, tags: updatedTags, id, title, url }: IMedia) => {
            dispatch(
                editMedia({
                    author,
                    description,
                    id,
                    title,
                    url,
                    tags: updatedTags,
                })
            );
            setSelectedAudio(defaultAudio);
        },
        [dispatch, setSelectedAudio]
    );

    const toggleTags = useCallback(
        (label: string) => {
            const filteredTags = [...tags];
            const foundTagIdx = filteredTags.findIndex((item) => item.value === label);
            if (foundTagIdx > -1) {
                filteredTags.splice(foundTagIdx, 1, {
                    ...filteredTags[foundTagIdx],
                    selected: !filteredTags[foundTagIdx].selected,
                });
                setTags(filteredTags);
            }
        },
        [tags, setTags]
    );

    const handleRemoveTags = (tag: string) => {
        const newSelectedAudio = {
            ...selectedAudio,
            tags: selectedAudio.tags?.filter((item) => item !== tag),
        };
        handleEditAudio(newSelectedAudio);
        setSelectedAudio(newSelectedAudio);
    };

    const handleToggleActionSheet = useCallback(() => {
        actionSheetRef.current?.show();
    }, [actionSheetRef]);

    const handleAudioDisplayPress = useCallback(
        (id: string) => {
            const foundMediaIdx = playlist.findIndex((item) => item.id === id);
            if (foundMediaIdx > -1) {
                setSelectedAudio(playlist[foundMediaIdx]);
            }
            handleToggleActionSheet();
        },
        [playlist, setSelectedAudio, handleToggleActionSheet]
    );

    const handleCloseActionSheet = useCallback(() => {
        if (actionSheetRef.current) {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            (actionSheetRef.current as any).hide();
        }
    }, [actionSheetRef]);

    const actionSheetAction: ActionType[] = useMemo(
        () => [
            {
                icon: 'delete-forever',
                label: 'Delete',
                onPress: () => {
                    dispatch(deleteMedia(selectedAudio?.id ?? ''));
                    handleCloseActionSheet();
                    setSelectedAudio(defaultAudio);
                },
                disabled: !selectedAudio.availableLocal,
            },
            {
                icon: 'edit-border',
                label: 'Edit',
                onPress: () => {
                    updateAudioRef.current?.setMedia(selectedAudio);
                    updateAudioRef.current?.toggle();
                    handleCloseActionSheet();
                },
                disabled: !selectedAudio.availableLocal || !selectedAudio.isOwner,
            },
            {
                icon: 'upload',
                label: 'Upload',
                disabled: selectedAudio.availableRemote,
                onPress: currentUser?.email
                    ? () => {
                        handleSetUploadingMedia(selectedAudio);
                        handleCloseActionSheet();
                        toggleShowUploadModal();
                    }
                    : () => {
                        handleCloseActionSheet();
                        toast({
                            text2: 'You need to sign in first to upload media',
                            type: 'error',
                        });
                    },
            },
        ],
        [
            selectedAudio,
            updateAudioRef,
            currentUser?.email,
            dispatch,
            handleCloseActionSheet,
        ]
    );

    const navigateToPlayer = useCallback(
        (newMedia: IMedia) => {

            addNewTrack({ newMedia }).then(() => {
                navigation.navigate(ROUTES.PlayerScreen, {
                    media: newMedia
                });
            });
        },
        [navigation, addNewTrack]
    );

    const handleDownload = (media: IMedia) => {
        downloadModalRef.current?.setDownloadMedia(media)
        downloadModalRef.current?.toggle();
    }

    return (
        <SafeAreaView style={styles.container}>
            <Header />
            {playlist.length ? (
                <View style={styles.tagMainContainer}>
                    <ScrollView ref={tagContainerRef} alwaysBounceHorizontal horizontal showsHorizontalScrollIndicator={false} style={styles.tagContainer}>
                        {tags.map((item) => (
                            <Chips
                                label={item.value}
                                key={item.value}
                                onClick={() => toggleTags(item.value)}
                                active={item.selected}
                            />
                        ))}
                    </ScrollView>
                    <AddTags onInitialPress={() => {
                        tagContainerRef.current?.scrollToEnd()
                    }} />
                </View>
            ) : undefined}
            {displayPlaylist.length ? (
                <ScrollView
                    style={{
                        width: '100%',
                        marginTop: 10,
                        flex: 1,
                        paddingHorizontal: !isAndroid ?  10 : undefined
                    }}
                >
                    {displayPlaylist.map((item) => (
                        <AudioDisplay
                            audio={item}
                            displayImage={item.isOwner ? (currentUser?.photoURL as string) : ''}
                            onPress={() =>
                                item.availableLocal
                                    ? navigateToPlayer(item)
                                    : toast({
                                        type: 'error',
                                        text2: 'You need to download media first',
                                    })
                            }
                            onPressMoreIcon={() => handleAudioDisplayPress(item.id)}
                            showDetails
                            showExtraDetails
                            showProgressBar={item.availableLocal}
                            key={item.id}
                            showActions
                            handleDownload={
                                !item.availableLocal && item.availableRemote
                                    ? () => handleDownload(item)
                                    : undefined
                            }
                        />
                    ))}
                </ScrollView>
            ) : (
                <View style={styles.noAudioContainer}>
                    <IconImage name="podcast" width={ICON_SIZE_XL} />
                    <Text style={styles.noAudioHeader}>Add your Personal Audio</Text>
                    {
                        isAndroid &&
                        <Text style={styles.noAudioDescription}>
                            Press the button below to add audio from your phone to get started.
                        </Text>
                    }
                </View>)}
            {isAndroid &&
                <TouchableOpacity onPress={getAudio} style={styles.FAB}>
                    <IconImage name="add" width={ICON_SIZE_L} />
                </TouchableOpacity>
            }
            <DownloadModal
                ref={downloadModalRef}
            />
            <UpdateAudio
                ref={updateAudioRef}
                handleSubmit={selectedAudio.id ? handleEditAudio : handleNewAudio}
            />
            <ActionSheet
                handleRemoveTags={handleRemoveTags}
                action={actionSheetAction}
                displayMedia={{
                    author: selectedAudio?.author ?? '',
                    title: selectedAudio?.title ?? '',
                    tags: selectedAudio.tags,
                }}
                ref={actionSheetRef}
            />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: BG_PRIMARY,
        flex: 1,
        paddingBottom: 10,
        alignItems: 'center',
        position: 'relative',
        paddingHorizontal: 10,
    },
    tagMainContainer: {
        width: '100%',
        flexDirection: 'row',
        padding: 10,
        justifyContent: 'space-between',
    },
    tagContainer: {
        maxWidth: '90%',
    },
    noAudioContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 'auto',
    },
    noAudioHeader: {
        color: TEXT_TERTIARY,
        marginVertical: 25,
        fontSize: FONT_HEADER_2,
    },
    noAudioDescription: {
        maxWidth: 300,
        color: TEXT_TERTIARY,
        fontSize: FONT_TEXT_BODY_2,
        textAlign: 'center',
        fontWeight: '400',
    },
    FAB: {
        backgroundColor: BG_SECONDARY,
        borderRadius: 75 / 2,
        width: 75,
        height: 75,
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        bottom: 10,
        marginBottom: 25,
    },
});

export default HomeScreen;
