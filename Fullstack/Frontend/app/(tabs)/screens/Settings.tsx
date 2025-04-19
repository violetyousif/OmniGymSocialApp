import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  StyleSheet, 
  ScrollView, 
  Switch, 
  Image, 
  SafeAreaView, 
  Platform, 
  StatusBar 
} from 'react-native';
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

  const togglePublic = () => setIsPublic(prev => !prev);
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
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.scrollContent}>

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

        {/* Units and Privacy Settings */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Units Converter</Text>
          <View style={styles.switchRow}>
            <Text style={styles.label}>Current: {units}</Text>
            <Switch value={units === 'SI'} onValueChange={toggleUnits} />
          </View>

          {/* iOS-only spacing */}
          {Platform.OS === 'ios' && <View style={{ height: 20 }} />}

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
              onChangeText={text => setAge(Number(text))}
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
              onChangeText={text => setWilksScore(Number(text))}
              placeholder="Enter Wilks Score"
              keyboardType="numeric"
            />
          </View>

          <View style={styles.inputRow}>
            <Text style={styles.label}>Bench Press:</Text>
            <TextInput
              style={styles.input}
              value={String(benchPress)}
              onChangeText={text => setBenchPress(Number(text))}
              placeholder="Enter bench press weight"
              keyboardType="numeric"
            />
          </View>

          <View style={styles.inputRow}>
            <Text style={styles.label}>Deadlift:</Text>
            <TextInput
              style={styles.input}
              value={String(deadlift)}
              onChangeText={text => setDeadlift(Number(text))}
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
              onChangeText={text => setSquats(Number(text))}
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
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 20,
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
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  uploadOverlay: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: '#00000080',
    borderRadius: 20,
    padding: 5,
  },
  uploadText: {
    color: 'white',
    fontSize: 14,
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 10,
  },
  caption: {
    fontSize: 14,
    color: '#333',
    marginTop: 4,
    textAlign: 'center',
  },
  section: {
    marginTop: 30,
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 5,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 10,
  },
  switchRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
  },
  inputRow: {
    marginBottom: 15,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    marginTop: 5,
  },
  button: {
    backgroundColor: '#ff7f50',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  noHorizontalPadding: {
    paddingHorizontal: 0,
  },
});

export default Settings;
