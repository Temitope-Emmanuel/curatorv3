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

export const notifyCliqueMemberOfMention = ({ currentUser, userMention, extraDetail }: {
  currentUser: string,
  userMention: string[];
  extraDetail: {
    id: string;
    description: string
  }
}) =>
  functions().httpsCallable('notifyCliqueMemberOfMention')({ currentUser, userMention, extraDetail }).then(() => {
    toast({
      type: 'success',
      text2: 'an invite has been sent'
    })
  }).catch(err => {
    toast({
      type: 'error',
      text2: err.message
    })
  })

export default notifyNewCliqueSubscriber;
