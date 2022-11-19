import React from 'react';
import {StyleProp, TouchableOpacity, ViewStyle} from 'react-native';
import { IconImage } from './Icon';
import {IconProps} from '../interfaces/content';

const IconButton: React.FC<{
  name: IconProps['name'];
  width?: number;
  size: IconProps['width'];
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
  iconColor?: string;
  disabled?: boolean;
}> = ({name, onPress, size, width, style, iconColor, disabled}) => (
  <TouchableOpacity
    style={[
      {
        height: width && width,
        width: width && width,
        alignItems: 'center',
        justifyContent: 'center',
        opacity: disabled ? 0.5 : 1,
      },
      style,
    ]}
    {...{onPress, disabled}}>
    <IconImage name={name} fill={iconColor} width={size} />
  </TouchableOpacity>
);

export default IconButton;
