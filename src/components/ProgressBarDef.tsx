import React, { useMemo } from 'react';
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native';
import * as Progress from 'react-native-progress';
import { BG_SECONDARY, PROGRESS_BAR_2 } from '../constants/colors';

const ProgressBar: React.FC<{
  /**
   * pass in as percentage decimal
   */
  progress?: number;
  /**
   * pass in as progress
   */
  duration?: number;
  addRadius?: boolean;
  style?: StyleProp<ViewStyle>;
}> = ({ duration = 0, progress = 0, addRadius = false, style }) => {
  const position = useMemo(() => {
    const newPosition = progress / duration;
    return newPosition > 0 ? newPosition : 0;
  }, [progress, duration]);

  return (
    <View style={[styles.container, style]}>
      <Progress.Bar
        style={[styles.progressBar, { borderRadius: addRadius ? 10 : 0 }]}
        borderWidth={0}
        borderRadius={0}
        color={PROGRESS_BAR_2}
        width={null}
        progress={position}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  progressBar: {
    backgroundColor: BG_SECONDARY,
    flex: 1,
  },
});

export default ProgressBar;
