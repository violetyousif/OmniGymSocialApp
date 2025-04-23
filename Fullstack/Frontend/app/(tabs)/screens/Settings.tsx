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


// const uploadImageToSupabase = async (fileUri: string, userId: string) => {
//   const fileExt = fileUri.split('.').pop();
//   const fileName = `${userId}_${Date.now()}.${fileExt}`;
//   const fileType = mime.getType(fileUri) || 'image/png';

//   const fileData = await FileSystem.readAsStringAsync(fileUri, {
//     encoding: FileSystem.EncodingType.Base64,
//   });

//   const { data, error } = await supabase.storage
//     .from('avatars')
//     .upload(fileName, Buffer.from(fileData, 'base64'), {
//       contentType: fileType,
//       upsert: true,
//     });

//   if (error) {
//     throw new Error(`Upload Error: ${error.message}`);
//   }

//   const { data: publicUrlData } = supabase
//     .storage
//     .from('avatars')
//     .getPublicUrl(fileName);

//   return publicUrlData.publicUrl;
// };

// const uploadToSupabase = async (uri: string, userId: string): Promise<string | null> => {
//   const fileExt = uri.split('.').pop();
//   const fileName = `${userId}_${Date.now()}.${fileExt}`;
//   const filePath = `${fileName}`;

//   const response = await fetch(uri);
//   const blob = await response.blob();

//   const { error: uploadError } = await supabase.storage
//     .from('avatars')
//     .upload(filePath, blob, {
//       cacheControl: '3600',
//       upsert: true,
//       contentType: blob.type,
//     });

//   if (uploadError) {
//     console.error('Upload Error:', uploadError.message);
//     return null;
//   }

//   const { data } = supabase.storage.from('avatars').getPublicUrl(filePath);
//   return data.publicUrl;
// };

const uploadImageToSupabase = async (uri: string, userId: string) => {
  try {
    const response = await fetch(uri);
    const blob = await response.blob();
    const extension = uri.split('.').pop()?.toLowerCase() || '';

    const contentTypeMap: { [key: string]: string } = {
      jpg: 'image/jpg',
      jpeg: 'image/jpeg',
      png: 'image/png',
      webp: 'image/webp',
      gif: 'image/gif',
      bmp: 'image/bmp',
    };

    const contentType = contentTypeMap[extension] || 'image/png';
    // const contentType = 'image/*';

    const filePath = `${userId}/${Date.now()}.${extension}`;

    const { data, error } = await supabase.storage
      .from('avatars')
      .upload(filePath, blob, {
        contentType,
        upsert: true,
      });

    if (error) {
      console.error('Upload Error:', error);
      Alert.alert('Error', 'Failed to upload image to Supabase.');
      return null;
    }
    console.log('Upload successful:', data);

    const { data: publicUrlData } = supabase.storage
      .from('avatars')
      .getPublicUrl(filePath);
      if (!publicUrlData?.publicUrl) {
        console.error('No public URL returned');
        return null;
      }
    return publicUrlData.publicUrl;
      
  } catch (err) {
    console.error('Upload Exception:', err);
    return null;
  }
};

