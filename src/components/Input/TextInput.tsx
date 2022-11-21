import React from 'react';
import {
  View,
  TextInput as NativeTextInput,
  StyleSheet,
  NativeSyntheticEvent,
  TextInputFocusEventData,
  StyleProp,
  ViewStyle,
} from 'react-native';
import { TEXT_SECONDARY } from '../../constants/colors';
import { FONT_TEXT_BODY } from '../../constants/fonts';

export interface TextInputProps {
  value: string;
  label?: string;
  rows?: string;
  numberOfLines?: number;
  placeholder?: string;
  style?: StyleProp<ViewStyle>;
  onChangeText: (arg: string) => void;
  handleBlur?: (e: NativeSyntheticEvent<TextInputFocusEventData>) => void;
  handleFocus?: (e: NativeSyntheticEvent<TextInputFocusEventData>) => void;
}

const TextInput: React.FC<TextInputProps> = ({
  numberOfLines,
  onChangeText,
  value,
  handleBlur: onBlur,
  handleFocus: onFocus,
  placeholder,
  rows,
  style,
}) => (
  <View style={[styles.inputContainer, style]}>
    {/* <Text style={styles.label}>{label}</Text> */}
    <NativeTextInput
      multiline={!!rows}
      placeholder={placeholder}
      placeholderTextColor={TEXT_SECONDARY}
      style={[styles.input, { paddingTop: rows || 0 }]}
      {...{ value, onChangeText, onBlur, onFocus, numberOfLines }}
    />
  </View>
);

const styles = StyleSheet.create({
  label: {
    color: TEXT_SECONDARY,
    fontSize: FONT_TEXT_BODY,
    marginRight: 8,
    marginBottom: 0,
    marginVertical: 10,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    borderStyle: 'solid',
    borderBottomWidth: 0.5,
    borderBottomColor: TEXT_SECONDARY,
    marginTop: 20,
  },
  input: {
    padding: 0,
    fontSize: 15,
    fontWeight: '300',
    color: TEXT_SECONDARY,
    width: '100%',
    textAlignVertical: 'bottom',
  },
});

export default TextInput;
