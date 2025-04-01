import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Alert } from 'react-native';

export default function Leaderboards() {
  const handlePress = (label: string) => Alert.alert(`${label} tapped!`);

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Leaderboards</Text>

      <TouchableOpacity style={styles.box} onPress={() => handlePress('Archived Contests and Winners')}>
        <Text style={styles.text}>Archived Contests and Winners</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.box} onPress={() => handlePress('Private Contest Page')}>
        <Text style={styles.text}>Private Contest Page (User Specific)</Text>
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
    marginBottom: 12,
  },
  text: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
