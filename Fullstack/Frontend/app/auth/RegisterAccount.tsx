import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  ScrollView,
  Platform,
  Alert
} from "react-native";
import { useRouter } from "expo-router";
import { Checkbox } from "react-native-paper";
import moment from "moment";
import { Ionicons } from "@expo/vector-icons";
import { SelectList } from "react-native-dropdown-select-list";
import TermsModal from "../../components/TermsModal"; // Import the modal component
import { supabase } from '../../lib/supabase'
import { BACKEND_URL } from "../../lib/config";
import { useLocalSearchParams } from "expo-router";

  /**
   * 
   * 
   * 
   *  JAVASCRIPT
   * 
   * 
   * 
   */

const RegisterAccount: React.FC = () => {
  const router = useRouter();

  // State for modal user agreement visibility
  const [modalVisible, setModalVisible] = useState(false);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [birthDate, setBirthdate] = useState<string>("");
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [gender, setGender] = useState<string>("");
  const [agreedToTerms, setAgreedToTerms] = useState<boolean>(false);
  const [showPasswordPopup, setShowPasswordPopup] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const genderList = [
    {key: "Female", value: "Female"},
    {key: "Male", value: "Male"},
    {key: "Other", value: "Other"},
   ];

  // Validate to make sure it's an email
  const validateEmail = (email: string) => {
    return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);
  };

  // Validate Password to make sure all req are met
  const validatePassword = (password: string) => {
    const hasLower = /[a-z]/.test(password);
    const hasUpper = /[A-Z]/.test(password);
    const hasNumber = /\d/.test(password);
    const hasSpecial = /[!@#$%^&*]/.test(password);
    const isLongEnough = password.length >= 8;
  
    // Count how many conditions are met
    const conditionsMet = [hasLower, hasUpper, hasNumber, hasSpecial].filter(Boolean).length;
  
    return {
      hasLower,
      hasUpper,
      hasNumber,
      hasSpecial,
      isLongEnough,
      isValid: isLongEnough && conditionsMet >= 4, 
    };
  };
  
  const validation = validatePassword(password);
  
  // First Name function to make sure only letters
  const validateFirstName = (firstName: string) => {
    const formattedText = firstName.replace(/[^a-zA-Z]/g, "");
    let formattedName = formattedText;

    setFirstName(formattedName);
  };
  // Last Name function to make sure only letters
  const validateLastName = (firstName: string) => {
    const formattedText = firstName.replace(/[^a-zA-Z]/g, "");
    let formattedName = formattedText;

    setLastName(formattedName);
  };

  // Birthdate Function for handle slicling

  const handleBirthdateChange = (text: string) => {
    // Remove non-numeric characters and limit to 8 digits (MMDDYYYY)
    const formattedText = text.replace(/[^0-9]/g, "").slice(0, 8);
    let formattedDate = formattedText;
  
    if (formattedText.length >= 4) {
      formattedDate = formattedText.slice(0, 2) + "/" + formattedText.slice(2, 4) + "/" + formattedText.slice(4);
    } else if (formattedText.length >= 2) {
      formattedDate = formattedText.slice(0, 2) + "/" + formattedText.slice(2);
    }
  
    setBirthdate(formattedDate);
  
    if (formattedDate.length === 10) {
      const [month, day, year] = formattedDate.split("/").map(Number);
  
      // Validate month
      if (month < 1 || month > 12) {
        alert("Invalid month. Please enter a value between 01 and 12.");
        setBirthdate("");
        return;
      }
  
      // Validate year range
      if (year < 1900 || year > 2099) {
        alert("Invalid year. Please enter a value between 1900 and 2099.");
        setBirthdate("");
        return;
      }
  
      // Days in each month (Leap year handling included)
      const daysInMonth = new Date(year, month, 0).getDate();
  
      // Validate day
      if (day < 1 || day > daysInMonth) {
        alert(`Invalid day. ${month}/${year} only has ${daysInMonth} days.`);
        setBirthdate("");
        return;
      }
  
      // Validate age (must be at least 18 years old)
      const birthMoment = moment(formattedDate, "MM/DD/YYYY");
      const age = moment().diff(birthMoment, "years");
  
      if (age < 18) {
        alert("You must be at least 18 years old to register.");
        setBirthdate("");
      }
    }
  };

  // Phone Number Function to handle slicing and format
  const handlePhoneNumberChange = (text: string) => {
    const cleanedText = text.replace(/[^0-9]/g, "").slice(0, 10); // Limit to 10 digits
    let formattedNum = cleanedText;
  
    if (cleanedText.length > 3 && cleanedText.length <= 6) {
      formattedNum = cleanedText.slice(0, 3) + "-" + cleanedText.slice(3);
    } else if (cleanedText.length > 6) {
      formattedNum = cleanedText.slice(0, 3) + "-" + cleanedText.slice(3, 6) + "-" + cleanedText.slice(6);
    }
  
    setPhoneNumber(formattedNum);
  };

  const { gymAbbr, gymCity, gymState, memberID, firstName: passedFirst, lastName: passedLast } = useLocalSearchParams();
  // const { gymAbbr, firstName: passedFirst, lastName: passedLast } = useLocalSearchParams();


  useEffect(() => {
    if (passedFirst) setFirstName(String(passedFirst));
    if (passedLast) setLastName(String(passedLast));
  }, []);


  // Handle onClick for submit button
  const handleSubmit = async () => {
    let errors = [];
    // Removes non numeric char
    const numericPhone = phoneNumber.replace(/\D/g, "");
    const numericBirth = birthDate.replace(/\D/g, "");

    // Makes sure inputs are vaild
    if (!agreedToTerms) {
      errors.push("You must agree to the terms before continuing.");
    }
    if (!validateEmail(email)) {
      errors.push("Invalid email format.");
    }
    if (!validation.isValid) {
      errors.push("Password does not meet the required criteria.");
    }
    if (firstName.trim() === "") {
      errors.push("First name is required.");
    }
    if (lastName.trim() === "") {
      errors.push("Last name is required.");
    }
    if (numericBirth.length < 8) {
      errors.push("Valid Birthdate is required");
    }
    if (numericPhone.length < 10) {
      errors.push("Valid phone number is required");
    }
    if (gender.trim() === "") {
      errors.push("Gender selection is required.");
    }
  
    if (errors.length > 0) {
      alert(errors.join("\n"));
      return;
    }
  

    try {
      const res = await fetch(`${BACKEND_URL}/api/register/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          password,
          firstName,
          lastName,
          phoneNum: phoneNumber,
          birthDate,
          gender,
          termsAccepted: agreedToTerms,
          gymAbbr,
          gymCity,
          gymState,
          memberID,
        }),
      });
        

      let result;
      try {
        result = await res.json();
      } catch (parseErr) {
        console.error("JSON parse failed:", parseErr);
        alert("Unexpected server response.");
        return;
      }

      if (res.ok) {
        Alert.alert('Success', 'Registration successful!');
        router.push("../(tabs)/Login");
      } else {
        alert(result.error || JSON.stringify(result) || "Registration failed.");
      }

    } catch (err) {
      console.error("Registration error:", err);
      Alert.alert('Error', "Server error or no connection.");
    }
    router.push("../(tabs)/Login"); // ROUTES TO THE NEXT PAGE (Back to login)
  };

  /**
   * 
   * 
   * 
   *  TYPESCRIPT
   * 
   * 
   * 
   */
  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>

      {/* Logo/Title */}
      <View style={styles.container}>
        <Image
        source={require("../../assets/images/OrangeLogo.png")}
        style={styles.logo}
        />

      {/* Title */}
      <Text style={styles.title}>
        Register Account
      </Text>

        {/* Email Input */}
        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.input}
          placeholder="your.email@example.com"
          placeholderTextColor="#999"
          value={email}
          onChangeText={(text) => setEmail(text.replace(/\s/g, ""))} // Prevent spaces
          keyboardType="email-address"
          autoCapitalize="none"
        />

        {/* Password Input */}
        <Text style={styles.label}>Password</Text>
        <View style={[styles.passwordContainer, { height: 50 }]}>
          <TextInput
            placeholder="Password"
            secureTextEntry={!isPasswordVisible} // Toggles visibility
            style={[styles.input, styles.passwordInput, { height: 50 }]}
            value={password}
            // onChangeText={setPassword}
            onChangeText={(text) => setPassword(text.replace(/\s/g, ""))} // Prevent spaces
            onFocus={() => setShowPasswordPopup(true)}
            onBlur={() => setShowPasswordPopup(false)}
          />
          {/* Eye Icon to Toggle Visibility */}
          <TouchableOpacity onPress={() => setIsPasswordVisible(!isPasswordVisible)} style={styles.eyeIcon}>
            <Ionicons name={isPasswordVisible ? "eye-off" : "eye"} size={24} color="#888" />
          </TouchableOpacity>
        </View>

        {/* Password Validation Popup */}
        {showPasswordPopup && (
          <View style={styles.validationContainer}>
            <Text style={styles.validationTitle}>Your password must contain:</Text>
            <Text style={validation.isLongEnough ? styles.valid : styles.invalid}>
              {validation.isLongEnough ? "✓" : "✕"} At least 8 characters
            </Text>
            <Text style={validation.hasLower ? styles.valid : styles.invalid}>
              {validation.hasLower ? "✓" : "✕"} Lowercase letters (a-z)
            </Text>
            <Text style={validation.hasUpper ? styles.valid : styles.invalid}>
              {validation.hasUpper ? "✓" : "✕"} Uppercase letters (A-Z)
            </Text>
            <Text style={validation.hasNumber ? styles.valid : styles.invalid}>
              {validation.hasNumber ? "✓" : "✕"} Numbers (0-9)
            </Text>
            <Text style={validation.hasSpecial ? styles.valid : styles.invalid}>
              {validation.hasSpecial ? "✓" : "✕"} Special characters (!@#$%^&*)
            </Text>
          </View>
        )}

        {/* First and Last Name Input Input */}
        <Text style={styles.label}>Name</Text>
          <TextInput
            style={styles.input}
            placeholder="First Name"
            placeholderTextColor="#999"
            value={firstName}
            onChangeText={validateFirstName}
          />
          <TextInput
            style={styles.input}
            placeholder="Last Name"
            placeholderTextColor="#999"
            value={lastName}
            onChangeText={validateLastName}
          />

        {/* Phone Number Input */}
        <Text style={styles.label}>Phone Number</Text>
        <TextInput
          style={styles.input}
          placeholder="222-222-2222"
          placeholderTextColor="#999"
          value={phoneNumber}
          onChangeText={handlePhoneNumberChange}
          keyboardType="phone-pad"
        />
        
      {/* Shorter Inputs: birthDate and Gender */}
        {/* Labels (adding labels first to allow line break) */}
        <View style={styles.shortContainer}>
          <Text style={styles.label}>Birthdate</Text>
          <Text style={[styles.label, styles.shortInput]}>Gender</Text>
        </View>
        {/* Birthdate Input */}
          <View style={styles.shortContainer}>
          <TextInput
            style={[styles.input, styles.shortInput]}
            placeholder="MM/DD/YYYY"
            placeholderTextColor="#999"
            value={birthDate}
            onChangeText={handleBirthdateChange}
            keyboardType="numeric"
            maxLength={10}
          />
          {/* Gender Select */}
            <View style={styles.shortInput}>
            <SelectList
              setSelected={(val: string) => setGender(val)}
              data={(genderList as unknown) as {key: string, value: string}[]}
              save="key"
              placeholder="Gender"
              boxStyles={{ 
              borderColor: '#ccc', // border color
              borderRadius: 8, // border radius
              height: 50 // height
              }} 
              dropdownTextStyles={{ color: '#252422', fontSize: 16 }} // dropdown text color and size
              inputStyles={{ color: '#252422', fontSize: 16 }} // placeholder text color and size
            />
            </View>
        </View>
        
        {/* Agree to Terms */}
        <View style={styles.agrmntContainer}>
          {/* Terms and Conditions Section */}
          <View style={styles.termsContainer}>
            <View style={{ 
              borderWidth: agreedToTerms ? 0 : 1, 
              borderColor: Platform.OS === "ios" ? "#585858" : '#fff', 
              borderRadius: 3, 
              transform: Platform.OS === "ios"
              ? [{ scale: agreedToTerms ? 1 : 0.5 }]
              : [{ scale: 1 }],
              }}>
              <Checkbox
                status={agreedToTerms ? "checked" : "unchecked"}
                onPress={() => setAgreedToTerms(!agreedToTerms)}
                color="#E97451"
                theme={{
                  colors: {
                    accent: "#E97451", // Fill color when checked
                    text: "#fff",      // Checkmark color
                  },
                }}
              />
            </View>
            <Text style={styles.termsText}>
              I agree to the{" "}
              <Text style={styles.linkText} onPress={() => setModalVisible(true)}>
                Terms & Conditions
              </Text>
            </Text>
          </View>

          {/* Terms Modal */}
          <TermsModal visible={modalVisible} onClose={() => setModalVisible(false)} />
        </View>

        {/* Submit Button */}
        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Text style={styles.buttonText}>Submit</Text>
        </TouchableOpacity>

        {/* Back Button */}
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <Text style={styles.backText}>← Previous</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

  /**
   * 
   * 
   * 
   *  CSS
   * 
   * 
   * 
   */

const styles = StyleSheet.create({
  // Scroll Container and main
  scrollContainer: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    width: "100%",
    maxWidth: 350,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
    paddingHorizontal: 15,
    paddingVertical: 20,
  },

  // Logo styling
  logo: {
    width: 80,
    height: 80,
    resizeMode: "contain",
    marginTop: Platform.OS === 'ios' ? 50 : 10,
  },

  // Title
  title: {
    fontSize: 28,
    textAlign: "center",
    fontWeight: "bold",
    marginBottom: 20,
    color: "#252422",
  },

  // Labels
  label: {
    fontSize: 16,
    fontWeight: "500",
    alignSelf: "flex-start",
    marginBottom: 3,
    color: "#000",
    marginTop: 10,
  },
  
  // input 
  input: {
    width: "100%",
    height: 50,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    paddingHorizontal: 10,
    fontSize: 16,
    marginBottom: 5,
    color: "#333",
  },

  // Short container fields
  shortContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  shortInput: {
    width: "48%",
    textAlign: "left",
  },

  // Checkbox
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "flex-start",
    marginBottom: 10,
  },
  checkboxLabel: {
    fontSize: 16,
    marginLeft: 6,
  },

  // Submit button
  button: {
    backgroundColor: "#E97451",
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 8,
    marginTop: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },

  // Back Button
  backButton: {
    marginTop: 15,
  },
  backText: {
    color: "#000",
    fontSize: 14,
  },

  // Validation container for password requirements
  validationContainer: {
    width: "100%",
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ccc",
    marginBottom: 10,
  },
  validationTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
  subTitle: {
    fontSize: 14,
    fontWeight: "bold",
    marginTop: 5,
  },
  valid: {
    fontSize: 14,
    color: "green",
    marginTop: 3,
  },
  invalid: {
    fontSize: 14,
    color: "red",
    marginTop: 3,
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
    marginBottom: 10,
  },
  eyeIcon: {
    position: "absolute",
    right: 10,
    justifyContent: "center",
    alignItems: "center",
  },

  // Terms and Conditions Modal
  agrmntContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  termsContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 20,
  },
  termsText: {
    fontSize: 16,
    marginLeft: 10,
  },
  linkText: {
    color: "#007bff",
    textDecorationLine: "underline",
  },
});

export default RegisterAccount;