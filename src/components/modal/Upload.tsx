import React, { forwardRef, useImperativeHandle, useMemo, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { TEXT_PRIMARY } from '../../constants/colors';
import { FONT_TEXT_BODY_2 } from '../../constants/fonts';
import useToggle from '../../hooks/useToggle';
import { defaultAudio, IMedia } from '../../interfaces/Media';
import { ModalRef } from '../../interfaces/modal';
import Button from '../Button';
import ProgressBar from '../ProgressBarDef';
import Modal from './Modal';

interface UploadModalProps {
    handleAccept: () => void;
    progress: number;
    duration: number;
  }

  export interface UploadModalRef extends ModalRef {
    setUploadMedia: (arg: IMedia) => void;
  }

const UploadModal = forwardRef<UploadModalRef, UploadModalProps>(({ handleAccept: accept, duration, progress }, ref) => {
    const [loading, toggleLoading] = useToggle();
    const [uploadMedia, setUploadMedia] = useState<IMedia>(defaultAudio);
    const [showModal, toggleShowModal, setShowModal] = useToggle();
    const isLoading = useMemo(() => loading || progress > 0, [loading, progress]);
  
    const handleAccept = () => {
      toggleLoading();
      accept();
    };

    useImperativeHandle(ref, () => ({
        isOpen: showModal,
        toggle: toggleShowModal,
        toggleClose: () => setShowModal(false),
        toggleOpen: () => setShowModal(true),
        setUploadMedia
      }))
  
    return (
      <Modal isVisible={showModal} handleClose={toggleShowModal}>
        <View>
          <Text style={styles.addAudioTitle}>{`Do you want to upload ${uploadMedia.title}`}</Text>
          {isLoading && <ProgressBar {...{ progress, duration }} />}
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

export default UploadModal;
