import React, { useMemo } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { BG_TERTIARY, DROPDOWN_TEXT_2, TEXT_PRIMARY, TEXT_SECONDARY } from '../constants/colors';
import { IClique } from '../interfaces/clique';
import IconImage from './Icon';
import IconButton from './IconButton';

export const AVATAR_MAX = 5;

export const CliqueOption: React.FC<{
    type: 'personal' | 'public' | 'private' | string;
    label: string;
    members: IClique['members'];
}> = ({ label, members, type }) => {
    const memberImages = useMemo(
        () => members.filter((item) => item.photoURL).map((item) => item.photoURL),
        [members]
    ) as string[];

    return (
        <TouchableOpacity style={styles.container}>
            <View
                style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                }}
            >
                <Text style={{ fontSize: 23, color: DROPDOWN_TEXT_2 }}>{label}</Text>
                {type !== 'Personal' ? (
                    <IconImage width={24} name={type === 'public' ? 'public' : 'silent'} />
                ) : (
                    <View />
                )}
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <View
                    style={{
                        flexDirection: 'row',
                        justifyContent: 'flex-end',
                    }}
                >
                    {memberImages.slice(0, Math.min(AVATAR_MAX, memberImages.length)).map((item, idx) => (
                        <Image
                            key={item}
                            style={[
                                styles.img,
                                {
                                    zIndex: memberImages.length - idx,
                                    left: idx !== 0 ? -(10 * idx) : 0,
                                },
                            ]}
                            source={{ uri: item }}
                        />
                    ))}
                    {memberImages.length > 5 ? (
                        <View
                            style={[
                                styles.img,
                                styles.align,
                                {
                                    backgroundColor: BG_TERTIARY,
                                    left: -(9 * Math.min(AVATAR_MAX, memberImages.length)),
                                },
                            ]}
                        >
                            <Text style={{ color: TEXT_PRIMARY }}>+{memberImages.length - AVATAR_MAX}</Text>
                        </View>
                    ) : undefined}
                </View>
                {type === 'personal' ? <IconButton name="person-add" size={30} /> : <View />}
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: TEXT_SECONDARY,
        padding: 10,
        borderRadius: 15,
        marginBottom: 10,
    },
    img: {
        height: 30,
        width: 30,
        position: 'relative',
        borderRadius: 22,
        borderStyle: 'solid',
        borderWidth: 2,
        borderColor: TEXT_SECONDARY,
    },
    align: {
        alignItems: 'center',
        justifyContent: 'center',
    },
});


export default CliqueOption;