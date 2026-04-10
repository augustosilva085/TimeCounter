import { styles } from "@/app/styles";
import { AVAILABLE_LOCATIONS } from "@/constants/config";
import { Ionicons } from "@expo/vector-icons";
import { BlurView } from "expo-blur";
import { Modal, TouchableOpacity, View, useColorScheme } from "react-native";
import { ThemedText } from "./themed-text";

interface LocationsModalProps {
    visible: boolean;
    onClose: () => void;
    onChangeLocation: (locationId: string) => void;
    activeLocationId: string;
}

export function LocationsModal({ visible, onClose, onChangeLocation, activeLocationId }: LocationsModalProps) {
    const colorScheme = useColorScheme();
    const blurTint = colorScheme === 'dark' ? 'dark' : 'light';
    const textColor = colorScheme === 'dark' ? '#fff' : '#2A2A2A';

    return (
        <Modal visible={visible} transparent animationType="fade">
            <BlurView intensity={colorScheme === 'dark' ? 60 : 80} tint={blurTint} style={styles.modalOverlay}>
                <View style={[styles.modalContent, { backgroundColor: colorScheme === 'dark' ? 'rgba(0,0,0,0.5)' : 'rgba(255,255,255,0.7)' }]}>
                    <ThemedText style={styles.modalTitle}>Escolher Local</ThemedText>

                    {AVAILABLE_LOCATIONS.map(loc => (
                        <TouchableOpacity
                            key={loc.id}
                            style={[styles.modalBtn, activeLocationId === loc.id && { backgroundColor: 'rgba(255,255,255,0.2)' }]}
                            onPress={() => {
                                onChangeLocation(loc.id);
                                onClose();
                            }}
                        >
                            <Ionicons name={activeLocationId === loc.id ? "radio-button-on" : "radio-button-off"} size={24} color={textColor} />
                            <ThemedText style={styles.modalBtnText}>{loc.name}</ThemedText>
                        </TouchableOpacity>
                    ))}

                    <TouchableOpacity style={[styles.modalBtn, { marginTop: 24, justifyContent: 'center', backgroundColor: 'transparent', borderWidth: 1, borderColor: 'rgba(255,255,255,0.2)' }]} onPress={onClose}>
                        <ThemedText style={[styles.modalBtnText, { opacity: 0.8 }]}>Voltar</ThemedText>
                    </TouchableOpacity>
                </View>
            </BlurView>
        </Modal>
    )
}