import functions from '@react-native-firebase/functions'
import toast from '../hooks/useToast';

interface NotifyNewSubscriberArg {
    recipient: {
      name: string;
      fcmToken: string;
    },
    sender: {
      name: string;
      media: string
    }
}

export const notifyNewCliqueSubscriber = (arg: NotifyNewSubscriberArg) => 
    functions().httpsCallable('sendPushNotificationForNewCliquer')(arg).then((response) => {
      toast({
        type: 'success',
        text2: 'an invite has been sent'
      })
    }).catch(err => {
      toast({
        type: 'error',
        text2: err
      })
    })

    export default notifyNewCliqueSubscriber;
