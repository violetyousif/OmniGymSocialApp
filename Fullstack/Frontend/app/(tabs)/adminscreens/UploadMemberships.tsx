
import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TextInput,
  Button,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { supabase } from '../../../lib/supabase';

/**
 * This tab allows an admin to upload new valid memberships
 * and view all currently valid ones from the `ValidMemberships` table.
 */

const MembershipsScreen = () => {
   // Admin and auth check state
  const [isAdmin, setIsAdmin] = useState(false);
  const [userChecked, setUserChecked] = useState(false);
   // Membership data
  const [members, setMembers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  // Input fields for new membership entry
  const [newMemberID, setNewMemberID] = useState('');
  const [newGymAbbr, setNewGymAbbr] = useState('LTF');


  /**
   * On mount, check whether the logged-in user is the admin.
   * This logic restricts access based on a hardcoded email.
   */
  useEffect(() => {
    const checkAdmin = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user?.email === 'admin@example.com') {
        setIsAdmin(true);
      }
      setUserChecked(true);
    };
    checkAdmin();
  }, []);


  /**
   * Once admin is confirmed, fetches the current list of valid memberships
   * from the Supabase table `ValidMemberships`.
   */
  useEffect(() => {
    if (isAdmin) fetchMemberships();
  }, [isAdmin]);


  /**
   * Pull all valid member IDs and gym abbreviations from Supabase.
   * Backend table structure expectation:
   * - memberID (text or varchar)
   * - gymAbbr (e.g., 'LTF' or 'PF')
   */
  const fetchMemberships = async () => {
    setLoading(true);
    const { data, error } = await supabase.from('ValidMemberships').select('*');
    if (error) {
      console.error('Fetch error:', error.message);
    } else {
      setMembers(data || []);
    }
    setLoading(false);
  };



  /**
   * Handles insertion of a new valid membership record.
   * Validates presence of a member ID before submitting.
   */
  const handleAddMember = async () => {
    if (!newMemberID.trim()) return;

    const { error } = await supabase.from('ValidMemberships').insert({
      memberID: newMemberID,
      gymAbbr: newGymAbbr,
    });

    if (error) {
      alert('Error adding member: ' + error.message);
    } else {
      alert('Member added!');
      setNewMemberID('');
      fetchMemberships();// Refresh the list after insertion
    }
  };

  if (!userChecked) return null;
   // Block users who are not admins (will be changed in future)
  if (!isAdmin) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>You are not authorized to view this page.</Text>
      </View>
    );
  }


  /**
   * Admin-only view:
   * - Input fields to add a new member
   * - Button to submit the entry
   * - List of all valid members
   */
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Valid Memberships</Text>

{/* Input for Member ID */}
      <TextInput
        placeholder="Member ID"
        value={newMemberID}
        onChangeText={setNewMemberID}
        style={styles.input}
      />

      {/* Input for Gym Abbreviation (e.g., LTF, PF) */}
      <TextInput
        placeholder="Gym Abbreviation (LTF or PF)"
        value={newGymAbbr}
        onChangeText={setNewGymAbbr}
        style={styles.input}
      />
      <Button title="Add Member" onPress={handleAddMember} color="#FF6F3C" />

      {loading ? (
        <ActivityIndicator size="large" style={{ marginTop: 20 }} />
      ) : (
        <FlatList
          data={members}
          keyExtractor={(item) => item.memberID}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <Text style={styles.cardText}>ID: {item.memberID}</Text>
              <Text style={styles.cardText}>Gym: {item.gymAbbr}</Text>
            </View>
          )}
        />
      )}
    </View>
  );
};

export default MembershipsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  heading: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#E97451',
    alignSelf: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
  },
  card: {
    backgroundColor: '#f2f2f2',
    borderRadius: 10,
    padding: 15,
    marginVertical: 5,
  },
  cardText: {
    fontSize: 16,
  },
  errorText: {
    color: 'gray',
    textAlign: 'center',
    marginTop: 100,
    fontSize: 16,
  },
});

//#codebase