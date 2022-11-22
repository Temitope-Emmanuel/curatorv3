import React, { useEffect } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { useForm, Controller } from 'react-hook-form';
import { TextInput, TimeInput } from '../Input';
import Button from '../Button';
import { TEXT_PRIMARY } from '../../constants/colors';
import { FONT_TEXT_BODY_2 } from '../../constants/fonts';
import { NewNote } from '../../interfaces/note';
import Modal from './Modal';

const schema = Yup.object({
  description: Yup.string().required(),
});

interface AddNoteProps {
  toggleShowAddNoteModal: () => void;
  showAddNoteModal: boolean;
  progress: number;
  formattedProgress: string;
  handleSubmit: (arg: NewNote) => void;
}

const AddNote: React.FC<AddNoteProps> = ({
  showAddNoteModal,
  toggleShowAddNoteModal,
  progress,
  formattedProgress,
  handleSubmit,
}) => {
  const {
    control,
    setValue,
    setError,
    handleSubmit: onSubmit,
    reset,
  } = useForm<NewNote>({
    resolver: yupResolver(schema),
    defaultValues: {
      description: '',
      position: progress,
      time: {
        Hour: '00',
        Minute: '00',
        Second: '00',
      },
    },
  });

  const handleError = (e: string) => {
    setError('time', {
      message: e,
      type: 'maxLength',
    });
  };

  useEffect(() => {
    const splitProgress = formattedProgress.split(':');
    setValue('time.Hour', splitProgress[0]);
    setValue('time.Minute', splitProgress[1]);
    setValue('time.Second', splitProgress[2]);
  }, [formattedProgress, setValue]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => reset, []);

  return (
    <Modal isVisible={showAddNoteModal} handleClose={toggleShowAddNoteModal}>
      <Text
        style={{
          textAlign: 'center',
          color: TEXT_PRIMARY,
          fontSize: 16,
        }}
      >
        Add Note
      </Text>
      <Controller
        control={control}
        rules={{
          required: true,
        }}
        name="time"
        render={({ field: { onChange, value, name } }) => (
          <TimeInput
            setError={handleError}
            label="Timestamp"
            name={name}
            handleChange={onChange}
            value={value}
          />
        )}
      />
      <Controller
        control={control}
        name="description"
        render={({ field: { name, onBlur, onChange, value } }) => (
          <TextInput
            placeholder="Description"
            value={value}
            onChangeText={onChange}
            handleBlur={onBlur}
            key={name}
            numberOfLines={4}
          />
        )}
      />
      <View style={styles.buttonContainer}>
        <Button textOnly onPress={onSubmit(handleSubmit)} label="Save" />
        <Button textOnly onPress={toggleShowAddNoteModal} label="Cancel" />
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  AddSnippetModalTitle: {
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

export default AddNote;
