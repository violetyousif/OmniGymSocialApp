import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  StyleSheet, 
  ScrollView, 
  Switch, 
  Image, 
  SafeAreaView, 
  Platform, 
  StatusBar,
  Alert
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import {supabase} from '../../../lib/supabase';
import 'react-native-url-polyfill/auto';
import * as FileSystem from 'expo-file-system';

const isValidTimeFormat = (str: string) => {
  return /^\d{1,2}:\d{2}$/.test(str);
};


const base64ToUint8Array = (base64: string) => {
  const binaryString = atob(base64);
  const len = binaryString.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes;
};

const uploadImageToSupabase = async (uri: string, userId: string) => {
  try {
    const extension = uri.split('.').pop()?.toLowerCase() || 'jpeg';
    const contentTypeMap: { [key: string]: string } = {
      jpg: 'image/jpeg',
      jpeg: 'image/jpeg',
      png: 'image/png',
      webp: 'image/webp',
      gif: 'image/gif',
      bmp: 'image/bmp',
    };
    const contentType = contentTypeMap[extension] || 'image/jpeg';

    const base64 = await FileSystem.readAsStringAsync(uri, {
      encoding: FileSystem.EncodingType.Base64,
    });
    const binaryData = base64ToUint8Array(base64);

    const filePath = `${userId}/${Date.now()}.${extension}`;
    const { error } = await supabase.storage
      .from('avatars')
      .upload(filePath, binaryData, {
        contentType,
        upsert: true,
      });

    if (error) {
      console.error('Upload Error:', error);
      return null;
    }

    const { data: publicUrlData } = supabase.storage
      .from('avatars')
      .getPublicUrl(filePath);

    return publicUrlData?.publicUrl || null;
  } catch (err: any) {
    console.error('Upload Exception:', err.message || err);
    return null;
  }
};


