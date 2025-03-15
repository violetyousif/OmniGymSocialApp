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

// Get screen size
const { width } = Dimensions.get('window'); 

const WelcomeScreen = () => {
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
        <Text style={styles.boldText}>
          Welcome to <Text style={styles.bold}>omnigym.</Text>
        </Text>
        <Text style={styles.subtitle}>
          A place to meet, link, motivate, and create friendly competition with your fellow gym community.
        </Text>
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
    borderColor: '#333',
    padding: 30,
    width: '85%',
    backgroundColor: '#fff',
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 20,
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
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default WelcomeScreen;
