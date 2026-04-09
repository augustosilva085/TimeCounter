import { useState, useEffect, useRef } from 'react';
import * as Haptics from 'expo-haptics';
import { Easing, useSharedValue, withSequence, withTiming } from 'react-native-reanimated';

export function useAppEngine(startDate: Date | null) {
  const [timePassed, setTimePassed] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const heartScale = useSharedValue(1);
  const opacityNum = useSharedValue(1);

  const lastSecondsRef = useRef(-1);

  useEffect(() => {
    // Orquestra a pulsação sincronizada (Haptic + Visual) a cada segundo
    const interval = setInterval(() => {
      // Haptics "tum-tum" combinando com os picos da animação visual (150ms e 450ms)
      setTimeout(() => Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light), 150);
      setTimeout(() => Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light), 450);

      heartScale.value = withSequence(
        withTiming(1.25, { duration: 150, easing: Easing.out(Easing.ease) }),
        withTiming(1, { duration: 150, easing: Easing.in(Easing.ease) }),
        withTiming(1.25, { duration: 150, easing: Easing.out(Easing.ease) }),
        withTiming(1, { duration: 550, easing: Easing.in(Easing.ease) }) // Total 1000ms
      );

      if (startDate) {
        const now = new Date();
        const difference = now.getTime() - startDate.getTime();

        if (difference > 0) {
          const days = Math.floor(difference / (1000 * 60 * 60 * 24));
          const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
          const minutes = Math.floor((difference / 1000 / 60) % 60);
          const seconds = Math.floor((difference / 1000) % 60);

          if (lastSecondsRef.current !== seconds) {
            opacityNum.value = withSequence(
              withTiming(0.4, { duration: 350 }),
              withTiming(1, { duration: 500 })
            );
            lastSecondsRef.current = seconds;
          }

          setTimePassed({ days, hours, minutes, seconds });
        }
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [startDate, heartScale, opacityNum]);

  return { timePassed, heartScale, opacityNum };
}
