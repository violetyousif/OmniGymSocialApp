/**
 * AdminHome.tsx
 *
 * This screen serves as the Admin Dashboard (Home Page) for displaying all valid gym memberships.
 *
 * Features:
 * - Validates the logged-in user as an admin
 * - Fetches and displays all entries from the `ValidMemberships` table
 * - Lists email, gym name/abbr, city/state, and membership ID for each record
 *
 * SOLID Principles:
 * S — Single Responsibility: Focuses only on viewing membership data for admins
 * O — Open/Closed: Easily extendable to include filters or export features
 * L — Liskov Substitution: Uses isolated logic for checking user/admin privileges
 * I — Interface Segregation: Avoids unnecessary props or overloads
 * D — Dependency Inversion: Depends on Supabase client abstraction via `supabase.ts`
 */
import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator } from 'react-native';
import { supabase } from '@/lib/supabase';

const AdminHome = () => {
  // State to hold fetched membership entries
  const [memberships, setMemberships] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [checked, setChecked] = useState(false);

  /**
   * Effect: Runs once to check if the current user is admin
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
   * Effect: Fetch membership data only if user is admin
   */
  useEffect(() => {
    const fetchMemberships = async () => {
      if (!isAdmin) return;
      const { data, error } = await supabase.from('ValidMemberships').select('*');
      if (error) {
        console.error('Error fetching memberships:', error.message);
        return;
      }
      setMemberships(data || []);
      setLoading(false);
    };

    if (isAdmin) fetchMemberships();
  }, [isAdmin]);

  if (!checked) return null;
  if (!isAdmin) return <Text style={styles.unauthorized}>Not authorized</Text>;

  if (loading) return <ActivityIndicator style={{ marginTop: 50 }} size="large" color="#E97451" />;

  const renderItem = ({ item }: { item: any }) => (
    <View style={styles.card}>
      <Text style={styles.email}>{item.email}</Text>
      <Text style={styles.meta}>{item.gymName} ({item.gymAbbr})</Text>
      <Text style={styles.meta}>{item.city}, {item.state}</Text>
      <Text style={styles.meta}>Membership ID: {item.membershipID}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Valid Gym Memberships</Text>
      <FlatList
        data={memberships}
        keyExtractor={(item, index) => `${item.email}-${index}`}
        renderItem={renderItem}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  heading: { fontSize: 24, fontWeight: 'bold', color: '#E97451', marginBottom: 20, textAlign: 'center' },
  card: { backgroundColor: '#f4f4f4', padding: 15, borderRadius: 10, marginBottom: 10 },
  email: { fontSize: 16, fontWeight: '500', marginBottom: 5 },
  meta: { fontSize: 14, color: '#555' },
  unauthorized: { textAlign: 'center', marginTop: 100, fontSize: 16, color: 'gray' },
});

export default AdminHome;