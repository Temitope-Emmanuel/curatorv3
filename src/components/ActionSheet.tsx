import React, { useImperativeHandle, useRef } from 'react';
import NativeActionSheet, { ActionSheetRef } from 'react-native-actions-sheet';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { IconProps } from '../interfaces/content';
import { BG_TERTIARY, CHIP_TEXT, TEXT_PRIMARY, TEXT_SECONDARY } from '../constants/colors';
import { IMedia } from '../interfaces/Media';
import Chips from './Chips';
import IconImage from './Icon';

export interface ActionType {
  label: string;
  disabled?: boolean;
  visible: boolean;
  icon: IconProps['name'];
  onPress?: () => void;
}

interface ActionSheetProps {
  closeSheet?: () => void;
  action: ActionType[];
  handleRemoveTags: (tag: string) => void;
  displayMedia?: Pick<IMedia, 'title' | 'author' | 'tags'>;
}

// eslint-disable-next-line react/display-name
const ActionSheet = React.forwardRef<Pick<ActionSheetRef, 'hide' | 'show'>, ActionSheetProps>(
  ({ action, closeSheet, displayMedia, handleRemoveTags }, ref) => {
    const actionSheetRef = useRef<ActionSheetRef>(null);

    useImperativeHandle(ref, () => ({
      hide: actionSheetRef.current ? actionSheetRef.current.hide : () => {},
      show: actionSheetRef.current ? actionSheetRef.current.show : () => {},
    }));

    return (
      <NativeActionSheet
        ref={actionSheetRef}
        onClose={closeSheet}
        containerStyle={styles.container}
      >
        <View
          style={{
            paddingBottom: 20,
            marginBottom: 10,
            borderBottomWidth: 0.5,
            borderBottomColor: TEXT_SECONDARY,
            borderStyle: 'solid',
          }}
        >
          <View
            style={{
              flexDirection: 'row',
              marginBottom: 5,
            }}
          >
            <View>
              <Text style={{ color: TEXT_PRIMARY }} numberOfLines={1}>
                {displayMedia?.title}
              </Text>
              <Text style={{ color: TEXT_PRIMARY, fontWeight: '300' }}>{displayMedia?.author}</Text>
            </View>
          </View>
          {displayMedia?.tags?.length ? (
            <View
              style={{
                flexDirection: 'row',
                flexWrap: 'wrap',
              }}
            >
              {displayMedia.tags.map((item) => (
                <Chips
                  label={item}
                  key={`${item}`}
                  active={false}
                  onCancel={() => handleRemoveTags(item)}
                />
              ))}
            </View>
          ) : (
            <></>
          )}
        </View>
        {action.map((item) => (
          item.visible ? 
          <TouchableOpacity
            key={item.label}
            onPress={item.onPress}
            disabled={item.disabled}
            style={{
              marginBottom: 10,
              flexDirection: 'row',
              alignItems: 'center',
              opacity: item.disabled ? 0.5 : 1,
            }}
          >
            <IconImage name={item.icon} width={30} fill={TEXT_SECONDARY} />
            <Text style={{ color: CHIP_TEXT, marginLeft: 10 }}>{item.label}</Text>
          </TouchableOpacity> : <></>
        ))}
      </NativeActionSheet>
    );
  }
);

const styles = StyleSheet.create({
  container: {
    padding: 20,
    borderTopEndRadius: 20,
    borderTopRightRadius: 20,
    backgroundColor: BG_TERTIARY,
    paddingBottom: 5,
  },
  img: {
    height: 40,
    width: 40,
    borderRadius: 5,
    marginRight: 15,
  },
});

export default ActionSheet;
