import { styles } from "@/app/styles";
import DateTimePicker from "@react-native-community/datetimepicker";
import { BlurView } from "expo-blur";
import { Modal, TouchableOpacity, View, useColorScheme } from "react-native";
import { ThemedText } from "./themed-text";

interface DateTimeModalProps {
    visible: boolean;
    onClose: () => void;
    pickerMode: 'date' | 'time';
    tempDate: Date;
    onPickerChange: (event: any, selectedDate?: Date) => void;
    onConfirm: () => void;
}

export function DateTimeModal({ visible, onClose, pickerMode, tempDate, onPickerChange, onConfirm }: DateTimeModalProps) {
    const colorScheme = useColorScheme();
    const blurTint = colorScheme === 'dark' ? 'dark' : 'light';

    return (
        <Modal visible={visible} transparent animationType="fade">
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
                        <TouchableOpacity style={[styles.modalBtn, { flex: 1, justifyContent: 'center', backgroundColor: 'transparent', borderWidth: 1, borderColor: 'rgba(255,255,255,0.2)' }]} onPress={onClose}>
                            <ThemedText style={[styles.modalBtnText, { opacity: 0.8 }]}>Cancelar</ThemedText>
                        </TouchableOpacity>

                        <TouchableOpacity style={[styles.modalBtn, { flex: 1, justifyContent: 'center', backgroundColor: 'rgba(255,255,255,0.2)' }]} onPress={onConfirm}>
                            <ThemedText style={styles.modalBtnText}>{pickerMode === 'date' ? 'Avançar' : 'Confirmar'}</ThemedText>
                        </TouchableOpacity>
                    </View>
                </View>
            </BlurView>
        </Modal>
    )
}