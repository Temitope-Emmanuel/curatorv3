import React, { useImperativeHandle, useRef } from 'react';
import NativeActionSheet, { ActionSheetRef } from 'react-native-actions-sheet';
import { StyleSheet } from 'react-native';
import { IconProps } from '../interfaces/content';
import { BG_TERTIARY } from '../constants/colors';

export interface ActionType {
    label: string;
    disabled?: boolean;
    visible: boolean;
    icon: IconProps['name'];
    onPress?: () => void;
}

interface ActionSheetProps {
    // action: ActionType[];
    children: React.ReactNode;
    closeSheet?: () => void;
}

// eslint-disable-next-line react/display-name
const BottomSheet = React.forwardRef<Pick<ActionSheetRef, 'hide' | 'show'>, ActionSheetProps>(
    ({ closeSheet, children }, ref) => {
        const actionSheetRef = useRef<ActionSheetRef>(null);

        useImperativeHandle(ref, () => ({
            hide: actionSheetRef.current ? actionSheetRef.current.hide : () => { },
            show: actionSheetRef.current ? actionSheetRef.current.show : () => { },
        }));

        return (
            <NativeActionSheet
                ref={actionSheetRef}
                onClose={closeSheet}
                containerStyle={styles.container}
            >
                {
                    children
                }
            </NativeActionSheet>
        );
    }
);

const styles = StyleSheet.create({
    container: {
        padding: 20,
        borderTopEndRadius: 20,
        borderTopRightRadius: 20,
        backgroundColor: BG_TERTIARY,
        paddingBottom: 5,
    },
    img: {
        height: 40,
        width: 40,
        borderRadius: 5,
        marginRight: 15,
    },
});

export default BottomSheet;
