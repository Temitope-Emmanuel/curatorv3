import DocumentPicker, { types, isInProgress } from 'react-native-document-picker';
import toast from '../hooks/useToast';
import { NormalizedData } from '../interfaces/normalizedData';

export const handleError = (err: unknown) => {
  if (DocumentPicker.isCancel(err)) {
    toast({
      type: 'error',
      text2: 'Action is cancelled',
    });
  } else if (isInProgress(err)) {
    toast({
      type: 'error',
      text2: 'multiple pickers were opened, only the last will be considered',
    });
  } else {
    throw err;
  }
};

export const checkNormalizedData = (id: string, data: NormalizedData) => {
  const value = data[id];
  if (value) return value;
  return false;
};