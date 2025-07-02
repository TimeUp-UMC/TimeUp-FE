// src/pages/AlarmPage.tsx
import React from 'react';
import { Text, View } from 'react-native';
import BottomLayout from '../Layouts/BottomLayout';

export default function AlarmPage() {
  return (
    <BottomLayout>
      <View className="flex-1 items-center justify-center bg-white">
        <Text className="text-xl text-red-600 font-bold">알람페이지</Text>
      </View>
    </BottomLayout>
  );
}