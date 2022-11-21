import React, { createRef, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  StyleProp,
  ViewStyle,
  NativeSyntheticEvent,
  TextInputKeyPressEventData,
} from 'react-native';
import { TIME_INPUT_LABEL, TIME_INPUT_TEXT } from '../../constants/colors';

interface ITime {
  Hour: string;
  Minute: string;
  Second: string;
}

export interface TimeInputProps {
  label: string;
  // eslint-disable-next-line react/no-unused-prop-types
  name: string;
  value: ITime;
  setError: (e: string) => void;
  // eslint-disable-next-line react/no-unused-prop-types
  maxValue?: string[];
  handleChange: (arg: unknown) => void;
  style?: StyleProp<ViewStyle>;
}

const TimeInput: React.FC<TimeInputProps> = ({ label, value, style, handleChange, setError }) => {
  const inputRef = (['Hour', 'Minute', 'Second'] as const).map((item) => ({
    time: item,
    ref: createRef<TextInput>(),
  }));
  const [activeIdx, setActiveIdx] = useState(0);

  const onFocus = (idx: number) => {
    if (inputRef[idx]?.ref) {
      inputRef[idx].ref.current?.focus();
      setActiveIdx(idx);
    }
  };

  const onChange = (idx: number) => (e: string) => {
    if ((inputRef[idx].time === 'Hour' && Number(e) > 23) || Number(e) > 59) {
      setError('invalid input');
      return;
    }
    handleChange({
      ...value,
      [inputRef[idx].time]: e,
    });
    if (e.length >= 2) {
      const newIndex = idx + 1;
      if (activeIdx !== newIndex) {
        onFocus(newIndex);
      }
    }
  };

  const handleKeyPress = (e: NativeSyntheticEvent<TextInputKeyPressEventData>) => {
    if (e.nativeEvent.key === 'Backspace') {
      if (value[inputRef[activeIdx].time].length <= 0) {
        const newIdx = activeIdx - 1;
        onFocus(newIdx >= 0 && inputRef[newIdx].ref ? newIdx : 0);
      }
    }
  };

  // Remove the hour column if it doesn't exist
  // if(value.Hour === '00'){
  // 	inputRef.splice(1,1);
  // }

  return (
    <View style={style}>
      <Text style={{ color: TIME_INPUT_LABEL, marginBottom: 5 }}>{label}</Text>
      <View style={{ flexDirection: 'row' }}>
        {inputRef.map((item, idx) => (
          <View key={item.time} style={{ flexDirection: 'row' }}>
            <View>
              <View style={styles.numberContainer}>
                <TextInput
                  ref={item.ref}
                  keyboardType="numeric"
                  style={styles.input}
                  value={value[item.time]}
                  maxLength={2}
                  onChangeText={onChange(idx)}
                  onKeyPress={handleKeyPress}
                />
              </View>
            </View>
            {idx !== inputRef.length - 1 && <Text style={styles.colonStyle}>:</Text>}
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  numberContainer: {
    width: 44,
    height: 44,
    borderRadius: 8,
    borderColor: '#C3CE80',
    borderWidth: 4,
    alignItems: 'center',
    justifyContent: 'center',
    borderStyle: 'solid',
    backgroundColor: '#C9C8AA',
  },
  input: {
    fontSize: 18,
    padding: 0,
    color: TIME_INPUT_TEXT,
  },
  colonStyle: {
    marginHorizontal: 5,
    fontSize: 18,
    alignSelf: 'center',
  },
});

export default TimeInput;
