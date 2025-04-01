import React, { useState } from 'react';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
  TextInput,
} from 'react-native';

export default function Events() {
  const router = useRouter();

  const [groupClubsExpanded, setGroupClubsExpanded] = useState(false);
  const [fitnessEventsExpanded, setFitnessEventsExpanded] = useState(false);
  const [checkinFormVisible, setCheckinFormVisible] = useState(false);
  const [gymLocationsExpanded, setGymLocationsExpanded] = useState(false);

  const [yogaExpanded, setYogaExpanded] = useState(false);
  const [runExpanded, setRunExpanded] = useState(false);
  const [locationsState, setLocationsState] = useState<Record<string, boolean>>({
    Detroit: false,
    'Ann Arbor': false,
    'Grand Rapids': false,
  });
  

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');

  const handleCheckinSubmit = () => {
    if (!name || !phone || !email) {
      return Alert.alert('Please fill out all fields!');
    }
    Alert.alert('Check-in Submitted', `Name: ${name}\nPhone: ${phone}\nEmail: ${email}`);
    setName('');
    setPhone('');
    setEmail('');
    setCheckinFormVisible(false);
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 100 }}>
    {/* Top Nav Bar */}
    <View style={styles.navBar}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
        <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.navTitle}>Events</Text>
    </View>

      <View style={{ marginTop: 60 }}>
        {/* Group Clubs */}
        <TouchableOpacity
          style={styles.box}
          onPress={() => setGroupClubsExpanded(!groupClubsExpanded)}
        >
          <Text style={styles.text}>Group Clubs {groupClubsExpanded ? '▲' : '▼'}</Text>
        </TouchableOpacity>

        {groupClubsExpanded && (
          <>
            <TouchableOpacity style={styles.subBox}>
              <Text style={styles.subText}>Name: Group Club Meetup</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.subBox}>
              <Text style={styles.subText}>Terms & Conditions: Members only, RSVP required</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.subBox}
                onPress={() => setCheckinFormVisible(!checkinFormVisible)}
                >
                <Text style={styles.subText}>📝 Check-ins (Tap to Check In)</Text>
            </TouchableOpacity>

            {checkinFormVisible && (
              <View style={styles.form}>
                <TextInput
                  style={styles.input}
                  placeholder="Name"
                  placeholderTextColor="#aaa"
                  value={name}
                  onChangeText={setName}
                />
                <TextInput
                  style={styles.input}
                  placeholder="Phone Number"
                  placeholderTextColor="#aaa"
                  value={phone}
                  onChangeText={setPhone}
                  keyboardType="phone-pad"
                />
                <TextInput
                  style={styles.input}
                  placeholder="Email"
                  placeholderTextColor="#aaa"
                  value={email}
                  onChangeText={setEmail}
                  keyboardType="email-address"
                />
                <TouchableOpacity style={styles.button} onPress={handleCheckinSubmit}>
                  <Text style={styles.buttonText}>Submit Check-in</Text>
                </TouchableOpacity>
              </View>
            )}
          </>
        )}

        {/* Local Fitness Events */}
        <TouchableOpacity
          style={styles.box}
          onPress={() => setFitnessEventsExpanded(!fitnessEventsExpanded)}
        >
          <Text style={styles.text}>Local Fitness Events {fitnessEventsExpanded ? '▲' : '▼'}</Text>
        </TouchableOpacity>

        {fitnessEventsExpanded && (
          <>
            {/* Yoga */}
            <TouchableOpacity
              style={styles.subBox}
              onPress={() => setYogaExpanded(!yogaExpanded)}
            >
              <Text style={styles.subText}>Yoga in the Park {yogaExpanded ? '▲' : '▼'}</Text>
            </TouchableOpacity>
            {yogaExpanded && (
              <>
                <TouchableOpacity style={styles.detailBox}><Text style={styles.subText}>Time: 9 AM</Text></TouchableOpacity>
                <TouchableOpacity style={styles.detailBox}><Text style={styles.subText}>Date: April 6, 2025</Text></TouchableOpacity>
                <TouchableOpacity style={styles.detailBox}><Text style={styles.subText}>Area: Belle Isle Park, Detroit, MI</Text></TouchableOpacity>
              </>
            )}

            {/* Run */}
            <TouchableOpacity
              style={styles.subBox}
              onPress={() => setRunExpanded(!runExpanded)}
            >
              <Text style={styles.subText}>Community Run {runExpanded ? '▲' : '▼'}</Text>
            </TouchableOpacity>
            {runExpanded && (
              <>
                <TouchableOpacity style={styles.detailBox}><Text style={styles.subText}>Time: 7 AM</Text></TouchableOpacity>
                <TouchableOpacity style={styles.detailBox}><Text style={styles.subText}>Date: April 13, 2025</Text></TouchableOpacity>
                <TouchableOpacity style={styles.detailBox}><Text style={styles.subText}>Area: Gallup Park, Ann Arbor, MI</Text></TouchableOpacity>
              </>
            )}
          </>
        )}

        {/* Gym Locations */}
        <TouchableOpacity
          style={styles.box}
          onPress={() => setGymLocationsExpanded(!gymLocationsExpanded)}
        >
          <Text style={styles.text}>Gym Location Specific Events {gymLocationsExpanded ? '▲' : '▼'}</Text>
        </TouchableOpacity>

        {gymLocationsExpanded &&
          Object.keys(locationsState).map((location) => (
            <View key={location}>
              <TouchableOpacity
                style={styles.subBox}
                onPress={() =>
                  setLocationsState((prev) => ({
                    ...prev,
                    [location]: !prev[location],
                  }))
                }
              >
                <Text style={styles.subText}>{location} {locationsState[location] ? '▲' : '▼'}</Text>
              </TouchableOpacity>

              {locationsState[location] && (
                <>
                  <TouchableOpacity style={styles.detailBox}>
                    <Text style={styles.subText}>Bootcamp Blast - Saturdays 10AM</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.detailBox}>
                    <Text style={styles.subText}>HIIT Night - Wednesdays 6PM</Text>
                  </TouchableOpacity>
                </>
              )}
            </View>
          ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#333',
    flex: 1,
    paddingTop: 100,
    paddingHorizontal: 20,
  },
  navBar: {
    position: 'absolute',
    top: -60,
    left: 0,
    right: 0,
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    backgroundColor: '#333',
    borderBottomWidth: 2,
    borderBottomColor: '#E97451',
    zIndex: 10,
  },
  backButton: {
    marginRight: 10,
  },
  navTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
  box: {
    backgroundColor: '#E97451',
    padding: 16,
    borderRadius: 8,
    marginBottom: 10,
  },
  subBox: {
    backgroundColor: '#f59774',
    padding: 14,
    borderRadius: 8,
    marginLeft: 20,
    marginBottom: 8,
  },
  detailBox: {
    backgroundColor: '#f7b6a1',
    padding: 12,
    borderRadius: 8,
    marginLeft: 40,
    marginBottom: 6,
  },
  text: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  subText: {
    color: '#fff',
    fontSize: 16,
  },
  form: {
    backgroundColor: '#444',
    padding: 16,
    borderRadius: 10,
    marginVertical: 10,
    marginLeft: 20,
  },
  input: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 12,
    marginBottom: 10,
    color: '#000',
  },
  button: {
    backgroundColor: '#E97451',
    padding: 12,
    borderRadius: 8,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