const Settings = () => {
  const [userId, setUserId] = useState<string | null>(null);
  const [email, setEmail] = useState<string | null>(null);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');  
  const [caption, setCaption] = useState('');
  const [profileImage, setProfileImage] = useState('Fullstack/Frontend/assets/images/avatarBlank.png');
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

  // Fetch Supabase profile on load
  useEffect(() => {
    const fetchUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;
      setUserId(user.id);
      // Shows the user ID in the console
      // This is useful for debugging and ensuring that the user is authenticated
      console.log("🔐 Authenticated user ID:", user.id);

      const { data: pfUser } = await supabase
        .from('PFUsers')
        .select('firstName, lastName, email')
        .eq('auth_user_id', user.id)
        .single();

      if (pfUser) {
        setFirstName(pfUser.firstName);
        setLastName(pfUser.lastName);
        setEmail(pfUser.email);
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
        setProfileImage(settings.profileImg || 'Fullstack/Frontend/assets/images/avatarBlank.png');
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

    // console.log("Updating profilePublic:", isPublic);

    if (settingsError) {
      Alert.alert("Error", settingsError.message);
    } else {
      Alert.alert("Success", `Privacy set to ${updatePrivacy ? 'Public' : 'Private'}`);
    }

  };

  const pickImage = async() => {
      try {
        
        // Request permissions
        const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (!permissionResult.granted) {
          Alert.alert('Permission Denied', 'Please grant permission to access your media library.');
          return;
        }
  
        // Open the image picker
        const result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ['images'],
          allowsEditing: true,
          aspect: [1, 1], 
          quality: 1,
        });

        if (!result.canceled && result.assets?.length > 0) {
          const selected = result.assets[0];
    
          const uploadedUrl = await uploadImageToSupabase(selected.uri, userId!);
          if (uploadedUrl) {
            setProfileImage(uploadedUrl);
            Alert.alert('Success', 'Profile image uploaded successfully!');
          }
        }
      } catch (error) {
        console.error('Image Picker Error:', error);
        Alert.alert('Error', 'An error occurred while selecting the image.');
      }
    };
      // if (!result.canceled && result.assets?.length > 0) {
      //     const selected = result.assets[0];
      //     if (!result.canceled && result.assets?.length > 0) {
      //       const image = result.assets[0];
      //       const fileExt = image.uri.split('.').pop();
      //       const fileName = `avatar-${Date.now()}.${fileExt}`;
    
      //       const file = {
      //         uri: image.uri,
      //         type: image.type ?? 'image/jpeg',
      //         name: fileName,
      //       };
    
      //       const { data, error: uploadError } = await supabase.storage
      //         .from('avatars')
      //         .upload(fileName, file, { cacheControl: '3600', upsert: true });
    
      //       if (uploadError) {
      //         console.error('Upload Error:', uploadError);
      //         Alert.alert('Error', 'Failed to upload image.');
      //         return;
      //       }
    
      //       const { data: publicUrlData } = supabase.storage
      //         .from('avatars')
      //         .getPublicUrl(fileName);
    
      //       const publicUrl = publicUrlData?.publicUrl;
      //       if (publicUrl) {
      //         setProfileImage(publicUrl);
      //         await updateProfileImageInDB(publicUrl);
      //         Alert.alert('Success', 'Image uploaded and saved!');
      //       }
      //     }
      //   } catch (error) {
      //     console.error('Image picking error:', error);
      //     Alert.alert('Error', 'Image picker failed.');
      //   }
      // };    
          //const publicUrl = await uploadToSupabase(selected.uri, userId!);
          // const fileType = selected.uri.split('.').pop()?.toLowerCase();
    
          // if (['jpg', 'jpeg', 'png'].includes(fileType || '')) {
          //   setProfileImage(selected.uri);
          //   Alert.alert('Success', 'Profile image updated!');
          // } else {
          //   Alert.alert('Invalid Format', 'Only JPG and PNG formats are supported.');
          // }
          // if (publicUrl) {
          //   setProfileImage(publicUrl);
          //   Alert.alert('Success', 'Profile image updated!');
          // } else {
          //   Alert.alert('Upload Failed', 'Could not upload image to Supabase.');
          // }

                // Upload to Supabase Storage
    //       if (userId) {
    //         const publicUrl = await uploadImageToSupabase(selected.uri, userId);
    //       } else {
    //         Alert.alert('Error', 'User ID is not available.');
    //       }

    //       // Save public URL in DB
    //       const { error } = await supabase
    //         .from('PFUserSettings')
    //         .update({ profileImg: publicUrl })
    //         .eq('auth_user_id', userId);

    //       if (error) {
    //         Alert.alert('Error', 'Failed to update profile image URL in database.');
    //       } else {
    //         setProfileImage(publicUrl); // update UI
    //         Alert.alert('Success', 'Profile image updated!');
    //       }
    //     }
    //   } catch (err) {
    //     console.error('Image picking error:', err);
    //     Alert.alert('Error', 'Failed to select image.');
    //   }
    // };

  // const pickImageFromLibrary = async () => {
  //   const { status } = await MediaLibrary.requestPermissionsAsync();
  //   if (status !== 'granted') {
  //     Alert.alert('Permission required', 'Please allow media access to choose a profile image.');
  //     return;
  //   }
  
  //   const media = await MediaLibrary.getAssetsAsync({
  //     mediaType: 'photo',
  //     first: 1, // You can load more and show custom UI
  //     sortBy: ['creationTime'],
  //   });
  
  //   if (media.assets.length > 0) {
  //     setProfileImage(media.assets[0].uri);
  //   } else {
  //     Alert.alert('No photos', 'No images were found in your library.');
  //   }
  // };
  
  

  // const formatRunningTimeWithUnit = (time: string) => {
  //   const unit = units === 'Metric' ? '/km' : '/mi';
  //   return time ? `${time}${unit}` : 'N/A';
  // };

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* <ScrollView> */}
        <ScrollView contentContainerStyle={styles.scrollContent}>

         {/* Profile Header */}
         {/* <View style={styles.noHorizontalPadding}>
           <View style={styles.header}>
           <TouchableOpacity style={styles.uploadWrapper} onPress={pickImageFromLibrary}>
              <Image source={{ uri: profileImage }} style={styles.profileImage} />
              <View style={styles.uploadOverlay}>
                <Text style={styles.uploadText}>📷</Text>
              </View>
            </TouchableOpacity>
             <Text style={styles.name}>{`${firstName} ${lastName}`}</Text>
             <Text style={styles.caption}>{caption}</Text>
           </View>
         </View> */}
        <View style={styles.noHorizontalPadding}>
           <View style={styles.header}>
           {/* <TouchableOpacity style={styles.uploadWrapper} onPress={pickImageFromLibrary}> */}
           <TouchableOpacity style={styles.uploadWrapper} onPress={pickImage}>
              <Image 
              source={{ uri: profileImage || 'Fullstack/Frontend/assets/images/avatarBlank.png' }}
              style={styles.profileImage} />
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

