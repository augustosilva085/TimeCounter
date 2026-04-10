import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
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