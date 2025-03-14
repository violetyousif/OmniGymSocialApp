import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
} from "react-native";
import { useRouter } from "expo-router";
import { Picker } from "@react-native-picker/picker";
//import { db, doc, getDoc } from "../../firebaseConfig"; // Firebase commented out

const RegisterGym = () => {
  const router = useRouter();
  const [selectedGym, setSelectedGym] = useState("");
  const [membershipID, setMembershipID] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  // Simulated membership database ---- THIS IS USED FOR THE FRONTEND TESTING
  const validMemberships: Record<string, string[]> = {
    goldsgym: ["GG112233", "GG445566", "GG778899"],
    planetfitness: ["PL112233", "PL998877", "PL554433"],
    anytimefitness: ["AF112233", "AF443322", "AF667788"],
  };

  // Function to validate gym membership -- FRONTEND TESTING
  const handleSubmit = async () => {
    if (!selectedGym || !membershipID) {
      setErrorMessage("Please select a gym and enter your Membership ID.");
      return;
    }

    // Map gym name to gym code
    const gymCodeMap: Record<string, string> = {
      goldsgym: "GG",
      planetfitness: "PL",
      anytimefitness: "AF",
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
      setErrorMessage("Invalid Member/Gym ID. Please try again.");
    }

    // Commented out Firebase database logic  --- GENEREATD LOGIC FROM CHATGPT FOR DATABASE MAKE SURE TO UNCOMMENT THE INMPORT LINE 12
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
        source={require("../../assets/images/RegisterGymLogo.png")}
        style={styles.logo}
      />

      {/* Gym Dropdown */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Gym</Text>
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={selectedGym}
            onValueChange={(itemValue) => setSelectedGym(itemValue)}
            style={styles.picker}
            dropdownIconColor="#333"
          >
            <Picker.Item label="Select Gym" value="" />
            <Picker.Item label="Gold's Gym" value="goldsgym" />
            <Picker.Item label="Planet Fitness" value="planetfitness" />
            <Picker.Item label="Anytime Fitness" value="anytimefitness" />
          </Picker>
        </View>
      </View>

      {/* Membership ID Input */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Membership ID</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter Membership ID"
          placeholderTextColor="#999"
          value={membershipID}
          onChangeText={setMembershipID}
        />
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
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
    paddingHorizontal: 20,
  },
  logo: {
    width: 200,
    height: 200,
    resizeMode: "contain",
    marginBottom: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#000",
  },
  inputContainer: {
    width: "70%",
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: "500",
    marginBottom: 5,
    color: "#000",
  },
  pickerContainer: {
    width: "100%",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    backgroundColor: "white",
    overflow: "hidden",
  },
  picker: {
    width: "100%",
    height: 50,
    color: "#333",
  },
  input: {
    width: "100%",
    height: 50,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    paddingHorizontal: 10,
    fontSize: 16,
    color: "#333",
  },
  errorText: {
    color: "red",
    fontSize: 14,
    marginBottom: 10,
  },
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
  backButton: {
    marginTop: 20,
  },
  backText: {
    color: "#000",
    fontSize: 14,
  },
});

export default RegisterGym;
