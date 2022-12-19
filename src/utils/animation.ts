import { ImageStyle, TextStyle, ViewStyle } from "react-native";
import * as Animatable from 'react-native-animatable';

export const pulse: Animatable.CustomAnimation<TextStyle & ViewStyle & ImageStyle> = {
    0: {
      transform: [{scale: 1}]
    },
    0.25: {
      transform: [{scale: 1.15}]
    },
    0.5: {
      transform: [{scale: 1.4}]
    },
    0.75: {
      transform: [{scale: 1.15}]
    },
    1: {
      transform: [{scale: 1}]
    },
  };

  export default pulse;
  