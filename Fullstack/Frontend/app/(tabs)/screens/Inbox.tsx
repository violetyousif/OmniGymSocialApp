import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { supabase } from '../../../lib/supabase'
import { Session } from '@supabase/supabase-js'

const Inbox = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Inbox</Text>
      <Text>This is where messages or notifications will appear.</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
});

export default Inbox;
