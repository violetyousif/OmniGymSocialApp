// Settings.tsx
import React, { useState, useEffect, useMemo } from 'react';
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
import { BACKEND_URL } from '../../../lib/config';
import { computeWilksScore } from '../../../components/Wilks2Score';
import GenderSelector from '../../../components/GenderSelector';


// --- SRP: Helper functions below (like isValidTimeFormat and uploadImageToSupabase)
// has a single responsibility (SRP) and is reusable. ---

// Function to validate time format (MM:SS)
const isValidTimeFormat = (str: string) => {
  return /^\d{1,2}:\d{2}$/.test(str);
};

// Function to convert base64 string to Uint8Array for image upload
const base64ToUint8Array = (base64: string) => {
  const binaryString = atob(base64);
  const len = binaryString.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes;
};

// Function to upload image to Supabase
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

// Function to calculate pace
const calculatePace = (
  timeStr: string,
  distance: number | null,
  units: 'Imperial' | 'Metric'
): string => {
  if (!timeStr || !distance || distance === 0) return 'N/A';

  const [minsStr, secsStr] = timeStr.split(':');
  const mins = parseInt(minsStr);
  const secs = parseInt(secsStr);
  if (isNaN(mins) || isNaN(secs)) return 'N/A';

  const totalMinutes = mins + secs / 60;
  const pace = totalMinutes / distance;

  const paceMins = Math.floor(pace);
  const paceSecs = Math.round((pace - paceMins) * 60);
  const formattedSecs = paceSecs < 10 ? `0${paceSecs}` : paceSecs;
  const unitLabel = units === 'Metric' ? '/km' : '/mi';

  return `${paceMins}:${formattedSecs} ${unitLabel}`;
};

// Function to convert pounds to kilograms
const toKg = (value: number | null | undefined): number =>
  (value ?? 0) * 0.453592;

// Function to clean SoundCloud URL
const cleanSoundCloudUrl = (url: string | null) => {
  return url ? url.split('?')[0] : null;
};


