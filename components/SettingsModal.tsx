import { styles } from "@/app/styles";
import { Ionicons } from "@expo/vector-icons";
import { BlurView } from "expo-blur";
import { Modal, TouchableOpacity, View, useColorScheme } from "react-native";
import { ThemedText } from "./themed-text";

interface SettingsModalProps {
    visible: boolean;
    onClose: () => void;
    onOpenLocations: () => void;
    onOpenDatePicker: () => void;
}

export function SettingsModal({ visible, onClose, onOpenLocations, onOpenDatePicker }: SettingsModalProps) {
    const colorScheme = useColorScheme();
    const blurTint = colorScheme === 'dark' ? 'dark' : 'light';
    const textColor = colorScheme === 'dark' ? '#fff' : '#2A2A2A';

    return (
        <Modal visible={visible} transparent animationType="fade">
            <BlurView intensity={colorScheme === 'dark' ? 60 : 80} tint={blurTint} style={styles.modalOverlay}>
                <View style={[styles.modalContent, { backgroundColor: colorScheme === 'dark' ? 'rgba(0,0,0,0.5)' : 'rgba(255,255,255,0.7)' }]}>
                    <ThemedText style={styles.modalTitle}>Opções</ThemedText>

                    <TouchableOpacity style={styles.modalBtn} onPress={() => { onClose(); onOpenLocations(); }}>
                        <Ionicons name="location-outline" size={24} color={textColor} />
                        <ThemedText style={styles.modalBtnText}>Alterar Localização</ThemedText>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.modalBtn} onPress={onOpenDatePicker}>
                        <Ionicons name="time-outline" size={24} color={textColor} />
                        <ThemedText style={styles.modalBtnText}>Redefinir Horário</ThemedText>
                    </TouchableOpacity>

                    <TouchableOpacity style={[styles.modalBtn, { marginTop: 24, justifyContent: 'center', backgroundColor: 'transparent', borderWidth: 1, borderColor: 'rgba(255,255,255,0.2)' }]} onPress={onClose}>
                        <ThemedText style={[styles.modalBtnText, { opacity: 0.8 }]}>Fechar</ThemedText>
                    </TouchableOpacity>
                </View>
            </BlurView>
        </Modal>
    )
}