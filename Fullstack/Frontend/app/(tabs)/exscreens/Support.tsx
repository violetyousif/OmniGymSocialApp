import React, { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Alert,
  ScrollView,
} from 'react-native';
import { useRouter } from 'expo-router';

const { width } = Dimensions.get('window');

export default function Support() {
  const router = useRouter();
  const [activeForm, setActiveForm] = useState<'feedback' | 'assistance'>('feedback');
  const [feedback, setFeedback] = useState('');
  const [assistance, setAssistance] = useState('');

  const handleFeedbackSubmit = () => {
    if (!feedback.trim()) return Alert.alert('Please write some feedback first!');
    Alert.alert('Feedback Sent', 'Thank you for your input!');
    setFeedback('');
  };

  const handleAssistanceSubmit = () => {
    if (!assistance.trim()) return Alert.alert('Please describe your issue first!');
    Alert.alert('Assistance Form Sent', 'We will get back to you shortly.');
    setAssistance('');
  };

  return (
    <ScrollView style={styles.container}>
      {/* Top Nav */}
      <View style={styles.navBar}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.navTitle}>Support</Text>
      </View>

      {/* Toggle Buttons */}
      <View style={styles.toggleContainer}>
        <TouchableOpacity
          style={[styles.toggleButton, activeForm === 'feedback' && styles.activeButton]}
          onPress={() => setActiveForm('feedback')}
        >
          <Text style={styles.toggleText}>Feedback</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.toggleButton, activeForm === 'assistance' && styles.activeButton]}
          onPress={() => setActiveForm('assistance')}
        >
          <Text style={styles.toggleText}>Assistance</Text>
        </TouchableOpacity>
      </View>

      {/* Feedback Form */}
      {activeForm === 'feedback' && (
        <View style={styles.form}>
          <Text style={styles.label}>Write your feedback below:</Text>
          <TextInput
            style={styles.input}
            placeholder="Type feedback here..."
            placeholderTextColor="#999"
            multiline
            value={feedback}
            onChangeText={setFeedback}
          />
          <TouchableOpacity style={styles.button} onPress={handleFeedbackSubmit}>
            <Text style={styles.buttonText}>Send Feedback</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Assistance Form */}
      {activeForm === 'assistance' && (
        <View style={styles.form}>
          <Text style={styles.label}>Describe your issue:</Text>
          <TextInput
            style={styles.input}
            placeholder="Type issue here..."
            placeholderTextColor="#999"
            multiline
            value={assistance}
            onChangeText={setAssistance}
          />
          <TouchableOpacity style={styles.button} onPress={handleAssistanceSubmit}>
            <Text style={styles.buttonText}>Send Request</Text>
          </TouchableOpacity>
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#333',
    flex: 1,
    paddingTop: 100,
    paddingHorizontal: 20,
  },

  // Top Nav Bar
  navBar: {
    position: 'absolute',
    top: -60,
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

  // Toggle
  toggleContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 80,
    marginBottom: 25,
  },
  toggleButton: {
    backgroundColor: '#444',
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginHorizontal: 10,
    borderRadius: 8,
  },
  activeButton: {
    backgroundColor: '#E97451',
  },
  toggleText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },

  // Form
  form: {
    marginBottom: 40,
  },
  label: {
    color: '#fff',
    fontSize: 16,
    marginBottom: 10,
  },
  input: {
    height: 150,
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    color: '#000',
    fontSize: 16,
    textAlignVertical: 'top',
  },
  button: {
    backgroundColor: '#E97451',
    padding: 15,
    borderRadius: 10,
    marginTop: 20,
    width: width * 0.8,
    alignSelf: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 18,
    textAlign: 'center',
  },
});