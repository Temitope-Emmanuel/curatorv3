/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import auth from '@react-native-firebase/auth';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackParamList } from './src/interfaces/navigation';
import * as ROUTES from './src/constants/routes';

import usePlayerService, {
  PlayerServiceProvider,
} from './src/providers/TrackPlayer';
import { HomeScreen } from './src/screens';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { persistor, store } from './src/store';
import { useAppDispatch } from './src/hooks/redux';
import { IUser } from './src/interfaces/auth';
import { setUser, clearUser } from './src/store/Auth';
import { UploadServiceProvider } from './src/providers/Uploading';

const Stack = createNativeStackNavigator<RootStackParamList>();

const App = () => {
  const dispatch = useAppDispatch();
  const { startPlayer } = usePlayerService();
  
  const onAuthStateChanged = (user: IUser | null) => {
    if (user) {
      const {
        displayName,
        email,
        emailVerified,
        metadata,
        uid,
        phoneNumber,
        photoURL,
        providerData,
      } = user;
      const newCurrentUser = {
        displayName: displayName?.length ? displayName : providerData[0]?.displayName || '',
        email: email?.length ? email : providerData[0]?.email || '',
        emailVerified,
        metadata,
        phoneNumber: phoneNumber?.length ? phoneNumber : providerData[0]?.phoneNumber || '',
        photoURL: photoURL?.length ? photoURL : providerData[0]?.photoURL || '',
        providerData,
        uid,
      };
      dispatch(setUser(newCurrentUser));
    } else {
      dispatch(clearUser());
    }
  };

  useEffect(() => {
    startPlayer();
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={ROUTES.HomeScreen}
        screenOptions={{
          headerShown: false
        }}
      >
        <Stack.Screen name={ROUTES.HomeScreen} component={HomeScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const AppWithUploadService = PlayerServiceProvider(UploadServiceProvider(App));

export const Root = () => <Provider store={store}><PersistGate loading={null} persistor={persistor}><AppWithUploadService /></PersistGate></Provider>;

export default Root;
