import 'react-native-url-polyfill/auto';
import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { StatusBar } from 'expo-status-bar';
import { View } from 'react-native';
import { supabase } from './lib/supabase';
import { Session } from '@supabase/supabase-js';

import LoginScreen from './app/(tabs)/Login'; // 👈 Import your custom Login page
import RootLayout from './app/_layout';     // Your main app layout


export default function App() {
  const [loaded] = useFonts({
    SpaceMono: require('./assets/fonts/SpaceMono-Regular.ttf'),
  });

  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    // Check session on mount
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    // Subscribe to session updates (login/logout)
    const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    // Clean up on unmount
    return () => {
      authListener?.subscription.unsubscribe();
    };
  }, []);

  if (!loaded) return null;

  return (
    <NavigationContainer>
      {/* If logged in, show the main app; otherwise, show login */}
      {session && session.user ? <RootLayout /> : <LoginScreen />}
      <StatusBar style="auto" />
    </NavigationContainer>
  );
}




// import 'react-native-url-polyfill/auto'
// import React from 'react';
// import { NavigationContainer } from '@react-navigation/native';
// import { useFonts } from 'expo-font';
// import { StatusBar } from 'expo-status-bar';
// import { useColorScheme } from '@/hooks/useColorScheme';
// import RootLayout from './app/_layout'; // Import the layout file

// export default function App() {
//   const colorScheme = useColorScheme();
//   const [loaded] = useFonts({
//     SpaceMono: require('./assets/fonts/SpaceMono-Regular.ttf'),
//   });
//   return (
//     <NavigationContainer>
//       <RootLayout />
//       <StatusBar style="auto" />
//     </NavigationContainer>
//   );
// }

// import React from 'react';
// import { NavigationContainer, DarkTheme, DefaultTheme } from '@react-navigation/native';
// import { useFonts } from 'expo-font';
// import * as SplashScreen from 'expo-splash-screen';
// import { StatusBar } from 'expo-status-bar';
// import { useEffect } from 'react';
// import { useColorScheme } from '@/hooks/useColorScheme';
// import RootLayout from './_layout'; // Import the layout file

// // Prevent the splash screen from auto-hiding before asset loading is complete.

// export default function App() {
//   const colorScheme = useColorScheme();
//   const [loaded] = useFonts({
//     SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
//   });

//   return (
//     <NavigationContainer>
//       <RootLayout />
//       <StatusBar style="auto" />
//     </NavigationContainer>
//   );
// }