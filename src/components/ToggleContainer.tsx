import React, { memo, useMemo, useRef } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { DROPDOWN_TEXT } from '../constants/colors';
import { useAppSelector } from '../hooks/redux';
import toast from '../hooks/useToast';
import { IClique } from '../interfaces/clique';
import { PlayerTab } from '../screens/PlayerScreen';
import { getCurrentNoteCount } from '../store/Notes';
import { getCurrentSnippetCount } from '../store/Snippets';
import IconButton from './IconButton';
import * as Animatable from 'react-native-animatable';
import { pulse } from '../utils/animation';

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
  const animateViewRef = useRef(null)
    const handleUnauthorized = () => {
      toast({
        text2: cliqueActive.reason,
        type: 'error',
      });
    };
    const snippetCount = useAppSelector(getCurrentSnippetCount);
    const noteCount = useAppSelector(getCurrentNoteCount);

    const currentTabIsNote = useMemo(() => currentTab === 'Note', [currentTab]);

    const animateCreateButton = useMemo(() => 
    (snippetCount < 1 && currentTab === 'Snippet') || 
    (noteCount < 1 && currentTab === 'Note'), 
    [snippetCount, currentTab]);

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
        <Animatable.View animation={animateCreateButton ? pulse: ''} ref={animateViewRef} useNativeDriver easing='ease-in-out' duration={1500} iterationCount='infinite' >
          <IconButton
            onPress={currentTabIsNote ? toggleNoteModal : toggleSnippetModal}
            name={currentTabIsNote ? 'note' : 'graphic-eq'}
            size={30}
          />
        </Animatable.View>
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
