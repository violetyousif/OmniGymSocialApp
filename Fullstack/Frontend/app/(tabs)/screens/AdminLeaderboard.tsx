import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { supabase } from '@/lib/supabase';
import { Ionicons } from '@expo/vector-icons';

/**
 * This file renders a leaderboard view for admin users.
 * It combines data from PFLeaderboard and LTFLeaderboard tables and ranks based on weight per rep.
 */

const AdminLeaderboard = () => {
  const [entries, setEntries] = useState<any[]>([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const [checked, setChecked] = useState(false);


// Run once on mount to check if current user is admin
  useEffect(() => {
    const checkAdmin = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setIsAdmin(user?.email === 'admin@example.com');// Admin check is based on email
      setChecked(true); 
    };
    checkAdmin();
  }, []);


   // If admin, fetch leaderboard entries from Supabase
  useEffect(() => {
    const fetchLeaderboard = async () => {
      if (!isAdmin) return;

      // Fetch Planet Fitness entries from Supabase
      const { data: pfData, error: pfError } = await supabase.from('PFLeaderboard').select('*');

      // Fetch Lifetime Fitness entries from Supabase
      const { data: ltfData, error: ltfError } = await supabase.from('LTFLeaderboard').select('*');

      if (pfError || ltfError) {
        console.error('Error fetching leaderboard data:', pfError || ltfError);
        return;
      }

      // Combines both our gym entries
      const allEntries = [...(pfData || []), ...(ltfData || [])];

      // Calculates weight per rep score and sort descending
      const withScore = allEntries
        .filter(e => e.prWeight && e.prReps && e.prReps !== 0) // Filters out any invalid data
        .map(e => ({
          ...e,
          score: e.prWeight / e.prReps, //main ranking metric
        }))
        .sort((a, b) => b.score - a.score); //Sorts by highest score first

      // Update state with sorted entries
      setEntries(withScore);
    };

    fetchLeaderboard();
  }, [isAdmin]);

  if (!checked) return null;

  // If user is not admin, show unauthorized message (this will change, there for the time being)
  if (!isAdmin) {
    return (
      <View style={styles.container}>
        <Text style={styles.unauthorized}>You are not authorized to view this page.</Text>
      </View>
    );
  }

  // displays leaderboard entry
  const renderItem = ({ item, index }: { item: any; index: number }) => (
    <View style={styles.card}>
      <Text style={styles.rank}>#{index + 1}</Text>
      <View style={styles.info}>
        <Text style={styles.email}>{item.email}</Text>
        <Text style={styles.score}>Weight/Rep: {item.score.toFixed(2)}</Text>
        <Text style={styles.meta}>{item.cntstCategory} | {item.submissionDate}</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Top Lifters</Text>
      <FlatList
        data={entries} // Data to display
        keyExtractor={(item) => `${item.email}-${item.leaderboardID}`} // Unique key for React
        renderItem={renderItem}
      />
    </View>
  );
};

export default AdminLeaderboard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 20,
    paddingHorizontal: 15,
  },
  heading: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#E97451', 
    marginBottom: 20,
    alignSelf: 'center',
  },
  unauthorized: {
    fontSize: 16,
    color: 'gray',
    textAlign: 'center',
    marginTop: 40,
  },
  card: {
    flexDirection: 'row',
    backgroundColor: '#f4f4f4',
    borderRadius: 12,
    padding: 15,
    marginBottom: 12,
    alignItems: 'center',
  },
  rank: {
    fontSize: 20,
    fontWeight: 'bold',
    marginRight: 15,
    color: '#E97451',
  },
  info: {
    flex: 1,
  },
  email: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
  },
  score: {
    fontSize: 14,
    color: '#777',
  },
  meta: {
    fontSize: 12,
    color: '#aaa',
  },
});