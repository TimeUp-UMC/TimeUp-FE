import React, { useEffect, useRef } from 'react';
import { Animated, Easing, TouchableOpacity } from 'react-native';

interface ToggleSwitchProps {
  isOn: boolean;
  onToggle: () => void;
}

export default function ToggleSwitch({ isOn, onToggle }: ToggleSwitchProps) {
  const animatedValue = useRef(new Animated.Value(isOn ? 1 : 0)).current;

  useEffect(() => {
    Animated.timing(animatedValue, {
      toValue: isOn ? 1 : 0,
      duration: 200,
      easing: Easing.linear,
      useNativeDriver: false,
    }).start();
  }, [isOn]);

  // 배경색 애니메이션
  const backgroundColor = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['#D1D5DB', '#4D4DFF'], // gray-300 → indigo-500
  });

  const translateX = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [2, 15],
  });

  return (
    <TouchableOpacity
      onPress={onToggle}
      activeOpacity={0.8}
    >
      <Animated.View
        style={{
          width: 36,
          height: 20,
          borderRadius: 10,
          padding: 2,
          backgroundColor, // animated 색상!
          justifyContent: 'center',
        }}
      >
        <Animated.View
          style={{
            width: 16,
            height: 16,
            borderRadius: 8,
            backgroundColor: 'white',
            transform: [{ translateX }],
          }}
        />
      </Animated.View>
    </TouchableOpacity>
  );
}
