import React, { useState } from 'react';
import { 
  StyleSheet, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  View, 
  Button, 
  Dimensions, 
  Image, 
  Keyboard, 
  TouchableWithoutFeedback
} from 'react-native';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from '@react-navigation/native';
import { useEffect } from 'react';
import { Platform } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context'; // Safe Area Insets for iOS
// import { ThemedText } from '../../components/ThemedText'; // Adjust the import path as necessary



// Get users screen size
const { width, height } = Dimensions.get('window'); 

const LoginScreen = () => {
  const navigation = useNavigation();
  const insets = useSafeAreaInsets(); // Safe Area Handling for iOS

  useEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, [navigation]);


  const router = useRouter();
  const [email, setEmail] = useState('');
  const [isTouchedEmail, setIsTouchedEmail] = useState(false);
  const [isValidEmail, setIsValidEmail] = useState<boolean | undefined>();

  const [password, setPassword] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isTouchedPassword, setIsTouchedPassword] = useState(false);
  const [isValidPassword, setIsValidPassword] = useState<boolean | undefined>();

  // Email Validation Regex
  const validateEmail = (email: string) => {
    return email.match(
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
    );
  };

  // Password Validation (Must be at least 12 characters)
  const validatePassword = (password: string) => {
    return password.length >= 12;
  };

  // Handle Email Input Change
  const handleEmailChange = (text: string) => {
    setEmail(text);
    setIsValidEmail(undefined); 
    if (text === "") return;
    setIsValidEmail(validateEmail(text) !== null);
  };

  // Handle Password Input Change
  const handlePasswordChange = (text: string) => {
    setPassword(text);
    setIsValidPassword(undefined);
    if (text === "") return;
    setIsValidPassword(validatePassword(text));
  };

  const handleLogin = () => {
    // TODO: Replace with real SQL authentication logic
    // Example of how SQL authentication might look (Commented Out)
    
    /*
    fetch('https://your-sql-api.com/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        password,
      }),
    })
    .then(response => response.json())
    .then(data => {
      if (data.success) {
        router.replace('/(tabs)/Profile');
      } else {
        alert('Invalid login credentials');
      }
    })
    .catch(error => {
      console.error('Error:', error);
    });
    */
  
    // Temporary front-end test: Redirect to Profile
    router.replace('/(tabs)/screens/Profile'); 
  };
  
  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>

        {/* Dismiss Keyboard when tapping outside */}
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>

          {/* Main Inner Container */}
          <View style={styles.innerContainer}>
            {/* Large Gradient Circle */}
            <LinearGradient 
              colors={['#E97451', '#8B4513']} 
              style={[styles.circle, { top: insets.top + 20 }]} // Dynamic Safe Area Adjustment
            />

            {/* Login Box */}
            <View style={styles.form}>

              {/* Image Above the Form */}
              <Image source={require('../../assets/images/NameLogo.png')} style={styles.logo} />

              {/* Email Input */}
              <TextInput
                style={[
                  styles.input,
                  isTouchedEmail && isValidEmail === false ? styles.inputError : {},
                ]}
                onChangeText={handleEmailChange}
                value={email}
                placeholder="Email"
                keyboardType="email-address"
                onBlur={() => setIsTouchedEmail(true)}
              />
              {isTouchedEmail && isValidEmail === false && (
                <Text style={styles.errorText}>Invalid email format</Text>
              )}

              {/* Password Input */}
              <View style={styles.passwordContainer}>
                <TextInput
                  placeholder="Password"
                  secureTextEntry={!isPasswordVisible} // Toggles visibility
                  style={[styles.input, styles.passwordInput]}
                  value={password}
                  onChangeText={setPassword}
                />
                {/* Eye Icon to Toggle Visibility */}
                <TouchableOpacity onPress={() => setIsPasswordVisible(!isPasswordVisible)} style={styles.eyeIcon}>
                  <Ionicons name={isPasswordVisible ? "eye-off" : "eye"} size={24} color="#888" />
                </TouchableOpacity>
              </View>
              {isTouchedPassword && isValidPassword === false && (
                <Text style={styles.errorText}>Password must be at least 12 characters</Text>
              )}

              {/* Buttons Sign in, Register, Forgot Password */}
              <TouchableOpacity style={styles.ButtonStyle} onPress={handleLogin}>
                <Text style={styles.buttonText}>Sign In</Text>
              </TouchableOpacity>
              {/* Register and Forgot Password */}
              <ThemedText>Don't have an account? <Text onPress={() => router.push('../auth/RegisterGym')} style={styles.registerText}>Register </Text></ThemedText>
                <TouchableOpacity onPress={() => router.push('../auth/ForgotPassword')}>
                <Text style={styles.registerText}>Forgot Password?</Text>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  // Background
  container: {
    flex: 1,
    backgroundColor: '#333333',
  },
  // Inner Container
  innerContainer: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
    // Large Circle
  circle: {
    width: width * 1.5,
    height: width * 1.5,
    borderRadius: 500,
    zIndex: 1,
    marginTop: Platform.OS === 'ios' ? height * 0.04 : height * 0.09, // Adjusted marginTop for iOS and Android
  },
  // Form Box
  form: {
    width: 320,
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 20,
    alignItems: 'center',
    elevation: 5, // Android shadow
    shadowColor: '#000', // iOS shadow
    shadowOffset: { width: 0, height: 2 }, // iOS shadow
    shadowOpacity: 0.25, // iOS shadow
    shadowRadius: 3.84, // iOS shadow
    zIndex: 3, 
    marginTop: Platform.OS === 'ios' ? height * -0.53 : height * -0.58, // Adjusted marginTop for iOS and Android
  },
  // Input Margins
  input: {
    width: '100%',
    height: 50,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginBottom: 10,
    fontSize: 18,
  },
  inputError: {
    borderColor: 'red', 
  },
  errorText: {
    color: 'red',
    fontSize: 16,
    alignSelf: 'flex-start',
    marginBottom: 10,
  },
  // Button Styling
  ButtonStyle: {
    backgroundColor: '#ED7446',
    width: '40%',
    alignSelf: 'center',
    marginTop: 20,
    marginBottom: 20,
    padding: 5,
    borderRadius: 7,
    boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.015,
  },
  // Button Text
  buttonText: {
    color: 'white',
    fontSize: 18,
    textAlign: 'center',
    margin: 5,
    fontWeight: 'bold',
  },
  // Register and Forgot Password
  registerText: {
    color: '#ED7446',
    textAlign: 'center',
    marginTop: 10,
    marginBottom: 20,
    fontSize: 18,
  },
  // Logo above form
  logo: {
    width: width * 0.5, 
    height: width * 0.5,
    resizeMode: 'contain', 
  },
  // Password Styling
  // Password eye
  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    backgroundColor: "#fff",
    width: "100%",
    height: 45,
    paddingRight: 40,
    paddingVertical: 0,
  },
  passwordInput: {
    flex: 1,
    borderWidth: 0,
    backgroundColor: "transparent",
    fontSize: 18,
    height: "100%",
    paddingTop: 8,
    paddingBottom: 0,
    textAlignVertical: "center",
  },
  eyeIcon: {
    position: "absolute",
    right: 10,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default LoginScreen;
