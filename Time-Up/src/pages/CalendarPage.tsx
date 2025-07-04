// src/pages/CalendarPage.tsx
import React from 'react';
import { Text, View } from 'react-native';
import BottomLayout from '../Layouts/BottomLayout';

export default function CalendarPage() {
  return (
    <BottomLayout>
      <View className="flex-1 items-center justify-center bg-white">
        <Text className="text-xl text-red-600 font-bold mb-4">캘린더페이지</Text>
      </View>
    </BottomLayout>
  );
}
