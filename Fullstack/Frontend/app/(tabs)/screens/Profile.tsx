import React from 'react';
import { View, Text, StyleSheet, Image, Button } from 'react-native';

const Profile = () => {
  return (
    <View style={styles.container}>
      {/* Profile Image */}
      <Image 
        source={{ uri: 'https://via.placeholder.com/150' }} // Replace with actual user image
        style={styles.profileImage}
      />
      
      {/* User Info */}
      <Text style={styles.name}>John Doe</Text>
      <Text style={styles.email}>johndoe@example.com</Text>

      {/* Edit Profile Button */}
      <Button title="Edit Profile" onPress={() => alert('Edit Profile Clicked')} />

      {/* Logout Button */}
      <Button title="Logout" onPress={() => alert('Logout Clicked')} color="red" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 20,
  },
  name: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  email: {
    fontSize: 16,
    color: 'gray',
    marginBottom: 20,
  },
});

export default Profile;
