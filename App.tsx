/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React, {useEffect} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackParamList } from './src/interfaces/navigation';
import * as ROUTES from './src/constants/routes';

import usePlayerService, {
  PlayerServiceProvider,
} from './src/providers/TrackPlayer';
import { HomeScreen } from './src/screens';

const Stack = createNativeStackNavigator<RootStackParamList>();

const App = () => {
  const {startPlayer} = usePlayerService();

  useEffect(() => {
    startPlayer();
    // const subscriber =
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return(
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

const AppWithUploadService = PlayerServiceProvider(App);

export const Root = () => <AppWithUploadService />;

export default Root;
