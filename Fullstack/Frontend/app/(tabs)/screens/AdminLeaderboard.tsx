import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import { supabase } from '@/lib/supabase';

const AdminLeaderboard = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [checked, setChecked] = useState(false);
  const [entries, setEntries] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState<'male' | 'female' | 'archive'>('male');
  const [selectedMonth, setSelectedMonth] = useState<string>('April 2025');

 /**
   * Auth check — verifies if user is an admin via email.
   * Used to gate access to leaderboard data and prevent unauthorized viewing.
   */
  useEffect(() => {
    const checkAdmin = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setIsAdmin(user?.email === 'admin@example.com');
      setChecked(true);
    };
    checkAdmin();
  }, []);



  /**
   * Data Fetching — depends on selected tab (male, female, or archive).
   * - Archive: Pull from 'ArchivedLeaderboards' table filtered by selectedMonth.
   * - Male/Female: Pull from PFLeaderboard and LTFLeaderboard, then merge, score, and sort.
   */
  useEffect(() => {
    if (!isAdmin) return;

    const fetchData = async () => {
      if (activeTab === 'archive') {
        const { data } = await supabase.from('ArchivedLeaderboards').select('*').eq('month', selectedMonth);
        setEntries(data || []);
      } else {
        const gender = activeTab === 'male' ? 'Male' : 'Female';
        const { data: pfData } = await supabase.from('PFLeaderboard').select('*').eq('gender', gender);
        const { data: ltfData } = await supabase.from('LTFLeaderboard').select('*').eq('gender', gender);
        const combined = [...(pfData || []), ...(ltfData || [])];
        const scored = combined.map(e => ({ ...e, score: e.prWeight / e.prReps })).sort((a, b) => b.score - a.score);
        setEntries(scored);
      }
    };

    fetchData();
  }, [activeTab, selectedMonth, isAdmin]);


  // Guard: If user check hasn't completed, don't render anything
  if (!checked) return null;
  if (!isAdmin) return <Text style={styles.unauthorized}>Not authorized</Text>;
  /*
  * Renders one leaderboard entry.
  * Includes user email, score, category, and either submissionDate or month.
  */
  const renderItem = ({ item, index }: { item: any, index: number }) => (
    <View style={styles.card}>
      <Text style={styles.rank}>#{index + 1}</Text>
      <View style={styles.info}>
        <Text style={styles.email}>{item.email}</Text>
        <Text style={styles.score}>Score: {item.score?.toFixed(2)}</Text>
        <Text style={styles.meta}>{item.cntstCategory} | {item.submissionDate || item.month}</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Admin Leaderboard</Text>

      <View style={styles.tabRow}>
        <TouchableOpacity style={[styles.tab, activeTab === 'male' && styles.activeTab]} onPress={() => setActiveTab('male')}>
          <Text style={styles.tabText}>Male</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.tab, activeTab === 'female' && styles.activeTab]} onPress={() => setActiveTab('female')}>
          <Text style={styles.tabText}>Female</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.tab, activeTab === 'archive' && styles.activeTab]} onPress={() => setActiveTab('archive')}>
          <Text style={styles.tabText}>Archived</Text>
        </TouchableOpacity>
      </View>

      {activeTab === 'archive' && (
        <View style={styles.monthSelector}>
          {['April 2025', 'March 2025', 'February 2025'].map(month => (
            <TouchableOpacity
              key={month}
              onPress={() => setSelectedMonth(month)}
              style={[styles.monthButton, selectedMonth === month && styles.selectedMonth]}
            >
              <Text style={styles.monthText}>{month}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}

      <FlatList data={entries} keyExtractor={(item, i) => `${item.email}-${i}`} renderItem={renderItem} />
    </View>
  );
};


//styling
const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  heading: { fontSize: 24, fontWeight: 'bold', color: '#E97451', marginBottom: 20, textAlign: 'center' },
  tabRow: { flexDirection: 'row', justifyContent: 'space-around', marginBottom: 20 },
  tab: { padding: 10, borderRadius: 10, backgroundColor: '#ddd' },
  activeTab: { backgroundColor: '#E97451' },
  tabText: { color: 'white', fontWeight: 'bold' },
  card: { flexDirection: 'row', backgroundColor: '#f4f4f4', padding: 10, borderRadius: 10, marginBottom: 10 },
  rank: { fontSize: 18, fontWeight: 'bold', color: '#E97451', marginRight: 10 },
  info: { flex: 1 },
  email: { fontSize: 16, fontWeight: '500' },
  score: { fontSize: 14, color: '#555' },
  meta: { fontSize: 12, color: '#999' },
  unauthorized: { textAlign: 'center', marginTop: 100, fontSize: 16, color: 'gray' },
  monthSelector: { flexDirection: 'row', justifyContent: 'space-around', marginBottom: 20 },
  monthButton: { padding: 8, borderRadius: 8, backgroundColor: '#eee' },
  selectedMonth: { backgroundColor: '#E97451' },
  monthText: { fontWeight: '600', color: '#333' },
});

export default AdminLeaderboard;
