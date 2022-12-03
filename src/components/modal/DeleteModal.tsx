import React, { forwardRef, memo, useCallback, useImperativeHandle, useState } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import Button from '../Button';
import { TEXT_PRIMARY } from '../../constants/colors';
import { FONT_TEXT_BODY_2 } from '../../constants/fonts';
import { useAppDispatch } from '../../hooks/redux';
import { deleteNotes } from '../../store/Notes';
import { deleteSnippet } from '../../store/Snippets';
import useToggle from '../../hooks/useToggle';
import Modal from './Modal';
import { IMedia } from '../../interfaces/Media';

export interface DeleteAudioRef {
  toggleShowDelete: () => void;
  setItemToDelete: (arg: { name: string; id: string; type: 'note' | 'snippet' }) => void;
}

interface DeleteModalProps {
  currentMedia: IMedia
  deleteRemoteNote: (noteId: string) => Promise<void>;
  deleteRemoteSnippet: (snippetId: string) => Promise<void>;
}
// eslint-disable-next-line react/display-name
const DeleteModal = forwardRef<DeleteAudioRef, DeleteModalProps>(({currentMedia, deleteRemoteNote, deleteRemoteSnippet}, ref) => {
  const dispatch = useAppDispatch();
  const [showDeleteModal, toggleShowDeleteModal] = useToggle();
  const [itemToDelete, setItemToDelete] = useState<{
    name: string;
    id: string;
    type: 'note' | 'snippet';
  }>({
    name: '',
    id: '',
    type: 'snippet',
  });

  const handleNoteDelete = useCallback(() => {
    dispatch(deleteNotes({ id: itemToDelete.id }));
    deleteRemoteNote(itemToDelete.id);
    toggleShowDeleteModal();
  }, [dispatch, itemToDelete.id, toggleShowDeleteModal]);

  const handleSnippetDelete = useCallback(() => {
    dispatch(deleteSnippet({ id: itemToDelete.id }));
    deleteRemoteSnippet(itemToDelete.id);
    toggleShowDeleteModal();
  }, [dispatch, itemToDelete.id, toggleShowDeleteModal]);

  useImperativeHandle(ref, () => ({
    setItemToDelete,
    toggleShowDelete: toggleShowDeleteModal,
  }));

  return (
    <Modal isVisible={showDeleteModal} handleClose={toggleShowDeleteModal}>
      <Text style={styles.addAudioTitle}>
        {`Are you sure you want to delete ${itemToDelete.name}`}
      </Text>
      <View style={styles.buttonContainer}>
        <Button
          onPress={itemToDelete.type === 'note' ? handleNoteDelete : handleSnippetDelete}
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
