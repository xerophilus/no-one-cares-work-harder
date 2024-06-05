import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity } from 'react-native';
import styles from '@/constants/Styles';
import TextComponent from '../components/TextComponent';
import { useRouter } from 'expo-router';

const NewHabitScreen = () => {
  const [habitName, setHabitName] = useState('');
  const [habitDescription, setHabitDescription] = useState('');
  const [habitTime, setHabitTime] = useState('');
  const router = useRouter();

  const handleSave = () => {
    // Logic to save the new habit
    // Navigate back to the home screen or show a success message
    router.push('/home');
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
      <TextInput
        style={styles.input}
        value={habitTime}
        onChangeText={setHabitTime}
        placeholder="Time"
        placeholderTextColor="#888"
      />
      <TouchableOpacity onPress={handleSave} style={styles.saveButton}>
        <TextComponent style={styles.saveButtonText}>Save</TextComponent>
      </TouchableOpacity>
    </View>
  );
};

export default NewHabitScreen;