// Main Settings Component
const Settings = () => {
  const [userId, setUserId] = useState<string | null>(null);
  const [email, setEmail] = useState<string | null>(null);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [gender, setGender] = useState<string | null>(null);  
  const [caption, setCaption] = useState('');
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [isPublic, setIsPublic] = useState(true);
  const [units, setUnits] = useState<'Imperial' | 'Metric'>('Imperial');
  const [fitnessGoal, setFitnessGoal] = useState('');
  const [age, setAge] = useState<number | null>(null);
  const [joined, setJoined] = useState('');   // Joined year
  const [prSong, setPrSong] = useState<string | null>(null);
  const [bodyWeight, setMemberWeight] = useState<number | null>(0);
  const [benchPress, setBenchPress] = useState<number | null>(0);
  const [benchReps, setBenchReps] = useState<number | null>(0);
  const [deadlift, setDeadlift] = useState<number | null>(0);
  const [deadliftReps, setDeadliftReps] = useState<number | null>(0);
  const [squats, setSquats] = useState<number | null>(0);
  const [squatsReps, setSquatsReps] = useState<number | null>(0);
  const [runningTime, setRunningTime] = useState('');
  const [runningDist, setRunningDist] = useState<number | null>(0);
  const [runningDistText, setRunningDistText] = useState<string>('');  // track raw input
  
  const wilksScore = computeWilksScore({
      //Imperial in DB → Convert using toKg() for score
      gender: gender ?? 'Male',
      memberWeight: toKg(bodyWeight),
      prBenchWeight: toKg(benchPress),
      prBenchReps: benchReps ?? 1,
      prSquatWeight: toKg(squats),
      prSquatReps: squatsReps ?? 1,
      prDeadliftWeight: toKg(deadlift),
      prDeadliftReps: deadliftReps ?? 1,
  });
  

//----- TEMP CODING: This will be changed to backend once demo is complete. Will also remove hardcoded table names to be dynamic. -----

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
    // setGender(settings.gender || '');
    setCaption(settings.caption || '');
    setProfileImage(settings.profileImg || '');
    setIsPublic(settings.profilePublic);
    setUnits(settings.units);
    setFitnessGoal(settings.fitnessGoal || '');
    setAge(settings.age);
    // setPrSong(settings.prSong || '');
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

      await refreshUserSettings(user.id);
 
      const { data: pfMetrics } = await supabase
        .from("PFUserMetrics")
        .select("*")
        .eq("auth_user_id", user.id)
        .single();
      

      if (pfMetrics) {
        setGender(pfMetrics.gender);
        setMemberWeight(pfMetrics.memberWeight);
        setBenchPress(pfMetrics.prBenchWeight);
        setBenchReps(pfMetrics.prBenchReps);
        setDeadlift(pfMetrics.prDeadliftWeight);
        setDeadliftReps(pfMetrics.prDeadliftReps);
        setSquats(pfMetrics.prSquatWeight);
        setSquatsReps(pfMetrics.prSquatReps);
        setRunningTime(pfMetrics.runningTime?.toString() || '');
        setRunningDist(pfMetrics.runningDist);
        // setWilksScore(pfMetrics.wilks2Score);
      }

      const { data: settings } = await supabase
        .from('PFUserSettings')
        .select('*')
        .eq('auth_user_id', user.id)
        .single();

      if (settings) {
        // setGender(settings.caption || '');
        setCaption(settings.caption || '');
        setProfileImage(settings.profileImg || '');
        setIsPublic(settings.profilePublic);
        setUnits(settings.units);
        setFitnessGoal(settings.fitnessGoal || '');
        setAge(settings.age);
        setPrSong(settings.prSong || '');
      }
    };

    fetchUser();
  }, []);

  
  // Toggles the public/private setting
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
  
  // Update the Wilks 2020 score
  const callWilksUpdate = async () => {
    if (!userId) return;
  
    try {
      const response = await fetch(`${BACKEND_URL}/updateWilksScore/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ user_id: userId }),
      });
  
      const text = await response.text();
      console.log("Raw Response:", text);
  
      // Try parsing only if it looks like JSON
      if (response.headers.get('content-type')?.includes('application/json')) {
        const result = JSON.parse(text);
        if (response.ok) {
          console.log('Wilks Score Updated:', result.wilksScore);
          console.log('Wilks Score Updated:', result.wilksScore);
        } else {
          console.warn('Wilks score update failed:', result.message || result.error);
        }
      } else {
        console.error('Unexpected response format (likely HTML):', text);
      }
    } catch (error) {
      console.error('Wilks update error:', error);
    }
  };

  // Function to update settings
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
        prSong: cleanSoundCloudUrl(prSong),
        profileImg: profileImage,
      })
      .eq('auth_user_id', userId);
  
    console.log("Submitting to DB → runningDist:", runningDist, "typeof:", typeof runningDist);

    const normalizedDist = runningDistText.replace(',', '.');
    const parsedDist = parseFloat(runningDistText);
    const newDist = isNaN(parsedDist) ? null : parsedDist;
      
    const { error: metricsError } = await supabase
      .from('PFUserMetrics')
      .update({
        gender,
        memberWeight: bodyWeight,
        prBenchWeight: benchPress,
        prBenchReps: benchReps,
        prDeadliftWeight: deadlift,
        prDeadliftReps: deadliftReps,
        prSquatWeight: squats,
        prSquatReps: squatsReps,
        runningTime,
        runningDist: newDist,
        wilks2Score: wilksScore,
      })
      .eq('auth_user_id', userId);
  
      console.log('Sending to Supabase:', {
        runningDist,
        type: typeof runningDist,
      });
      
      // Update the Wilks score
      // await callWilksUpdate();
      // refresh state again with new Wilks
      if (userId) await refreshUserSettings(userId);

    // Handle errors
    if (settingsError || metricsError) {
      Alert.alert('Error', settingsError?.message || metricsError?.message);
    } else {
      Alert.alert('Success', 'Profile updated successfully');
    }

    // Check if public/private for debugging
    // if (settingsError) {
    //   Alert.alert("Error", settingsError.message);
    // } else {
    //   Alert.alert("Success", `Privacy: ${updatePrivacy ? 'Public' : 'Private'}`);
    // }
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
  
          // Refresh all settings to get the updated image
          await refreshUserSettings(userId);
        }
      }
    } catch (error) {
      console.error('Image Picker Error:', error);
      Alert.alert('Upload Error', 'Failed to select or upload image.');
    }
  };
  
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
            <Text style={styles.label}>PR Song:</Text>
            <TextInput
              style={styles.input}
              value={prSong || ''}
              onChangeText={text => setPrSong(text)}
              placeholder="Enter Soundcloud URL"
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

          {/* Member weight */}
          {/* <View style={styles.inputRow}>
            <Text style={styles.label}>Body Weight:</Text>
            <TextInput
              style={styles.input}
              value={convertToDisplayUnits(memberWeight)}
              onChangeText={text => setMemberWeight(convertFromDisplayUnits(text))}
              placeholder="Enter fitness goal"
            />
          </View> */}

          <View style={styles.inputTwoCols}>
            <View style={styles.inputFlexCol}>
              <Text style={styles.label}>Body Weight:</Text>
              <TextInput
                style={styles.input}
                value={convertToDisplayUnits(bodyWeight)}
                onChangeText={text => setMemberWeight(convertFromDisplayUnits(text))}
                placeholder="Enter fitness goal"
              />
            </View>
            {gender !== null && (
              <GenderSelector gender={gender} setGender={setGender} />
            )}
          </View>

          {/* Bench press row */}
          <View style={styles.inputTwoCols}>
            <View style={styles.inputFlexCol}>
              <Text style={styles.label}>Bench Press Wt:</Text>
              <TextInput
                style={styles.input}
                value={convertToDisplayUnits(benchPress)}
                onChangeText={text => setBenchPress(convertFromDisplayUnits(text))}
                placeholder="Enter bench press weight"
                keyboardType="numeric"
              />
            </View>
            <View style={styles.inputFlexCol}>
              <Text style={styles.label}>Reps:</Text>
              <TextInput
                style={styles.input}
                value={String(benchReps)}
                onChangeText={text => setBenchReps(Number(text))}
                placeholder="Enter bench press reps"
                keyboardType="numeric"
              />
            </View>
          </View>

          {/* Deadlift row */}
          <View style={styles.inputTwoCols}>
            <View style={styles.inputFlexCol}>
            <Text style={styles.label}>Deadlift Weight:</Text>
            <TextInput
              style={styles.input}
              value={convertToDisplayUnits(deadlift)}
              onChangeText={text => setDeadlift(convertFromDisplayUnits(text))}
              placeholder="Enter deadlift weight"
              keyboardType="numeric"
            />
            </View>
            <View style={styles.inputFlexCol}>
              <Text style={styles.label}>Reps:</Text>
              <TextInput
                style={styles.input}
                value={String(deadliftReps)}
                onChangeText={text => setDeadliftReps(Number(text))}
                placeholder="Enter deadlift reps"
                keyboardType="numeric"
              />
            </View>
          </View>

          {/* Squat row */}
          <View style={styles.inputTwoCols}>
            <View style={styles.inputFlexCol}>
              <Text style={styles.label}>Squat Weight:</Text>
              <TextInput
                style={styles.input}
                value={convertToDisplayUnits(squats)}
                onChangeText={text => setSquats(convertFromDisplayUnits(text))}
                placeholder="Enter squats weight"
                keyboardType="numeric"
              />
            </View>
            <View style={styles.inputFlexCol}>
              <Text style={styles.label}>Reps:</Text>
              <TextInput
                style={styles.input}
                value={String(squatsReps)}
                onChangeText={text => setSquatsReps(Number(text))}
                placeholder="Enter squats reps"
                keyboardType="numeric"
              />
            </View>
          </View>

          {/* Wilks Score */}
          <View style={[styles.inputRow, { paddingVertical: 10 }]}>
          <Text style={styles.label}>
            Calculated Wilks 2020 Score:
            {'  '}
            {typeof wilksScore === 'number' ? wilksScore.toString() : 'N/A'}
          </Text>
          </View>


          {/* Running Time and Distance */}
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
          <Text style={styles.label}>Running Distance:</Text>
            <TextInput
              style={styles.input}
              value={runningDistText}
              onChangeText={(text) => {
                setRunningDistText(text); // Store raw input
                console.log("Running Dist (raw text):", text);
              }}
              onBlur={() => {
                const normalized = runningDistText.replace(',', '.');
                const parsed = parseFloat(normalized);
                console.log("Parsed as:", parsed);
                setRunningDist(isNaN(parsed) ? null : parsed);
              }}
              placeholder="Enter running distance"
              keyboardType={Platform.OS === 'ios' ? 'decimal-pad' : 'numeric'}
              inputMode="decimal"
            />
            </View>
            <View style={[styles.inputRow, { paddingVertical: 10 }]}>
              <Text style={styles.label}>
                Caculated Pace: 
                <View style={{ width: 5 }} />  {/* Spacer */}
                {calculatePace(runningTime, parseFloat(runningDistText) || 0, units)}
              </Text>
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
  inputTwoCols: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10,
    marginBottom: 15,
  },
  inputFlexCol: {
    flex: 1,
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


//#codebase