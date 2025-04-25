import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

// Define the props type
interface GenderSelectorProps {
  gender: string; // The currently selected gender
  setGender: (gender: string) => void; // Function to update the gender
}

// GenderSelector.tsx
const GenderSelector: React.FC<GenderSelectorProps> = ({ gender, setGender }) => {
  const options = ['Male', 'Female'];
  return (
    <View>
      <Text style={styles.label}>Gender:</Text>
      <View style={styles.radioGroup}>
        {options.map((option) => (
          <TouchableOpacity
            key={option}
            style={styles.radioButton}
            onPress={() => setGender(option)}
          >
            <View style={styles.circle}>
              {gender === option && <View style={styles.checkedCircle} />}
            </View>
            <Text style={styles.radioText}>{option}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  label: {
    fontSize: 16,
    marginBottom: 8,
  },
  radioGroup: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginBottom: 16,
  },
  radioButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 20,
  },
  circle: {
    height: 20,
    width: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#ED7446',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
  },
  checkedCircle: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#ED7446',
  },
  radioText: {
    fontSize: 16,
    color: '#333',
  },
});

export default GenderSelector;
