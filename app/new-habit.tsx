import React, { useCallback, useState } from 'react';
import { View, TextInput, TouchableOpacity, Platform } from 'react-native';
import { TimePickerModal } from 'react-native-paper-dates';
import { Button } from 'react-native-paper';
import * as Notifications from 'expo-notifications';
import styles from '@/constants/Styles';
import TextComponent from '@/components/TextComponent';
import { router } from 'expo-router';
import { useFirebase } from '@/context/firebaseContext';
import { ThemedText } from '@/components/ThemedText';

const NewHabitScreen = () => {
    const time = new Date();

    const [habitName, setHabitName] = useState('');
    const [habitDescription, setHabitDescription] = useState('');
    const [habitTime, setHabitTime] = useState({hours: time.getHours(), minutes: time.getMinutes()});
    const [visible, setVisible] = useState(false);
    const { addHabit, user } = useFirebase();

    const onDismiss = useCallback(() => {
        setVisible(false)
      }, [setVisible])
    
    const onConfirm = useCallback(
    ({hours, minutes}) => {
        setVisible(false);
        setHabitTime({ hours, minutes });
    },
    [setVisible]
    );
    
    const handleSave = async () => {
        await addHabit({
            userId: user.uid,
            name: habitName,
            description: habitDescription,
            time: `${habitTime.hours}:${habitTime.minutes}`,
            completed: false,
            streak: 0,
            achievements: 0,
            createdAt: new Date(),
        });

        await Notifications.scheduleNotificationAsync({
          content: {
            title: "Time to complete your habit!",
            body: `Don't forget to complete ${habitName} today!`,
          },
          trigger: {
            hour: habitTime.hours,
            minute: habitTime.minutes,
            repeats: true,
          },
        });

        router.back();
    };


  return (
    <View style={styles.container}>
      <TextComponent style={styles.sectionTitle}>New Habit</TextComponent>
      <TextInput
        style={styles.input}
        value={habitName}
        onChangeText={setHabitName}
        placeholder="Habit Name"
        placeholderTextColor="#888"
      />
      <TextInput
        style={styles.input}
        value={habitDescription}
        onChangeText={setHabitDescription}
        placeholder="Habit Description"
        placeholderTextColor="#888"
      />
    <Button onPress={() => setVisible(true)}>
        <ThemedText>Pick a time</ThemedText>
    </Button>
        <TimePickerModal
            visible={visible}
            onDismiss={onDismiss}
            onConfirm={onConfirm}
            hours={time.getHours()}
            minutes={time.getMinutes()}
            defaultInputType='keyboard'
            locale={'en'}
        />
    <TextComponent>Selected Time: {habitTime.hours}:{habitTime.minutes}</TextComponent>
      <TouchableOpacity onPress={handleSave} style={styles.saveButton}>
        <TextComponent style={styles.saveButtonText}>Save</TextComponent>
      </TouchableOpacity>
    </View>
  );
};

export default NewHabitScreen;
