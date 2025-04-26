
import React, { useEffect, useState } from "react";
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
import { supabase } from '../../lib/supabase'
import { BACKEND_URL } from "../../lib/config";


const RegisterGym = () => {
  const router = useRouter();

  // Calls the backend to get the gym list
  const [gymOptions, setGymOptions] = useState<{ key: string; value: string }[]>([]);
  const [selectedGymName, setSelectedGymName] = useState<string>("");
  // const [selectedGym, setSelectedGym] = useState("");
  const [membershipID, setMembershipID] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [selectedGymCity, setSelectedGymCity] = useState<string>("");
  const [gymCityOptions, setGymCityOptions] = useState<{ key: string; value: string }[]>([]);
  
  const [selectedGymState, setSelectedGymState] = useState<string>("");
  const [gymStateOptions, setGymStateOptions] = useState<{ key: string; value: string }[]>([]);
  

  // useEffect(() => {
  //   const testSupabasePermission = async () => {
  //     const { data, error } = await supabase
  //       .from("AffilGyms")
  //       .select("*");
  
  //     if (error) {
  //       console.log("Permission Error:", error.message);
  //     } else {
  //       console.log("Data:", data);
  //     }
  //   };
  
  //   testSupabasePermission();
  //   return undefined; // Ensure no JSX or invalid return type

  // Load gym names from AffilGyms table
  useEffect(() => {
    const fetchGyms = async () => {
      const { data, error } = await supabase
        .from("AffilGyms")
        .select("gymName")
        .neq("gymName", "");

      if (error) {
        console.error("Error fetching gyms:", error.message);
        return;
      }

      const uniqueGyms = Array.from(new Set(data.map(g => g.gymName))).map(name => ({
        key: name,
        value: name
      }));

      setGymOptions(uniqueGyms);
    };

    fetchGyms();
  }, []);

  useEffect(() => {
    const fetchStates = async () => {
      if (!selectedGymName) return;
  
      try {
        const res = await fetch(`${BACKEND_URL}/api/getGymStates/?gymName=${encodeURIComponent(selectedGymName)}`);
        const result = await res.json();
        console.log("Raw response:", result);
  
        if (res.ok && result.states) {
          const formatted = result.states.map((state: string) => ({
            key: state,
            value: state,
          }));
          setGymStateOptions(formatted);
          console.log("Fetched gymStateOptions:", formatted);
        } else {
          setGymStateOptions([]);
        }
      } catch (err) {
        console.error("Error fetching states:", err);
        setGymStateOptions([]);
      }
    };
  
    fetchStates();
  }, [selectedGymName]);
  
  useEffect(() => {
    const fetchCities = async () => {
      if (!selectedGymName || !selectedGymState) return;
  
      try {
        const res = await fetch(
          `${BACKEND_URL}/api/getGymCities/?gymName=${encodeURIComponent(selectedGymName)}&gymState=${encodeURIComponent(selectedGymState)}`
        );
        const text = await res.text();
        console.log("Raw response:", text);
  
        const result = JSON.parse(text);
  
        if (res.ok && result.cities) {
          const formatted = result.cities.map((city: string) => ({
            key: city,
            value: city,
          }));
          setGymCityOptions(formatted);
          console.log("Fetched gymCityOptions:", formatted);
        } else {
          setGymCityOptions([]);
        }
      } catch (err) {
        console.error("Error fetching cities:", err);
        setGymCityOptions([]);
      }
    };
  
    fetchCities();
  }, [selectedGymName, selectedGymState]);
  
  
    // Handle Submit (Calls Django backend to verify)
    const handleSubmit = async () => {
      if (!selectedGymName || !membershipID) {
        setErrorMessage("Please select a gym and enter your Membership ID.");
        return;
      }
  
      try {
        console.log("Submitting with values:", {
          gymName: selectedGymName,
          gymCity: selectedGymCity,
          gymState: selectedGymState,
          memberID: membershipID
        });
        
        const res = await fetch(`${BACKEND_URL}/api/verifyMembership/`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            gymName: selectedGymName,
            gymCity: selectedGymCity,
            gymState: selectedGymState,
            memberID: membershipID,
          }),
          
        });
  
        const result = await res.json();
  
        if (!res.ok || !result.valid) {
          setErrorMessage(result.error || "Validation failed. Please try again.");
          return;
        }
  
        // Validated — go to RegisterAccount page
        setErrorMessage("");
        router.push({
          pathname: "/auth/RegisterAccount",
          params: {
            gymAbbr: result.gymAbbr,
            gymCity: result.gymCity,
            gymState: result.gymState,
            memberID: membershipID,
            firstName: result.firstName,
            lastName: result.lastName,
          },
        });
      } catch (err) {
        console.error("Verification error:", err);
        setErrorMessage("Server error. Please try again.");
      }
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
        Gym Member{"\n"}Verification
      </Text>

        {/* Gym Dropdown */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Gym</Text>
          <SelectList
            // setSelected={(val: string) => setSelectedGym(val)}
            // data={(gymList as unknown) as {key: string, value: string}[]}
            setSelected={setSelectedGymName}
            data={gymOptions}
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

        {/* Gym State */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Gym State</Text>
          <SelectList
            setSelected={(val: string) => setSelectedGymState(val)}
            data={gymStateOptions}
            save="value"
            placeholder="Select State"
            boxStyles={{ 
              borderColor: '#ccc', // border color
              borderRadius: 8, // border radius
              height: 50 // height
            }}
            dropdownStyles={{ maxHeight: 300 }} // Increase this to show more items (you can go higher)
            dropdownTextStyles={{ color: '#252422', fontSize: 16 }} // dropdown text color and size
            inputStyles={{ color: '#252422', fontSize: 16 }} // placeholder text color and size
          />
        </View>


        {/* Gym City */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Gym City</Text>
          <SelectList
            setSelected={setSelectedGymCity}
            data={gymCityOptions}
            save="value"
            placeholder="Select City"
            boxStyles={{ 
              borderColor: '#ccc', // border color
              borderRadius: 8, // border radius
              height: 50 // height
            }} 
            dropdownStyles={{ maxHeight: 300 }} // Increase this to show more items (you can go higher)
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

// Styles
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
    width: 100,
    height: 100,
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

//#codebase