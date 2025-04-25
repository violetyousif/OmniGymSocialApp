// components/SoundCloud.tsx
import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Text, Dimensions } from 'react-native';
import { WebView } from 'react-native-webview';

const SoundCloud = ({ trackUrl }: { trackUrl: string }) => {
  const [showPlayer, setShowPlayer] = useState(false);

  if (!trackUrl) return null;

  const cleanUrl = trackUrl.split('?')[0];
  const embedUrl = `https://w.soundcloud.com/player/?url=${encodeURIComponent(cleanUrl)}&color=%23ff5500&auto_play=true`;

  return (
    <View style={styles.container}>
      {showPlayer ? (
        <WebView source={{ uri: embedUrl }} style={styles.webview} />
      ) : (
        <TouchableOpacity
          style={styles.overlay}
          onPress={() => setShowPlayer(true)}
          activeOpacity={0.9}
        >
          <Text style={styles.playIcon}>▶</Text>
          <Text style={styles.label}>Play PR Song</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 65,
    width: Dimensions.get('window').width - 40,
    alignSelf: 'center',
    marginVertical: 20,
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.2)',
    backdropFilter: 'blur(10px)',
  },
  webview: {
    flex: 1,
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  playIcon: {
    fontSize: 30,
    color: '#FF6B35',
    fontWeight: 'bold',
  },
  label: {
    marginTop: 10,
    color: 'white',
    fontSize: 12,
    fontWeight: '600',
  },
});

export default SoundCloud;



// // components/SoundCloud.tsx
// import React from 'react';
// import { WebView } from 'react-native-webview';
// import { View, StyleSheet, Dimensions } from 'react-native';

// const SoundCloud = ({ trackUrl }: { trackUrl: string }) => {
//   if (!trackUrl) return null;

//   // Clean the URL and embed it
//   const cleanUrl = trackUrl.split('?')[0];
//   const embedUrl = `https://w.soundcloud.com/player/?url=${encodeURIComponent(cleanUrl)}&color=%23ff5500&auto_play=false`;

//   return (
//     <View style={styles.container}>
//       <WebView
//         source={{ uri: embedUrl }}
//         style={styles.webview}
//         javaScriptEnabled
//         domStorageEnabled
//       />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     height: 180,
//     width: Dimensions.get('window').width - 40,
//     alignSelf: 'center',
//     marginTop: 20,
//     borderRadius: 10,
//     overflow: 'hidden',
//   },
//   webview: {
//     flex: 1,
//   },
// });

// export default SoundCloud;



// import React from 'react';
// import { View, StyleSheet } from 'react-native';
// import { WebView } from 'react-native-webview';



// const SoundcloudPlayer = () => {
//     const cleanSoundCloudUrl = (url: string): string => {
//         const questionMarkIndex = url.indexOf('?');
//         return questionMarkIndex !== -1 ? url.slice(0, questionMarkIndex) : url;
//       };
      

//     return (
//     <View style={{ height: 180 }}>
//       <WebView
//         source={{
//           uri: 'https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/1604618475&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true'
//         }}
//         style={styles.webview}
//         allowsInlineMediaPlayback
//         javaScriptEnabled
//         domStorageEnabled
//         scrollEnabled={false}
//       />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   webview: {
//     flex: 1,
//     borderRadius: 8,
//     overflow: 'hidden'
//   },
// });

// export default SoundcloudPlayer;
