import React, { useState } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  Image, 
  TouchableOpacity, 
  FlatList, 
  Dimensions, 
  Platform, 
  StatusBar, 
  SafeAreaView 
} from 'react-native';
import { useRouter } from 'expo-router';
import { FontAwesome } from '@expo/vector-icons';
import { supabase } from '../../../lib/supabase'
import { Session } from '@supabase/supabase-js'

const { width } = Dimensions.get('window');

const HomeScreen = () => {
  const router = useRouter();
  const [user, setUser] = useState(null);

  const HEADER_HEIGHT = 80;
  const STATUSBAR_HEIGHT = Platform.OS === 'ios' ? 0 : StatusBar.currentHeight || 0;
  const HEADER_OFFSET = STATUSBAR_HEIGHT + HEADER_HEIGHT;

  const contentData = [
    { id: '1', image: require('../../../assets/images/Orange.jpg'), link: '/(tabs)/exscreens/Leaderboard', label: 'Leaderboards' },
    { id: '2', image: require('../../../assets/images/Orange2.jpg'), link: '/(tabs)/exscreens/Events', label: 'Events' },
    { id: '3', image: require('../../../assets/images/Orange3.jpg'), link: '/(tabs)/screens/Settings', label: 'Settings' },
    { id: '4', image: require('../../../assets/images/Orange4.jpg'), link: '/(tabs)/screens/Profile', label: 'Profile' },
    { id: '5', image: require('../../../assets/images/Orange5.jpg'), link: '/(tabs)/exscreens/Support', label: 'Support' },
    { id: '6', image: require('../../../assets/images/Orange6.jpg'), link: '/(tabs)/screens/Inbox', label: 'Inbox' },
    { id: '7', image: require('../../../assets/images/Orange7.jpg'), link: '/(tabs)/screens/Routine', label: 'Routine' },
  ];

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFF" />

      <View style={styles.container}>
        {/* Full-Width Header */}
        <View style={[styles.topBar, { paddingTop: STATUSBAR_HEIGHT }]}>
          <TouchableOpacity style={styles.chatIcon} onPress={() => router.replace('/(tabs)/screens/Inbox')}>
            <FontAwesome name="comment" size={24} color="gray" />
          </TouchableOpacity>

          <View style={styles.logoContainer}>
            <Image source={require('../../../assets/images/OmniGymLogo.png')} style={styles.logo} />
          </View>

          <TouchableOpacity onPress={() => router.replace('/(tabs)/Login')} style={styles.logoutContainer}>
            <Text style={styles.logout}>LOGOUT</Text>
          </TouchableOpacity>
        </View>

        {/* Content Grid */}
        <View style={[styles.contentContainer, { marginTop: HEADER_OFFSET }]}>
          <FlatList
            data={contentData.slice(1)}
            keyExtractor={(item) => item.id}
            numColumns={2}
            columnWrapperStyle={styles.row}
            ListHeaderComponent={
              <TouchableOpacity 
                style={styles.largeBox} 
                onPress={() => contentData[0].link ? router.push(contentData[0].link as any) : console.warn(`No link for large box`)}
              >
                <View style={styles.imageWrapper}>
                  <Image source={contentData[0].image} style={styles.boxImage} />
                  <Text style={styles.overlayText}>{contentData[0].label}</Text>
                </View>
              </TouchableOpacity>
            }
            renderItem={({ item }) => (
              <TouchableOpacity 
                style={styles.smallBox} 
                onPress={() => item.link ? router.push(item.link as any) : console.warn(`No link for box ${item.id}`)}
              >
                <View style={styles.imageWrapper}>
                  <Image source={item.image} style={styles.boxImageSmall} />
                  <Text style={styles.overlayText}>{item.label}</Text>
                </View>
              </TouchableOpacity>
            )}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FFF', // Ensures white behind StatusBar
  },
  container: {
    flex: 1,
    backgroundColor: '#333333',
  },
  topBar: {
    width: '100%',
    backgroundColor: '#FFF',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 18,
    elevation: 5,
    borderBottomWidth: 7,
    borderBottomColor: '#E97451',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 10,
  },
  chatIcon: {
    position: 'absolute',
    left: 20,
    bottom: 10,
  },
  logoContainer: {
    flex: 1,
    alignItems: 'center',
  },
  logo: {
    width: 40,
    height: 40,
    resizeMode: 'contain',
  },
  logoutContainer: {
    position: 'absolute',
    right: 20,
    bottom: 10,
  },
  logout: {
    fontSize: 14,
    fontWeight: 'bold',
    color: 'black',
  },
  contentContainer: {
    flex: 1,
    paddingHorizontal: 10,
  },
  row: {
    justifyContent: 'space-between',
    marginBottom: 30,
  },
  largeBox: {
    width: width * 0.95,
    height: 180,
    backgroundColor: '#aaa',
    borderRadius: 20,
    marginBottom: 25,
    marginTop: 15,
    alignSelf: 'center',
  },
  smallBox: {
    width: width * 0.46,
    height: 100,
    backgroundColor: '#bbb',
    borderRadius: 10,
    marginBottom: 10,
  },
  imageWrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  overlayText: {
    position: 'absolute',
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    textShadowColor: '#000',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
    zIndex: 2,
  },
  boxImage: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
    resizeMode: 'cover',
  },
  boxImageSmall: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
    resizeMode: 'cover',
  },
});

export default HomeScreen;


//#codebase