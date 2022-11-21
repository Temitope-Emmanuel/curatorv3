import React from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  Text,
  GestureResponderEvent,
  StyleProp,
  ViewStyle,
} from 'react-native';
import { TEXT_BLACK, TEXT_PRIMARY, TEXT_SECONDARY } from '../constants/colors';
import { FONT_TEXT_BODY_2 } from '../constants/fonts';

const Button: React.FC<{
  label: string;
  textOnly?: boolean;
  filled?: boolean;
  disabled?: boolean;
  style?: StyleProp<ViewStyle>;
  onPress?: (event: GestureResponderEvent) => void;
}> = ({ label, onPress, textOnly, style, filled, disabled }) => (
  <TouchableOpacity
    disabled={disabled}
    onPress={!disabled ? onPress : undefined}
    style={[
      styles.container,
      style,
      !textOnly ? styles.outlined : undefined,
      filled ? styles.filled : undefined,
      disabled ? styles.disabled : undefined,
    ]}
  >
    <Text
      style={[
        styles.label,
        { color: filled ? TEXT_BLACK : textOnly ? TEXT_SECONDARY : TEXT_PRIMARY },
      ]}
    >
      {label}
    </Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: {
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  outlined: {
    borderRadius: 30,
    borderColor: TEXT_SECONDARY,
    borderWidth: 1,
  },
  label: {
    fontSize: FONT_TEXT_BODY_2,
  },
  filled: {
    backgroundColor: TEXT_SECONDARY,
  },
  disabled: {
    opacity: 0.5,
  },
});

export default Button;
