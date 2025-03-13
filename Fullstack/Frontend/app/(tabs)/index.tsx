import React, { useState } from 'react';

import { 
  StyleSheet, 
  Text, 
  TouchableOpacity, 
  View, 
  Dimensions, 
} from 'react-native';
import { useRouter } from 'expo-router';
import { useNavigation } from '@react-navigation/native';
import { useEffect } from 'react';

// Get users screen size
const { width, height } = Dimensions.get('window'); 

const LoginScreen = () => {
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, [navigation]);

  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>omnigym.</Text>

      <View style={styles.textBox}>
        <Text style={styles.boldText}>
          Welcome to <Text style={styles.bold}>omnigym.</Text>
        </Text>
        <Text style={styles.subtitle}>
          A place to meet, link, motivate, and create friendly competition with your fellow gym community.
        </Text>
      </View>

      <TouchableOpacity style={styles.button} onPress={() => router.replace('/Login')}>
        <Text style={styles.buttonText}>Get started</Text>
      </TouchableOpacity>
    </View>
  );
};


const styles = StyleSheet.create({
  // Background
  container: {
    flex: 1,
    backgroundColor: '#333333',
    justifyContent: 'center',
    alignItems: 'center',
  },

  // Title
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 20,
    color: 'white',
  },

  // Text Box
  textBox: {
    borderWidth: 1,
    padding: 20,
    marginBottom: 20,
    width: '80%',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 10,
  },

  // Bold Text
  boldText: {
    fontSize: 18,
    fontWeight: '400',
  },
  bold: {
    fontWeight: 'bold',
  },

  // Subtitle
  subtitle: {
    fontSize: 14,
    textAlign: 'center',
    color: 'gray',
    marginTop: 10,
  },

  // Button
  button: {
    backgroundColor: '#EB6841',
    paddingVertical: 15,
    paddingHorizontal: 50,
    borderRadius: 10,
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});


export default LoginScreen;
