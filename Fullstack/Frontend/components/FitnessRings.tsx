import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import Animated, {
  useSharedValue,
  useAnimatedProps,
  withTiming,
} from 'react-native-reanimated';

interface FitnessRingProps {
  value: number;
  maxValue: number;
  label: string;
  unit: string;
  color: string;
}

const FitnessRing = ({ value, maxValue, label, unit, color }: FitnessRingProps) => {
  const percentage = (value / maxValue) * 100;
  const animatedValue = useSharedValue(0);

  useEffect(() => {
    animatedValue.value = withTiming(value, { duration: 1000 });
  }, [value]);

  const animatedProps = useAnimatedProps(() => ({
    text: `${Math.round(animatedValue.value)}`,
  }));

  return (
    <View style={styles.ringContainer}>
      <AnimatedCircularProgress
        size={100}
        width={10}
        fill={percentage}
        tintColor={color}
        backgroundColor="#eee"
        arcSweepAngle={240}
        rotation={240}
        lineCap="round"
        tintTransparency={true}
        style={styles.glow}
        backgroundWidth={15}
      >
        {(fill) => (
          <View style={styles.centerContent}>
            <Text style={styles.valueText}>
              {Math.round((fill / 100) * maxValue)}
            </Text>
            <Text style={styles.unitText}>{unit}</Text>
          </View>
        )}
      </AnimatedCircularProgress>
      <Text style={styles.labelText}>{label}</Text>
    </View>
  );
};

export default FitnessRing;

const styles = StyleSheet.create({
  ringContainer: {
    alignItems: 'center',
    margin: 8,
    padding: 12,
    borderRadius: 100,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  centerContent: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  valueText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#585858',
  },
  unitText: {
    fontSize: 12,
    color: '#585858',
  },
  labelText: {
    marginTop: 6,
    fontSize: 14,
    fontWeight: '600',
    color: '#585858',
  },
  glow: {
    shadowColor: '#FF6B35',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.4,
    shadowRadius: 14,
    elevation: 8,
  },
});


// import React, { useEffect } from 'react';
// import { View, Text, StyleSheet } from 'react-native';
// import { AnimatedCircularProgress } from 'react-native-circular-progress';
// import AnimatedCounter from '../components/AnimatedCounter';
// import Animated, {
//   useSharedValue,
//   useAnimatedProps,
//   withTiming,
// } from 'react-native-reanimated';

// const AnimatedText = Animated.createAnimatedComponent(Text);

// interface FitnessRingProps {
//   value: number;
//   maxValue: number;
//   label: string;
//   unit: string;
//   color: string;
// }

// const FitnessRing = ({ value, unit }: { value: number; unit: string }) => {
//   // const AnimatedCounter = ({ targetValue }: { targetValue: number }) => {
//   //   const animatedValue = useSharedValue(0);
//   //   useEffect(() => {
//   //     animatedValue.value = withTiming(targetValue, { duration: 1000 });
//   //   }, [targetValue]);

//   //   return (
//   //     <AnimatedText style={styles.valueText}>
//   //       {Math.round(animatedValue.value)}
//   //     </AnimatedText>
//   //   );
//   //};

//   return (
//     <View style={styles.ringContainer}>
//       {/* Circular progress ring code here */}
//       <AnimatedCounter targetValue={value} />
//       <Text style={styles.unitText}>{unit}</Text>
//     </View>
//   );
// };


// // const FitnessRing = ({ value, maxValue, label, unit, color }: FitnessRingProps) => {
// //   const percentage = (value / maxValue) * 100;

// //   return (
// //     <View style={styles.ringContainer}>
// //       <AnimatedCircularProgress
// //         size={120}
// //         width={12}
// //         fill={percentage}
// //         tintColor={color}
// //         backgroundColor="#eee"
// //         arcSweepAngle={240}
// //         rotation={240}
// //         lineCap="round"
// //         children={() => (
// //           <View style={styles.centerContent}>
// //             <Text style={styles.valueText}>{value}</Text>
// //             <Text style={styles.unitText}>{unit}</Text>
// //           </View>
// //         )}
// //       />
// //       <Text style={styles.labelText}>{label}</Text>
// //     </View>
    
// //   );
// //};

// export default FitnessRing;

// const styles = StyleSheet.create({
//   ringContainer: {
//     alignItems: 'center',
//     margin: 16,
//     padding: 16,
//     backgroundColor: 'rgba(255, 255, 255, 0.2)',
//     borderRadius: 100,
//     shadowColor: '#E97451',
//     shadowOffset: { width: 0, height: 10 },
//     shadowOpacity: 0.3,
//     shadowRadius: 20,
//     elevation: 8,
//   },
//   centerContent: {
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   valueText: {
//     fontSize: 20,
//     fontWeight: 'bold',
//     color: '#2B2B2B',
//   },
//   unitText: {
//     fontSize: 12,
//     color: '#555',
//   },
//   labelText: {
//     marginTop: 8,
//     fontSize: 14,
//     fontWeight: '600',
//     color: '#333',
//   },
// });
