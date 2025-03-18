import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  ScrollView,
} from "react-native";
import { useRouter } from "expo-router";
import { Picker } from "@react-native-picker/picker";
import { Checkbox } from "react-native-paper";
import moment from "moment";
import { Ionicons } from "@expo/vector-icons";


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
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [birthDate, setBirthDate] = useState<string>("");
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [gender, setGender] = useState<string>("");
  const [agreedToTerms, setAgreedToTerms] = useState<boolean>(false);
  const [showPasswordPopup, setShowPasswordPopup] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

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
  const handleBirthDateChange = (text: string) => {
    // Remove non-numeric characters and limit to 8 digits (MMDDYYYY)
    const formattedText = text.replace(/[^0-9]/g, "").slice(0, 8);
    let formattedDate = formattedText;
  
    if (formattedText.length >= 4) {
      formattedDate = formattedText.slice(0, 2) + "/" + formattedText.slice(2, 4) + "/" + formattedText.slice(4);
    } else if (formattedText.length >= 2) {
      formattedDate = formattedText.slice(0, 2) + "/" + formattedText.slice(2);
    }
  
    setBirthDate(formattedDate);
  
    if (formattedDate.length === 10) {
      const [month, day, year] = formattedDate.split("/").map(Number);
  
      // Validate month
      if (month < 1 || month > 12) {
        alert("Invalid month. Please enter a value between 01 and 12.");
        setBirthDate("");
        return;
      }
  
      // Validate year range
      if (year < 1900 || year > 2099) {
        alert("Invalid year. Please enter a value between 1900 and 2099.");
        setBirthDate("");
        return;
      }
  
      // Days in each month (Leap year handling included)
      const daysInMonth = new Date(year, month, 0).getDate();
  
      // Validate day
      if (day < 1 || day > daysInMonth) {
        alert(`Invalid day. ${month}/${year} only has ${daysInMonth} days.`);
        setBirthDate("");
        return;
      }
  
      // Validate age (must be at least 18 years old)
      const birthMoment = moment(formattedDate, "MM/DD/YYYY");
      const age = moment().diff(birthMoment, "years");
  
      if (age < 18) {
        alert("You must be at least 18 years old to register.");
        setBirthDate("");
      }
    }
  };

  // Phone Number Function to handle slicing and formate
  const handlePhoneNumberChange = (text: string) => {
    const formattedText = text.replace(/[^0-9]/g, "").slice(0, 10);
    let formattedNum = formattedText;
    if (formattedText.length >= 4) {
      formattedNum = formattedText.slice(0, 3) + "-" + formattedText.slice(3, 6) + "-" + formattedText.slice(6);
    }
    setPhoneNumber(formattedNum);
  };

  // Handle onClick for submit button
  const handleSubmit = () => {
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
  
    // If everything is valid, log the user data
    console.log("User Registered:", {
      email,
      password,
      firstName,
      lastName,
      birthDate,
      phoneNumber,
      gender,
    });
  
    router.push("../"); // ROUTES TO THE NEXT PAGE
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
          source={require("../../assets/images/RegisterAcccountLogo.png")}
          style={styles.logo}
        />

        {/* Email Input */}
        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.input}
          placeholder="your.email@example.com"
          placeholderTextColor="#999"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />

        {/* Password Input */}
        <Text style={styles.label}>Password</Text>
        <View style={styles.passwordContainer}>
          <TextInput
            placeholder="Password"
            secureTextEntry={!isPasswordVisible} // Toggles visibility
            style={[styles.input, styles.passwordInput]}
            value={password}
            onChangeText={setPassword}
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
              {validation.isLongEnough ? "✅" : "⚫"} At least 8 characters
            </Text>
            <Text style={validation.hasLower ? styles.valid : styles.invalid}>
              {validation.hasLower ? "✅" : "⚫"} Lowercase letters (a-z)
            </Text>
            <Text style={validation.hasUpper ? styles.valid : styles.invalid}>
              {validation.hasUpper ? "✅" : "⚫"} Uppercase letters (A-Z)
            </Text>
            <Text style={validation.hasNumber ? styles.valid : styles.invalid}>
              {validation.hasNumber ? "✅" : "⚫"} Numbers (0-9)
            </Text>
            <Text style={validation.hasSpecial ? styles.valid : styles.invalid}>
              {validation.hasSpecial ? "✅" : "⚫"} Special characters (!@#$%^&*)
            </Text>
          </View>
        )}

        {/* First and Last Name Input Input */}
        <Text style={styles.label}>Name</Text>
        <View style={styles.nameContainer}>
          <TextInput
            style={[styles.input, styles.nameInput]}
            placeholder="First Name"
            placeholderTextColor="#999"
            value={firstName}
            onChangeText={validateFirstName}
          />
          <TextInput
            style={[styles.input, styles.nameInput]}
            placeholder="Last Name"
            placeholderTextColor="#999"
            value={lastName}
            onChangeText={validateLastName}
          />
        </View>

        {/* Birthdate Input */}
        <Text style={styles.label}>Birth Date (MM/DD/YYYY)</Text>
        <TextInput
          style={styles.input}
          placeholder="MM/DD/YYYY"
          placeholderTextColor="#999"
          value={birthDate}
          onChangeText={handleBirthDateChange}
          keyboardType="numeric"
          maxLength={10}
        />

        {/* Phonenumber Input */}
        <Text style={styles.label}>Phone Number</Text>
        <TextInput
          style={styles.input}
          placeholder="222-222-2222"
          placeholderTextColor="#999"
          value={phoneNumber}
          onChangeText={handlePhoneNumberChange}
          keyboardType="phone-pad"
        />
        
        {/* Gender Select */}
        <Text style={styles.label}>Gender</Text>
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={gender}
            onValueChange={(itemValue) => setGender(itemValue)}
            style={styles.picker}
            
          >
            <Picker.Item label="Select Gender" value="" />
            <Picker.Item label="Male" value="male" />
            <Picker.Item label="Female" value="female" />
            <Picker.Item label="Other" value="other" />
          </Picker>
        </View>
        
        {/* Agree to Terms */}
        <View style={styles.checkboxContainer}>
          <Checkbox
            status={agreedToTerms ? "checked" : "unchecked"}
            onPress={() => setAgreedToTerms(!agreedToTerms)}
            color="#E97451"
          />
          <Text style={styles.checkboxLabel}>Agree to terms</Text>
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
    width: 220,
    height: 220,
    resizeMode: "contain",
    marginBottom: -50,
  },

  // Labels
  label: {
    fontSize: 14,
    fontWeight: "500",
    alignSelf: "flex-start",
    marginBottom: 3,
    color: "#000",
  },
  
  // input 
  input: {
    width: "100%",
    height: 40,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 6,
    paddingHorizontal: 10,
    fontSize: 14,
    marginBottom: 10,
    color: "#333",
  },

  // First and Last name fields
  nameContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  nameInput: {
    width: "48%",
  },

  // Birthdate input field
  dateInput: {
    width: "100%",
    height: 40,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 6,
    justifyContent: "center",
    paddingHorizontal: 10,
    marginBottom: 10,
    backgroundColor: "#fff",
  },
  dateText: {
    fontSize: 14,
    color: "#333",
  },
  pickerContainer: {
    width: "100%",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 6,
    backgroundColor: "white",
    overflow: "hidden",
    marginBottom: 10,
  },
  
  // Gender Picker field
  picker: {
    width: "100%",
    height: 50,
    color: "#333",
  },

  // Checkbox
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "flex-start",
    marginBottom: 10,
  },
  checkboxLabel: {
    fontSize: 14,
    marginLeft: 6,
  },

  // Submit button
  button: {
    backgroundColor: "#E97451",
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 6,
    marginTop: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "bold",
  },

  // Back Button
  backButton: {
    marginTop: 15,
  },
  backText: {
    color: "#000",
    fontSize: 12,
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

export default RegisterAccount;
