import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Modal, FlatList, TouchableOpacity, ScrollView } from 'react-native';
import { FontAwesome, Entypo } from '@expo/vector-icons';
import { useRouter } from 'expo-router'; // Import for navigating between screens
import { Dimensions } from 'react-native';
import { Image } from 'react-native';
 
const { width } = Dimensions.get('window'); // Get screen width for responsive design
 
const Routine = () => {
  const router = useRouter();  // Router for navigation
 
  // States for user input
  const [routineTitle, setRoutineTitle] = useState('');
  const [expectedTime, setExpectedTime] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [workoutDay, setWorkoutDay] = useState('');
  const [setsReps, setSetsReps] = useState('');
  const [weightAmount, setWeightAmount] = useState('');
  const [duration, setDuration] = useState('');
  const [distance, setDistance] = useState('');
  const [restIntervals, setRestIntervals] = useState('');
  const [estCaloriesBurned, setEstCaloriesBurned] = useState('');
  const [showTypePicker, setShowTypePicker] = useState(false);
  const [aiPlan, setAiPlan] = useState('');
  const [showAiModal, setShowAiModal] = useState(false);
 
  const workoutTypes = ['Strength Training', 'Cardio', 'Glute Day', 'Yoga', 'Pilates'];
 
  // Handle selection from the custom picker
  const handlePickerSelect = (item: string) => {
    setSelectedType(item);
    setShowTypePicker(false);
  };
 
  // Handle form submission
  const handleSubmit = () => {
    console.log({
      routineTitle,
      expectedTime,
      selectedType,
      workoutDay,
      setsReps,
      weightAmount,
      duration,
      distance,
      restIntervals,
      estCaloriesBurned,
    });
    alert('Workout plan created successfully!');
  };
 
  // Generate AI Plan (Placeholder for actual AI integration)
  const generateAiPlan = () => {
    setAiPlan(`
      AI-generated Plan:
      - Routine Title: ${routineTitle}
      - Workout Type: ${selectedType}
      - Expected Time: ${expectedTime}
      - Sets & Reps: ${setsReps}
      - Weight: ${weightAmount}
      - Duration: ${duration}
      - Calories Burned: ${estCaloriesBurned}
    `);
    setShowAiModal(true);
  };
 
  return (
    <ScrollView style={styles.container}>
      {/* Full-Width Header */}
      <View style={styles.topBar}>
        <TouchableOpacity style={styles.chatIcon} onPress={() => alert('Open Chat')}>
          <FontAwesome name="comment" size={24} color="gray" />
        </TouchableOpacity>
 
        <View style={styles.logoContainer}>
          <Image source={require('../../../assets/images/OmniGymLogo.png')} style={styles.logo} />
        </View>
 
        {/* Logout Button */}
        <TouchableOpacity onPress={() => router.replace('/(tabs)/Login')} style={styles.logoutContainer}>
          <Text style={styles.logout}>LOGOUT</Text>
        </TouchableOpacity>
      </View>
 
      <Text style={styles.title}>Create Workout Plan</Text>
 
      {/* Routine Title */}
      <Text style={styles.label}>Title for Routine</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter routine title"
        onChangeText={setRoutineTitle}
        value={routineTitle}
      />
 
      {/* Expected Time of Completion */}
      <Text style={styles.label}>Expected Time of Completion</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter time (e.g., 1 hour)"
        onChangeText={setExpectedTime}
        value={expectedTime}
      />
 
      {/* Workout Type Picker */}
      <Text style={styles.label}>Type of Workout</Text>
      <TouchableOpacity onPress={() => setShowTypePicker(true)} style={styles.input}>
        <Text>{selectedType || 'Select Workout Type'}</Text>
      </TouchableOpacity>
 
      {/* Modal Picker */}
      <Modal
        visible={showTypePicker}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setShowTypePicker(false)}
      >
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            <FlatList
              data={workoutTypes}
              keyExtractor={(item) => item}
              renderItem={({ item }) => (
                <TouchableOpacity onPress={() => handlePickerSelect(item)}>
                  <Text style={styles.pickerItem}>{item}</Text>
                </TouchableOpacity>
              )}
            />
            <Button title="Close" onPress={() => setShowTypePicker(false)} />
          </View>
        </View>
      </Modal>
 
      {/* Date Picker (Workout Day) */}
      <Text style={styles.label}>Workout Day (Weekdays)</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter workout day (e.g., Monday)"
        onChangeText={setWorkoutDay}
        value={workoutDay}
      />
 
      {/* Strength Training */}
      {selectedType === 'Strength Training' && (
        <>
          <Text style={styles.label}>Sets & Reps</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter sets and reps"
            onChangeText={setSetsReps}
            value={setsReps}
          />
          <Text style={styles.label}>Weight Amount</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter weight (kg)"
            onChangeText={setWeightAmount}
            value={weightAmount}
          />
        </>
      )}
 
      {/* Cardio */}
      {selectedType === 'Cardio' && (
        <>
          <Text style={styles.label}>Duration</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter duration (minutes)"
            onChangeText={setDuration}
            value={duration}
          />
          <Text style={styles.label}>Distance</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter distance (km)"
            onChangeText={setDistance}
            value={distance}
          />
        </>
      )}
 
      {/* Rest Intervals */}
      <Text style={styles.label}>Rest Intervals</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter rest intervals (minutes)"
        onChangeText={setRestIntervals}
        value={restIntervals}
      />
 
      {/* Estimated Calories Burned */}
      <Text style={styles.label}>Overall Est. Calories Burned</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter estimated calories"
        onChangeText={setEstCaloriesBurned}
        value={estCaloriesBurned}
      />
 
      {/* Create Button */}
      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Create Plan</Text>
      </TouchableOpacity>
 
      {/* AI Plan Generation Button */}
      <TouchableOpacity style={styles.button} onPress={generateAiPlan}>
        <Text style={styles.buttonText}>Generate Plan Using AI</Text>
      </TouchableOpacity>
 
      {/* View Plan Button */}
      <TouchableOpacity style={styles.button} onPress={() => alert('Viewing current plan')}>
        <Text style={styles.buttonText}>View Plan</Text>
      </TouchableOpacity>
 
      {/* AI Plan Modal */}
      <Modal
        visible={showAiModal}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setShowAiModal(false)}
      >
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            <Text>{aiPlan}</Text>
            <Button title="Close" onPress={() => setShowAiModal(false)} />
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};
 
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff', // White background color
    flex: 1, // Full screen height
  },
 
  // Full-Width Header
  topBar: {
    width: '100%',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    flexDirection: 'row', // Horizontal alignment for top bar elements
    alignItems: 'center', // Center align the items vertically
    justifyContent: 'space-between', // Space out logo, logout, and chat icons
    backgroundColor: '#FFF',
    paddingVertical: 18,
    elevation: 5,
    borderBottomWidth: 7,
    borderBottomColor: '#E97451', // Orange border color
  },
 
  // Centered Logo
  logoContainer: {
    flex: 1,
    alignItems: 'center',
  },
  logo: {
    width: 40,
    height: 40,
    resizeMode: 'contain', // Maintain aspect ratio
  },
 
  // Logout Button
  logoutContainer: {
    position: 'absolute',
    right: 20,
    bottom: 10,
  },
  logout: {
    fontSize: 14,
    fontWeight: 'bold',
    color: 'black', // Black color for logout text
  },
 
  // Chat Icon - Aligned to Left
  chatIcon: {
    position: 'absolute',
    left: 20,
    bottom: 10,
  },
 
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 80,
  },
 
  label: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 6,
  },
 
  input: {
    width: width - 40,
    height: 40,
    marginBottom: 20,
    paddingLeft: 10,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
  },
 
  pickerItem: {
    padding: 10,
    fontSize: 18,
  },
 
  button: {
    backgroundColor: '#E97451',
    paddingVertical: 12,
    borderRadius: 8,
    marginBottom: 12,
    alignItems: 'center',
  },
 
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
 
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
 
  modalContainer: {
    width: '80%',
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 8,
  },
});
 
export default Routine;
 