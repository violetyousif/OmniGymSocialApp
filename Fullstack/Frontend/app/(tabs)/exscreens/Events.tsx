import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Alert } from 'react-native';

export default function Events() {
  const handlePress = (label: string) => Alert.alert(`${label} tapped!`);

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Events</Text>

      <TouchableOpacity style={styles.box} onPress={() => handlePress('Group Clubs')}>
        <Text style={styles.text}>Group Clubs</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.subBox} onPress={() => handlePress('Additional Terms and Conditions')}>
        <Text style={styles.subText}>Additional Terms and Conditions</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.box} onPress={() => handlePress('Check-ins')}>
        <Text style={styles.text}>Check-ins</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.box} onPress={() => handlePress('Local Fitness Events')}>
        <Text style={styles.text}>Local Fitness Events</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.box} onPress={() => handlePress('Gym Location Specific Events')}>
        <Text style={styles.text}>Gym Location Specific Events</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.subBox} onPress={() => handlePress('Submission Form')}>
        <Text style={styles.subText}>Submission Form</Text>
      </TouchableOpacity>
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
  header: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 20,
    textAlign: 'center',
  },
  box: {
    backgroundColor: '#E97451',
    padding: 16,
    borderRadius: 8,
    marginBottom: 10,
  },
  subBox: {
    backgroundColor: '#f59774',
    padding: 14,
    borderRadius: 8,
    marginLeft: 20,
    marginBottom: 8,
  },
  text: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  subText: {
    color: '#fff',
    fontSize: 16,
  },
});
