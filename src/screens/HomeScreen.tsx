import React, {useCallback} from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import DocumentPicker, {types} from 'react-native-document-picker';
import getPath from '@flyerhq/react-native-android-uri-path';
import {nanoid} from 'nanoid/non-secure';
import {SafeAreaView} from 'react-native';
import {BG_PRIMARY, BG_SECONDARY} from '../constants/colors';
import IconImage from '../components/Icon';
import {ICON_SIZE_L} from '../constants/spacing';
import usePlayerService from '../providers/TrackPlayer';
import {IMedia} from '../interfaces/Media';

export const HomeScreen = () => {
  const {addNewTrack} = usePlayerService();
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
          //   name: currentUser?.displayName || '',
          //   id: currentUser?.uid || '',
          name: '',
          id: '',
        },
        isOwner: true,
        description: '',
        createdAt: new Date().toJSON(),
      };
      addNewTrack({newMedia: audio});
      // setNewAudio(audio);
      // toggleUpdateAudioModal();
    } catch (err) {
      //   handleError(err);
    }
  }, [addNewTrack]);

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity onPress={getAudio} style={styles.FAB}>
        <IconImage name="add" width={ICON_SIZE_L} />
      </TouchableOpacity>
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
