import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/useColorScheme';


// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <ThemeProvider
      value={
        colorScheme === 'light'
          ? { ...DarkTheme, colors: { ...DarkTheme.colors, background: 'transparent' } }
          : { ...DefaultTheme, colors: { ...DefaultTheme.colors, background: 'transparent' } }
      }
    >
      <Stack screenOptions={{ headerShown: false }}>
        {/* Hide header for Welcome & Authentication Screens */}
        {/* <Stack.Screen name="/SplashScreen" /> */}
        <Stack.Screen name="/(tabs)/Welcome" />
        <Stack.Screen name="/(tabs)/Login" />
        <Stack.Screen name="/auth/RegisterAccount" />
        <Stack.Screen name="/auth/RegisterGym" />

        {/* Ensure Bottom Tabs Load After Login */}
        <Stack.Screen name="/(tabs)/screens" />
        {/* <Stack.Screen name="/(tabs)/screens/_layout" />
        <Stack.Screen name="/(tabs)/screens/Home" />
        <Stack.Screen name="/(tabs)/screens/Inbox" />
        <Stack.Screen name="/(tabs)/screens/Profile" />
        <Stack.Screen name="/(tabs)/screens/Settings" /> */}

        {/* Not Found Page */}
        <Stack.Screen name="+not-found" />
      </Stack>
      <StatusBar style="auto" />


        {/* Hide header for Welcome & Authentication Screens 
        <Stack.Screen name="welcome" />
        <Stack.Screen name="auth" />
        <Stack.Screen name="auth/RegisterAccount" />
        <Stack.Screen name="auth/RegisterGym" />*/}

        {/* Ensure Bottom Tabs Load After Login 
        <Stack.Screen name="(tabs)" />*/}

        {/* Not Found Page 
        <Stack.Screen name="+not-found" />
      </Stack>
      <StatusBar style="auto" />*/}
    </ThemeProvider>
  );
}

//#codebase