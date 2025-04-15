import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { useRouter } from 'expo-router';

const AdminSettings = () => {
  const router = useRouter();

  const handleSupport = () => {
    Alert.alert(
      'Support',
      'Redirecting to support ticket form...'
      /**
   * Handles support redirection.
   * Future enhancement: navigate to a support form screen
   */
    );
  };
  /**
   * Handles feedback redirection.
   * Future enhancement: navigate to a feedback submission screen
   */
  const handleFeedback = () => {
    Alert.alert(
      'Feedback',
      'Redirecting to feedback submission...'
      // In the future: router.push('/FeedbackForm');
    );
  };
/**
   * Handles password change initiation.
   * Future enhancement: router push to password update flow
   */
  const handleChangePassword = () => {
    Alert.alert('Change Password', 'Redirecting to password change...');
  };
/**
   * Handles unit system toggle.
   * Future enhancement: store and persist this preference
   */
  const handleToggleUnits = () => {
    Alert.alert('Toggle Units', 'Switching between Imperial and Metric...');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Settings</Text>

      <Text style={styles.section}>Support / Feedback</Text>
      <TouchableOpacity style={styles.button} onPress={handleSupport}>
        <Text style={styles.buttonText}>Support</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={handleFeedback}>
        <Text style={styles.buttonText}>Feedback</Text>
      </TouchableOpacity>

      <Text style={styles.section}>Edit Settings</Text>
      <TouchableOpacity style={styles.button} onPress={handleChangePassword}>
        <Text style={styles.buttonText}>Change Password</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={handleToggleUnits}>
        <Text style={styles.buttonText}>Toggle Imperial / Metric</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
      backgroundColor: '#fff',
    },
    heading: {
      fontSize: 24,
      fontWeight: 'bold',
      color: '#E97451',
      marginBottom: 20,
    },
    section: {
      fontSize: 18,
      fontWeight: '600',
      marginTop: 20,
      marginBottom: 10,
    },
    button: {
      backgroundColor: '#E97451',
      padding: 12,
      borderRadius: 8,
      marginBottom: 10,
    },
    buttonText: {
      color: 'white',
      fontSize: 16,
      textAlign: 'center',
      fontWeight: '600',
    },
  });
  

export default AdminSettings;
