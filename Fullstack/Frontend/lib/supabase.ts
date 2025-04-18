
// PAGE PURPOSE: This page connects to the Supabase DB and handles authentication.

import { AppState } from "react-native"
// Ensure the URL polyfill is loaded before importing any other modules that depend on it
// This is important for the Supabase client to work correctly in a React Native environment
import "react-native-url-polyfill/auto" // Polyfill for react-native
import AsyncStorage from '@react-native-async-storage/async-storage'
import { createClient } from '@supabase/supabase-js'

// Supabase url and anon key; connects to .env file in frontend
export const supabase = createClient(
  process.env.EXPO_PUBLIC_SUPABASE_URL || '',
  process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY || '',
  {
    auth: {
      storage: AsyncStorage, 
      autoRefreshToken: true,
      persistSession: true,
      detectSessionInUrl: false,
    },
  })


// Tells Supabase Auth to continuously refresh the session automatically
// if the app is in the foreground. When this is added, you will continue
// to receive `onAuthStateChange` events with the `TOKEN_REFRESHED` or
// `SIGNED_OUT` event if the user's session is terminated. This should
// only be registered once.
AppState.addEventListener('change', (state) => {
    if (state === 'active') {
      supabase.auth.startAutoRefresh()
    } else {
      supabase.auth.stopAutoRefresh()
    }
  })