// const Settings = () => {
//   // States for profile information
//   const [isPublic, setIsPublic] = useState(true);
//   const [units, setUnits] = useState('Imperial');
//   const [name, setName] = useState('Jane Doe');
//   const [caption, setCaption] = useState('Fitness Enthusiast | Gym Lover | Stronger Every Day');
//   const [profileImage, setProfileImage] = useState<string>('https://via.placeholder.com/150');

//   // States for general information
//   const [joined, setJoined] = useState('2018');
//   const [age, setAge] = useState(30);
//   const [fitnessGoal, setFitnessGoal] = useState('Build Muscle');
//   const [wilksScore, setWilksScore] = useState(366);

//   // States for metrics
//   const [benchPress, setBenchPress] = useState(105);
//   const [deadlift, setDeadlift] = useState(220);
//   const [runningTime, setRunningTime] = useState('5:30 min/km');
//   const [squats, setSquats] = useState(220);

//   const togglePublic = () => setIsPublic(prev => !prev);
//   const toggleUnits = () => setUnits(units === 'Imperial' ? 'SI' : 'Imperial');

//   const pickImage = async () => {
//     const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
//     if (!permission.granted) {
//       alert('Permission to access gallery is required!');
//       return;
//     }

//     let result = await ImagePicker.launchImageLibraryAsync({
//       mediaTypes: ImagePicker.MediaTypeOptions.Images,
//       allowsEditing: true,
//       aspect: [1, 1],
//       quality: 1,
//     });

//     if (!result.canceled && result.assets.length > 0) {
//       const selected = result.assets[0];
//       const fileType = selected.uri.split('.').pop()?.toLowerCase();
//       if (fileType === 'png' || fileType === 'jpg' || fileType === 'jpeg') {
//         setProfileImage(selected.uri);
//       } else {
//         alert('Only PNG or JPEG files are allowed.');
//       }
//     }
//   };

//   return (
//     <SafeAreaView style={styles.safeArea}>
//       <ScrollView contentContainerStyle={styles.scrollContent}>

//         {/* Profile Header */}
//         <View style={styles.noHorizontalPadding}>
//           <View style={styles.header}>
//             <TouchableOpacity style={styles.uploadWrapper} onPress={pickImage}>
//               <Image source={{ uri: profileImage }} style={styles.profileImage} />
//               <View style={styles.uploadOverlay}>
//                 <Text style={styles.uploadText}>📷</Text>
//               </View>
//             </TouchableOpacity>
//             <Text style={styles.name}>{name}</Text>
//             <Text style={styles.caption}>{caption}</Text>
//           </View>
//         </View>

