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
import { SelectList } from "react-native-dropdown-select-list";

const RegisterGym = () => {
  const router = useRouter();

  const [selectedGym, setSelectedGym] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [selectedZip, setSelectedZip] = useState("");
  const [membershipID, setMembershipID] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const gymList = [
    { key: "lifetimefitness", value: "Lifetime Fitness" },
    { key: "planetfitness", value: "Planet Fitness" },
  ];

  const gymCityList = [
    { key: "macomb", value: "Macomb" },
    { key: "sterlingheights", value: "Sterling Heights" },
    { key: "utica", value: "Utica" },
    { key: "detroit", value: "Detroit" },
    { key: "warren", value: "Warren" },
  ];

  const gymZipMap: Record<string, { key: string; value: string }[]> = {
    macomb: [
      { key: "48042", value: "48042" },
      { key: "48044", value: "48044" },
    ],
    sterlingheights: [
      { key: "48310", value: "48310" },
      { key: "48312", value: "48312" },
      { key: "48313", value: "48313" },
    ],
    utica: [
      { key: "48315", value: "48315" },
      { key: "48317", value: "48317" },
    ],
    detroit: [
      { key: "48201", value: "48201" },
      { key: "48226", value: "48226" },
      { key: "48228", value: "48228" },
    ],
    warren: [
      { key: "48089", value: "48089" },
      { key: "48091", value: "48091" },
      { key: "48092", value: "48092" },
    ],
  };

  const validMemberships: Record<string, string[]> = {
    lifetimefitness: ["LTF112233", "LTF443322", "LTF667788"],
    planetfitness: ["PF112233", "PF998877", "PF554433"],
  };

  const handleSubmit = async () => {
    let errors = [];

    if (!selectedGym) errors.push("Please select a gym");
    if (!membershipID) errors.push("Please enter your Membership ID.");
    if (!selectedCity) errors.push("Please select a City.");
    if (!selectedZip) errors.push("Please select a Zip.");

    if (errors.length > 0) {
      alert(errors.join("\n"));
      return;
    }

    const gymCodeMap: Record<string, string> = {
      lifetimefitness: "LTF",
      planetfitness: "PF",
    };

    const gymPrefix = gymCodeMap[selectedGym];

    if (!gymPrefix) {
      setErrorMessage("Invalid gym selection.");
      return;
    }

    const membershipKey = `${gymPrefix}${membershipID}`;

    if (validMemberships[selectedGym]?.includes(membershipKey)) {
      setErrorMessage("");
      router.push("/auth/RegisterAccount");
    } else {
      setErrorMessage("Invalid Gym Member ID. Please try again.");
    }
  };

  return (
    <View style={styles.container}>
      <Image
        source={require("../../assets/images/OrangeLogo.png")}
        style={styles.logo}
      />
      <Text style={styles.title}>
        Gym Member{"\n"}
        Verification
      </Text>

      {/* Gym Dropdown */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Gym</Text>
        <SelectList
          setSelected={(val: string) => setSelectedGym(val)}
          data={gymList}
          save="key"
          placeholder="Select Gym"
          boxStyles={styles.dropdownBox}
          dropdownTextStyles={styles.dropdownText}
          inputStyles={styles.dropdownInput}
        />
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

      {/* City Dropdown */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>City</Text>
        <SelectList
          setSelected={(val: string) => {
            setSelectedCity(val);
            setSelectedZip(""); // Clear ZIP when city changes
          }}
          data={gymCityList}
          save="key"
          placeholder="City"
          boxStyles={styles.dropdownBox}
          dropdownTextStyles={styles.dropdownText}
          inputStyles={styles.dropdownInput}
        />
      </View>

      {/* Zip Dropdown (disabled until city is selected) */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Zip</Text>
        <View pointerEvents={selectedCity ? "auto" : "none"}>
          <SelectList
            setSelected={(val: string) => setSelectedZip(val)}
            data={selectedCity ? gymZipMap[selectedCity] || [] : []}
            save="key"
            placeholder={selectedCity ? "Select Zip" : "Select City First"}
            boxStyles={{
              ...styles.dropdownBox,
              backgroundColor: selectedCity ? "#fff" : "#f0f0f0",
              opacity: selectedCity ? 1 : 0.6,
            }}
            dropdownTextStyles={styles.dropdownText}
            inputStyles={{
              color: selectedCity ? "#252422" : "#999",
              fontSize: 16,
            }}
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
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
    paddingHorizontal: 20,
  },
  logo: {
    width: 150,
    height: 150,
    resizeMode: "contain",
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    textAlign: "center",
    fontWeight: "bold",
    marginBottom: 20,
    color: "#252422",
    lineHeight: 40,
  },
  inputContainer: {
    width: "70%",
    marginBottom: 20,
  },
  label: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
    color: "#000",
  },
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
  dropdownBox: {
    borderColor: "#ccc",
    borderRadius: 8,
    height: 50,
  },
  dropdownText: {
    color: "#252422",
    fontSize: 16,
  },
  dropdownInput: {
    color: "#252422",
    fontSize: 16,
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
    paddingTop: 40,
    marginTop: 20,
  },
  backText: {
    color: "#000",
    fontSize: 14,
  },
});

export default RegisterGym;
