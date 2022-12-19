import React, { memo } from 'react';
import { View, StyleSheet } from 'react-native';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { TextInput } from '../Input';
import Button from '../Button';
import { TEXT_PRIMARY } from '../../constants/colors';
import { FONT_TEXT_BODY_2 } from '../../constants/fonts';
import toast from '../../hooks/useToast';
import { IClique } from '../../interfaces/clique';
import { CliqueOption } from '../CliqueOption';
import Modal from './Modal';

const schema = Yup.object({
  email: Yup.string().email().required(),
});

const CliqueInvite: React.FC<{
  isOpen: boolean;
  clique: IClique[];
  handleInvite: (email: string) => Promise<void>;
  handleClose: () => void;
}> = ({ handleClose, isOpen, clique, handleInvite }) => {
  const {
    handleSubmit,
    control,
    reset,
    formState: { isSubmitting },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      email: '',
    },
    mode: 'all',
  });
  const onSubmit = (arg: { email: string }) => {
    reset();
    if (!clique[0].members.find((item) => item.email === arg.email)) {
      return handleInvite(arg.email);
    }
    toast({
      type: 'error',
      text2: 'user already exist on clique',
    });
    return undefined;
  };
  return (
    <Modal isVisible={isOpen} handleClose={handleClose}>
      {clique.map((item) => (
        <CliqueOption key={item.id} label={item.type} type={item.type} members={item.members} />
      ))}
      <Controller
        control={control}
        name="email"
        render={({ field: { name, onBlur, onChange, value } }) => (
          <TextInput
            placeholder="Input Email to Invite someone to your clique"
            value={value}
            onChangeText={onChange}
            handleBlur={onBlur}
            key={name}
          />
        )}
      />
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

export default memo(CliqueInvite);