//         {/* Units and Privacy Settings */}
//         <View style={styles.section}>
//           <Text style={styles.sectionTitle}>Units Converter</Text>
//           <View style={styles.switchRow}>
//             <Text style={styles.label}>Current: {units}</Text>
//             <Switch value={units === 'SI'} onValueChange={toggleUnits} />
//           </View>

//           {/* iOS-only spacing */}
//           {Platform.OS === 'ios' && <View style={{ height: 20 }} />}

//           <Text style={styles.sectionTitle}>Privacy Settings</Text>
//           <View style={styles.switchRow}>
//             <Text style={styles.label}>{isPublic ? 'Public' : 'Private'}</Text>
//             <Switch value={isPublic} onValueChange={togglePublic} />
//           </View>
//         </View>

//         {/* Edit Profile Section */}
//         <View style={styles.section}>
//           <Text style={styles.sectionTitle}>Edit Profile</Text>

//           <View style={styles.inputRow}>
//             <Text style={styles.label}>Name:</Text>
//             <TextInput
//               style={styles.input}
//               value={name}
//               onChangeText={setName}
//               placeholder="Enter your name"
//             />
//           </View>

//           <View style={styles.inputRow}>
//             <Text style={styles.label}>Caption:</Text>
//             <TextInput
//               style={styles.input}
//               value={caption}
//               onChangeText={setCaption}
//               placeholder="Enter your caption"
//             />
//           </View>

//           <View style={styles.inputRow}>
//             <Text style={styles.label}>Joined Year:</Text>
//             <TextInput
//               style={styles.input}
//               value={joined}
//               onChangeText={setJoined}
//               placeholder="Enter joined year"
//             />
//           </View>

//           <View style={styles.inputRow}>
//             <Text style={styles.label}>Age:</Text>
//             <TextInput
//               style={styles.input}
//               value={String(age)}
//               onChangeText={text => setAge(Number(text))}
//               placeholder="Enter age"
//               keyboardType="numeric"
//             />
//           </View>

//           <View style={styles.inputRow}>
//             <Text style={styles.label}>Fitness Goal:</Text>
//             <TextInput
//               style={styles.input}
//               value={fitnessGoal}
//               onChangeText={setFitnessGoal}
//               placeholder="Enter fitness goal"
//             />
//           </View>

//           <View style={styles.inputRow}>
//             <Text style={styles.label}>Wilks Score:</Text>
//             <TextInput
//               style={styles.input}
//               value={String(wilksScore)}
//               onChangeText={text => setWilksScore(Number(text))}
//               placeholder="Enter Wilks Score"
//               keyboardType="numeric"
//             />
//           </View>

//           <View style={styles.inputRow}>
//             <Text style={styles.label}>Bench Press:</Text>
//             <TextInput
//               style={styles.input}
//               value={String(benchPress)}
//               onChangeText={text => setBenchPress(Number(text))}
//               placeholder="Enter bench press weight"
//               keyboardType="numeric"
//             />
//           </View>

//           <View style={styles.inputRow}>
//             <Text style={styles.label}>Deadlift:</Text>
//             <TextInput
//               style={styles.input}
//               value={String(deadlift)}
//               onChangeText={text => setDeadlift(Number(text))}
//               placeholder="Enter deadlift weight"
//               keyboardType="numeric"
//             />
//           </View>

//           <View style={styles.inputRow}>
//             <Text style={styles.label}>Running Time:</Text>
//             <TextInput
//               style={styles.input}
//               value={runningTime}
//               onChangeText={setRunningTime}
//               placeholder="Enter running time"
//             />
//           </View>

//           <View style={styles.inputRow}>
//             <Text style={styles.label}>Squats:</Text>
//             <TextInput
//               style={styles.input}
//               value={String(squats)}
//               onChangeText={text => setSquats(Number(text))}
//               placeholder="Enter squats weight"
//               keyboardType="numeric"
//             />
//           </View>

//           {/* Save Changes Button */}
//           <TouchableOpacity style={styles.button} onPress={() => alert('Profile updated')}>
//             <Text style={styles.buttonText}>Save Changes</Text>
//           </TouchableOpacity>
//         </View>

//       </ScrollView>
//     </SafeAreaView>
//   );
// };

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

