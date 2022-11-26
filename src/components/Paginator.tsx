import React, { useRef } from 'react';
import { Animated, StyleSheet, View } from 'react-native';

const Paginator: React.FC<{
  length: number;
  width: number;
  scrollX: Animated.Value;
}> = ({ length, scrollX, width }) => {
  const data = useRef(new Array(length).fill('')).current;

  return (
    <View style={styles.container}>
      {data.map((_, idx) => {
        const inputRange = [(idx - 1) * width, idx * width, (idx + 1) * width];
        const dotWidth = scrollX.interpolate({
          inputRange,
          outputRange: [16, 32, 16],
          extrapolate: 'clamp',
        });
        const opacity = scrollX.interpolate({
          inputRange,
          outputRange: [0.5, 1, 0.5],
          extrapolate: 'clamp',
        });
        // eslint-disable-next-line react/no-array-index-key
        return <Animated.View style={[styles.dot, { width: dotWidth, opacity }]} key={idx} />;
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flexDirection: 'row', justifyContent: 'center' },
  dot: {
    height: 8,
    borderRadius: 10,
    backgroundColor: 'rgba(195, 206, 128, 0.5)',
    marginHorizontal: 4,
  },
});

export default Paginator;
