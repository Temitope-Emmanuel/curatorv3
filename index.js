import 'react-native-gesture-handler';
/**
 * @format
 */

import {AppRegistry} from 'react-native';
import TrackPlayer from 'react-native-track-player';
// eslint-disable-next-line import/no-unresolved
import App from './App';
import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => App);
// eslint-disable-next-line global-require
TrackPlayer.registerPlaybackService(() => require('./service'));