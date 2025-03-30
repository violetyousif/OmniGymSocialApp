import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Modal, FlatList, TouchableOpacity } from 'react-native';

const Routine = () => {
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
    // This is just a placeholder. Replace with actual AI generation logic.
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
    <View style={styles.container}>
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
          <Text style={styles.label}>Pace</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter pace"
            onChangeText={(text) => console.log(text)} // Just a placeholder for pace input
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
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: '#f5f5f5', // Light background
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#ff7f50', // Consistent color from Settings page
  },
  label: {
    fontSize: 14,
    color: '#666',
    marginBottom: 5,
  },
  input: {
    width: '100%',
    padding: 10,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    backgroundColor: '#fff',
  },
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    width: '80%',
  },
  pickerItem: {
    padding: 10,
    fontSize: 18,
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#333',
    padding: 12,
    marginVertical: 10,
    borderRadius: 8,
    width: '80%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 14,
  },
});

export default Routine;
