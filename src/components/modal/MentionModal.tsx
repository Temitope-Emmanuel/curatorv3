import React, { memo, useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import Button from '../Button';
import { TEXT_PRIMARY } from '../../constants/colors';
import { FONT_TEXT_BODY_2 } from '../../constants/fonts';
import Modal from './Modal';
import Chips from '../Chips';
import { ICliqueMember } from '../../interfaces/clique';


const MentionModal: React.FC<{
    isOpen: boolean;
    handleClose: () => void;
    currentMembers: ICliqueMember[];
    onAccept: (arg: string[]) => void;
}> = ({ handleClose, isOpen, currentMembers, onAccept }) => {
    const [activeMention, setActiveMention] = useState<string[]>([]);
    const onSubmit = () => {
        onAccept(activeMention);
        setActiveMention([]);
    };
    const addToMention = (arg: string) => {
        if(activeMention.includes(arg)){
            setActiveMention(prevSt => prevSt.filter(item => item !== arg))
        }else{
            setActiveMention(prevSt => [...prevSt, arg])
        }
    }
    return (
        <Modal isVisible={isOpen} handleClose={handleClose}>
            <Text style={styles.mentionText}>You can tag someone that is already on the audio</Text>
            <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
                {currentMembers.map(member => (
                    <Chips onClick={() => addToMention(member.uid)} active={activeMention.includes(member.uid)}
                     avatarImg={member.photoURL || ''} label={member.displayName || ''} key={member.uid } />
                ))}
            </View>
            <View style={styles.buttonContainer}>
                <Button onPress={onSubmit} textOnly label="Save" />
                <Button onPress={handleClose} textOnly label="Cancel" />
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    mentionText: {
        fontWeight: '400',
        fontSize: 15,
        color: '#B2B4AA'
    },
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
