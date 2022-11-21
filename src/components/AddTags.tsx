import React, { useCallback } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { StyleSheet, View } from 'react-native';
import { BG_SECONDARY, TEXT_SECONDARY } from '../constants/colors';
import { CHIP_ROUNDED } from '../constants/spacing';
import { useAppDispatch } from '../hooks/redux';
import useToggle from '../hooks/useToggle';
import { addTags } from '../store/Media';
import IconButton from './IconButton';
import { TextInput } from './Input';

const AddTags = ({onInitialPress}:{onInitialPress?: () => void}) => {
	const dispatch = useAppDispatch();
	const [showAdd, toggleShowAdd] = useToggle();
	const { control, handleSubmit, reset, watch } = useForm({
		defaultValues: {
			newChips: '',
		},
	});

	const newChips = watch('newChips');

	const onSubmit = useCallback((arg: { newChips: string }) => {
		dispatch(addTags(arg.newChips.toLocaleLowerCase().trim()));
		reset();
		toggleShowAdd();
	}, [dispatch, reset, toggleShowAdd]);

	const initialShow = useCallback(() => {
		if(onInitialPress) onInitialPress();
		toggleShowAdd();
	}, [onInitialPress, toggleShowAdd])

	return (
		<View style={styles.container}>
			{showAdd && (
				<Controller
					control={control}
					name="newChips"
					render={({ field: { name, value, onChange } }) => (
						<TextInput
							style={{ marginTop: 0, height: 20, maxWidth: 75, marginHorizontal: 5 }}
							value={value}
							onChangeText={onChange}
							key={name}
						/>
					)}
				/>
			)}
			<IconButton
				onPress={showAdd && newChips.length ? handleSubmit(onSubmit) : initialShow}
				name={showAdd ? (newChips.length ? 'check' : 'close') : 'add'}
				size={20}
				width={20}
				style={{ backgroundColor: BG_SECONDARY, borderRadius: 10 }}
			/>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		borderRadius: CHIP_ROUNDED,
		borderColor: TEXT_SECONDARY,
		padding: 2,
		borderStyle: 'solid',
		borderWidth: 1,
		flexDirection: 'row',
		alignItems: 'center'
	},
});

export default AddTags;
