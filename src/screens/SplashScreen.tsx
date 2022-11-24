import { StackScreenProps } from "@react-navigation/stack";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { Animated, FlatList, SafeAreaView, StyleSheet, Text, useWindowDimensions, View } from "react-native";
import Paginator from "../components/Paginator";
import { RootStackParamList } from "../interfaces/navigation";
import splashScreenContent from "./data";
import * as ROUTES from '../constants/routes';
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import { getSeenSplashScreen, setSeenSplashScreen } from "../store/App";
import IconImage from "../components/Icon";
import { IconProps } from "../interfaces/content";
import { BG_PRIMARY, TEXT_PRIMARY, TEXT_SECONDARY } from "../constants/colors";
import { FONT_HEADER_1, FONT_HEADER_2 } from "../constants/fonts";
import Button from "../components/Button";
import TabScreen from "../components/TabScreen";
import { getAuth } from "../store/Auth";
import auth from '@react-native-firebase/auth';


type Props = StackScreenProps<RootStackParamList, 'SplashScreen'>;

type SplashScreenType = {
    id: string;
    images: string;
    title: string;
    description: string;
}

export const SplashScreen: React.FC<Props> = ({ navigation }) => {
    const slideRef = useRef<
        FlatList<SplashScreenType>
    >(null);
    const dispatch = useAppDispatch();
    const { isAuthenticated } = useAppSelector(getAuth);
    const { seenSplashScreen } = useAppSelector(getSeenSplashScreen);
    const { width } = useWindowDimensions();
    const scrollX = useRef(new Animated.Value(0)).current;
    const [currentIndex, setCurrentIndex] = useState(0);

    const handleGoToHomeScreen = useCallback(() => {
        navigation.navigate(ROUTES.HomeScreen);
    }, [navigation]);
    
    useEffect(() => {
        if (seenSplashScreen && isAuthenticated) {
          handleGoToHomeScreen();
        } else {
          auth().signInAnonymously();
        }
      }, [handleGoToHomeScreen, isAuthenticated, seenSplashScreen]);

    const handleGoBack = () => {
        const newIndex = currentIndex - 1;
        slideRef.current?.scrollToIndex({
            index: newIndex,
            animated: true,
        });
        setCurrentIndex(currentIndex - 1);
    };

    const handleGoForward = () => {
        const newIndex = currentIndex + 1;
        if (newIndex > 2) {
            dispatch(setSeenSplashScreen(true));
            handleGoToHomeScreen();
        } else {
            slideRef.current?.scrollToIndex({
                index: newIndex,
                animated: true,
            });
            setCurrentIndex(newIndex);
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.splashMainContainer}>
                <TabScreen
                    {...{slideRef}}
                    data={splashScreenContent}
                    renderItem={({ item: { description, images, title } }) => (
                        <View style={[styles.splashContainer, { width }]}>
                            <IconImage name={images as IconProps['name']} width={width - 20} />
                            <Text style={styles.header}>{title}</Text>
                            <Text style={styles.description}>{description}</Text>
                        </View>
                    )}
                    setOnScroll={Animated.event([{ nativeEvent: { contentOffset: { x: scrollX } } }], {
                        useNativeDriver: false,
                      })}
                />
            </View>
            <View style={styles.actionContainer}>
                {currentIndex > 0 ? <Button label="Previous" onPress={handleGoBack} /> : <View />}
                <Paginator length={splashScreenContent.length} scrollX={scrollX} width={width} />
                <Button label="Next" onPress={handleGoForward} />
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: BG_PRIMARY,
        flex: 1,
        paddingBottom: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    splashMainContainer: { maxHeight: '65%', overflow: 'hidden' },
    splashContainer: {
        paddingHorizontal: 10,
    },
    header: {
        fontWeight: '600',
        fontSize: FONT_HEADER_1,
        color: TEXT_PRIMARY,
    },
    description: {
        color: TEXT_SECONDARY,
        fontSize: FONT_HEADER_2,
    },
    actionContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 25,
        paddingHorizontal: 25,
        width: '100%',
    },
})

export default SplashScreen;
