import React, { ReactNode } from 'react';
import { StyleSheet, View } from 'react-native';
import ModalComponent from 'react-native-modal';
import { MODAL_BG } from '../../constants/colors';

const Modal: React.FC<{
  handleClose: () => void;
  isVisible: boolean;
  children: ReactNode;
}> = ({ isVisible, children, handleClose }) => (
  <ModalComponent
    isVisible={isVisible}
    backdropOpacity={0.5}
    style={styles.modalContainer}
    animationIn="slideInDown"
    animationOut="slideOutUp"
    animationInTiming={600}
    animationOutTiming={600}
    backdropTransitionInTiming={1000}
    backdropTransitionOutTiming={1000}
    onBackdropPress={handleClose}
  >
    <View style={styles.container}>{children}</View>
  </ModalComponent>
);

const styles = StyleSheet.create({
  modalContainer: {
    width: '100%',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    margin: 0,
  },
  container: {
    backgroundColor: MODAL_BG,
    width: '100%',
    paddingHorizontal: 15,
    paddingVertical: 20,
    padding: 10,
  },
});

export default Modal;
