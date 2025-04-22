import { Tabs } from 'expo-router';
import Ionicons from '@expo/vector-icons/Ionicons';
import { supabase } from '../../../lib/supabase';
import { useEffect, useState } from 'react';


//added for admin user check
export default function TabsLayout() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [userChecked, setUserChecked] = useState(false);

  useEffect(() => {
    const checkAdmin = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      console.log('LOGGED IN USER:', user); 
      if (user?.email === 'admin@example.com') {
        setIsAdmin(true);
      }
      setUserChecked(true);
    };
    checkAdmin();
  }, []);

  if (!userChecked) return null; // Wait for the auth check

      {/* these Tabs should only visible if the user is an admin (use admin@example.com  as the email to test with password: admin12345) */}

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: 'white',
          borderTopWidth: 1,
          borderTopColor: '#ddd',
          height: 60,
          paddingBottom: 10,
        },
        tabBarActiveTintColor: '#E97451',
        tabBarInactiveTintColor: 'gray',
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '600',
        },
      }}
    >
      {/* Always show these 5 tabs for everyone */}
      {isAdmin && (
        <Tabs.Screen
          name="Home"
          options={{
            title: 'Home',
            tabBarIcon: ({ color, size }) => <Ionicons name="home-outline" size={size} color={color} />,
          }}
        />
      )}
      {isAdmin && (
        <Tabs.Screen
          name="AdminLeaderboard"
          options={{
            title: 'Leaderboard',
            tabBarIcon: ({ color, size }) => <Ionicons name="trophy-outline" size={size} color={color} />,
          }}
        />
      )}
      {isAdmin && (
        <Tabs.Screen
        name="AdminEvents"
        options={{
          title: 'Events',
          tabBarIcon: ({ color, size }) => <Ionicons name="calendar-outline" size={size} color={color} />,
        }}
        />
      )}
      {isAdmin && (
        <Tabs.Screen
          name="AdminForms"
          options={{
            title: 'Forms',
            tabBarIcon: ({ color, size }) => <Ionicons name="document-outline" size={size} color={color} />,
          }}
        />
      )}

      {isAdmin && (
        <Tabs.Screen
          name="AdminSettings"
          options={{
            title: 'Settings',
            tabBarIcon: ({ color, size }) => <Ionicons name="settings-outline" size={size} color={color} />,
          }}
        />
      )}
    </Tabs>
  );

  
}