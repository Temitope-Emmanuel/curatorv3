/* eslint-disable react/no-unused-prop-types */
import { useNavigation } from '@react-navigation/native';
import { StackScreenProps } from '@react-navigation/stack';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import * as ROUTES from '../constants/routes';
import { RootStackParamList } from '../interfaces/navigation';
import IconButton from './IconButton';

type Props = StackScreenProps<RootStackParamList, 'PlayerScreen'>;

type NavigationProps = Props['navigation'];
interface SearchBarProps {
  showBack?: boolean;
  showMore?: boolean;
  showNotification?: boolean;
  showSearch?: boolean;
}
const SearchBar: React.FC<SearchBarProps> = ({ showBack = true }) => {
  const { navigate, canGoBack, goBack } = useNavigation<NavigationProps>();
  // const navigateToNotification = () => {
  // 	navigate(ROUTES.NotificationScreen);
  // };
  const handleGoBack = () => {
    if (canGoBack()) {
      return goBack();
    }
    return navigate(ROUTES.HomeScreen);
  };
  return (
    <View style={styles.navActionContainer}>
      {showBack && <IconButton onPress={handleGoBack} name="arrow-back" size={30} />}
      {/* {showSearch && (
				<IconButton name="search" size={30} iconColor={BG_SECONDARY} style={styles.searchIcon} />
			)}
			{showNotification && (
				<IconButton
					onPress={navigateToNotification}
					name="notifications-active"
					size={30}
					iconColor={BG_SECONDARY}
					style={{
						marginHorizontal: 10,
					}}
				/>
			)}
			{showMore && <IconButton name="more" iconColor={BG_SECONDARY} size={30} />} */}
    </View>
  );
};

const styles = StyleSheet.create({
  navActionContainer: {
    flexDirection: 'row',
    width: '100%',
    marginTop: 10,
  },
  searchIcon: {
    marginLeft: 'auto',
  },
});

export default SearchBar;
