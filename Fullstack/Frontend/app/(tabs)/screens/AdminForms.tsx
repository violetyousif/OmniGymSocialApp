import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';

/**
 * AdminForms.tsx
 *
 * This screen serves as the Display Forms Page in the Admin flow.
 * It offers access to:
 * - Submit new event forms
 * - View leaderboard submissions
 * - View archived winners
 *
 * These options are split into three clearly defined buttons.
 * Each button navigates to its corresponding screen for further actions.
 */

const AdminForms = () => {
  const router = useRouter();

  const handleNavigateToEventForm = () => {
    // Navigate to the event form submission screen
    router.push('/(tabs)/screens/AdminEvents');
  };

  const handleNavigateToLeaderboardSubmissions = () => {
    // Navigate to leaderboard submissions (future screen)
    router.push('/(tabs)/screens/LeaderboardSubmissions');
  };

  const handleNavigateToArchivedWinners = () => {
    // Navigate to archived winners view (currently in AdminLeaderboard via tab)
    router.push('/(tabs)/screens/AdminLeaderboard');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Form Management</Text>

      <TouchableOpacity style={styles.button} onPress={handleNavigateToEventForm}>
        <Text style={styles.buttonText}>Submit New Event</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={handleNavigateToLeaderboardSubmissions}>
        <Text style={styles.buttonText}>View Leaderboard Submissions</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={handleNavigateToArchivedWinners}>
        <Text style={styles.buttonText}>View Archived Winners</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#E97451',
    marginBottom: 30,
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#E97451',
    padding: 15,
    borderRadius: 8,
    marginBottom: 15,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
    fontWeight: '600',
  },
});

export default AdminForms;
