import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { supabase } from '../../../lib/supabase'
import { Session } from '@supabase/supabase-js'


const Settings = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Settings</Text>
      <Text>Manage your app preferences and account settings here.</Text>
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

export default Settings;
