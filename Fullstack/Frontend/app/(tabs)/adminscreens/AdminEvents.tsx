
import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  TextInput,
  Button,
  ScrollView,
} from 'react-native';
import { supabase } from '../../../lib/supabase';
import { useRouter } from 'expo-router';

// Define the shape of event data from Supabase
type Event = {
  eventID: number;
  gymAbbr: string;
  gymCity: string;
  eventName: string;
  eventDate: string;
  eventType: string;
  eventLocation: string;
  gymState: string;
};

const EventsScreen = () => {
  const router = useRouter();

  // Tracks all events pulled from Supabase
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // Tracks admin access status (null = still checking)
  const [authorized, setAuthorized] = useState<boolean | null>(null);

  // Filter to show only Local / Gym Hosted / All events
  const [eventFilter, setEventFilter] = useState<'All' | 'Local' | 'Gym Hosted'>('All');

  // Form inputs for new event
  const [eventName, setEventName] = useState('');
  const [eventDate, setEventDate] = useState('');
  const [eventType, setEventType] = useState('');
  const [eventLocation, setEventLocation] = useState('');
  const [gymCity, setGymCity] = useState('');
  const [gymState, setGymState] = useState('');
  const [gymAbbr, setGymAbbr] = useState('');

  // Check if user is an admin
  useEffect(() => {
    checkAdmin();
  }, []);

  // After authorization, fetch events
  useEffect(() => {
    if (authorized) {
      fetchEvents();
    }
  }, [authorized]);

  /**
   * Verifies whether the currently logged-in user is the admin.
   * If not logged in, the user is redirected to the login screen.
   */
  const checkAdmin = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      router.replace('/(tabs)/Login');
      return;
    }
    const isAdmin = user.email === 'admin@example.com';
    setAuthorized(isAdmin);
  };

  /**
   * Fetches all events from the unified Events table
   */
  const fetchEvents = async () => {
    setLoading(true);
    const { data, error } = await supabase.from('Events').select('*');
    if (error) {
      console.error('Error fetching events:', error.message);
    } else {
      setEvents(data as Event[]);
    }
    setLoading(false);
  };

  /**
   * Handles submission of a new event into the unified Events table.
   */
  const handleSubmit = async () => {
    if (!eventName || !eventDate || !eventType || !eventLocation || !gymCity || !gymState || !gymAbbr) {
      alert('Please fill in all fields');
      return;
    }

    const { error } = await supabase.from('Events').insert({
      eventName,
      eventDate,
      eventType,
      eventLocation,
      gymAbbr,
      gymCity,
      gymState,
      uploadDate: new Date(),
    });

    if (error) {
      alert('Error submitting event: ' + error.message);
    } else {
      alert('Event submitted!');
      setEventName('');
      setEventDate('');
      setEventType('');
      setEventLocation('');
      setGymCity('');
      setGymState('');
      setGymAbbr('');
      fetchEvents();
    }
  };

  /**
   * Renders each individual event inside a styled card
   */
  const renderEvent = ({ item }: { item: Event }) => (
    <View style={styles.card}>
      <Text style={styles.eventName}>{item.eventName}</Text>
      <Text style={styles.text}>{item.eventDate} • {item.eventLocation}</Text>
      <Text style={styles.text}>{item.gymCity}, {item.gymState} ({item.gymAbbr})</Text>
      <Text style={styles.text}>Type: {item.eventType}</Text>
    </View>
  );

  // Show loading state while admin check is in progress
  if (authorized === null) {
    return <ActivityIndicator size="large" color="#FF6F3C" style={{ marginTop: 60 }} />;
  }

  // Show block screen if user is not an admin (temporary)
  if (!authorized) {
    return (
      <View style={styles.container}>
        <Text style={{ color: '#333', fontSize: 16, marginTop: 100, textAlign: 'center' }}>
          You are not authorized to view this page.
        </Text>
      </View>
    );
  }

  /**
   * The Main return:
   * - Filter by event type (Local / Gym Hosted)
   * - Existing events list
   * - Submission form for new events
   */
  return (
    <ScrollView style={styles.container}>
      {/* Filter: Local / Gym Hosted / All */}
      <View style={styles.filterContainer}>
        {['All', 'Local', 'Gym Hosted'].map((type) => (
          <TouchableOpacity
            key={type}
            onPress={() => setEventFilter(type as any)}
            style={[
              styles.filterButton,
              eventFilter === type && styles.selectedFilter,
            ]}
          >
            <Text style={styles.filterText}>{type}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {loading ? (
        <ActivityIndicator size="large" color="#FF6F3C" style={{ marginTop: 50 }} />
      ) : (
        <FlatList
          data={events.filter(e => {
            if (eventFilter === 'All') return true;
            return e.eventType.toLowerCase() === eventFilter.toLowerCase();
          })}
          keyExtractor={(item) => item.eventID.toString()}
          renderItem={renderEvent}
          contentContainerStyle={{ paddingBottom: 20 }}
        />
      )}

      {/* Event Submission Form */}
      <Text style={styles.formHeading}>Submit New Event</Text>
      <TextInput style={styles.input} placeholder="Event Name" value={eventName} onChangeText={setEventName} />
      <TextInput style={styles.input} placeholder="Event Date" value={eventDate} onChangeText={setEventDate} />
      <TextInput style={styles.input} placeholder="Event Type (Local or Gym Hosted)" value={eventType} onChangeText={setEventType} />
      <TextInput style={styles.input} placeholder="Location" value={eventLocation} onChangeText={setEventLocation} />
      <TextInput style={styles.input} placeholder="Gym City" value={gymCity} onChangeText={setGymCity} />
      <TextInput style={styles.input} placeholder="Gym State" value={gymState} onChangeText={setGymState} />
      <TextInput style={styles.input} placeholder="Gym Abbreviation" value={gymAbbr} onChangeText={setGymAbbr} />
      <Button title="Submit Event" color="#FF6F3C" onPress={handleSubmit} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9F9F9',
    paddingTop: 60,
    paddingHorizontal: 15,
  },
  filterContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
    gap: 10,
  },
  filterButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#E0E0E0',
    borderRadius: 10,
  },
  selectedFilter: {
    backgroundColor: '#FF6F3C',
  },
  filterText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 15,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 2,
  },
  eventName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FF6F3C',
    marginBottom: 4,
  },
  text: {
    fontSize: 14,
    color: '#333',
    marginBottom: 2,
  },
  formHeading: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 30,
    marginBottom: 10,
    color: '#333',
  },
  input: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 10,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 10,
  },
});

export default EventsScreen;

//#codebase