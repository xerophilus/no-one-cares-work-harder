import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ImageBackground, ScrollView } from 'react-native';

const ChallengesScreen = () => {
  
  return (
    <ImageBackground source={require('../../assets/images/bg3.png')} style={styles.background}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.header}>
          <Text style={styles.screenTitle}>Challenges</Text>
          <View style={styles.headerButtons}>
            <TouchableOpacity style={styles.headerButton}>
              <Text style={styles.headerButtonText}>Join</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.headerButton}>
              <Text style={styles.headerButtonText}>Create</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.challengeList}>
          <Text style={styles.sectionTitle}>Current Challenges</Text>
          <View style={styles.challengeItem}>
            <Text style={styles.challengeTitle}>30-Day Fitness Challenge</Text>
            <Text style={styles.challengeDetails}>Progress: 10/30 days</Text>
            <Text style={styles.challengeDetails}>Participants: 150</Text>
          </View>
          <View style={styles.challengeItem}>
            <Text style={styles.challengeTitle}>Meditation Challenge</Text>
            <Text style={styles.challengeDetails}>Progress: 5/7 days</Text>
            <Text style={styles.challengeDetails}>Participants: 50</Text>
          </View>
        </View>
      </ScrollView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: 'auto'
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    width: '100%',
    alignItems: 'center',
    marginVertical: 20,
  },
  screenTitle: {
    fontSize: 36,
    fontFamily: 'Oswald-Bold',
    color: '#fff',
    textAlign: 'center',
  },
  headerButtons: {
    flexDirection: 'row',
    marginTop: 10,
  },
  headerButton: {
    marginHorizontal: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#FFA500',
    borderRadius: 25,
  },
  headerButtonText: {
    fontSize: 16,
    color: '#fff',
    fontWeight: 'bold',
  },
  challengeList: {
    width: '90%',
    padding: 20,
    backgroundColor: '#444',
    borderRadius: 10,
    marginVertical: 10,
    alignItems: 'center',
  },
  sectionTitle: {
    fontSize: 24,
    color: '#FFA500',
    marginBottom: 10,
  },
  challengeItem: {
    width: '100%',
    padding: 15,
    backgroundColor: '#555',
    borderRadius: 10,
    marginVertical: 10,
  },
  challengeTitle: {
    fontSize: 20,
    color: '#fff',
    marginBottom: 5,
  },
  challengeDetails: {
    fontSize: 16,
    color: '#ccc',
  },
});

export default ChallengesScreen;
