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

// Get users screen size
const { width, height } = Dimensions.get('window'); 

const LoginScreen = () => {
  const navigation = useNavigation();

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
    router.replace('/(tabs)/Profile'); 
  };
  
  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>

        {/* Dismiss Keyboard when tapping outside */}
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>

            {/* Large Gradient Circle */}
            <LinearGradient 
              colors={['#E97451', '#8B4513']} 
              style={[styles.circle, styles.largeCircle]} 
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
              <View style={styles.ButtonStyle}>
                <Button title="Sign In" color="#ED7446" onPress={handleLogin}/>
              </View>
              <TouchableOpacity onPress={() => router.push('/auth/RegisterGym')}>
                <Text style={styles.registerText}>Don't have an account? Register</Text>
              </TouchableOpacity>

              <TouchableOpacity>
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
    justifyContent: 'center',
    alignItems: 'center',
  },

  // Form Box
  form: {
    width: 320,
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 20,
    alignItems: 'center',
    elevation: 5,
    zIndex: 3, 
    marginTop: 20, 
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
    fontSize: 16,
  },
  inputError: {
    borderColor: 'red', 
  },
  errorText: {
    color: 'red',
    fontSize: 14,
    alignSelf: 'flex-start',
    marginBottom: 10,
  },
  // Register and Forgot Password
  registerText: {
    color: '#007bff',
    textAlign: 'center',
    marginTop: 10,
  },
  // Button Styling
  ButtonStyle: {
    width: '50%',
    alignSelf: 'center',
    marginTop: 10,
  },
  // Circle Styles
  circle: {
    position: 'absolute',
    borderRadius: 500, 
    justifyContent: 'center',
    alignItems: 'center',
  },
  largeCircle: {
    width: width * 1.5,
    height: width * 1.5,
    top: height * 0.15,
    zIndex: 1, 
  },
  // Logo above form
  logo: {
    width: width * 0.5, 
    height: width * 0.5,
    resizeMode: 'contain', 
    marginBottom: 20,
  },
  
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
    fontSize: 16,
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
