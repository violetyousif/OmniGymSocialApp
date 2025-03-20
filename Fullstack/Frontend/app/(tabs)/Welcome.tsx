// Purpose: Welcome screen for the app, displays the logo and a brief description of the app.

import React, { useEffect } from 'react';
import { 
  StyleSheet, 
  Text, 
  TouchableOpacity, 
  View, 
  Image, 
  Dimensions 
} from 'react-native';
import { useRouter } from 'expo-router';
import { useNavigation } from '@react-navigation/native';
import { ThemedText } from '../../components/ThemedText'; // Adjust the import path as necessary

// Get screen size
const { width } = Dimensions.get('window'); 

const Welcome = () => {
  const navigation = useNavigation();
  const router = useRouter();

  useEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, [navigation]);

  return (
    <View style={styles.container}>
      {/* Logo */}
      <Image source={require('../../assets/images/WelcomeLogo.png')} style={styles.logo} />

      {/* Welcome Text Box */}
      <View style={styles.textBox}>
        <Text style={styles.subtitle}>
          Welcome to <Text style={styles.bold}>Omnigym.</Text>
        </Text>
        <ThemedText>
          A place to meet, link, motivate, and create friendly competition with your fellow gym community.
        </ThemedText>
      </View>

      {/* Get Started Button */}
      <TouchableOpacity style={styles.button} onPress={() => router.replace('/(tabs)/Login')}>
        <Text style={styles.buttonText}>Get started</Text>
      </TouchableOpacity>
    </View>
  );
};

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    bottom: -80,
  },

  // Logo Styling
  logo: {
    width: width * 0.9, 
    height: width * 0.6, 
    resizeMode: 'contain',
    marginBottom: 30,
  },

  // Welcome Text Box
  textBox: {
    borderWidth: 1,
    borderColor: '#D8D7D4',
    padding: 30,
    width: '85%',
    backgroundColor: '#FAF9F6',
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 20,
    boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
  },

  // Bold Text
  boldText: {
    fontSize: 18,
    fontWeight: '400',
    textAlign: 'center',
  },
  bold: {
    fontWeight: 'bold',
  },

  // Subtitle Text
  subtitle: {
    fontSize: 14,
    textAlign: 'center',
    color: 'gray',
    marginTop: 10,
  },

  // Get Started Button
  button: {
    backgroundColor: '#EB6841',
    paddingVertical: 15,
    width: '85%',
    alignItems: 'center',
    borderRadius: 10,
    boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Welcome;