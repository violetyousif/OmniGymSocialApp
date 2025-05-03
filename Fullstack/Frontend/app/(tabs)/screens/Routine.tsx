// Routine.tsx
import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  Button, 
  StyleSheet, 
  Modal, 
  FlatList, 
  TouchableOpacity, 
  ScrollView, 
  SafeAreaView, 
  Dimensions, 
  Image 
} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

const { width } = Dimensions.get('window');

const Routine = () => {
  const router = useRouter();

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

  const handlePickerSelect = (item: string) => {
    setSelectedType(item);
    setShowTypePicker(false);
  };

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
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.topBar}>
          <TouchableOpacity 
            style={styles.chatIcon} 
            onPress={() => router.replace('/(tabs)/screens/Inbox')}
          >
            <FontAwesome name="comment" size={24} color="gray" />
          </TouchableOpacity>

          <View style={styles.logoContainer}>
            <Image source={require('../../../assets/images/OmniGymLogo.png')} style={styles.logo} />
          </View>

          <TouchableOpacity 
            onPress={() => router.replace('/(tabs)/Login')} 
            style={styles.logoutContainer}
          >
            <Text style={styles.logout}>LOGOUT</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.formWrapper}>
          <Text style={styles.title}>Create Workout Plan</Text>

          <Text style={styles.label}>Title for Routine</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter routine title"
            onChangeText={setRoutineTitle}
            value={routineTitle}
          />

          <Text style={styles.label}>Expected Time of Completion</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter time (e.g., 1 hour)"
            onChangeText={setExpectedTime}
            value={expectedTime}
          />

          <Text style={styles.label}>Type of Workout</Text>
          <TouchableOpacity 
            onPress={() => setShowTypePicker(true)} 
            style={styles.input}
          >
            <Text>{selectedType || 'Select Workout Type'}</Text>
          </TouchableOpacity>

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

          <Text style={styles.label}>Workout Day (Weekdays)</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter workout day (e.g., Monday)"
            onChangeText={setWorkoutDay}
            value={workoutDay}
          />

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

          <Text style={styles.label}>Rest Intervals</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter rest intervals (minutes)"
            onChangeText={setRestIntervals}
            value={restIntervals}
          />

          <Text style={styles.label}>Overall Est. Calories Burned</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter estimated calories"
            onChangeText={setEstCaloriesBurned}
            value={estCaloriesBurned}
          />

          <TouchableOpacity style={styles.button} onPress={handleSubmit}>
            <Text style={styles.buttonText}>Create Plan</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.button} onPress={generateAiPlan}>
            <Text style={styles.buttonText}>Generate Plan Using AI</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.button} onPress={() => alert('Viewing current plan')}>
            <Text style={styles.buttonText}>View Plan</Text>
          </TouchableOpacity>

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
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollContainer: {
    flexGrow: 1,
  },
  container: {
    backgroundColor: '#fff',
    flex: 1,
  },
  formWrapper: {
    paddingHorizontal: 20,
    paddingTop: 20,   
    paddingBottom: 30,
  },
  topBar: {
    width: '100%',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FFF',
    paddingVertical: 18,
    elevation: 5,
    borderBottomWidth: 7,
    borderBottomColor: '#E97451',
  },
  logoContainer: {
    flex: 1,
    alignItems: 'center',
  },
  logo: {
    width: 40,
    height: 40,
    resizeMode: 'contain',
  },
  logoutContainer: {
    position: 'absolute',
    right: 20,
    bottom: 10,
  },
  logout: {
    fontSize: 14,
    fontWeight: 'bold',
    color: 'black',
  },
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

//#codebase