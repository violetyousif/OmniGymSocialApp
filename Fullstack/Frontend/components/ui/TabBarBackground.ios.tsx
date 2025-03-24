import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { BlurView } from 'expo-blur';
import { StyleSheet, View, Platform } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';

export default function BlurTabBarBackground() {
  const insets = useSafeAreaInsets();

  return (
    <SafeAreaView style={[StyleSheet.absoluteFill, { paddingBottom: insets.bottom, marginBottom: Platform.OS == 'ios' ? 10 : 0 }]}>
      <BlurView
        // System chrome material automatically adapts to the system's theme
        // and matches the native tab bar appearance on iOS.
        tint="systemChromeMaterial"
        intensity={100}
        style={StyleSheet.absoluteFill}
      />
    </SafeAreaView>
  );
}

// export function useBottomTabOverflow() {
//   const tabHeight = useBottomTabBarHeight();
//   const { bottom } = useSafeAreaInsets();
//   return tabHeight - bottom;
// }
