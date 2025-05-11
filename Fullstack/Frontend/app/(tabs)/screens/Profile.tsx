import React, { useEffect, useState } from 'react';
import { 
  View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, Platform, StatusBar, Modal 
} from 'react-native';
import { FontAwesome, Entypo } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { Dimensions } from 'react-native';
import { supabase } from '../../../lib/supabase';
import { useFocusEffect } from '@react-navigation/native';
import FitnessRing from '../../../components/FitnessRings';
import SoundCloud from '@/components/SoundCloud';


const { width } = Dimensions.get('window');

const Profile = () => {
  const router = useRouter();
  const HEADER_HEIGHT = 80;
  const HEADER_OFFSET = (Platform.OS === 'ios' ? StatusBar.currentHeight || 44 : StatusBar.currentHeight || 0) + HEADER_HEIGHT;

  const [profile, setProfile] = useState<any>(null);
  const [settings, setSettings] = useState<any>(null);
  const [metrics, setMetrics] = useState<any>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [ringKey, setRingKey] = useState<number>(Date.now());

  
  useFocusEffect(
    React.useCallback(() => {
      const fetchProfile = async () => {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) return;

        const { data: pfUser } = await supabase
          .from("PFUsers")
          .select("*")
          .eq("auth_user_id", user.id)
          .single();

        const { data: pfSettings } = await supabase
          .from("PFUserSettings")
          .select("*")
          .eq("auth_user_id", user.id)
          .single();

        const { data: pfMetrics } = await supabase
          .from("PFUserMetrics")
          .select("*")
          .eq("auth_user_id", user.id)
          .single();

        setProfile(pfUser);
        setSettings(pfSettings);
        setMetrics(pfMetrics);
        setRingKey(prev => prev + 1);  // Update the key to force a re-render for the graphs
      };

      fetchProfile();
    }, [])
  );

  const formatWeight = (weight: number | null) => {
    if (weight == null) return 'N/A';
    const unit = settings?.units === 'Metric' ? 'kg' : 'lb';
    const convertedWeight = settings?.units === 'Metric' ? (weight * 0.453592).toFixed(1) : weight;
    return `${convertedWeight} ${unit}`;
  };

  const formatRunningTimeWithUnit = (time: string | null) => {
    if (!time || !settings?.units) return 'N/A';
    const unit = settings.units === 'Metric' ? '/km' : '/mi';
    return `${time}${unit}`;
  };

  return (
    <>
      {/* Avatar Modal for Full-Screen Image */}
      <Modal visible={isModalVisible} transparent animationType="fade">
        <View style={styles.modalContainer}>
          <TouchableOpacity style={styles.modalBackdrop} onPress={() => setIsModalVisible(false)} />
          {settings?.profileImg && (
            <Image
              source={{ uri: settings.profileImg }}
              style={styles.modalImage}
              resizeMode="contain"
            />
          )}
        </View>
      </Modal>

      <ScrollView style={styles.container} contentContainerStyle={{ paddingTop: HEADER_OFFSET }}>
        {/* Top Bar */}
        <View style={[styles.topBar, { position: 'absolute', top: Platform.OS === 'ios' ? StatusBar.currentHeight || 44 : StatusBar.currentHeight || 0 }]}>
          <View style={styles.logoContainer}>
            <Image source={require('../../../assets/images/OmniGymLogo.png')} style={styles.logo} />
          </View>
          <TouchableOpacity onPress={() => router.replace('/(tabs)/Login')} style={styles.logoutContainer}>
            <Text style={styles.logout}>LOGOUT</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.chatIcon} onPress={() => router.replace('/(tabs)/screens/Inbox')}>
            <FontAwesome name="comment" size={24} color="gray" />
          </TouchableOpacity>
        </View>

        {/* Profile Section */}
        <View style={styles.profileSection}>
          <TouchableOpacity onPress={() => setIsModalVisible(true)}>
            <Image
              source={
                settings?.profileImg
                  ? { uri: settings.profileImg }
                  : require('../../../assets/images/avatarBlank.png')
              }
              style={styles.profileImage}
            />
          </TouchableOpacity>
          <Text style={styles.name}>
            {profile ? `${profile.firstName} ${profile.lastName}` : 'Loading...'}
          </Text>
          {settings?.caption && <Text style={styles.profileCaption}>{settings.caption}</Text>}
        </View>

        {settings?.profilePublic ? (
          <>
            {/* PR icons */}
            <View style={styles.metricsSection}>
              <ScrollView horizontal contentContainerStyle={styles.metricsContainer}>
                <View style={styles.metricItem}>
                  <Image source={require('../../../assets/images/benchpress.png')} style={styles.icons} />
                  <Text style={styles.metricValue}>{formatWeight(metrics?.prBenchWeight)}</Text>
                </View>
                <View style={styles.metricItem}>
                  <Image source={require('../../../assets/images/deadlift.png')} style={styles.icons} />
                  <Text style={styles.metricValue}>{formatWeight(metrics?.prDeadliftWeight)}</Text>
                </View>
                <View style={styles.metricItem}>
                  <Image source={require('../../../assets/images/squat.png')} style={styles.icons} />
                  <Text style={styles.metricValue}>{formatWeight(metrics?.prSquatWeight)}</Text>
                </View>
                <View style={styles.metricItem}>
                  <Image source={require('../../../assets/images/running.png')} style={styles.icons} />
                  <Text style={styles.metricValue}>{formatRunningTimeWithUnit(metrics?.runningTime)}</Text>
                </View>
              </ScrollView>
            </View>

            {/* General Info Section */}
            <View style={styles.infoSection}>
              <View style={styles.infoItem}>
                <Text style={styles.infoLabel}>Joined</Text>
                <Text style={styles.infoValue}>{profile?.dateJoined?.split('-')[0] || 'N/A'}</Text>
              </View>
              <View style={styles.infoItem}>
                <Text style={styles.infoLabel}>Age</Text>
                <Text style={styles.infoValue}>{settings?.age || 'N/A'}</Text>
              </View>
              <View style={styles.infoItem}>
                <Text style={styles.infoLabel}>Fitness Goal:</Text>
                <Text style={styles.infoValue}>{settings?.fitnessGoal || 'N/A'}</Text>
                <Text style={styles.openChat}>Open to Chat</Text>
              </View>
              <View style={styles.infoItem}>
                <FontAwesome name="trophy" size={20} color="gold" />
                <Text style={styles.infoValue}>{settings?.trophies || 0}</Text>
              </View>
              <View style={styles.infoItem}>
                <Text style={styles.infoLabel}>Wilks2 Score</Text>
                <Text style={styles.infoValue}>{metrics?.wilks2Score || 'N/A'}</Text>
              </View>
            </View>

            {/* Fitness Rings Section */}
            <ScrollView horizontal contentContainerStyle={styles.metricsContainer}>
            <View key={ringKey} style={styles.ringView}>
              <FitnessRing value={7830} maxValue={10000} label="Steps" unit="steps" color="#FF6B35" />
              <FitnessRing value={950} maxValue={1200} label="Calories" unit="kcal" color="#F35B04" />
              <FitnessRing value={42} maxValue={60} label="Active Min" unit="min" color="#FF8C42" />
            </View>
            </ScrollView>

            {/* Soundcloud link player */}
            {settings?.prSong && (
              <SoundCloud trackUrl={settings.prSong} />
            )}
          </>
        ) : (
          <View style={{ alignItems: 'center', padding: 20 }}>
            <Text style={{ fontStyle: 'italic', color: 'gray' }}>This profile is private.</Text>
          </View>
        )}
      </ScrollView>
    </>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flex: 1,
  },

  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.8)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalBackdrop: {
    ...StyleSheet.absoluteFillObject,
  },
  modalImage: {
    width: '90%',
    height: '80%',
    borderRadius: 10,
  },
  topBar: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FFF',
    paddingVertical: 18,
    elevation: 5,
    borderBottomWidth: 7,
    borderBottomColor: '#E97451',
  },

  logoContainer: {
    flex: 1,
    alignItems: 'center',
  },
  logo: {
    width: 40,
    height: 40,
    resizeMode: 'contain',
  },

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

  chatIcon: {
    position: 'absolute',
    left: 20,
    bottom: 10,
  },

  profileSection: {
    alignItems: 'center',
    marginTop: 20,
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
  profileCaption: {
    fontSize: 16,
    color: 'gray',
    marginTop: 5,
  },
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
  metricsSection: {
    marginVertical: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  metricsContainer: {
    flexDirection: 'row',
  },
  metricItem: {
    width: 80,
    height: 80,
    marginHorizontal: 8,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative', // enables absolute children
  },
  metricIcon: {
    fontSize: 30,
  },
  metricLabel: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  metricValue: {
    position: 'absolute',
    bottom: 18,   // adjusts to position the label inside circle icons
    fontSize: 10,
    fontWeight: '600',
    color: '#252422',
    backgroundColor: 'transparent',
  },
  icons: {
    width: 80,
    height: 80,
    resizeMode: 'contain',
  },
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
  ringContainer: {
    alignItems: 'center',
    margin: 16,
    padding: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 100,
    shadowColor: '#E97451',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 8,
  },
  ringView: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 8,
  },
});


