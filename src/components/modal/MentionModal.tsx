import React, { memo, useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import Button from '../Button';
import { TEXT_PRIMARY } from '../../constants/colors';
import { FONT_TEXT_BODY_2 } from '../../constants/fonts';
import toast from '../../hooks/useToast';
import Modal from './Modal';
import Chips from '../Chips';

const schema = Yup.object({
    email: Yup.string().email().required(),
});

const MentionModal: React.FC<{
    isOpen: boolean;
    handleClose: () => void;
}> = ({ handleClose, isOpen }) => {
    const [activeMention, setActiveMention] = useState<string[]>([]);
    const {
        handleSubmit,
        reset,
        formState: { isSubmitting },
    } = useForm({
        resolver: yupResolver(schema),
        defaultValues: {
            email: '',
        },
        mode: 'all',
    })
    const onSubmit = (arg: { email: string }) => {
        reset();
        toast({
            type: 'error',
            text2: 'user already exist on clique',
        });
        return undefined;
    };
    const addToMention = (arg: string) => {
        setActiveMention(prevSt => [...prevSt, arg])
    }
    return (
        <Modal isVisible={isOpen} handleClose={handleClose}>
            <Text style={{
                fontWeight: '400',
                fontSize: 15,
                color: '#B2B4AA'
            }}>You can tag someone that is already on the audio</Text>
            <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
                {['Tope Ojo', 'Ayomide Animashaun', 'Temitayo Ojo', 'Temitayo Ojo', 'Mama', 'Dada'].map(tag => (
                    <Chips onClick={() => addToMention(tag)} active={activeMention.includes(tag)} showAvatar label={tag} key={tag} />
                ))}
            </View>
            <View style={styles.buttonContainer}>
                <Button onPress={handleSubmit(onSubmit)} disabled={isSubmitting} textOnly label="Save" />
                <Button onPress={handleClose} disabled={isSubmitting} textOnly label="Cancel" />
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    addAudioTitle: {
        color: TEXT_PRIMARY,
        fontSize: FONT_TEXT_BODY_2,
        marginTop: 20,
        marginBottom: 15,
    },
    tagContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    buttonContainer: { flexDirection: 'row', marginTop: 20 },
});

export default memo(MentionModal);
