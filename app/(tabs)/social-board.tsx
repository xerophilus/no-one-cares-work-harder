import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, ScrollView } from 'react-native';

const SocialBoardScreen = () => {

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.screenTitle}>Social Board</Text>
      </View>
      <View style={styles.searchBarContainer}>
        <TextInput style={styles.searchBar} placeholder="Search..." placeholderTextColor="#888" />
      </View>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.post}>
          <Image source={require('../../assets/images/profile-pic1.png')} style={styles.profilePic} />
          <View style={styles.postContent}>
            <Text style={styles.userName}>John Doe</Text>
            <Text style={styles.userDescription}>Father of 2, full-time job</Text>
            <Text style={styles.userStatus}>Completed 5/7 habits today!</Text>
            <View style={styles.reactions}>
              <Text style={styles.reaction}>❤️ 12</Text>
              <Text style={styles.reaction}>💬 4</Text>
            </View>
          </View>
        </View>
        <View style={styles.post}>
          <Image source={require('../../assets/images/profile-pic2.png')} style={styles.profilePic} />
          <View style={styles.postContent}>
            <Text style={styles.userName}>Jane Smith</Text>
            <Text style={styles.userDescription}>Mother of 1, part-time worker</Text>
            <Text style={styles.userStatus}>Completed 6/7 habits today!</Text>
            <View style={styles.reactions}>
              <Text style={styles.reaction}>❤️ 20</Text>
              <Text style={styles.reaction}>💬 8</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#333',
  },
  header: {
    padding: 20,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#444',
  },
  screenTitle: {
    fontSize: 36,
    fontFamily: 'Oswald-Bold',
    color: '#fff',
  },
  searchBarContainer: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#444',
  },
  searchBar: {
    backgroundColor: '#555',
    borderRadius: 25,
    padding: 10,
    color: '#fff',
  },
  scrollContainer: {
    padding: 20,
  },
  post: {
    flexDirection: 'row',
    backgroundColor: '#444',
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
  },
  profilePic: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 15,
  },
  postContent: {
    flex: 1,
  },
  userName: {
    fontSize: 18,
    color: '#FFA500',
    fontWeight: 'bold',
  },
  userDescription: {
    fontSize: 14,
    color: '#ccc',
  },
  userStatus: {
    fontSize: 16,
    color: '#fff',
    marginVertical: 5,
  },
  reactions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '30%',
  },
  reaction: {
    fontSize: 16,
    color: '#FFA500',
  },
});

export default SocialBoardScreen;
