import React, { useEffect, useState } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  Image, 
  TouchableOpacity, 
  FlatList, 
  Dimensions 
} from 'react-native';
import { useRouter } from 'expo-router';
import { supabase } from '../../../lib/supabase'
import { Session } from '@supabase/supabase-js'

const { width, height } = Dimensions.get('window'); 

const HomeScreen = () => {
  const router = useRouter();
  const [user, setUser] = useState(null);

  // content data
  const contentData = [
    { id: '1', image: require('../../../assets/images/foodstock.png'), link: '/(tabs)/Login' },
    { id: '2', image: require('../../../assets/images/sample.png'), link: '/(tabs)/Login' },
    { id: '3', image: require('../../../assets/images/timework.png'), link: '/(tabs)/Login' },
    { id: '4', image: require('../../../assets/images/gympng.png'), link: '/(tabs)/Login' },
    { id: '5', image: require('../../../assets/images/connect.png'), link: '/(tabs)/Login' },
    { id: '6', image: require('../../../assets/images/consult.png'), link: '/(tabs)/Login' },
    { id: '7', image: require('../../../assets/images/plan.png'), link: '/(tabs)/Login' },
  ];
  
  return (
    <View style={styles.container}>
      {/* Full-Width Header */}
      <View style={styles.topBar}>
        <View style={styles.logoContainer}>
          <Image source={require('../../../assets/images/OmniGymLogo.png')} style={styles.logo} />
        </View>
        <TouchableOpacity onPress={() => router.replace('/(tabs)/Login')} style={styles.logoutContainer}>
          <Text style={styles.logout}>LOGOUT</Text>
        </TouchableOpacity>
      </View>

      {/* Content Grid */}
      <View style={styles.contentContainer}>
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
              <Image source={contentData[0].image} style={styles.boxImage} />
            </TouchableOpacity>
          }
          renderItem={({ item }) => (
            <TouchableOpacity 
              style={styles.smallBox} 
              onPress={() => item.link ? router.push(item.link as any) : console.warn(`No link for box ${item.id}`)}
            >
              <Image source={item.image} style={styles.boxImage} />
            </TouchableOpacity>
          )}
        />
      </View>
    </View>
  );
};

// Fixed Styles 
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#333333',
  },
  
  // Full-Width Header
  topBar: {
    width: '100%', 
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FFF', 
    paddingVertical: 18,
    elevation: 5, 
    borderBottomWidth: 7,
    borderBottomColor: '#E97451', 
  },

  // Spacing Below Header
  contentContainer: {
    flex: 1,
    marginTop: 100, 
    paddingHorizontal: 10,
  },

  // Centered Logo
  logoContainer: {
    flex: 1,
    alignItems: 'center',
  },
  logo: {
    width: 40,
    height: 40,
    resizeMode: 'contain',
  },

  // Logout Button
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

  // Grid Layout Fixes
  row: {
    justifyContent: 'space-between',
    marginBottom: 30,
  },
  
  // Large Box
  largeBox: {
    width: width * .95,
    height: 180,
    backgroundColor: '#aaa',
    borderRadius: 20,
    marginBottom: 25,
    marginTop: 15,
    alignSelf: 'center',
  },
  
  // Small Boxes
  smallBox: {
    width: width * 0.46,
    height: 100,
    backgroundColor: '#bbb',
    borderRadius: 10,
    marginBottom: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },

  // Images Inside Boxes
  boxImage: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
    resizeMode: 'cover',
  },
});

export default HomeScreen;
