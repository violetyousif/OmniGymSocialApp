import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import Home from '../(tabs)/Home';
import Inbox from '../(tabs)/Inbox';
import Profile from '../(tabs)/Profile';
import Routine from '../(tabs)/Routine';
import Settings from '../(tabs)/Settings';

const Tab = createBottomTabNavigator();

const BottomTabs = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator initialRouteName="Profile">
        <Tab.Screen name="Home" component={Home} />
        <Tab.Screen name="Inbox" component={Inbox} />
        <Tab.Screen name="Profile" component={Profile} />
        <Tab.Screen name="Routine" component={Routine} />
        <Tab.Screen name="Settings" component={Settings} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default BottomTabs;
