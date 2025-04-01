import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';
import { FontAwesome, Entypo } from '@expo/vector-icons';
import { supabase } from '../../../lib/supabase'; // Import supabase for database interaction (unused in this part of the code)
import { useRouter } from 'expo-router'; // Import for navigating between screens
import { Dimensions } from 'react-native';
 
const { width } = Dimensions.get('window'); // Get screen width for responsive design
 
const Profile = () => {
  const router = useRouter();
 
 
  return (
    <ScrollView style={styles.container}>
      {/* Full-Width Header */}
      <View style={styles.topBar}>
        <View style={styles.logoContainer}>
          {/* Logo of the app */}
          <Image source={require('../../../assets/images/OmniGymLogo.png')} style={styles.logo} />
        </View>
 
        {/* Logout Button */}
        <TouchableOpacity onPress={() => router.replace('/(tabs)/Login')} style={styles.logoutContainer}>
          {/* Text for logout */}
          <Text style={styles.logout}>LOGOUT</Text>
        </TouchableOpacity>
 
        {/* Chat Icon - Aligned to Left */}
        <TouchableOpacity style={styles.chatIcon} onPress={() => alert('Open Chat')}>
          {/* Chat icon for messaging */}
          <FontAwesome name="comment" size={24} color="gray" />
        </TouchableOpacity>
      </View>
 
      {/* Profile Section */}
      <View style={styles.profileSection}>
        <Image
          source={{ uri: 'https://via.placeholder.com/150' }}
          style={styles.profileImage}
        />
        <Text style={styles.name}>Abdulla Maruf</Text>
        <Text style={styles.email}>amaruf@example.com</Text>
      </View>
 
      {/* General Info Section */}
      <View style={styles.infoSection}>
        <View style={styles.infoItem}>
          <Text style={styles.infoLabel}>Joined</Text> {/* Label for 'Joined' */}
          <Text style={styles.infoValue}>2018</Text> {/* Value for 'Joined' */}
        </View>
        <View style={styles.infoItem}>
          <Text style={styles.infoLabel}>Age</Text> {/* Label for 'Age' */}
          <Text style={styles.infoValue}>30</Text> {/* Value for 'Age' */}
        </View>
        <View style={styles.infoItem}>
          <Text style={styles.infoLabel}>Fitness Goal:</Text> {/* Label for 'Fitness Goal' */}
          <Text style={styles.infoValue}>Build Muscle</Text> {/* Value for 'Fitness Goal' */}
          <Text style={styles.openChat}>Open to Chat</Text> {/* Option to chat */}
        </View>
        <View style={styles.infoItem}>
          <FontAwesome name="trophy" size={20} color="gold" />
          <Text style={styles.infoValue}>3</Text>
        </View>
        <View style={styles.infoItem}>
          <Text style={styles.infoLabel}>Wilks 2 Score</Text> {/* Label for 'Wilks 2 Score' */}
          <Text style={styles.infoValue}>366</Text> {/* Wilks 2 Score value */}
        </View>
      </View>
 
      {/* PR Metrics Section */}
      <View style={styles.metricsSection}>
        {/* Scrollable horizontal list for PR metrics */}
        <ScrollView horizontal contentContainerStyle={styles.metricsContainer}>
          <View style={styles.metricItem}>
            <Text style={styles.metricIcon}>🏋️‍♂️</Text> {/* Bench Press Icon */}
            <Text style={styles.metricLabel}>Bench Press</Text> {/* Bench Press label */}
            <Text style={styles.metricValue}>105 lb</Text> {/* Bench Press value */}
          </View>
          <View style={styles.metricItem}>
            <Text style={styles.metricIcon}>🏋️‍♀️</Text> {/* Deadlift Icon */}
            <Text style={styles.metricLabel}>Deadlift</Text> {/* Deadlift label */}
            <Text style={styles.metricValue}>220 lb</Text> {/* Deadlift value */}
          </View>
          <View style={styles.metricItem}>
            <Text style={styles.metricIcon}>🏃‍♂️</Text> {/* Running Icon */}
            <Text style={styles.metricLabel}>Running Time</Text> {/* Running Time label */}
            <Text style={styles.metricValue}>5:30 min/km</Text> {/* Running Time value */}
          </View>
          <View style={styles.metricItem}>
            <Text style={styles.metricIcon}>🤸‍♂️</Text> {/* Squats Icon */}
            <Text style={styles.metricLabel}>Squats</Text> {/* Squats label */}
            <Text style={styles.metricValue}>220 lb</Text> {/* Squats value */}
          </View>
        </ScrollView>
      </View>
 
      {/* PR Song Section */}
      <View style={styles.prSongSection}>
        <Entypo name="controller-play" size={24} color="white" />
        <View style={{ marginLeft: 10 }}>
          <Text style={styles.prSong}>PR Song:</Text>
          <Text style={styles.songTitle}>"Goddess" by Written by Wolves</Text>
        </View>
      </View>
 
      {/* Graph Placeholder */}
      <View style={styles.graphSection}>
        <Text style={styles.graphPlaceholder}>Graph Visualization</Text> {/* Placeholder text for graph */}
      </View>
    </ScrollView>
  );
};
 
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff', // White background color
    flex: 1, // Full screen height
  },
 
  // Full-Width Header
  topBar: {
    width: '100%',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    flexDirection: 'row', // Horizontal alignment for top bar elements
    alignItems: 'center', // Center align the items vertically
    justifyContent: 'space-between', // Space out logo, logout, and chat icons
    backgroundColor: '#FFF',
    paddingVertical: 18,
    elevation: 5,
    borderBottomWidth: 7,
    borderBottomColor: '#E97451', // Orange border color
  },
 
  // Centered Logo
  logoContainer: {
    flex: 1,
    alignItems: 'center',
  },
  logo: {
    width: 40,
    height: 40,
    resizeMode: 'contain', // Maintain aspect ratio
  },
 
  // Logout Button
  logoutContainer: {
    position: 'absolute',
    right: 20,
    bottom: 10,
  },
  logout: {
    fontSize: 14,
    fontWeight: 'bold',
    color: 'black', // Black color for logout text
  },
 
  // Chat Icon - Aligned to Left
  chatIcon: {
    position: 'absolute',
    left: 20,
    bottom: 10,
  },
 
  // Profile Section
  profileSection: {
    alignItems: 'center',
    marginTop: 100, // Space to position profile picture below top bar
    marginBottom: 10,
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60, // Circular image
    borderWidth: 2,
    borderColor: '#ddd', // Light gray border around image
  },
  name: {
    fontSize: 22,
    fontWeight: 'bold',
    marginTop: 10,
  },
  email: {
    fontSize: 16,
    color: 'gray', // Gray color for email
  },
 
  // General Info Section
  infoSection: {
    flexDirection: 'row', // Horizontal alignment of info items
    justifyContent: 'space-around', // Space out info items evenly
    marginVertical: 10,
    paddingVertical: 10,
    backgroundColor: '#f8f8f8', // Light gray background for info section
  },
  infoItem: {
    alignItems: 'center', // Center info items
  },
  infoLabel: {
    fontSize: 12,
    color: 'gray', // Gray color for labels
  },
  infoValue: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  openChat: {
    fontSize: 12,
    color: 'green', // Green color for 'Open to Chat'
  },
 
  // Metrics Section
  metricsSection: {
    marginVertical: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  metricsContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  metricItem: {
    alignItems: 'center',
    marginHorizontal: 20, // Space out metric items
  },
  metricIcon: {
    fontSize: 30, // Larger icons for PR metrics
  },
  metricLabel: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  metricValue: {
    fontSize: 14,
    marginTop: 5,
  },
 
  // PR Song Section
  prSongSection: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#333', // Dark background for PR song section
    padding: 10,
    marginHorizontal: 10,
    borderRadius: 8,
  },
  prSong: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  songTitle: {
    fontWeight: 'bold',
    color: '#fff',
    fontSize: 14,
  },
 
  // Graph Section
  graphSection: {
    height: 200,
    backgroundColor: '#eee', // Light gray background for graph section
    margin: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  graphPlaceholder: {
    fontSize: 16,
    color: 'gray',
  },
});
 
export default Profile;