import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { StackScreenProps } from '@react-navigation/stack';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Animated, { SlideInDown, SlideOutDown } from 'react-native-reanimated';
import { ActionSheetRef } from 'react-native-actions-sheet';
import { BG_PRIMARY, BG_TERTIARY, TEXT_PRIMARY, TEXT_SECONDARY } from '../constants/colors';
import { RootStackParamList } from '../interfaces/navigation';
import SearchBar from '../components/SearchBar';
import { useAppDispatch, useAppSelector } from '../hooks/redux';
import { getCurrentMedia } from '../store/Media';
import { FONT_TEXT_BODY_2 } from '../constants/fonts';
import ToggleButton from '../components/ToggleButton';
import ActionContainer from '../components/ActionContainer';
import PlayerScreenProgressBar from '../components/PlayerScreenProgressBar';
import CliqueInvite from '../components/modal/CliqueInvite';
import { AddDatumModal, AddDatumModalRef } from '../components/modal/AddDatumModal';
import { getAuth } from '../store/Auth';
import usePlayerService from '../providers/TrackPlayer';
import ToggleContainer from '../components/ToggleContainer';
import { defaultClique, IClique } from '../interfaces/clique';
import useToggle from '../hooks/useToggle';
import toast from '../hooks/useToast';
import { useFirestore } from '../utils/firestore';
import { PlayerDetailScreen } from '../components/PlayerDetailScreen';
import { MoreOption } from '../components/MoreOption';
import DeleteModal, { DeleteAudioRef } from '../components/modal/DeleteModal';
import { clearData, getData } from '../store/Temp';
import BottomSheet from '../components/BottomSheet';
import MentionModal from '../components/modal/MentionModal';
import { PlayerScreenType, PlayerTab } from '../interfaces/PlayerScreenType';

type Props = StackScreenProps<RootStackParamList, 'PlayerScreen'>;

const rateOption = [
  1.00,1.15,1.25,1.5,2
]

const PlayerScreen: React.FC<Props> = ({ navigation }) => {
  const dispatch = useAppDispatch();
  const { playlist, rate, setRate } = usePlayerService();
  const activeData = useAppSelector(getData);
  const [showMention, toggleShowMention] = useToggle();
  const { currentUser } = useAppSelector(getAuth);
  const slideRef = useRef<FlatList<PlayerTab>>(null);
  const handleDeleteRef = useRef<DeleteAudioRef>(null);
  const showAddModalRef = useRef<AddDatumModalRef>(null);
  const currentMedia = useAppSelector(getCurrentMedia);
  const { sendInvitationToClique, getMediaClique } = useFirestore();
  const [currentTab, setCurrentTab] = useState<PlayerScreenType>('Note');
  const actionSheetRef = useRef<Pick<ActionSheetRef, 'hide' | 'show'>>(null);
  const [showDropdown, toggleShowDropdown] = useToggle(false);
  const [clique, setClique] = useState<IClique[]>([]);

  const reset = useCallback(() => {
    dispatch(clearData());
  }, [dispatch]);

  useEffect(() => {
    navigation.addListener('focus', () => {
      reset();
    });
  }, [navigation, reset]);

  useEffect(() => {
    if (currentMedia.id) {
      getMediaClique(currentMedia, setClique);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentMedia.id]);

  useEffect(() => {
    reset();
  }, [currentTab, reset]);

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

  const handleDelete = () => {
    handleDeleteRef.current?.toggleShowDelete();
  };

  const toggleNoteModal = () =>
    showAddModalRef.current ? showAddModalRef.current.toggleNoteModal() : () => {};
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  const toggleSnippetModal = () =>
    showAddModalRef.current ? showAddModalRef.current.toggleSnippetModal() : () => {};

  const showMore = useMemo(() => activeData.id.length, [activeData]);

  return (
    <>
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
              reset,
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
        <View style={styles.toggleContainer}>
          {showMore ? (
            <Animated.View
              key="1"
              entering={SlideInDown.duration(400)}
              exiting={SlideOutDown.duration(400)}
              style={{
                marginLeft: 'auto'
              }}
             >
              <MoreOption {...{ handleDelete, toggleShowMention }} />
            </Animated.View>
          ) : (
            <Animated.View
              key="2"
              entering={SlideInDown.duration(400)}
              exiting={SlideOutDown.duration(400)}
              style={{
                marginLeft: 'auto'
              }}
            >
              <ToggleButton
                active={currentTab}
                onPress={toggleCurrentTab as (label: string) => void}
                buttons={[
                  { icon: 'graphic-eq', label: 'Snippet' },
                  { icon: 'note', label: 'Note' },
                ]}
              />
            </Animated.View>
          )}
          <View style={{
            marginLeft: 'auto'
          }}>
          <TouchableOpacity onPress={actionSheetRef.current?.show} style={styles.rateContainer}>
                <Text style={styles.rateText}>{`${rate}x`}</Text>
              </TouchableOpacity>
          </View>
        </View>
        <PlayerScreenProgressBar />
        <ActionContainer />
        <CliqueInvite
          clique={clique}
          handleInvite={handleInvite}
          isOpen={showDropdown}
          handleClose={toggleShowDropdown}
        />
      </SafeAreaView>
      <AddDatumModal ref={showAddModalRef} {...{ currentUser, currentMedia }} />
      <DeleteModal ref={handleDeleteRef} {...{ currentMedia }} />
      <BottomSheet
        ref={actionSheetRef}
      >
        {rateOption.map(item => (
          <TouchableOpacity key={item} onPress={() => {
            setRate(item);
            actionSheetRef.current?.hide()
          }}>
            <Text style={[styles.rateSelectText, {
              fontSize: item === rate ? 25 : 20,
              opacity: item === rate ? 1 : .5,
            }]}>{`${item}x`}</Text>
          </TouchableOpacity>
        ))}
      </BottomSheet>
      <MentionModal
        handleClose={toggleShowMention}
        isOpen={showMention}
      />
    </>
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
  toggleContainer: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    height: 45,
    marginVertical: 2.5,
    flexDirection: 'row',
  },
  rateContainer: {
    backgroundColor: TEXT_SECONDARY,
    borderRadius: 25,
    marginRight: 'auto',

  },
  rateText: {
    fontSize: 16,
    paddingVertical: 5,
    paddingHorizontal: 10,
    fontWeight: '700'
  },
  rateSelectText: {
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#B2B4AA',
    
  }
});

export default PlayerScreen;
