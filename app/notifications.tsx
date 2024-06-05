import { View } from 'react-native';
import { Button } from 'react-native-paper';
import TextComponent from '@/components/TextComponent';
import styles from '@/constants/Styles';
import { router } from 'expo-router';

const NotificationModal = () => {

    return (
    <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
        <TextComponent style={styles.modalTitle}>Notifications</TextComponent>
        <TextComponent style={styles.modalText}>No new notifications</TextComponent>
        <Button onPress={() => router.back()} style={styles.closeButton}>
            <TextComponent style={styles.closeButtonText}>Close</TextComponent>
        </Button>
        </View>
    </View>
    );
}

export default NotificationModal;