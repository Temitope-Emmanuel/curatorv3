import functions from '@react-native-firebase/functions'

interface notifyNewSubscriberArg {
    recipient: {
      name: string;
      fcmToken: string;
    },
    sender: {
      name: string;
      media: string
    }
}

export const notifyNewCliqueSubscriber = (arg: notifyNewSubscriberArg) => 
    functions().httpsCallable('sendPushNotificationForNewCliquer')(arg).then((response: any) => {
        console.log('this is the response', response.results)
    })
