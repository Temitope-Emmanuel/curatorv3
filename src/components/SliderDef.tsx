import React, { memo } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import SliderNative from '@react-native-community/slider';
import { PROGRESS_BAR_BG, TEXT_PRIMARY, BG_SECONDARY } from '../constants/colors';
import useTimeFormatter from '../hooks/useTimeFormatter';

export const Slider: React.FC<{
  position: number;
  handleSeek: (seekTo: number) => void;
  duration: number;
  disabled?: boolean
}> = ({ duration, position, handleSeek, disabled = false }) => {
	const formatTime = useTimeFormatter();

	return (
		<View style={styles.container}>
			{/* <SliderNative
				onValueChange={!disabled ? handleSeek : undefined}
				disabled={disabled}
				value={position}
				style={{ height: 40 }}
				minimumValue={0}
				maximumValue={duration}
				minimumTrackTintColor={PROGRESS_BAR_BG}
				maximumTrackTintColor={BG_SECONDARY}
			/> */}
			<View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
				<Text style={styles.text}>{formatTime.current?.getMMSSFromMillis(position)}</Text>
				<Text style={styles.text}>{formatTime.current?.getMMSSFromMillis(duration)}</Text>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		width: '100%',
	},
	text: {
		marginHorizontal: 2,
		color: TEXT_PRIMARY,
	},
});

export default memo(Slider);
