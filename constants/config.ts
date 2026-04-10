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

export const TARGET_RADIUS_IN_METERS = 100;