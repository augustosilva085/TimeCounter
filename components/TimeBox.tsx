import React from 'react';
import { StyleSheet, View } from 'react-native';
import { ThemedText } from '@/components/themed-text';
import Animated, { SharedValue, useAnimatedStyle } from 'react-native-reanimated';

interface Props {
  value: number;
  label: string;
  opacitySync: SharedValue<number>;
  textColor: string;
}

export const TimeBox = ({ value, label, opacitySync, textColor }: Props) => {
  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacitySync.value,
  }));

  const formattedValue = value.toString().padStart(2, '0');

  return (
    <View style={styles.timeBox}>
      <Animated.View style={animatedStyle}>
        <ThemedText style={[styles.number, { color: textColor }]}>
          {formattedValue}
        </ThemedText>
      </Animated.View>
      <ThemedText style={styles.label}>{label}</ThemedText>
    </View>
  );
};

const styles = StyleSheet.create({
  timeBox: {
    alignItems: 'center',
    minWidth: 70,
  },
  number: {
    fontFamily: 'PlayfairDisplay_700Bold',
    fontSize: 40,
    lineHeight: 48,
    fontVariant: ['tabular-nums'],
    includeFontPadding: false,
  },
  label: {
    fontFamily: 'Inter_400Regular',
    fontSize: 12,
    opacity: 0.8,
    marginTop: 8,
    textTransform: 'uppercase',
    letterSpacing: 1.5,
  },
});
