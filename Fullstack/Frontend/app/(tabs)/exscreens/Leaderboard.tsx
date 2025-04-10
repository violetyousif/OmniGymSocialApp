import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import * as DocumentPicker from 'expo-document-picker';
import { Picker } from '@react-native-picker/picker';

export default function Leaderboards() {
  const router = useRouter();

  const [showSubmissionForm, setShowSubmissionForm] = useState(false);
  const [showArchived, setShowArchived] = useState(false);

  const [prType, setPrType] = useState('');
  const [amount, setAmount] = useState('');
  const [ageRange, setAgeRange] = useState('');
  const [gender, setGender] = useState('');
  const [videoFile, setVideoFile] = useState<DocumentPicker.DocumentPickerAsset | null>(null);

  const handleUpload = async () => {
    const result = await DocumentPicker.getDocumentAsync({
      type: 'video/mp4',
      copyToCacheDirectory: true,
    });

    if (result.assets && result.assets.length > 0) {
      setVideoFile(result.assets[0]);
      Alert.alert('Upload Success', `Uploaded: ${result.assets[0].name}`);
    }
  };

  const handleSubmit = () => {
    if (!prType || !amount || !ageRange || !gender || !videoFile) {
      return Alert.alert('Please fill out all fields and upload a video!');
    }

    Alert.alert('Submission Sent', `Thanks for submitting your PR!`);
    setPrType('');
    setAmount('');
    setAgeRange('');
    setGender('');
    setVideoFile(null);
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 100, paddingTop: 100 }}>
      {/* Top Nav Bar */}
      <View style={styles.navBar}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.navTitle}>Leaderboards</Text>
      </View>

      {/* Header */}
      <Text style={styles.header}>Leaderboards</Text>

      {/* Submission Form */}
      <TouchableOpacity style={styles.box} onPress={() => setShowSubmissionForm(!showSubmissionForm)}>
        <Text style={styles.text}>PR Submission Form {showSubmissionForm ? '▲' : '▼'}</Text>
      </TouchableOpacity>

      {showSubmissionForm && (
        <View style={styles.form}>
          <Text style={styles.label}>PR Type</Text>
          <Picker selectedValue={prType} onValueChange={setPrType} style={styles.picker}>
            <Picker.Item label="Select PR Type" value="" />
            <Picker.Item label="Deadlift" value="Deadlift" />
            <Picker.Item label="Bench Press" value="Bench Press" />
            <Picker.Item label="Squat" value="Squat" />
            <Picker.Item label="Sprint" value="Sprint" />
          </Picker>

          <Text style={styles.label}>Amount</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter weight/time"
            value={amount}
            onChangeText={setAmount}
            keyboardType="numeric"
          />

          <Text style={styles.label}>Age Range</Text>
          <Picker selectedValue={ageRange} onValueChange={setAgeRange} style={styles.picker}>
            <Picker.Item label="Select Age Range" value="" />
            <Picker.Item label="18–28" value="18-28" />
            <Picker.Item label="29–38" value="29-38" />
            <Picker.Item label="39–48" value="39-48" />
            <Picker.Item label="49–58" value="49-58" />
            <Picker.Item label="59–68" value="59-68" />
            <Picker.Item label="69–78" value="69-78" />
            <Picker.Item label="79+" value="79+" />
          </Picker>

          <Text style={styles.label}>Gender</Text>
          <Picker selectedValue={gender} onValueChange={setGender} style={styles.picker}>
            <Picker.Item label="Select Gender" value="" />
            <Picker.Item label="Male" value="Male" />
            <Picker.Item label="Female" value="Female" />
            <Picker.Item label="Other" value="Other" />
          </Picker>

          <TouchableOpacity style={styles.uploadButton} onPress={handleUpload}>
            <Text style={styles.uploadText}>
              {videoFile ? `📹 ${videoFile.name}` : 'Upload MP4 Video'}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
            <Text style={styles.submitText}>Submit PR</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Archived Contests */}
      <TouchableOpacity style={styles.box} onPress={() => setShowArchived(!showArchived)}>
        <Text style={styles.text}>Archived Contests and Winners {showArchived ? '▲' : '▼'}</Text>
      </TouchableOpacity>

      {showArchived && (
        <View style={styles.form}>
          <Text style={styles.label}>PR Type</Text>
          <Picker selectedValue={prType} onValueChange={setPrType} style={styles.picker}>
            <Picker.Item label="Deadlift" value="Deadlift" />
            <Picker.Item label="Bench Press" value="Bench Press" />
            <Picker.Item label="Squat" value="Squat" />
            <Picker.Item label="Sprint" value="Sprint" />
          </Picker>

          <Text style={styles.label}>Age Range</Text>
          <Picker selectedValue={ageRange} onValueChange={setAgeRange} style={styles.picker}>
            <Picker.Item label="18–28" value="18-28" />
            <Picker.Item label="29–38" value="29-38" />
            <Picker.Item label="39+" value="39+" />
          </Picker>

          <Text style={styles.label}>Gender</Text>
          <Picker selectedValue={gender} onValueChange={setGender} style={styles.picker}>
            <Picker.Item label="Male" value="Male" />
            <Picker.Item label="Female" value="Female" />
            <Picker.Item label="Other" value="Other" />
          </Picker>

          <View style={{ marginTop: 10 }}>
            <Text style={styles.winner}>🏆 Winner: Jane Doe (315 lbs)</Text>
            <Text style={styles.winner}>🏆 Runner-up: John Smith (305 lbs)</Text>
          </View>
        </View>
      )}
    
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#333',
    flex: 1,
    paddingHorizontal: 20,
  },
  navBar: {
    position: 'absolute',
    top: 40,
    left: 0,
    right: 0,
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    backgroundColor: '#333',
    borderBottomWidth: 2,
    borderBottomColor: '#E97451',
    zIndex: 10,
  },
  backButton: {
    marginRight: 10,
  },
  navTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
  header: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#fff',
    marginTop: 60,
    marginBottom: 20,
    textAlign: 'center',
  },
  box: {
    backgroundColor: '#E97451',
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
  },
  text: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  form: {
    backgroundColor: '#444',
    borderRadius: 10,
    padding: 16,
    marginBottom: 20,
  },
  label: {
    color: '#fff',
    fontSize: 16,
    marginBottom: 6,
    marginTop: 10,
  },
  input: {
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 6,
    fontSize: 16,
  },
  picker: {
    backgroundColor: '#fff',
    borderRadius: 6,
  },
  uploadButton: {
    backgroundColor: '#555',
    padding: 12,
    borderRadius: 6,
    marginTop: 10,
  },
  uploadText: {
    color: '#fff',
    textAlign: 'center',
  },
  submitButton: {
    backgroundColor: '#E97451',
    padding: 12,
    borderRadius: 6,
    marginTop: 20,
  },
  submitText: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  winner: {
    color: '#fff',
    marginTop: 6,
    fontSize: 15,
  },
});