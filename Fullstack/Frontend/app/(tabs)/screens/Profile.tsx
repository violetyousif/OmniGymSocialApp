import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';
import { FontAwesome, Entypo } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { Dimensions } from 'react-native';
import { supabase } from '../../../lib/supabase'
import { Session } from '@supabase/supabase-js'
 
const { width } = Dimensions.get('window');
 
const Profile = () => {
  const router = useRouter();
 
  // Static Local Profile Image
  // const profileImage = require('../../../assets/images/Maruf.jpg');
 
  return (
    <ScrollView style={styles.container}>
      {/* Full-Width Header */}
      <View style={styles.topBar}>
        <View style={styles.logoContainer}>
          <Image source={require('../../../assets/images/OmniGymLogo.png')} style={styles.logo} />
        </View>
 
        {/* Logout Button */}
        <TouchableOpacity onPress={() => router.replace('/(tabs)/Login')} style={styles.logoutContainer}>
          <Text style={styles.logout}>LOGOUT</Text>
        </TouchableOpacity>
 
        {/* Chat Icon - Aligned to Left */}
        <TouchableOpacity style={styles.chatIcon} onPress={() => alert('Open Chat')}>
          <FontAwesome name="comment" size={24} color="gray" />
        </TouchableOpacity>
      </View>
 
      {/* Profile Section */}
      <View style={styles.profileSection}>
        {/* <Image source={profileImage} style={styles.profileImage} /> */}
        <Text style={styles.name}>Abdulla Maruf</Text>
        <Text style={styles.email}>amaruf@example.com</Text>
      </View>
 
      {/* General Info Section */}
      <View style={styles.infoSection}>
        <View style={styles.infoItem}>
          <Text style={styles.infoLabel}>Joined</Text>
          <Text style={styles.infoValue}>2018</Text>
        </View>
        <View style={styles.infoItem}>
          <Text style={styles.infoLabel}>Age</Text>
          <Text style={styles.infoValue}>30</Text>
        </View>
        <View style={styles.infoItem}>
          <Text style={styles.infoLabel}>Fitness Goal:</Text>
          <Text style={styles.infoValue}>Build Muscle</Text>
          <Text style={styles.openChat}>Open to Chat</Text>
        </View>
        <View style={styles.infoItem}>
          <FontAwesome name="trophy" size={20} color="gold" />
          <Text style={styles.infoValue}>3</Text>
        </View>
        <View style={styles.infoItem}>
          <Text style={styles.infoLabel}>Wilks 2 Score</Text>
          <Text style={styles.infoValue}>366</Text>
        </View>
      </View>
 
      {/* PR Metrics Section */}
      <View style={styles.metricsSection}>
        <ScrollView horizontal contentContainerStyle={styles.metricsContainer}>
          <View style={styles.metricItem}>
            <Text style={styles.metricIcon}>🏋️‍♂️</Text>
            <Text style={styles.metricLabel}>Bench Press</Text>
            <Text style={styles.metricValue}>105 lb</Text>
          </View>
          <View style={styles.metricItem}>
            <Text style={styles.metricIcon}>🏋️‍♀️</Text>
            <Text style={styles.metricLabel}>Deadlift</Text>
            <Text style={styles.metricValue}>220 lb</Text>
          </View>
          <View style={styles.metricItem}>
            <Text style={styles.metricIcon}>🏃‍♂️</Text>
            <Text style={styles.metricLabel}>Running Time</Text>
            <Text style={styles.metricValue}>5:30 min/km</Text>
          </View>
          <View style={styles.metricItem}>
            <Text style={styles.metricIcon}>🤸‍♂️</Text>
            <Text style={styles.metricLabel}>Squats</Text>
            <Text style={styles.metricValue}>220 lb</Text>
          </View>
        </ScrollView>
      </View>
 
      {/* PR Song Section */}
      <View style={styles.prSongSection}>
        <Entypo name="controller-play" size={24} color="white" />
        <Text style={styles.prSong}>
          PR Song: {'\n'}
          <Text style={styles.songTitle}>"Goddess" by Written by Wolves</Text>
        </Text>
      </View>
 
      {/* Graph Placeholder */}
      <View style={styles.graphSection}>
        <Text style={styles.graphPlaceholder}>Graph Visualization</Text>
      </View>
    </ScrollView>
  );
};
 
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flex: 1,
  },
 
  // Full-Width Header
  topBar: {
    width: '100%',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FFF',
    paddingVertical: 18,
    elevation: 5,
    borderBottomWidth: 7,
    borderBottomColor: '#E97451',
  },
 
  // Centered Logo
  logoContainer: {
    flex: 1,
    alignItems: 'center',
  },
  logo: {
    width: 40,
    height: 40,
    resizeMode: 'contain',
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
    color: 'black',
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
    marginTop: 80, // Moved profile picture below the orange line
    marginBottom: 10,
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 2,
    borderColor: '#ddd',
  },
  name: {
    fontSize: 22,
    fontWeight: 'bold',
    marginTop: 10,
  },
  email: {
    fontSize: 16,
    color: 'gray',
  },
 
  // General Info Section
  infoSection: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 10,
    paddingVertical: 10,
    backgroundColor: '#f8f8f8',
  },
  infoItem: {
    alignItems: 'center',
  },
  infoLabel: {
    fontSize: 12,
    color: 'gray',
  },
  infoValue: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  openChat: {
    fontSize: 12,
    color: 'green',
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
    marginHorizontal: 20,
  },
  metricIcon: {
    fontSize: 30,
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
    backgroundColor: '#333',
    padding: 10,
    marginHorizontal: 10,
    borderRadius: 8,
  },
  prSong: {
    color: '#fff',
    marginLeft: 10,
    fontSize: 14,
  },
  songTitle: {
    fontWeight: 'bold',
  },
 
  // Graph Section
  graphSection: {
    height: 200,
    backgroundColor: '#eee',
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