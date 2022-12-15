import React, { forwardRef, memo, useCallback, useImperativeHandle, useState } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import Button from '../Button';
import { TEXT_PRIMARY } from '../../constants/colors';
import { FONT_TEXT_BODY_2 } from '../../constants/fonts';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { deleteNotes } from '../../store/Notes';
import { deleteSnippet } from '../../store/Snippets';
import useToggle from '../../hooks/useToggle';
import Modal from './Modal';
import { IMedia } from '../../interfaces/Media';
import { getData } from '../../store/App';
import useFirestore from '../../utils/firestore';

export interface DeleteAudioRef {
  toggleShowDelete: () => void;
}

interface DeleteModalProps {
  currentMedia: IMedia
}
// eslint-disable-next-line react/display-name
const DeleteModal = forwardRef<DeleteAudioRef, DeleteModalProps>(({currentMedia}, ref) => {
  const dispatch = useAppDispatch();
  const {deleteMediaNote, deleteMediaSnippet} = useFirestore();
  const [showDeleteModal, toggleShowDeleteModal] = useToggle();
  const activeData = useAppSelector(getData);

  
  const handleNoteDelete = useCallback(() => {
    dispatch(deleteNotes({ id: activeData.id }));
    // deleteRemoteNote(activeData.id);
    deleteMediaNote({
      currentMedia: currentMedia.id,
      noteId: activeData.id
    })
    toggleShowDeleteModal();
  }, [dispatch, activeData.id, toggleShowDeleteModal]);

  const handleSnippetDelete = useCallback(() => {
    dispatch(deleteSnippet({ id: activeData.id }));
    deleteMediaSnippet({
      currentMedia: currentMedia.id,
      snippetId: activeData.id
    })
    toggleShowDeleteModal();
  }, [dispatch, activeData.id, toggleShowDeleteModal]);

  useImperativeHandle(ref, () => ({
    toggleShowDelete: toggleShowDeleteModal,
  }));

  return (
    <Modal isVisible={showDeleteModal} handleClose={toggleShowDeleteModal}>
      <Text style={styles.addAudioTitle}>
        {`Are you sure you want to delete this ${activeData.type}`}
      </Text>
      <View style={styles.buttonContainer}>
        <Button
          onPress={activeData.type === 'note' ? handleNoteDelete : handleSnippetDelete}
          textOnly
          label="Yes"
        />
        <Button onPress={toggleShowDeleteModal} textOnly label="Cancel" />
      </View>
    </Modal>
  );
});

const styles = StyleSheet.create({
  addAudioTitle: {
    color: TEXT_PRIMARY,
    fontSize: FONT_TEXT_BODY_2,
    marginTop: 20,
    marginBottom: 15,
  },
  buttonContainer: { flexDirection: 'row', marginTop: 20 },
});

export default memo(DeleteModal);
