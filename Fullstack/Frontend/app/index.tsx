// filepath: /Users/violetyousif/Documents/GithubProjects/OmniGymSocialApp/Fullstack/Frontend/app/(tabs)/index.tsx
import React from 'react';
import { AppRegistry } from 'react-native';
import WelcomePg from './(tabs)/Welcome'; // Adjust the path to your main App component if necessary
import appConfig from '../app.json';
const appName = appConfig.expo.name; // Use the name property inside the expo object



const Main = () => {
  return <WelcomePg />;
};

AppRegistry.registerComponent(appName, () => Main);

export default Main;

//#codebase