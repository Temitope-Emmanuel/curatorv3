import AsyncStorage from '@react-native-async-storage/async-storage';
import messaging from '@react-native-firebase/messaging';
import toast from '../hooks/useToast';

export const requestUserPermission = async () => {
    const authStatus = await messaging().requestPermission();
    const enabled = authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
        authStatus === messaging.AuthorizationStatus.PROVISIONAL;
        return enabled;
}

const FCM_TOKEN = 'FCM_TOKEN';

export const getFCMToken = async () => {
    let fcmToken = await AsyncStorage.getItem(FCM_TOKEN);
    if (fcmToken === null) {
        try {
            fcmToken = await messaging().getToken();
            if (fcmToken) {
                AsyncStorage.setItem(FCM_TOKEN, fcmToken);
            }
            return fcmToken;
        } catch (err: any) {
            toast({
                type: 'error',
                text2: err.message
            })
            // console.log('something went wrong', err)
        }
    }
}

export const notificationListener = () => {
    messaging().onNotificationOpenedApp(remoteMessage => {
        console.log('this is the remote message', remoteMessage)
    })
    messaging().getInitialNotification().then(remoteMessage => {
        console.log('this is the remoteMessage', remoteMessage)
    })
    messaging().onMessage(async remoteMessage => {
        toast({
            type: 'success',
            text2: remoteMessage.notification?.body
        })
        console.log('this is a new message', remoteMessage)
    })   
}

export const listentoBackgroundMessages = () => {
    messaging().setBackgroundMessageHandler(async remoteMessage => {
        console.log('message handled in the bg', remoteMessage)
    })
}

export default getFCMToken;