// const Profile = () => {
//   const router = useRouter();

//   const HEADER_HEIGHT = 80; // Your visual header height
//   const HEADER_OFFSET = 
//     (Platform.OS === 'ios' ? StatusBar.currentHeight || 44 : StatusBar.currentHeight || 0) 
//     + HEADER_HEIGHT;

//   return (
//     <ScrollView style={styles.container} contentContainerStyle={{ paddingTop: HEADER_OFFSET }}>
      
//       {/* Fixed Header */}
//       <View 
//         style={[
//           styles.topBar, 
//           { 
//             position: 'absolute', 
//             top: Platform.OS === 'ios' ? StatusBar.currentHeight || 44 : StatusBar.currentHeight || 0 
//           }
//         ]}
//       >
//         <View style={styles.logoContainer}>
//           <Image source={require('../../../assets/images/OmniGymLogo.png')} style={styles.logo} />
//         </View>

//         {/* Logout Button */}
//         <TouchableOpacity onPress={() => router.replace('/(tabs)/Login')} style={styles.logoutContainer}>
//           <Text style={styles.logout}>LOGOUT</Text>
//         </TouchableOpacity>

//         {/* Chat Icon */}
//         <TouchableOpacity style={styles.chatIcon} onPress={() => router.replace('/(tabs)/screens/Inbox')}>
//           <FontAwesome name="comment" size={24} color="gray" />
//         </TouchableOpacity>
//       </View>

