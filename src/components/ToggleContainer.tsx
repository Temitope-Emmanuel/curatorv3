import React, { memo } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { DROPDOWN_TEXT } from '../constants/colors';
import toast from '../hooks/useToast';
import { IClique } from '../interfaces/clique';
import { PlayerTab } from '../screens/PlayerScreen';
import IconButton from './IconButton';

const ToggleContainer: React.FC<{
  showDropdown: boolean;
  toggleNoteModal: () => void;
  currentTab: PlayerTab['type'];
  toggleShowDropdown: () => void;
  toggleSnippetModal: () => void;
  currentClique?: IClique;
  cliqueActive: {
    reason: string;
    disable: boolean;
  };
}> = ({
  currentTab,
  toggleNoteModal,
  toggleSnippetModal,
  toggleShowDropdown,
  showDropdown,
  cliqueActive,
  currentClique,
}) => {
  const handleUnauthorized = () => {
    toast({
      text2: cliqueActive.reason,
      type: 'error',
    });
  };

  return (
    <View style={styles.selectContainer}>
      <TouchableOpacity
        style={[styles.selectDropdownContainer, { opacity: cliqueActive.disable ? 0.5 : 1 }]}
        onPress={cliqueActive.disable ? handleUnauthorized : toggleShowDropdown}
      >
        <View
          style={{
            marginRight: 10,
          }}
        >
          <Text style={styles.dropDownHeader}>{currentClique?.type}</Text>
          <Text style={styles.dropDownText}>
            {(currentClique?.createdAt as any)?.toDate().toDateString() || ''}
          </Text>
        </View>
        <IconButton
          name="dropdown"
          style={{ transform: [{ rotate: showDropdown ? '180deg' : '360deg' }] }}
          size={20}
        />
      </TouchableOpacity>
      <IconButton
        onPress={currentTab === 'Note' ? toggleNoteModal : toggleSnippetModal}
        name={currentTab === 'Note' ? 'note' : 'graphic-eq'}
        size={30}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  selectContainer: {
    width: '100%',
    flexDirection: 'row',
    marginTop: 10,
    justifyContent: 'space-between',
    paddingHorizontal: 15,
  },
  selectDropdownContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dropDownHeader: { color: DROPDOWN_TEXT, fontWeight: '600' },
  dropDownText: { color: DROPDOWN_TEXT, fontWeight: '300' },
});

export default memo(ToggleContainer);
