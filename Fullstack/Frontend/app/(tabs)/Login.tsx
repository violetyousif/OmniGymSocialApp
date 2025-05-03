// Login.tsx
import React, { useState, useEffect } from 'react';
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
  TouchableWithoutFeedback,
  Platform,
} from 'react-native';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context'; // Safe Area Insets for iOS
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { supabase } from '../../lib/supabase'


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

  const [forgotPasswordVisible, setForgotPasswordVisible] = useState(false);
  const [forgotEmail, setForgotEmail] = useState('');


  // Email Validation Regex
  const validateEmail = (email: string) => {
    return email.match(
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
    );
  };

  // Password Validation (Must be at least8 characters)
  const validatePassword = (password: string) => {
    return password.length >= 8;
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

  const handleLogin = async () => {
    // Mark fields as touched to show errors if needed
    setIsTouchedEmail(true);
    setIsTouchedPassword(true);
  
    // Validate before making a request
    const emailIsValid = validateEmail(email);
    const passwordIsValid = validatePassword(password);
    
    if (!emailIsValid || !passwordIsValid) {
      return;
    }
  
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
  
      if (error) {
        console.error("Login error:", error.message);
        alert("Login failed: " + error.message);
      } else {
        console.log("Signed in:", data);
        router.replace('/(tabs)/screens/Home');    // Navigate after successful login
      }
    } catch (err) {
      console.error("Unexpected login error:", err);
      alert("Something went wrong. Please try again.");
    }
  };
  /* SUPABASE RESET PASSWORD
  const { error } = await supabase.auth.resetPasswordForEmail(forgotEmail);
  if (error) {
    alert('Error: ' + error.message);
  } else {
    alert('Password reset email sent!');
    setForgotPasswordVisible(false);
  }
  */

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
              // style={[styles.circle, { top: insets.top + 20 }]} // Dynamic Safe Area Adjustment
              style={styles.circle}
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
                  // onChangeText={setPassword}
                  onChangeText={handlePasswordChange}
                  onBlur={() => setIsTouchedPassword(true)}
                />
                {/* Eye Icon to Toggle Visibility */}
                <TouchableOpacity onPress={() => setIsPasswordVisible(!isPasswordVisible)} style={styles.eyeIcon}>
                  <Ionicons name={isPasswordVisible ? "eye-off" : "eye"} size={24} color="#888" />
                </TouchableOpacity>
              </View>
              {isTouchedPassword && isValidPassword === false && (
                <Text style={styles.errorText}>Password must be at least 8 characters</Text>
              )}

              {/* Buttons Sign in, Register, Forgot Password */}
              <TouchableOpacity style={styles.ButtonStyle} onPress={handleLogin}>
                <Text style={styles.buttonText}>Sign In</Text>
              </TouchableOpacity>
              {/* Register and Forgot Password */}
              <Text style={styles.default}>Don't have an account? <Text onPress={() => router.push('../auth/RegisterGym')} style={styles.registerText}>Register</Text></Text>
              <TouchableOpacity onPress={() => setForgotPasswordVisible(true)}>
                <Text style={styles.registerText}>Forgot Password?</Text>
              </TouchableOpacity>
            </View>
            {forgotPasswordVisible && (
              <View style={styles.modalOverlay}>

                <View style={styles.modalContent}>

                  <TouchableOpacity onPress={() => setForgotPasswordVisible(false)} style={styles.closeButton}>
                    <Text style={styles.closeButtonText}>✕</Text>
                  </TouchableOpacity>

                  <Text style={styles.modalTitle}>Reset Password</Text>
                  <Text style={styles.modalText}>Enter your email to receive a reset link:</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="Email"
                    keyboardType="email-address"
                    value={forgotEmail}
                    onChangeText={setForgotEmail}
                  />
                  <TouchableOpacity
                    style={[styles.ButtonStyle, { marginTop: 10 }]}
                    onPress={() => {
                      // TODO: Add Supabase password reset here
                      alert('Reset link sent to: ' + forgotEmail);
                      setForgotPasswordVisible(false);
                    }}
                  >
                    <Text style={styles.buttonText}>Send Reset Link</Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}
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
  width: wp('160%'),
  height: wp('160%'),
  borderRadius: wp('90%'),
  backgroundColor: '#F15A29',
  position: 'absolute',
  top: hp('12%'),
  // left: wp('%'),
  zIndex: 1,
},

// Form Box
form: {
  width: wp('80%'),
  backgroundColor: 'white',
  padding: 20,
  borderRadius: 20,
  alignItems: 'center',
  elevation: 5,
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.25,
  shadowRadius: 3.84,
  position: 'absolute',
  top: hp('19%'),
  alignSelf: 'center',
  zIndex: 3,
},
  // Input Margins
  input: {
    width: '100%',
    height: 50,
    borderWidth: 1,
    borderColor: '#D8D7D4',
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
  default: {
    fontSize: 18,
    color: '#252422',
  },
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
    borderColor: "#D8D7D4",
    borderRadius: 8,
    backgroundColor: "#fff",
    width: "100%",
    height: 50,
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
  modalOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0,0,0,0.6)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
  },
  modalContent: {
    width: '80%',
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    elevation: 5,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  modalText: {
    fontSize: 16,
    marginBottom: 10,
    textAlign: 'center',
  },
  closeButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    padding: 5,
    zIndex: 1,
  },
  closeButtonText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  
});

export default LoginScreen;

//#codebase