import { StyleSheet } from 'react-native';
import { TEXT_PRIMARY } from '../constants/colors';

export const utilStyles = StyleSheet.create({
  mlAuto: {
    marginLeft: 'auto',
  },
  mrAuto: {
    marginRight: 'auto',
  },
  mr13: {
    marginRight: 13,
  },
  ml13: {
    marginLeft: 13,
  },
  img: {
    width: 30,
    height: 30,
    borderRadius: 5,
  },
  timestamp: {
    fontSize: 12,
    fontWeight: '800',
    color: TEXT_PRIMARY,
  },
});

export default utilStyles;
