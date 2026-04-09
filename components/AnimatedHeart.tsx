import React from 'react';
import Animated, { SharedValue, useAnimatedStyle } from 'react-native-reanimated';

interface Props {
  scale: SharedValue<number>;
  size?: number;
}

export const AnimatedHeart = ({ scale, size = 64 }: Props) => {
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  return (
    <Animated.Text style={[animatedStyle, { fontSize: size, lineHeight: size + 8 }]}>
      🤍
    </Animated.Text>
  );
};
