import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  Platform,
} from 'react-native';
import IconImage from '../components/Icon';
import { TEXT_SECONDARY, TEXT_PRIMARY } from '../constants/colors';
import { ICON_SIZE_M } from '../constants/spacing';
import useToggle from '../hooks/useToggle';
import IconButton from './IconButton';
import { useAppSelector } from '../hooks/redux';
import { getAuth } from '../store/Auth';
import useFirebaseAuth from '../utils/firebaseAuth';
import * as Animatable from 'react-native-animatable';
import { pulse } from '../utils/animation';

const Header = () => {
  const { handleSignout, handleSignup } = useFirebaseAuth();
  const [logout, toggleLogout] = useToggle();
  const { currentUser } = useAppSelector(getAuth);
  // const animatedWidth = useRef(new Animated.Value(50)).current;
  // const [showSearch, toggleShowSearch] = useToggle();

  // const changeSearchBarSize = () => {
  // 	Animated.spring(animatedWidth, {
  // 		toValue: showSearch ? (width / 4) * 3 : 50,
  // 		useNativeDriver: false,
  // 	}).start();
  // 	toggleShowSearch();
  // };
  
  return (
    <View style={styles.miniContainer}>
      {/* <Animated.View style={[styles.searchContainer, { width: animatedWidth }]}>
				<TouchableOpacity onPress={changeSearchBarSize}>
					<IconImage name="search" width={ICON_SIZE_M} />
				</TouchableOpacity>
			</Animated.View> */}
      <View />
      {currentUser?.email ? (
        <TouchableOpacity style={styles.authContainer} onPress={toggleLogout}>
          <Text style={styles.authText}>{currentUser?.displayName}</Text>
          {logout ? (
            <TouchableOpacity onPress={() => handleSignout(toggleLogout)}>
              <IconImage name="signout" width={20} />
            </TouchableOpacity>
          ) : (
            <Image style={styles.authImg} source={{ uri: currentUser?.photoURL ?? '' }} />
          )}
        </TouchableOpacity>
      ) : (
        <Animatable.View animation={pulse} easing='ease-in-out' duration={1500} iterationCount={'infinite'} >
          <IconButton name="google" onPress={handleSignup} size={ICON_SIZE_M} />
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
    padding: 8,
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: TEXT_SECONDARY,
    borderRadius: 20,
    height: 50,
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
