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

import usePlayerService, {
  PlayerServiceProvider,
} from './src/providers/TrackPlayer';
import HomeScreen from './src/screens/HomeScreen';

const App = () => {
  const {startPlayer} = usePlayerService();

  useEffect(() => {
    startPlayer();
    // const subscriber =
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <HomeScreen />;
};

const AppWithUploadService = PlayerServiceProvider(App);

export const Root = () => {
  return <AppWithUploadService />;
};

export default Root;
