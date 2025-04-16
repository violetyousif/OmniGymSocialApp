import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import { supabase } from '@/lib/supabase';

/**
 * AdminLeaderboardSubmissions.tsx
 *
 * This screen allows admins to review PR submissions from users.
 * Admins can Accept or Reject entries for leaderboard consideration.
 */

const LeaderboardSubmissions = () => {
  const [submissions, setSubmissions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSubmissions();
  }, []);

  /**
   * Fetch all pending leaderboard submissions from Supabase.
   * Expected table structure:
   * - email
   * - prWeight
   * - prReps
   * - cntstCategory
   * - submissionDate
   * - screenshotUrl
   */
  const fetchSubmissions = async () => {
    setLoading(true);
    const { data, error } = await supabase.from('PendingPRSubmissions').select('*');
    if (error) {
      console.error('Error fetching submissions:', error.message);
    } else {
      setSubmissions(data || []);
    }
    setLoading(false);
  };

  const handleDecision = async (id: number, decision: 'approved' | 'rejected') => {
    // Placeholder: update entry in Supabase with admin decision
    alert(`Marked submission #${id} as ${decision}`);
    // TODO: implement backend update logic here
  };

  const renderSubmission = ({ item }: { item: any }) => (
    <View style={styles.card}>
      <Text style={styles.email}>{item.email}</Text>
      <Text style={styles.details}>Category: {item.cntstCategory}</Text>
      <Text style={styles.details}>Weight: {item.prWeight} lbs | Reps: {item.prReps}</Text>
      <Text style={styles.details}>Date: {item.submissionDate}</Text>
      <View style={styles.buttonRow}>
        <TouchableOpacity style={styles.approve} onPress={() => handleDecision(item.id, 'approved')}>
          <Text style={styles.btnText}>Approve</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.reject} onPress={() => handleDecision(item.id, 'rejected')}>
          <Text style={styles.btnText}>Reject</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Leaderboard Submissions</Text>
      {loading ? (
        <ActivityIndicator size="large" color="#E97451" />
      ) : (
        <FlatList
          data={submissions}
          keyExtractor={(item) => item.id?.toString()}
          renderItem={renderSubmission}
          contentContainerStyle={{ paddingBottom: 20 }}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#E97451',
    marginBottom: 20,
    textAlign: 'center',
  },
  card: {
    backgroundColor: '#f4f4f4',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
  },
  email: { fontSize: 16, fontWeight: 'bold' },
  details: { fontSize: 14, color: '#555', marginTop: 4 },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 15,
  },
  approve: {
    flex: 1,
    backgroundColor: '#4CAF50',
    padding: 10,
    borderRadius: 6,
    marginRight: 5,
  },
  reject: {
    flex: 1,
    backgroundColor: '#f44336',
    padding: 10,
    borderRadius: 6,
    marginLeft: 5,
  },
  btnText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: '600',
  },
});

export default LeaderboardSubmissions;
