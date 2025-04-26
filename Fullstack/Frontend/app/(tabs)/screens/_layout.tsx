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
      <Tabs.Screen
        name="Home"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, size }) => <Ionicons name="home-outline" size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="Inbox"
        options={{
          title: 'Inbox',
          tabBarIcon: ({ color, size }) => <Ionicons name="mail-outline" size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="Profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color, size }) => <Ionicons name="person-outline" size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="Routine"
        options={{
          title: 'Routine',
          tabBarIcon: ({ color, size }) => <Ionicons name="list-outline" size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="Settings"
        options={{
          title: 'Settings',
          tabBarIcon: ({ color, size }) => <Ionicons name="settings-outline" size={size} color={color} />,
        }}
      />
      
    </Tabs>
  );

  
}