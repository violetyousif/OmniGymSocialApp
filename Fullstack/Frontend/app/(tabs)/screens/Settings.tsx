import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Switch, Image } from 'react-native';

const Settings = () => {
  // States for profile information
  const [isPublic, setIsPublic] = useState(true);
  const [units, setUnits] = useState('Imperial');
  const [name, setName] = useState('Jane Doe');
  const [caption, setCaption] = useState('Fitness Enthusiast | Gym Lover | Stronger Every Day');
  const [profileImage, setProfileImage] = useState('https://via.placeholder.com/150'); // Update as needed

  // States for general information
  const [joined, setJoined] = useState('2018');
  const [age, setAge] = useState(30);
  const [fitnessGoal, setFitnessGoal] = useState('Build Muscle');
  const [wilksScore, setWilksScore] = useState(366);

  // States for metrics
  const [benchPress, setBenchPress] = useState(105);
  const [deadlift, setDeadlift] = useState(220);
  const [runningTime, setRunningTime] = useState('5:30 min/km');
  const [squats, setSquats] = useState(220);

  const togglePublic = () => setIsPublic((prev) => !prev);
  const toggleUnits = () => setUnits(units === 'Imperial' ? 'SI' : 'Imperial');

  return (
    <ScrollView style={styles.container}>
      {/* Profile Header */}
      <View style={styles.header}>
        <Image source={{ uri: profileImage }} style={styles.profileImage} />
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.caption}>{caption}</Text>
      </View>

      {/* Units Converter Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Units Converter</Text>
        <View style={styles.switchRow}>
          <Text style={styles.label}>Current: {units}</Text>
          <Switch value={units === 'SI'} onValueChange={toggleUnits} />
        </View>
      </View>

      {/* Public/Private Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Privacy Settings</Text>
        <View style={styles.switchRow}>
          <Text style={styles.label}>{isPublic ? 'Public' : 'Private'}</Text>
          <Switch value={isPublic} onValueChange={togglePublic} />
        </View>
      </View>

      {/* Edit Profile Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Edit Profile</Text>

        <View style={styles.inputRow}>
          <Text style={styles.label}>Profile Image URL:</Text>
          <TextInput
            style={styles.input}
            value={profileImage}
            onChangeText={setProfileImage}
            placeholder="Enter Image URL"
          />
        </View>

        <View style={styles.inputRow}>
          <Text style={styles.label}>Name:</Text>
          <TextInput
            style={styles.input}
            value={name}
            onChangeText={setName}
            placeholder="Enter your name"
          />
        </View>

        <View style={styles.inputRow}>
          <Text style={styles.label}>Caption:</Text>
          <TextInput
            style={styles.input}
            value={caption}
            onChangeText={setCaption}
            placeholder="Enter your caption"
          />
        </View>

        <View style={styles.inputRow}>
          <Text style={styles.label}>Joined Year:</Text>
          <TextInput
            style={styles.input}
            value={joined}
            onChangeText={setJoined}
            placeholder="Enter joined year"
          />
        </View>

        <View style={styles.inputRow}>
          <Text style={styles.label}>Age:</Text>
          <TextInput
            style={styles.input}
            value={String(age)}
            onChangeText={(text) => setAge(Number(text))}
            placeholder="Enter age"
            keyboardType="numeric"
          />
        </View>

        <View style={styles.inputRow}>
          <Text style={styles.label}>Fitness Goal:</Text>
          <TextInput
            style={styles.input}
            value={fitnessGoal}
            onChangeText={setFitnessGoal}
            placeholder="Enter fitness goal"
          />
        </View>

        <View style={styles.inputRow}>
          <Text style={styles.label}>Wilks Score:</Text>
          <TextInput
            style={styles.input}
            value={String(wilksScore)}
            onChangeText={(text) => setWilksScore(Number(text))}
            placeholder="Enter Wilks Score"
            keyboardType="numeric"
          />
        </View>

        <View style={styles.inputRow}>
          <Text style={styles.label}>Bench Press:</Text>
          <TextInput
            style={styles.input}
            value={String(benchPress)}
            onChangeText={(text) => setBenchPress(Number(text))}
            placeholder="Enter bench press weight"
            keyboardType="numeric"
          />
        </View>

        <View style={styles.inputRow}>
          <Text style={styles.label}>Deadlift:</Text>
          <TextInput
            style={styles.input}
            value={String(deadlift)}
            onChangeText={(text) => setDeadlift(Number(text))}
            placeholder="Enter deadlift weight"
            keyboardType="numeric"
          />
        </View>

        <View style={styles.inputRow}>
          <Text style={styles.label}>Running Time:</Text>
          <TextInput
            style={styles.input}
            value={runningTime}
            onChangeText={setRunningTime}
            placeholder="Enter running time"
          />
        </View>

        <View style={styles.inputRow}>
          <Text style={styles.label}>Squats:</Text>
          <TextInput
            style={styles.input}
            value={String(squats)}
            onChangeText={(text) => setSquats(Number(text))}
            placeholder="Enter squats weight"
            keyboardType="numeric"
          />
        </View>
      </View>

      {/* Save Changes Button */}
      <TouchableOpacity style={styles.button} onPress={() => alert('Profile updated')}>
        <Text style={styles.buttonText}>Save Changes</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f5f5f5',
    flex: 1,
  },
  header: {
    alignItems: 'center',
    backgroundColor: '#ff7f50',
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderColor: '#ccc',
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  caption: {
    fontSize: 14,
    color: '#fff',
  },
  section: {
    marginVertical: 10,
    paddingHorizontal: 15,
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingVertical: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  switchRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  label: {
    fontSize: 14,
    color: '#666',
  },
  inputRow: {
    marginVertical: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 8,
    marginTop: 5,
    backgroundColor: '#fff',
  },
  button: {
    backgroundColor: '#333',
    padding: 12,
    marginVertical: 5,
    borderRadius: 8,
    alignItems: 'center',
    marginHorizontal: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 14,
  },
});

export default Settings;