const Settings = () => {
  const [userId, setUserId] = useState<string | null>(null);
  const [email, setEmail] = useState<string | null>(null);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');  
  const [caption, setCaption] = useState('');
  // const [profileImage, setProfileImage] = useState('../../../assets/images/avatarBlank.png');
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [isPublic, setIsPublic] = useState(true);
  const [units, setUnits] = useState<'Imperial' | 'Metric'>('Imperial');
  const [fitnessGoal, setFitnessGoal] = useState('');
  const [age, setAge] = useState<number | null>(null);
  const [wilksScore, setWilksScore] = useState<number | null>(null);
  const [joined, setJoined] = useState('');   // Joined year
  const [benchPress, setBenchPress] = useState<number | null>(null);
  const [deadlift, setDeadlift] = useState<number | null>(null);
  const [squats, setSquats] = useState<number | null>(null);
  const [runningTime, setRunningTime] = useState('');

// TEMP CODING: This will be changed to backend once demo is complete. Will also remove hardcoded table names to be dynamic.

// Helper function to refresh user settings
const refreshUserSettings = async (uid: string) => {
  const { data: settings, error } = await supabase
    .from('PFUserSettings')
    .select('*')
    .eq('auth_user_id', uid)
    .single();

  if (error) {
    console.error('Failed to refresh settings:', error);
    return;
  }

  if (settings) {
    setCaption(settings.caption || '');
    setProfileImage(settings.profileImg || '');
    setIsPublic(settings.profilePublic);
    setUnits(settings.units);
    setFitnessGoal(settings.fitnessGoal || '');
    setAge(settings.age);
    setWilksScore(settings.wilks2Score);
  }
};

  // Fetch Supabase profile on load
  useEffect(() => {
    const fetchUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;
      setUserId(user.id);
      // Shows the user ID in the console
      // This is useful for debugging and ensuring that the user is authenticated
      // console.log("Authenticated user ID:", user.id);

      const { data: pfUser } = await supabase
        .from('PFUsers')
        .select('firstName, lastName, email, dateJoined')
        .eq('auth_user_id', user.id)
        .single();

      if (pfUser) {
        setFirstName(pfUser.firstName);
        setLastName(pfUser.lastName);
        setEmail(pfUser.email);
        if (pfUser.dateJoined) {
          const yearJoined = new Date(pfUser.dateJoined).getFullYear().toString();
          setJoined(yearJoined);
        }
      }
      
      const { data: pfMetrics } = await supabase
        .from("PFUserMetrics")
        .select("*")
        .eq("auth_user_id", user.id)
        .single();

      if (pfMetrics) {
        setBenchPress(pfMetrics.prBenchWeight);
        setDeadlift(pfMetrics.prDeadliftWeight);
        setSquats(pfMetrics.prSquatWeight);
        setRunningTime(pfMetrics.runningTime?.toString() || '');
      }

      const { data: settings } = await supabase
        .from('PFUserSettings')
        .select('*')
        .eq('auth_user_id', user.id)
        .single();

      if (settings) {
        setCaption(settings.caption || '');
        setProfileImage(settings.profileImg || '');
        // console.log("Profile image loaded:", settings.profileImg);  // debug
        setIsPublic(settings.profilePublic);
        setUnits(settings.units);
        setFitnessGoal(settings.fitnessGoal || '');
        setAge(settings.age);
        setWilksScore(settings.wilks2Score);
      }
    };

    fetchUser();
  }, []);

  const togglePublic = () => setIsPublic(prev => !prev);
  const toggleUnits = () => setUnits(prev => (prev === 'Imperial' ? 'Metric' : 'Imperial'));
  
  /* Used to convert between units */
  // For example, if the user is in Metric, convert from pounds to kilograms
  const convertToDisplayUnits = (value: number | null) => {
    if (value == null) return '';
    return units === 'Metric' ? (value * 0.453592).toFixed(1) : value.toString();
  };
  // For example, if the user is in Imperial, convert from kilograms to pounds
  const convertFromDisplayUnits = (input: string) => {
    const val = parseFloat(input);
    if (isNaN(val)) return null;
    return units === 'Metric' ? val / 0.453592 : val;
  };
  
  const updateSettings = async (updatePrivacy = isPublic) => {
    if (!email || !userId) return;

    if (!isValidTimeFormat(runningTime)) {
      Alert.alert("Invalid Format", "Running time must be in MM:SS format (e.g., 9:45)");
      return;
    }

    const { error: settingsError } = await supabase
      .from('PFUserSettings')
      .update({
        caption,
        profilePublic: updatePrivacy,
        units,
        fitnessGoal,
        age,
        wilks2Score: wilksScore,
        profileImg: profileImage,
      })
      .eq('auth_user_id', userId);
  
    const { error: metricsError } = await supabase
      .from('PFUserMetrics')
      .update({
        prBenchWeight: benchPress,
        prDeadliftWeight: deadlift,
        prSquatWeight: squats,
        runningTime: runningTime,
      })
      .eq('auth_user_id', userId);
  
    if (settingsError || metricsError) {
      Alert.alert('Error', settingsError?.message || metricsError?.message);
    } else {
      Alert.alert('Success', 'Profile updated successfully');
    }

    if (settingsError) {
      Alert.alert("Error", settingsError.message);
    } else {
      Alert.alert("Success", `Privacy set to ${updatePrivacy ? 'Public' : 'Private'}`);
    }

  };

  const pickImage = async () => {
    try {
      const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (!permissionResult.granted) {
        Alert.alert('Permission Denied', 'Please grant permission to access your media library.');
        return;
      }
  
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ['images'],
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
      });
  
      if (!result.canceled && result.assets?.length > 0 && userId) {
        const selected = result.assets[0];
        const uploadedUrl = await uploadImageToSupabase(selected.uri, userId);
  
        if (uploadedUrl) {
          await supabase
            .from('PFUserSettings')
            .update({ profileImg: uploadedUrl })
            .eq('auth_user_id', userId);
  
          // ✅ Refresh all settings to get the updated image
          await refreshUserSettings(userId);
        }
      }
    } catch (error) {
      console.error('Image Picker Error:', error);
      Alert.alert('Upload Error', 'Failed to select or upload image.');
    }
  };
  

  // const resolvedImageSource = profileImage && profileImage.startsWith('https')
  //   ? { uri: profileImage }
  //   : require('../../../assets/images/avatarBlank.png');
  // console.log('Rendering image:', resolvedImageSource);
  
  return (
    <SafeAreaView style={styles.safeArea}>
      {/* <ScrollView> */}
        <ScrollView contentContainerStyle={styles.scrollContent}>

         {/* Profile Header */}
        <View style={styles.noHorizontalPadding}>
           <View style={styles.header}>
           <TouchableOpacity style={styles.uploadWrapper} onPress={pickImage}>
              <Image
                source={
                  profileImage?.startsWith('http')
                    ? { uri: profileImage }
                    : require('../../../assets/images/avatarBlank.png')
                }
                style={styles.profileImage}
                />
              <View style={styles.uploadOverlay}>
                <Text style={styles.uploadText}>📷</Text>
              </View>
            </TouchableOpacity>
             <Text style={styles.name}>{`${firstName} ${lastName}`}</Text>
             <Text style={styles.caption}>{caption}</Text>
           </View>
         </View>

         {/* Units and Privacy Settings */}
         <View style={styles.section}>
           <Text style={styles.sectionTitle}>Units Converter</Text>
           <View style={styles.switchRow}>
             <Text style={styles.label}>Current: {units}</Text>
             <Switch value={units === 'Metric'} onValueChange={toggleUnits} />
           </View>

           {/* iOS-only spacing */}
           {Platform.OS === 'ios' && <View style={{ height: 20 }} />}

           <Text style={styles.sectionTitle}>Privacy Settings</Text>
           <View style={styles.switchRow}>
             <Text style={styles.label}>{isPublic ? 'Public' : 'Private'}</Text>
             <Switch
                value={isPublic}
                onValueChange={(val) => {
                  setIsPublic(val);
                  updateSettings(val);
                }}
              />

           </View>
         </View>

         {/* Edit Profile Section */}
         <View style={styles.section}>
           <Text style={styles.sectionTitle}>Edit Profile</Text>

        <View style={styles.inputRow}>
          <Text style={styles.label}>First Name:</Text>
          <TextInput
            style={styles.input}
            value={firstName}
            onChangeText={setFirstName}
            placeholder="First name"
          />
        </View>

        <View style={styles.inputRow}>
          <Text style={styles.label}>Last Name:</Text>
          <TextInput
            style={styles.input}
            value={lastName}
            onChangeText={setLastName}
            placeholder="Last name"
          />
        </View>


          <View style={styles.inputRow}>
            <Text style={styles.label}>Caption:</Text>
            <TextInput
              style={styles.input}
              value={caption}
              onChangeText={setCaption}
              placeholder="Enter your caption"
            />
          </View>

          <View style={styles.inputRow}>
            <Text style={styles.label}>Joined Year:</Text>
            <TextInput
              style={styles.input}
              value={joined}
              onChangeText={setJoined}
              placeholder="Enter joined year"
            />
          </View>

          <View style={styles.inputRow}>
            <Text style={styles.label}>Age:</Text>
            <TextInput
              style={styles.input}
              value={String(age)}
              onChangeText={text => setAge(Number(text))}
              placeholder="Enter age"
              keyboardType="numeric"
            />
          </View>

          <View style={styles.inputRow}>
            <Text style={styles.label}>Fitness Goal:</Text>
            <TextInput
              style={styles.input}
              value={fitnessGoal}
              onChangeText={setFitnessGoal}
              placeholder="Enter fitness goal"
            />
          </View>

          <View style={styles.inputRow}>
            <Text style={styles.label}>Wilks2 Score:</Text>
            <TextInput
              style={styles.input}
              value={String(wilksScore)}
              onChangeText={text => setWilksScore(Number(text))}
              placeholder="Enter Wilks Score"
              keyboardType="numeric"
            />
          </View>

          <View style={styles.inputRow}>
            <Text style={styles.label}>Bench Press:</Text>
            <TextInput
              style={styles.input}
              value={convertToDisplayUnits(benchPress)}
              onChangeText={text => setBenchPress(convertFromDisplayUnits(text))}
              placeholder="Enter bench press weight"
              keyboardType="numeric"
            />
          </View>

          <View style={styles.inputRow}>
            <Text style={styles.label}>Deadlift:</Text>
            <TextInput
              style={styles.input}
              value={convertToDisplayUnits(deadlift)}
              onChangeText={text => setDeadlift(convertFromDisplayUnits(text))}
              placeholder="Enter deadlift weight"
              keyboardType="numeric"
            />
          </View>

          <View style={styles.inputRow}>
            <Text style={styles.label}>Running Time:</Text>
            <TextInput
              style={styles.input}
              value={runningTime}
              onChangeText={setRunningTime}
              placeholder="Enter running time (e.g., 9:45)"
            />
          </View>

          <View style={styles.inputRow}>
            <Text style={styles.label}>Squats:</Text>
            <TextInput
              style={styles.input}
              value={convertToDisplayUnits(squats)}
              onChangeText={text => setSquats(convertFromDisplayUnits(text))}
              placeholder="Enter squats weight"
              keyboardType="numeric"
            />
          </View>

          {/* Save Changes Button */}
          <TouchableOpacity style={styles.button} onPress={() => updateSettings()}>
            <Text style={styles.buttonText}>Save Changes</Text>
          </TouchableOpacity>
         </View> 
      </ScrollView>
    </SafeAreaView>
  );
};

export default Settings;


const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  header: {
    alignItems: 'center',
    backgroundColor: '#ff7f50',
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderColor: '#ccc',
  },
  uploadWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  uploadOverlay: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: '#00000080',
    borderRadius: 20,
    padding: 5,
  },
  uploadText: {
    color: 'white',
    fontSize: 14,
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 10,
  },
  caption: {
    fontSize: 14,
    color: '#333',
    marginTop: 4,
    textAlign: 'center',
  },
  section: {
    marginTop: 30,
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 5,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 10,
  },
  switchRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
  },
  inputRow: {
    marginBottom: 15,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    marginTop: 5,
  },
  button: {
    backgroundColor: '#ff7f50',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  noHorizontalPadding: {
    paddingHorizontal: 0,
  },
});
function async() {
  throw new Error('Function not implemented.');
}

