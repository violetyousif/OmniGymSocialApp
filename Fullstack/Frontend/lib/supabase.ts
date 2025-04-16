
// PAGE PURPOSE: This page connects to the Supabase DB and handles authentication.

import { AppState } from "react-native"
// Ensure the URL polyfill is loaded before importing any other modules that depend on it
// This is important for the Supabase client to work correctly in a React Native environment
import "react-native-url-polyfill/auto" // Polyfill for react-native
import AsyncStorage from '@react-native-async-storage/async-storage'
import { createClient } from '@supabase/supabase-js'

// Supabase url and anon key; connects to .env file in frontend
export const supabase = createClient(
  process.env.EXPO_PUBLIC_SUPABASE_URL || "https://dxhsxrtltaceipztlcns.supabase.co",
  process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImR4aHN4cnRsdGFjZWlwenRsY25zIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDI3OTIxMjgsImV4cCI6MjA1ODM2ODEyOH0.2y9zy4awtmSK9RdG7av3197MkKCQ-yEkfdCiLiPKSf0",
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