import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import { useColorScheme } from '@/hooks/useColorScheme';
import RootLayout from './app/_layout'; // Import the layout file

export default function App() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('./assets/fonts/SpaceMono-Regular.ttf'),
  });
  return (
    <NavigationContainer>
      <RootLayout />
      <StatusBar style="auto" />
    </NavigationContainer>
  );
}

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