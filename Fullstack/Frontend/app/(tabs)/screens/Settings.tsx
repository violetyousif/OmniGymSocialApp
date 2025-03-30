import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Switch, Image } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

const Settings = () => {
  // States for profile information
  const [isPublic, setIsPublic] = useState(true);
  const [units, setUnits] = useState('Imperial');
  const [name, setName] = useState('Jane Doe');
  const [caption, setCaption] = useState('Fitness Enthusiast | Gym Lover | Stronger Every Day');
  const [profileImage, setProfileImage] = useState<string>('https://via.placeholder.com/150');

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


  const pickImage = async () => {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permission.granted) {
      alert('Permission to access gallery is required!');
      return;
    }
  
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });
  
    if (!result.canceled && result.assets.length > 0) {
      const selected = result.assets[0];
      const fileType = selected.uri.split('.').pop()?.toLowerCase();
      if (fileType === 'png' || fileType === 'jpg' || fileType === 'jpeg') {
        setProfileImage(selected.uri);
      } else {
        alert('Only PNG or JPEG files are allowed.');
      }
    }
  };

  return (
    <ScrollView style={styles.container}>
      {/* Profile Header */}
      <View style={styles.noHorizontalPadding}>
        <View style={styles.header}>
          <TouchableOpacity style={styles.uploadWrapper} onPress={pickImage}>
            <Image source={{ uri: profileImage }} style={styles.profileImage} />
            <View style={styles.uploadOverlay}>
              <Text style={styles.uploadText}>📷</Text>
            </View>
          </TouchableOpacity>
          <Text style={styles.name}>{name}</Text>
          <Text style={styles.caption}>{caption}</Text>
        </View>
      </View>

      {/* Units Converter Section Public/Private Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Units Converter</Text>
        <View style={styles.switchRow}>
          <Text style={styles.label}>Current: {units}</Text>
          <Switch value={units === 'SI'} onValueChange={toggleUnits} />
        </View>
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

        {/* Save Changes Button */}
        <TouchableOpacity style={styles.button} onPress={() => alert('Profile updated')}>
          <Text style={styles.buttonText}>Save Changes</Text>
        </TouchableOpacity>
      </View>


    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f5f5f5',
    flex: 1,
    paddingHorizontal: 20,
  },
  header: {
    alignItems: 'center',
    backgroundColor: '#ff7f50',
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderColor: '#ccc',
  },
  uploadWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 2,
    borderColor: '#ccc',
  },
  uploadOverlay: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: '#000000aa',
    borderRadius: 20,
    padding: 5,
  },
  uploadText: {
    color: '#fff',
    fontSize: 14,
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
    marginVertical: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    backgroundColor: '#fff',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 1,
    elevation: 2,
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
    marginBottom: -10, 
    marginTop: -20, 
  },
  label: {
    fontSize: 14,
    color: '#666',
  },
  inputRow: {
    marginVertical: 1, 
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 6, 
    padding: 6, 
    marginTop: 4, 
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
  noHorizontalPadding: {
    marginHorizontal: -20,
  }
});

export default Settings;