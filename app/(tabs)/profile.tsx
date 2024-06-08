import { useFirebase } from '@/context/firebaseContext';
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, ScrollView } from 'react-native';
import { TextInput, Button } from 'react-native-paper';

const ProfileScreen = () => {
  const [name, setName] = useState('John Doe');
  const [email, setEmail] = useState('john.doe@example.com');
  const [goal, setGoal] = useState('Lose 5 kg in 2 months');
  const [editable, setEditable] = useState(false);

  const { logout } = useFirebase();

  const handleSave = () => {
    console.log("save")
    setEditable(false)
  }

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.header}>
        <Image source={require('../../assets/images/profile-pic1.png')} style={styles.profilePic} />
        <Text style={styles.userName}>{name}</Text>
      </View>
      <View style={styles.profileInfo}>
        <Text style={styles.sectionTitle}>Profile Information</Text>
        <TextInput
          label={<Text style={{color: editable ? '#FFA500' : '#888'}}>Name</Text>}
          style={styles.input}
          value={name}
          onChangeText={setName}
          placeholder="Name"
          placeholderTextColor="#888"
          disabled={!editable}
          activeUnderlineColor="#FFA500"
          textColor={editable ? '#fff' : '#888'}
        />
        <TextInput
          label={<Text style={{color: editable ? '#FFA500' : '#888'}}>Email</Text>}
          style={styles.input}
          value={email}
          onChangeText={setEmail}
          placeholder="Email"
          placeholderTextColor="#888"
          disabled={!editable}
          activeUnderlineColor="#FFA500"
          textColor={editable ? '#fff' : '#888'}
        />
        <TextInput
          label={<Text style={{color: editable ? '#FFA500' : '#888'}}>Goals</Text>}
          style={styles.input}
          value={goal}
          onChangeText={setGoal}
          placeholder="Goal"
          placeholderTextColor="#888"
          disabled={!editable}
          activeUnderlineColor="#FFA500"
          textColor={editable ? '#fff' : '#888'}
        />
        <View style={{width: '100%', flexDirection: 'row', justifyContent: 'space-between'}}>
          <Button 
            mode='contained'
            disabled={editable} 
            style={styles.saveButton} 
            onPress={() => setEditable(!editable)}
            buttonColor='#FFA500'
            contentStyle={{width: '100%'}}
          >
            <Text style={styles.saveButtonText}>Edit</Text>
          </Button>
          <Button
            mode='contained'
            disabled={!editable}
            style={styles.saveButton} 
            onPress={handleSave}
            buttonColor='#FFA500'
          >
            <Text style={styles.saveButtonText}>Save</Text>
          </Button>
        </View>
      </View>
      <View style={styles.progressOverview}>
        <Text style={styles.sectionTitle}>Progress Overview</Text>
        <Text style={styles.progressText}>Habits Completed: 25/30</Text>
        <Text style={styles.progressText}>Streak: 10 days</Text>
        <Text style={styles.progressText}>Achievements: 5</Text>
      </View>
      <View style={styles.settings}>
        <Text style={styles.sectionTitle}>Settings</Text>
        <TouchableOpacity style={styles.settingItem}>
          <Text style={styles.settingText}>Privacy Settings</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.settingItem}>
          <Text style={styles.settingText}>App Preferences</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.settingItem}>
          <Text style={styles.settingText}>Notifications</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.settingItem} onPress={() => logout()}>
          <Text style={styles.settingText}>Logout</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    backgroundColor: '#333',
    alignItems: 'center',
    paddingVertical: 20,
  },
  header: {
    width: '100%',
    alignItems: 'center',
    marginBottom: 20,
  },
  profilePic: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  userName: {
    fontSize: 24,
    fontFamily: 'Oswald-Bold',
    color: '#fff',
  },
  profileInfo: {
    width: '90%',
    padding: 20,
    backgroundColor: '#444',
    borderRadius: 10,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 24,
    color: '#FFA500',
    marginBottom: 10,
  },
  input: {
    backgroundColor: '#555',
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,
    padding: 10,
    marginVertical: 10,
    color: '#fff',
  },
  saveButton: {
    borderRadius: 25,
    padding: 5,
    marginTop: 10,
    flex: .5
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  progressOverview: {
    width: '90%',
    padding: 20,
    backgroundColor: '#444',
    borderRadius: 10,
    marginBottom: 20,
  },
  progressText: {
    fontSize: 18,
    color: '#fff',
    marginVertical: 5,
  },
  settings: {
    width: '90%',
    padding: 20,
    backgroundColor: '#444',
    borderRadius: 10,
  },
  settingItem: {
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#555',
  },
  settingText: {
    fontSize: 18,
    color: '#fff',
  },
});

export default ProfileScreen;