//       {/* Profile Section */}
//       <View style={styles.profileSection}>
//         <Text style={styles.name}>Abdulla Maruf</Text>
//         <Text style={styles.email}>amaruf@example.com</Text>
//       </View>

//       {/* General Info Section */}
//       <View style={styles.infoSection}>
//         <View style={styles.infoItem}>
//           <Text style={styles.infoLabel}>Joined</Text>
//           <Text style={styles.infoValue}>2018</Text>
//         </View>
//         <View style={styles.infoItem}>
//           <Text style={styles.infoLabel}>Age</Text>
//           <Text style={styles.infoValue}>30</Text>
//         </View>
//         <View style={styles.infoItem}>
//           <Text style={styles.infoLabel}>Fitness Goal:</Text>
//           <Text style={styles.infoValue}>Build Muscle</Text>
//           <Text style={styles.openChat}>Open to Chat</Text>
//         </View>
//         <View style={styles.infoItem}>
//           <FontAwesome name="trophy" size={20} color="gold" />
//           <Text style={styles.infoValue}>3</Text>
//         </View>
//         <View style={styles.infoItem}>
//           <Text style={styles.infoLabel}>Wilks 2 Score</Text>
//           <Text style={styles.infoValue}>366</Text>
//         </View>
//       </View>

//       {/* PR Metrics Section */}
//       <View style={styles.metricsSection}>
//         <ScrollView horizontal contentContainerStyle={styles.metricsContainer}>
//           <View style={styles.metricItem}>
//             <Text style={styles.metricIcon}>🏋️‍♂️</Text>
//             <Text style={styles.metricLabel}>Bench Press</Text>
//             <Text style={styles.metricValue}>105 lb</Text>
//           </View>
//           <View style={styles.metricItem}>
//             <Text style={styles.metricIcon}>🏋️‍♀️</Text>
//             <Text style={styles.metricLabel}>Deadlift</Text>
//             <Text style={styles.metricValue}>220 lb</Text>
//           </View>
//           <View style={styles.metricItem}>
//             <Text style={styles.metricIcon}>🏃‍♂️</Text>
//             <Text style={styles.metricLabel}>Running Time</Text>
//             <Text style={styles.metricValue}>5:30 min/km</Text>
//           </View>
//           <View style={styles.metricItem}>
//             <Text style={styles.metricIcon}>🤸‍♂️</Text>
//             <Text style={styles.metricLabel}>Squats</Text>
//             <Text style={styles.metricValue}>220 lb</Text>
//           </View>
//         </ScrollView>
//       </View>

//       {/* PR Song Section */}
//       <View style={styles.prSongSection}>
//         <Entypo name="controller-play" size={24} color="white" />
//         <Text style={styles.prSong}>
//           PR Song: {'\n'}
//           <Text style={styles.songTitle}>"Goddess" by Written by Wolves</Text>
//         </Text>
//       </View>

//       {/* Graph Placeholder */}
//       <View style={styles.graphSection}>
//         <Text style={styles.graphPlaceholder}>Graph Visualization</Text>
//       </View>
//     </ScrollView>
//   );
// };

//export default Profile;