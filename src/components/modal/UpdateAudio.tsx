import React, { forwardRef, useEffect, useImperativeHandle, useState } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { Controller, useForm } from 'react-hook-form';
import Chips from '../Chips';
import { TextInput } from '../Input';
import Button from '../Button';
import { TEXT_PRIMARY } from '../../constants/colors';
import { FONT_TEXT_BODY_2 } from '../../constants/fonts';
import { defaultAudio, IMedia } from '../../interfaces/Media';
import { ITag } from '../../interfaces/Tag';
import { useAppSelector } from '../../hooks/redux';
import { getTags } from '../../store/Media';
import AddTags from '../AddTags';
import Modal from './Modal';
import { ModalRef } from '../../interfaces/modal';
import useToggle from '../../hooks/useToggle';

interface UpdateAudioProps {
  handleSubmit: (arg: IMedia) => void;
}

export interface UpdateAudioRef extends ModalRef {
  setMedia: (arg: IMedia) => void;
}

const UpdateAudio = forwardRef<UpdateAudioRef, UpdateAudioProps>(({
  handleSubmit: propSubmit,
}, ref) => {
  const defaultTags = useAppSelector(getTags);
  const [tags, setTags] = useState<ITag[]>([]);
  const [updateMedia, setUpdateMedia] = useState<IMedia>(defaultAudio);
  const [showModal, toggleShowModal, setShowModal] = useToggle();

  const { control, setValue, getValues, trigger, reset } = useForm({
    defaultValues: {
      description: updateMedia.description,
      author: updateMedia.author,
    },
    context: 'onChange',
    reValidateMode: 'onChange',
  });

  useImperativeHandle(ref, () => ({
    isOpen: showModal,
    toggle: toggleShowModal,
    toggleClose: () => setShowModal(false),
    toggleOpen: () => setShowModal(true),
    setMedia: setUpdateMedia
  }))
  useEffect(() => {
    if (updateMedia.tags?.length) {
      const newTags = defaultTags.map((item) => ({
        value: item,
        selected: !!updateMedia.tags?.find((defaultTag) => item === defaultTag),
      }));
      setTags(newTags);
    } else {
      const newTags = defaultTags.map((item) => ({
        value: item,
        selected: false,
      }));
      setTags(newTags);
    }
  }, [updateMedia.tags, defaultTags]);

  useEffect(() => {
    setValue('author', updateMedia.author);
    setValue('description', updateMedia.description)
  }, [updateMedia, setValue]);

  const handleSelectTag = (label: string) => {
    const filteredTags = [...tags];
    const foundTagIdx = filteredTags.findIndex((item) => item.value === label);
    if (foundTagIdx > -1) {
      filteredTags.splice(foundTagIdx, 1, {
        ...filteredTags[foundTagIdx],
        selected: !filteredTags[foundTagIdx].selected,
      });
      setTags(filteredTags);
    }
  };

  const handleSubmit = async () => {
    const isValid = await trigger();
    if (isValid) {
      const { author, description } = await getValues();
      reset();
      const { id, url, title, owner, createdAt } = updateMedia;
      propSubmit({
        id,
        url,
        title,
        author,
        owner,
        createdAt,
        description,
        isOwner: true,
        tags: tags.filter((item) => item.selected).map((item) => item.value),
      });
      toggleShowModal();
    }
  };

  const onClose = () => {
    reset();
    setTags(
      tags.map((item) => ({
        value: item.value,
        selected: false,
      }))
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }

  return (
    <Modal isVisible={showModal} handleClose={toggleShowModal} onClose={onClose}>
      <Controller
        control={control}
        rules={{
          required: true,
        }}
        name="author"
        render={({ field: { onBlur, onChange, value } }) => (
          <TextInput
            placeholder="Add Name"
            value={value}
            onChangeText={onChange}
            handleBlur={onBlur}
          />
        )}
      />
      <Text style={styles.addAudioTitle}>What is this audio about:</Text>
      <View style={styles.tagContainer}>
        {tags.map((item) => (
          <Chips
            onClick={() => handleSelectTag(item.value)}
            label={item.value}
            key={item.value}
            active={item.selected}
          />
        ))}
        <AddTags />
      </View>
      <Controller
        control={control}
        rules={{
          required: true,
        }}
        name="description"
        render={({ field: { onBlur, onChange, value } }) => (
          <TextInput
            placeholder="Add Description"
            value={value}
            onChangeText={onChange}
            handleBlur={onBlur}
            numberOfLines={3}
          />
        )}
      />
      <View style={styles.buttonContainer}>
        <Button onPress={handleSubmit} textOnly label="Save" />
        <Button onPress={toggleShowModal} textOnly label="Cancel" />
      </View>
    </Modal>
  );
});

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

export default UpdateAudio;
