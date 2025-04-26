// This file contains a React Native component that renders a circular progress ring with animated text.

// SOLID principle used:
// --- Single Responsibility Principle (SRP)
// The component is responsible for rendering the fitness ring and displaying the value and unit.
// It does not handle any other logic or functionality, making it easier to maintain and test. ---

// --- LSP: it can be replaced by any other component with the same props without breaking the functionality of the parent component.

// It's also an example of encapsulation, as it encapsulates the logic for rendering the ring and the animated text within a single component.

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

//#codebase