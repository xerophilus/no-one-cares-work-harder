import React, { useEffect, useState } from 'react';
import { View, Modal, StyleSheet, ImageBackground, ScrollView } from 'react-native';
import axios from 'axios';

import styles from '@/constants/Styles';
import TextComponent from '@/components/TextComponent';
import { ActivityIndicator, Button, Icon } from 'react-native-paper';
import { router } from 'expo-router';
import { useFirebase } from '@/context/firebaseContext';
import { signOut } from 'firebase/auth';
import { auth } from '@/context/firebaseConfig';
const HomeScreen = () => {
  const [quote, setQuote] = useState('');
  const [author, setAuthor] = useState('');
  const [completedHabits, setCompletedHabits] = useState(0);
  const [streak, setStreak] = useState(0);
  const [achievements, setAchievements] = useState(0);
  const { user, habits } = useFirebase();

  useEffect(() => {
    axios({
      method: 'get',
      url: 'https://zenquotes.io/api/today',
    })
      .then(res => {
        const { q, a } = res.data[0];
        setQuote(q);
        setAuthor(a);
      })
      .catch(error => {
        console.error("Error fetching quote: ", error);
      });
  }, []);

  useEffect(() => {
    const completed = habits.filter(habit => habit.completed).length;
    const userStreak = habits.reduce((max, habit) => habit.streak > max ? habit.streak : max, 0);
    const userAchievements = habits.reduce((sum, habit) => sum + (habit.achievements || 0), 0);

    setCompletedHabits(completed);
    setStreak(userStreak);
    setAchievements(userAchievements);
  }, [habits]);

  return (
    <ImageBackground source={require('../../assets/images/bg3.png')} style={styles.background}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.header}>
          <TextComponent style={styles.appName}>Rise & Endure</TextComponent>
          <TextComponent style={styles.tagline}>Keep Pushing Forward</TextComponent>
          <Button onPress={() => router.navigate('notifications')} style={styles.notificationIcon}>
            <Icon source="bell" size={24} color="#fff" />
          </Button>
        </View>
        <View style={styles.card}>
          <TextComponent style={styles.cardTitle}>Daily Affirmation</TextComponent>
          <TextComponent style={styles.cardContent}>“{quote}”</TextComponent>
          <TextComponent style={styles.cardContent}>- {author}</TextComponent>
        </View>
        <View style={styles.progressContainer}>
          <TextComponent style={styles.progressTitle}>Today's Progress</TextComponent>
          <TextComponent style={styles.progressContent}>Habits Completed: {completedHabits}</TextComponent>
          <TextComponent style={styles.progressContent}>Streak: {streak} days</TextComponent>
          <TextComponent style={styles.progressContent}>Achievements: {achievements}</TextComponent>
        </View>
        <View style={styles.habitsContainer}>
          <TextComponent style={styles.sectionTitle}>Upcoming Habits</TextComponent>
          {habits.map(habit => (
            <View key={habit.id} style={styles.habitItem}>
              <TextComponent style={styles.habitText}>{habit.name}</TextComponent>
              <TextComponent style={styles.habitTime}>{habit.time}</TextComponent>
            </View>
          ))}
          <Button 
            mode={'contained'}
            onPress={() => router.push('new-habit')}
            style={styles.addButton}
            buttonColor='#FFA500'
          >
            <TextComponent style={styles.addButtonText}>Add New Habit</TextComponent>
          </Button>
        </View>
      </ScrollView>
    </ImageBackground>
  );
};

export default HomeScreen;
