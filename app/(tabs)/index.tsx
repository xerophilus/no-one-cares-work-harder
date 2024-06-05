import React, { useEffect, useState } from 'react';
import { View, Modal, StyleSheet, ImageBackground, ScrollView } from 'react-native';
import axios from 'axios';

import styles from '@/constants/Styles';
import TextComponent from '@/components/TextComponent';
import { Button, Icon } from 'react-native-paper';
import { router } from 'expo-router';
import { useDatabase } from '@/context/databaseContex';

const HomeScreen = () => {
  const [quote, setQuote] = useState('');
  const [author, setAuthor] = useState('');
  const { habits } = useDatabase();

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
          {habits.map((habit) => (
            <View key={habit.id} style={styles.habitItem}>
              <TextComponent style={styles.habitText}>{habit.name}</TextComponent>
              <TextComponent style={styles.habitTime}>{habit.time}</TextComponent>
            </View>
          ))}
        </View>
        <View style={styles.habitsContainer}>
          <TextComponent style={styles.sectionTitle}>Upcoming Habits</TextComponent>
          <View style={styles.habitItem}>
            <TextComponent style={styles.habitText}>Morning Run</TextComponent>
            <TextComponent style={styles.habitTime}>7:00 AM</TextComponent>
          </View>
          <View style={styles.habitItem}>
            <TextComponent style={styles.habitText}>Read a Book</TextComponent>
            <TextComponent style={styles.habitTime}>12:00 PM</TextComponent>
          </View>
          <View style={styles.habitItem}>
            <TextComponent style={styles.habitText}>Meditation</TextComponent>
            <TextComponent style={styles.habitTime}>6:00 PM</TextComponent>
          </View>
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
