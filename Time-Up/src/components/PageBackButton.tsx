// src/components/PageBackButton.tsx
import AntDesign from '@expo/vector-icons/AntDesign';
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { TouchableOpacity, View } from 'react-native';

export default function PageBackButton() {
  const navigation = useNavigation();
  return (
    <View className="absolute top-20 left-5 z-10">
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <AntDesign name="arrowleft" size={24} color="black" />
      </TouchableOpacity>
    </View>
  );
}