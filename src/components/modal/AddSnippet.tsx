import React, { useEffect } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm, Controller } from 'react-hook-form';
import * as Yup from 'yup';
import { TextInput, TimeInput } from '../Input';
import Button from '../Button';
import { TEXT_PRIMARY } from '../../constants/colors';
import { FONT_TEXT_BODY_2 } from '../../constants/fonts';
import { NewSnippet } from '../../interfaces/snippet';
import Modal from './Modal';

const schema = Yup.object({
  description: Yup.string().required(),
});

interface AddSnippetProps {
  toggleShowSnippetModal: () => void;
  showAddSnippetModal: boolean;
  progress: number;
  formattedStartProgress: string;
  formattedEndProgress: string;
  handleSubmit: (arg: NewSnippet) => void;
}

const AddSnippetModal: React.FC<AddSnippetProps> = ({
  showAddSnippetModal,
  toggleShowSnippetModal,
  formattedStartProgress,
  formattedEndProgress,
  handleSubmit,
  progress,
}) => {
  const {
    control,
    setValue,
    setError,
    handleSubmit: onSubmit,
    reset,
  } = useForm<NewSnippet>({
    resolver: yupResolver(schema),
    defaultValues: {
      description: '',
      position: progress,
      startTime: {
        Hour: '00',
        Minute: '00',
        Second: '00',
      },
      endTime: {
        Hour: '00',
        Minute: '00',
        Second: '00',
      },
    },
  });

  useEffect(() => {
    const splitProgress = formattedStartProgress.split(':');
    setValue('startTime.Hour', splitProgress[0]);
    setValue('startTime.Minute', splitProgress[1]);
    setValue('startTime.Second', splitProgress[2]);
    const splitEndProgress = formattedEndProgress.split(':');
    setValue('endTime.Hour', splitEndProgress[0]);
    setValue('endTime.Minute', splitEndProgress[1]);
    setValue('endTime.Second', splitEndProgress[2]);
  }, [setValue]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => reset, []);

  const handleSetError = (time: 'start' | 'end') => (e: string) => {
    setError(time === 'start' ? 'startTime' : 'endTime', {
      message: `invalid input for ${time}: ${e}`,
    });
  };

  return (
    <Modal isVisible={showAddSnippetModal} handleClose={toggleShowSnippetModal}>
      <Text
        style={{
          textAlign: 'center',
          color: TEXT_PRIMARY,
          fontSize: 16,
        }}
      >
        Add Snippet
      </Text>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginVertical: 15,
        }}
      >
        <Controller
          control={control}
          rules={{
            required: true,
          }}
          name="startTime"
          render={({ field: { onChange, value, name } }) => (
            <TimeInput
              setError={handleSetError('start')}
              label="Start Time"
              name={name}
              handleChange={onChange}
              value={value}
            />
          )}
        />
        <Controller
          control={control}
          rules={{
            required: true,
          }}
          name="endTime"
          render={({ field: { onChange, value, name } }) => (
            <TimeInput
              setError={handleSetError('end')}
              style={{
                alignItems: 'flex-end',
              }}
              label="End Time"
              name={name}
              handleChange={onChange}
              value={value}
            />
          )}
        />
      </View>
      <Controller
        control={control}
        name="description"
        render={({ field: { onChange, value, onBlur, name } }) => (
          <TextInput
            placeholder="Add snippet description"
            value={value}
            onChangeText={onChange}
            handleBlur={onBlur}
            key={name}
          />
        )}
      />
      <View style={styles.buttonContainer}>
        <Button textOnly onPress={onSubmit(handleSubmit)} label="Save" />
        <Button textOnly onPress={toggleShowSnippetModal} label="Cancel" />
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

export default AddSnippetModal;
