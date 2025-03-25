import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { useRouter } from "expo-router";
import { SelectList } from "react-native-dropdown-select-list";
//import { db, doc, getDoc } from "../../firebaseConfig"; // Firebase commented out

const RegisterGym = () => {
  const router = useRouter();

  const [selectedGym, setSelectedGym] = useState("");
  const [membershipID, setMembershipID] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  // Dropdown list for gyms ---- THIS IS USED FOR THE FRONTEND TESTING
  const gymList = [
    {key: "lifetimefitness", value: "Lifetime Fitness"},
    {key: "planetfitness", value: "Planet Fitness"},
   ];

  // Simulated membership database ---- THIS IS USED FOR THE FRONTEND TESTING
  const validMemberships: Record<string, string[]> = {
    lifetimefitness: ["LTF112233", "LTF443322", "LTF667788"],
    planetfitness: ["PF112233", "PF998877", "PF554433"],
  };

  // Function to validate gym membership -- FRONTEND TESTING
  const handleSubmit = async () => {
    if (!selectedGym || !membershipID) {
      setErrorMessage("Please select a gym and enter your Membership ID.");
      return;
    }

    // Map gym name to gym code
    const gymCodeMap: Record<string, string> = {
      lifetimefitness: "LTF",
      planetfitness: "PF",
    };

    const gymPrefix = gymCodeMap[selectedGym];

    if (!gymPrefix) {
      setErrorMessage("Invalid gym selection.");
      return;
    }

    // Simulated member key (Gym Code + Membership ID)
    const membershipKey = `${gymPrefix}${membershipID}`;

    // Simulated database check  ----- THIS IS FRONT END TESTING
    if (validMemberships[selectedGym]?.includes(membershipKey)) {
      console.log("Membership valid:", membershipKey);
      setErrorMessage(""); // Clear error
      router.push("/auth/RegisterAccount"); 
    } else {
      console.log("Invalid Membership:", membershipKey);
      setErrorMessage("Invalid Gym Member ID. Please try again.");
    }

    // Commented out Firebase database logic  --- GENERATED LOGIC FROM CHATGPT FOR DATABASE MAKE SURE TO UNCOMMENT THE INMPORT LINE 12
    /*
    try {
      const memberRef = doc(db, "memberships", membershipKey);
      const memberSnap = await getDoc(memberRef);

      if (memberSnap.exists()) {
        // Membership is valid, navigate to the next page
        router.push("/nextPage"); // Replace with your actual next page
      } else {
        setErrorMessage("Invalid Member/Gym ID. Please try again.");
      }
    } catch (error) {
      console.error("Error checking membership:", error);
      setErrorMessage("An error occurred. Please try again.");
    }
    */
  };

  return (

    <View style={styles.container}>
      {/* Logo */}
      <Image
        source={require("../../assets/images/OrangeLogo.png")}
        style={styles.logo}
      />
      {/* Title */}
      <Text style={styles.title}>
        Gym Member{"\n"}
        Verification
      </Text>

        {/* Gym Dropdown */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Gym</Text>
          <SelectList
            setSelected={(val: string) => setSelectedGym(val)}
            data={(gymList as unknown) as {key: string, value: string}[]}
            save="key"
            placeholder="Select Gym"
            boxStyles={{ 
              borderColor: '#ccc', // border color
              borderRadius: 8, // border radius
              height: 50 // height
            }} 
            dropdownTextStyles={{ color: '#252422', fontSize: 16 }} // dropdown text color and size
            inputStyles={{ color: '#252422', fontSize: 16 }} // placeholder text color and size
          />
        </View>

      {/* Membership ID Input */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Membership ID</Text>
          <View style={styles.dropdownContainer}>
          <TextInput
            style={styles.input}
            placeholder="Enter Membership ID"
            placeholderTextColor="#999"
            value={membershipID}
            onChangeText={setMembershipID}
          />
        </View>
      </View>

      {/* Error Message */}
      {errorMessage ? <Text style={styles.errorText}>{errorMessage}</Text> : null}

      {/* Submit Button */}
      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Submit</Text>
      </TouchableOpacity>

      {/* Back Button */}
      <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
        <Text style={styles.backText}>← Previous</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  // Main Container
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
    paddingHorizontal: 20,
  },
  // Logo Styling
  logo: {
    width: 150,
    height: 150,
    resizeMode: "contain",
    marginBottom: 20,
  },
  // Title
  title: {
    fontSize: 28,
    textAlign: "center",
    fontWeight: "bold",
    marginBottom: 20,
    color: "#252422",
    lineHeight: 40,
  },
  // Input Container
  inputContainer: {
    width: "70%",
    marginBottom: 20,
  },
  // Labels/input headers
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
    color: "#000",
  },
  // dropdown Container
  dropdownContainer: {
    width: "100%",
    borderWidth: 1,
    borderColor: '#D8D7D4',
    borderRadius: 8,
    overflow: "hidden",
  },
  // Input field
  input: {
    width: "100%",
    height: 50,
    borderWidth: 1,
    borderColor: "#D8D7D4",
    borderRadius: 8,
    paddingHorizontal: 10,
    fontSize: 16,
    color: "#333",
  },
  // Error Message
  errorText: {
    color: "red",
    fontSize: 14,
    marginBottom: 10,
  },
  
  // Submit Button
  button: {
    backgroundColor: "#E97451",
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 8,
    marginTop: 20,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },

  // Previous/back Button
  backButton: {
    paddingTop: 40,
    marginTop: 20,
  },
  backText: {
    color: "#000",
    fontSize: 14,
  },
});

export default RegisterGym;
