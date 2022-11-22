import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { TEXT_PRIMARY, TOGGLE_BUTTON, TOGGLE_BUTTON_ACTIVE } from '../constants/colors';
import { IconProps } from '../interfaces/content';
import IconImage from './Icon';

const ToggleButton: React.FC<{
  onPress: (label: string) => void;
  active: string;
  buttons: {
    icon: IconProps['name'];
    label: string;
  }[];
}> = ({ onPress, buttons, active }) => (
  <View style={styles.toggleContainer}>
    {buttons.map(({ icon, label }) => (
      <TouchableOpacity
        key={label}
        disabled={active === label}
        style={[
          styles.toggle,
          { backgroundColor: active === label ? TOGGLE_BUTTON_ACTIVE : TOGGLE_BUTTON },
        ]}
        onPress={() => onPress(label)}
      >
        <IconImage name={icon} width={30} />
        <Text style={styles.toggleText}>{label}</Text>
      </TouchableOpacity>
    ))}
  </View>
);

const styles = StyleSheet.create({
  toggleContainer: {
    borderRadius: 15,
    backgroundColor: '#24251D',
    overflow: 'hidden',
    flexDirection: 'row',
    marginBottom: 15,
  },
  toggle: {
    paddingVertical: 5,
    paddingHorizontal: 15,
    flexDirection: 'row',
    alignItems: 'center',
  },
  toggleText: {
    color: TEXT_PRIMARY,
    marginLeft: 15,
    fontWeight: '400',
    fontSize: 16,
  },
});

export default ToggleButton;
