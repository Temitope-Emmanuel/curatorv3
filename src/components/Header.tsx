import React, { useRef } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  Platform,
  Animated,
  useWindowDimensions,
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import { TouchableOpacity } from 'react-native-gesture-handler';
import IconImage from './Icon';
import { TEXT_SECONDARY, TEXT_PRIMARY } from '../constants/colors';
import { ICON_SIZE_M } from '../constants/spacing';
import useToggle from '../hooks/useToggle';
import IconButton from './IconButton';
import { useAppSelector } from '../hooks/redux';
import { getAuth } from '../store/Auth';
import { useFirebaseAuth } from '../utils/firebaseAuth';
import { pulse } from '../utils/animation';
import { getFCMToken, requestUserPermission } from '../utils/firebaseNotifications';
import { updateUserDetails } from '../utils/firestore';
import { IUser } from '../interfaces/auth';

const Header: React.FC<{
  search: string;
  setSearch: (arg: string) => void;
}> = ({ search, setSearch }) => {
// }> = ({ search, setSearch }) => {
  const AnimatedTouchable = Animated.createAnimatedComponent(TouchableOpacity);
  const { handleSignout, handleSignup } = useFirebaseAuth();
  const [logout, toggleLogout] = useToggle();
  const { currentUser } = useAppSelector(getAuth);
  const { width } = useWindowDimensions();
  const animatedWidth = useRef(new Animated.Value(30)).current;
  const [showSearch, toggleShowSearch] = useToggle();

  const changeSearchBarSize = () => {
    Animated.spring(animatedWidth, {
      toValue: showSearch ? 30 : (width / 4) * 3,
      useNativeDriver: false,
    }).start();
    toggleShowSearch();
  };

  const handleRequestForAccess = async (currentUser: IUser['uid']) => {
    const enabled = await requestUserPermission();
    if (enabled) {
      const fcmToken = await getFCMToken();
      if (fcmToken) {
        updateUserDetails({ currentUser, fcmToken });
      }
    }
  };

  const onSignup = () => {
    handleSignup().then((user) => {
      if (user && !user.fcmToken) {
        handleRequestForAccess(user.uid);
      }
    });
  };

  return (
    <View style={styles.miniContainer}>
      {/* <Animated.View
       style={[styles.searchContainer, { width: animatedWidth }]}>
        <TouchableOpacity onPress={changeSearchBarSize}>
          <IconImage name="search" width={20} />
        </TouchableOpacity>
        {showSearch ? <TextInput  style={{flex: 1, marginLeft: 2}} value={search} onChangeText={e => setSearch(e)} /> : <></>}
      </Animated.View> */}
      <View />
      {currentUser?.email ? (
        <TouchableOpacity style={styles.authContainer} onPress={toggleLogout}>
          <Text style={styles.authText}>{currentUser?.displayName}</Text>
          {logout ? (
            <TouchableOpacity onPress={() => handleSignout(toggleLogout)}>
              <IconImage name="signout" width={30} />
            </TouchableOpacity>
          ) : (
            <Image style={styles.authImg} source={{ uri: currentUser?.photoURL ?? '' }} />
          )}
        </TouchableOpacity>
      ) : (
        <Animatable.View
          animation={pulse}
          easing="ease-in-out"
          duration={1500}
          iterationCount="infinite"
        >
          <IconButton name="google" onPress={onSignup} size={ICON_SIZE_M} />
        </Animatable.View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  miniContainer: {
    width: '100%',
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginBottom: 'auto',
    alignItems: 'center',
    marginTop: 10,
    paddingHorizontal: Platform.OS === 'ios' ? 10 : undefined,
  },
  searchContainer: {
    padding: 4,
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: TEXT_SECONDARY,
    borderRadius: 12,
    height: 30,
    // justifyContent: 'center',

    flexDirection: 'row',
  },
  authContainer: {
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: TEXT_SECONDARY,
    borderRadius: 20,
    paddingVertical: 5,
    paddingHorizontal: 7,
    flexDirection: 'row',
    alignItems: 'center',
  },
  authText: {
    color: TEXT_PRIMARY,
    fontSize: 12,
    marginRight: 10,
  },
  authImg: {
    width: 20,
    height: 20,
    borderRadius: 10,
  },
});

export default Header;
