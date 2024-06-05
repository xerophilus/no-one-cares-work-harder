import { FlatList, TouchableOpacity, View } from 'react-native';
import { Button } from 'react-native-paper';
import TextComponent from '@/components/TextComponent';
import styles from '@/constants/Styles';
import { router } from 'expo-router';
import { useEffect, useState } from 'react';
import * as Notifications from 'expo-notifications';

const NotificationModal = () => {
    const [notifications, setNotifications] = useState([]);

    useEffect(() => {
        const subscription = Notifications.addNotificationReceivedListener(notification => {
            console.log("notification",notification)
            setNotifications(prev => [...prev, notification.request.content]);
          });
      
          return () => {
            subscription.remove();
          };
    })
    return (
        <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
                <TextComponent style={styles.modalTitle}>Notifications</TextComponent>
                <FlatList
                data={notifications}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => (
                    <View style={styles.notificationItem}>
                        <TextComponent style={styles.modalText}>{item.title}</TextComponent>
                        <TextComponent style={styles.modalText}>{item.body}</TextComponent>
                    </View>
                )}
                />
                <TouchableOpacity onPress={() => router.back()} style={styles.closeButton}>
                    <TextComponent style={styles.closeButtonText}>Close</TextComponent>
                </TouchableOpacity>
            </View>
        </View>
    );
}

export default NotificationModal;