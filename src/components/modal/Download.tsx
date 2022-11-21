import React, { forwardRef, useEffect, useImperativeHandle, useMemo, useState } from 'react';
import RNFS from 'react-native-fs';
import { View, Text, StyleSheet } from 'react-native';
import { TEXT_PRIMARY } from '../../constants/colors';
import { FONT_TEXT_BODY_2 } from '../../constants/fonts';
import useToggle from '../../hooks/useToggle';
import { defaultAudio, IMedia } from '../../interfaces/Media';
import Button from '../Button';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import toast from '../../hooks/useToast';
import { addToPlaylist } from '../../store/Media';
import { getAuth } from '../../store/Auth';
import { useFirestore } from '../../utils/firestore';
import ProgressBar from '../ProgressBarDef';
import Modal from './Modal';
import { ModalRef } from '../../interfaces/modal';

interface DownloadModalProps {
  // onCompleted: () => void;
}

export interface DownloadModalRef extends ModalRef {
  setDownloadMedia: (arg:IMedia) => void;
}

const DownloadModal = forwardRef<DownloadModalRef, DownloadModalProps>(({}, ref) => {
  const dispatch = useAppDispatch();
  const [downloadMedia, setDownloadMedia] = useState<IMedia>(defaultAudio);
  const [showModal, toggleShowModal, setShowModal] = useToggle();
  const { createCliques, createNoteRemote, createSnippetRemote } = useFirestore();
  const { currentUser } = useAppSelector(getAuth);
  const [downloading, setDownloading] = useState({
    downloadId: '',
    downloadDuration: 0,
    downloadProgress: 0,
  });
  const [loading, toggleLoading] = useToggle();
  const isLoading = useMemo(
    () => loading || downloading.downloadProgress > 0,
    [loading, downloading.downloadProgress]
  );

  useImperativeHandle(ref, () => ({
    isOpen: showModal,
    toggle: toggleShowModal,
    toggleClose: () => setShowModal(false),
    toggleOpen: () => setShowModal(true),
    setDownloadMedia
  }))
  useEffect(
    () => () => {
      setDownloading({
        downloadId: '',
        downloadDuration: 0,
        downloadProgress: 0,
      });
    },
    []
  );

  const handleDownload = async () => {
    const downloadFilePath = `${RNFS.DocumentDirectoryPath}/${downloadMedia.title}`;
    const task = RNFS.downloadFile({
      fromUrl: downloadMedia.url,
      toFile: downloadFilePath,
      progressInterval: 1500,
      progress: ({ bytesWritten, contentLength }) => {
        setDownloading({
          downloadId: downloadMedia.id,
          downloadDuration: contentLength,
          downloadProgress: bytesWritten,
        });
      },
    });
    task.promise
      .then(async () => {
        const { author, createdAt, description, id, title, tags, updatedAt, uploadedAt, owner } =
          downloadMedia;
        const newMedia: IMedia = {
          author,
          createdAt,
          description,
          id,
          title,
          url: downloadFilePath,
          owner,
          tags,
          updatedAt,
          uploadedAt,
          isOwner: currentUser?.uid === owner.id,
        };
        await createCliques(newMedia);
        await createNoteRemote(newMedia);
        await createSnippetRemote(newMedia);
        dispatch(addToPlaylist(newMedia));
        toast({
          text2: `Successfully downloaded ${downloadMedia.title}`,
          type: 'success',
        });
      })
      .finally(() => {
        toggleShowModal();
      });
  };

  const handleAccept = () => {
    toggleLoading();
    handleDownload();
  };

  return (
    <Modal isVisible={showModal} handleClose={toggleShowModal}>
      <View>
        <Text style={styles.addAudioTitle}>{`Do you want to download ${downloadMedia.title}`}</Text>
        {isLoading && (
          <ProgressBar
            progress={downloading.downloadProgress}
            duration={downloading.downloadDuration}
          />
        )}
      </View>
      <View style={styles.buttonContainer}>
        <Button onPress={handleAccept} disabled={isLoading} textOnly label="Yes" />
        <Button onPress={toggleShowModal} disabled={isLoading} textOnly label="Cancel" />
      </View>
    </Modal>
  );
});

const styles = StyleSheet.create({
  buttonContainer: { flexDirection: 'row', marginTop: 20 },
  addAudioTitle: {
    color: TEXT_PRIMARY,
    fontSize: FONT_TEXT_BODY_2,
    marginTop: 20,
    marginBottom: 15,
  },
});

export default DownloadModal;
