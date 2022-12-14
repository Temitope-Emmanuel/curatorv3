import React from 'react';
import { Text, StyleSheet, TouchableOpacity } from 'react-native';
import { CHIP_TEXT, TEXT_BLACK, TEXT_SECONDARY } from '../constants/colors';
import { CHIP_ROUNDED } from '../constants/spacing';
import IconButton from './IconButton';

const Chips: React.FC<{
  label: string;
  active: boolean;
  onClick?: () => void;
  onCancel?: () => void;
}> = ({ label, active, onClick, onCancel }) => (
	<TouchableOpacity onPress={onClick} disabled={!onClick} style={[styles.container, active && styles.activeBG]}>
		<Text
			numberOfLines={1}
			style={[styles.chipLabel, active ? styles.activeText : { color: CHIP_TEXT }]}
		>
			{label}
		</Text>
		{onCancel && (
			<IconButton
				onPress={onCancel}
				name="close"
				width={20}
				iconColor={TEXT_SECONDARY}
				style={{ borderRadius: 10, marginLeft: 3 }}
				size={20}
			/>
		)}
	</TouchableOpacity>
);

const styles = StyleSheet.create({
	container: {
		borderRadius: CHIP_ROUNDED,
		borderStyle: 'solid',
		borderWidth: 1,
		borderColor: TEXT_SECONDARY,
		paddingVertical: 5,
		paddingHorizontal: 10,
		marginRight: 10,
		marginVertical: 2,
		flexDirection: 'row',
		alignItems: 'center',
		flexWrap: 'nowrap',
	},
	chipLabel: {
		fontSize: 12,
	},
	activeText: {
		color: TEXT_BLACK,
	},
	activeBG: {
		backgroundColor: TEXT_SECONDARY,
	},
});

export default Chips;
