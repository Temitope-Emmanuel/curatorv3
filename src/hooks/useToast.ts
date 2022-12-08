import Toast, { ToastShowParams } from 'react-native-toast-message';

const useToast = ({
  type,
  text2,
}: Pick<ToastShowParams, 'text2'> & { type: 'success' | 'error' }) =>
  Toast.show({
    type,
    text2,
    position: 'bottom',
  });

export default useToast;
