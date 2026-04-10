import { ThemedText } from '@/components/themed-text';
import { Ionicons } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useState } from 'react';
import { ActivityIndicator, TouchableOpacity, View, useColorScheme } from 'react-native';
import Animated, { FadeIn, FadeInDown, ZoomIn } from 'react-native-reanimated';

import { AnimatedHeart } from '@/components/AnimatedHeart';
import { DateTimeModal } from '@/components/DateTimeModal';
import { LocationsModal } from '@/components/LocationsModal';
import { SettingsModal } from '@/components/SettingsModal';
import { TimeBox } from '@/components/TimeBox';
import { useAppEngine } from '@/hooks/useAppEngine';
import { useLocationMonitor } from '@/hooks/useLocationMonitor';
import { styles } from './styles';


export default function HomeScreen() {
  const { loading, isAtLocation, isWithPerson, startDate, changeStartDate, activeLocationId, changeActiveLocation } = useLocationMonitor();
  const { timePassed, heartScale, opacityNum } = useAppEngine(startDate);

  const [settingsVisible, setSettingsVisible] = useState(false);
  const [locationsVisible, setLocationsVisible] = useState(false);

  const [showPicker, setShowPicker] = useState(false);
  const [pickerMode, setPickerMode] = useState<'date' | 'time'>('date');
  const [tempDate, setTempDate] = useState<Date>(new Date());

  const colorScheme = useColorScheme();

  const openDatePicker = () => {
    setSettingsVisible(false);
    setTempDate(new Date());
    setPickerMode('date');
    setShowPicker(true);
  };

  const onPickerChange = (event: any, selectedDate?: Date) => {
    if (selectedDate) {
      setTempDate(selectedDate);
    }
  };

  const confirmPicker = () => {
    if (pickerMode === 'date') {
      setPickerMode('time');
    } else {
      setShowPicker(false);
      changeStartDate(tempDate);
    }
  };

  const gradientColors = colorScheme === 'dark'
    ? ['#1A1025', '#3B1C32', '#0F0C29'] as const
    : ['#FFD1DC', '#FFF0F5', '#FDE2E4'] as const;

  const glassBorder = colorScheme === 'dark' ? 'rgba(255, 255, 255, 0.15)' : 'rgba(0, 0, 0, 0.1)';

  const blurTint = colorScheme === 'dark' ? 'dark' : 'light';
  const textColor = colorScheme === 'dark' ? '#fff' : '#2A2A2A';

  const formatNumber = (num: number) => num.toString().padStart(2, '0');

  const formatDate = (date: Date) => {
    const d = formatNumber(date.getDate());
    const m = formatNumber(date.getMonth() + 1);
    const y = date.getFullYear();
    const h = formatNumber(date.getHours());
    const min = formatNumber(date.getMinutes());
    const s = formatNumber(date.getSeconds());
    return `${d}/${m}/${y} ${h}:${min}:${s}`;
  };

  const renderContent = () => {
    if (loading) {
      return (
        <Animated.View entering={FadeIn} style={styles.centerContainer}>
          <ActivityIndicator size="large" color={colorScheme === 'dark' ? '#fff' : '#c31432'} />
          <ThemedText style={[styles.subtitle, { marginTop: 16 }]}>Checando sua localização...</ThemedText>
        </Animated.View>
      );
    }

    if (isAtLocation) {
      return (
        <Animated.View entering={ZoomIn.duration(800).springify()} style={styles.centerContainer}>
          <BlurView intensity={colorScheme === 'dark' ? 30 : 40} tint={blurTint} style={[styles.blurContent, { borderColor: glassBorder }]}>
            <AnimatedHeart scale={heartScale} />
            <ThemedText style={[styles.title, { marginTop: 16, marginBottom: 0 }]}>Vocês estão no local!</ThemedText>
            <ThemedText style={[styles.subtitle, { marginBottom: 0, marginTop: 16 }]}>
              Que o melhor lugar do mundo hoje seja o abraço um do outro, aí mesmo, no cantinho de vocês.
            </ThemedText>
          </BlurView>
        </Animated.View>
      );
    }

    if (isWithPerson) {
      return (
        <Animated.View entering={ZoomIn.duration(800).springify()} style={styles.centerContainer}>
          <BlurView intensity={colorScheme === 'dark' ? 30 : 40} tint={blurTint} style={[styles.blurContent, { borderColor: glassBorder }]}>
            <AnimatedHeart scale={heartScale} />
            <ThemedText style={[styles.title, { marginTop: 16, marginBottom: 0 }]}>Vocês estão juntos!</ThemedText>
            <ThemedText style={[styles.subtitle, { marginBottom: 0, marginTop: 16 }]}>
              Que o mundo lá fora desapareça enquanto vocês mergulham nesse tempo que é só de vocês.
            </ThemedText>
          </BlurView>
        </Animated.View>
      );
    }

    if (!startDate) {
      return (
        <Animated.View entering={FadeIn} style={styles.centerContainer}>
          <ThemedText style={{ opacity: 0.5, fontFamily: 'Inter_400Regular' }}>Aguardando resposta...</ThemedText>
        </Animated.View>
      );
    }

    return (
      <Animated.View entering={FadeInDown.duration(800).springify()} style={styles.centerContainer}>
        <BlurView intensity={colorScheme === 'dark' ? 40 : 50} tint={blurTint} style={[styles.blurContent, { borderColor: glassBorder }]}>
          <AnimatedHeart scale={heartScale} />
          <ThemedText style={[styles.title, { marginTop: 16, marginBottom: 0 }]}>Minha saudade Dela</ThemedText>
          <ThemedText style={[styles.subtitle, { marginTop: 12 }]}>Desde {formatDate(startDate)}</ThemedText>

          <View style={styles.counterContainer}>
            <TimeBox value={timePassed.days} label="Dias" opacitySync={opacityNum} textColor={textColor} />
            <TimeBox value={timePassed.hours} label="Horas" opacitySync={opacityNum} textColor={textColor} />
            <TimeBox value={timePassed.minutes} label="Minutos" opacitySync={opacityNum} textColor={textColor} />
            <TimeBox value={timePassed.seconds} label="Segundos" opacitySync={opacityNum} textColor={textColor} />
          </View>
        </BlurView>
      </Animated.View>
    );
  };

  return (
    <LinearGradient colors={gradientColors} style={styles.container}>
      {renderContent()}

      <TouchableOpacity
        style={styles.settingsButton}
        hitSlop={{ top: 20, bottom: 20, left: 20, right: 20 }}
        onPress={() => setSettingsVisible(true)}
      >
        <Ionicons name="settings-sharp" size={24} color={textColor} style={{ opacity: 0.6 }} />
      </TouchableOpacity>

      <SettingsModal
        visible={settingsVisible}
        onClose={() => setSettingsVisible(false)}
        onOpenLocations={() => setLocationsVisible(true)}
        onOpenDatePicker={openDatePicker}
      />

      <LocationsModal
        visible={locationsVisible}
        onClose={() => setLocationsVisible(false)}
        onChangeLocation={changeActiveLocation}
        activeLocationId={activeLocationId}
      />

      <DateTimeModal
        visible={showPicker}
        onClose={() => setShowPicker(false)}
        pickerMode={pickerMode}
        tempDate={tempDate}
        onPickerChange={onPickerChange}
        onConfirm={confirmPicker}
      />

    </LinearGradient>
  );
}
