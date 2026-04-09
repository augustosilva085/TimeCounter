import { ThemedText } from '@/components/themed-text';
import { Ionicons } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';
import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useState } from 'react';
import { ActivityIndicator, Modal, StyleSheet, TouchableOpacity, View, useColorScheme } from 'react-native';
import Animated, { FadeIn, FadeInDown, ZoomIn } from 'react-native-reanimated';

import { AnimatedHeart } from '@/components/AnimatedHeart';
import { TimeBox } from '@/components/TimeBox';
import { useAppEngine } from '@/hooks/useAppEngine';
import { AVAILABLE_LOCATIONS, useLocationMonitor } from '@/hooks/useLocationMonitor';

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

      <Modal visible={settingsVisible} transparent animationType="fade">
        <BlurView intensity={colorScheme === 'dark' ? 60 : 80} tint={blurTint} style={styles.modalOverlay}>
          <View style={[styles.modalContent, { backgroundColor: colorScheme === 'dark' ? 'rgba(0,0,0,0.5)' : 'rgba(255,255,255,0.7)' }]}>
            <ThemedText style={styles.modalTitle}>Opções</ThemedText>

            <TouchableOpacity style={styles.modalBtn} onPress={() => { setSettingsVisible(false); setLocationsVisible(true); }}>
              <Ionicons name="location-outline" size={24} color={textColor} />
              <ThemedText style={styles.modalBtnText}>Alterar Localização</ThemedText>
            </TouchableOpacity>

            <TouchableOpacity style={styles.modalBtn} onPress={openDatePicker}>
              <Ionicons name="time-outline" size={24} color={textColor} />
              <ThemedText style={styles.modalBtnText}>Redefinir Horário</ThemedText>
            </TouchableOpacity>

            <TouchableOpacity style={[styles.modalBtn, { marginTop: 24, justifyContent: 'center', backgroundColor: 'transparent', borderWidth: 1, borderColor: 'rgba(255,255,255,0.2)' }]} onPress={() => setSettingsVisible(false)}>
              <ThemedText style={[styles.modalBtnText, { opacity: 0.8 }]}>Fechar</ThemedText>
            </TouchableOpacity>
          </View>
        </BlurView>
      </Modal>

      <Modal visible={locationsVisible} transparent animationType="fade">
        <BlurView intensity={colorScheme === 'dark' ? 60 : 80} tint={blurTint} style={styles.modalOverlay}>
          <View style={[styles.modalContent, { backgroundColor: colorScheme === 'dark' ? 'rgba(0,0,0,0.5)' : 'rgba(255,255,255,0.7)' }]}>
            <ThemedText style={styles.modalTitle}>Escolher Local</ThemedText>

            {AVAILABLE_LOCATIONS.map(loc => (
              <TouchableOpacity
                key={loc.id}
                style={[styles.modalBtn, activeLocationId === loc.id && { backgroundColor: 'rgba(255,255,255,0.2)' }]}
                onPress={() => {
                  changeActiveLocation(loc.id);
                  setLocationsVisible(false);
                }}
              >
                <Ionicons name={activeLocationId === loc.id ? "radio-button-on" : "radio-button-off"} size={24} color={textColor} />
                <ThemedText style={styles.modalBtnText}>{loc.name}</ThemedText>
              </TouchableOpacity>
            ))}

            <TouchableOpacity style={[styles.modalBtn, { marginTop: 24, justifyContent: 'center', backgroundColor: 'transparent', borderWidth: 1, borderColor: 'rgba(255,255,255,0.2)' }]} onPress={() => setLocationsVisible(false)}>
              <ThemedText style={[styles.modalBtnText, { opacity: 0.8 }]}>Voltar</ThemedText>
            </TouchableOpacity>
          </View>
        </BlurView>
      </Modal>

      <Modal visible={showPicker} transparent animationType="fade">
        <BlurView intensity={colorScheme === 'dark' ? 60 : 80} tint={blurTint} style={styles.modalOverlay}>
          <View style={[styles.modalContent, { backgroundColor: colorScheme === 'dark' ? 'rgba(0,0,0,0.5)' : 'rgba(255,255,255,0.7)', alignItems: 'center' }]}>
            <ThemedText style={styles.modalTitle}>
              {pickerMode === 'date' ? 'Escolha a Data' : 'Escolha o Horário'}
            </ThemedText>

            <DateTimePicker
              value={tempDate}
              mode={pickerMode}
              is24Hour={true}
              display="spinner"
              onChange={onPickerChange}
              textColor={colorScheme === 'dark' ? '#fff' : '#000'}
              style={{ width: '100%', height: 200 }}
            />

            <View style={{ flexDirection: 'row', gap: 16, marginTop: 24, width: '100%' }}>
              <TouchableOpacity style={[styles.modalBtn, { flex: 1, justifyContent: 'center', backgroundColor: 'transparent', borderWidth: 1, borderColor: 'rgba(255,255,255,0.2)' }]} onPress={() => setShowPicker(false)}>
                <ThemedText style={[styles.modalBtnText, { opacity: 0.8 }]}>Cancelar</ThemedText>
              </TouchableOpacity>

              <TouchableOpacity style={[styles.modalBtn, { flex: 1, justifyContent: 'center', backgroundColor: 'rgba(255,255,255,0.2)' }]} onPress={confirmPicker}>
                <ThemedText style={styles.modalBtnText}>{pickerMode === 'date' ? 'Avançar' : 'Confirmar'}</ThemedText>
              </TouchableOpacity>
            </View>
          </View>
        </BlurView>
      </Modal>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  blurContent: {
    alignItems: 'center',
    paddingVertical: 56,
    paddingHorizontal: 20,
    marginHorizontal: 20,
    borderRadius: 36,
    overflow: 'hidden',
    borderWidth: 1.5,
  },
  title: {
    fontFamily: 'PlayfairDisplay_700Bold',
    lineHeight: 42,
    fontSize: 24,
    textAlign: 'center',
    textTransform: 'uppercase',
  },
  subtitle: {
    fontFamily: 'Inter_400Regular',
    fontSize: 16,
    opacity: 0.8,
    marginBottom: 36,
    textAlign: 'center',
    fontStyle: 'italic',
  },
  counterContainer: {
    flexDirection: 'row',
    gap: 12,
  },
  settingsButton: {
    position: 'absolute',
    top: 60,
    right: 10,
    zIndex: 10,
    padding: 10,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  modalContent: {
    width: '100%',
    borderRadius: 28,
    padding: 24,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.15)',
  },
  modalTitle: {
    fontFamily: 'PlayfairDisplay_700Bold',
    fontSize: 24,
    textAlign: 'center',
    marginBottom: 24,
  },
  modalBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderRadius: 16,
    marginBottom: 12,
    gap: 16,
    backgroundColor: 'rgba(255,255,255,0.08)'
  },
  modalBtnText: {
    fontFamily: 'Inter_400Regular',
    fontSize: 16,
  },
});
