import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Haptics from 'expo-haptics';
import * as Location from 'expo-location';
import { useCallback, useEffect, useRef, useState } from 'react';
import { Alert } from 'react-native';

export const AVAILABLE_LOCATIONS = [
  { 
    id: '1', 
    name: process.env.EXPO_PUBLIC_LOCATION_1_NAME || 'Local 1', 
    latitude: Number(process.env.EXPO_PUBLIC_LOCATION_1_LAT) || 0, 
    longitude: Number(process.env.EXPO_PUBLIC_LOCATION_1_LNG) || 0 
  },
  { 
    id: '2', 
    name: process.env.EXPO_PUBLIC_LOCATION_2_NAME || 'Local 2', 
    latitude: Number(process.env.EXPO_PUBLIC_LOCATION_2_LAT) || 0, 
    longitude: Number(process.env.EXPO_PUBLIC_LOCATION_2_LNG) || 0 
  },
];

const TARGET_RADIUS = 100; // metros

function getDistanceFromLatLonInM(lat1: number, lon1: number, lat2: number, lon2: number) {
  const R = 6371000;
  const dLat = (lat2 - lat1) * (Math.PI / 180);
  const dLon = (lon2 - lon1) * (Math.PI / 180);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

export function useLocationMonitor() {
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [loading, setLoading] = useState(true);
  const [isAtLocation, setIsAtLocation] = useState(false);
  const [isWithPerson, setIsWithPerson] = useState(false);
  const [activeLocationId, setActiveLocationId] = useState<string>('1');

  const hasAlertedRef = useRef(false);
  const isAtLocationRef = useRef(false);
  const activeLocationIdRef = useRef<string>('1');

  const loadActiveLocation = async () => {
    try {
      const savedId = await AsyncStorage.getItem('ACTIVE_LOCATION_ID');
      if (savedId) {
        setActiveLocationId(savedId);
        activeLocationIdRef.current = savedId;
      }
    } catch (e) { }
  };

  const changeActiveLocation = useCallback(async (id: string) => {
    try {
      await AsyncStorage.setItem('ACTIVE_LOCATION_ID', id);
      setActiveLocationId(id);
      activeLocationIdRef.current = id;
    } catch (e) { }
  }, []);

  const changeStartDate = useCallback(async (date: Date) => {
    try {
      await AsyncStorage.setItem('START_DATE', date.toISOString());
      setStartDate(date);
    } catch (e) { }
  }, []);

  useEffect(() => {
    let locationSubscription: Location.LocationSubscription | null = null;

    const initApp = async () => {
      try {
        await loadActiveLocation();

        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          Alert.alert('Aviso', 'O aplicativo precisa da localização para funcionar.');
          setLoading(false);
          return;
        }

        locationSubscription = await Location.watchPositionAsync(
          {
            accuracy: Location.Accuracy.Balanced,
            distanceInterval: 10,
            timeInterval: 5000,
          },
          async (location) => {
            const currentTarget = AVAILABLE_LOCATIONS.find(l => l.id === activeLocationIdRef.current) || AVAILABLE_LOCATIONS[0];

            const distance = getDistanceFromLatLonInM(
              location.coords.latitude,
              location.coords.longitude,
              currentTarget.latitude,
              currentTarget.longitude
            );

            const wasAtLocation = isAtLocationRef.current;

            if (distance <= TARGET_RADIUS) {
              await AsyncStorage.removeItem('START_DATE');
              if (!wasAtLocation) {
                Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
              }
              setIsAtLocation(true);
              isAtLocationRef.current = true;
              setStartDate(null);
              setIsWithPerson(false);
              hasAlertedRef.current = false;
            } else {
              setIsAtLocation(false);
              isAtLocationRef.current = false;
              const savedDateStr = await AsyncStorage.getItem('START_DATE');

              if (savedDateStr) {
                setStartDate(new Date(savedDateStr));
              } else if (!hasAlertedRef.current) {
                hasAlertedRef.current = true;

                Alert.alert(
                  "Você não está no local! 👀",
                  "Mas vem cá... Você está com a pessoa agora?",
                  [
                    {
                      text: "Sim",
                      onPress: () => setIsWithPerson(true)
                    },
                    {
                      text: "Não",
                      onPress: async () => {
                        const now = new Date();
                        await AsyncStorage.setItem('START_DATE', now.toISOString());
                        setStartDate(now);
                        setIsWithPerson(false);
                      }
                    }
                  ]
                );
              }
            }

            setLoading(false);
          }
        );
      } catch (error) {
        Alert.alert('Erro', 'Não foi possível ler seu GPS.');
        setLoading(false);
      }
    };

    initApp();

    return () => {
      if (locationSubscription) {
        locationSubscription.remove();
      }
    };
  }, []);

  return { loading, isAtLocation, isWithPerson, startDate, setStartDate, setIsWithPerson, changeStartDate, activeLocationId, changeActiveLocation };
}
