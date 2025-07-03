// scr/components/Navbar.tsx
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const tabs = [
  { name: 'DiaryWritePage', icon: 'create-outline', label: '일기쓰기' },
  { name: 'AlarmPage', icon: 'alarm-outline', label: '알람' },
  { name: 'CalendarPage', icon: 'calendar-outline', label: '캘린더' },
  { name: 'MyPage', icon: 'person-outline', label: '마이' },
];

export default function Navbar() {
  const navigation = useNavigation<any>();
  const route = useRoute();

  return (
    <SafeAreaView edges={['bottom']} className="bg-white">
      <View className="flex-row justify-around items-center h-16 border-t border-gray-200">
        {tabs.map((tab) => {
          const isActive = route.name === tab.name;
          return (
            <TouchableOpacity
              key={tab.name}
              className="flex-1 items-center justify-center"
              onPress={() => navigation.navigate(tab.name)}
            >
              <Ionicons
                name={tab.icon as any}
                size={24}
                color={isActive ? '#7c3aed' : 'gray'}
              />
              <Text className={`text-xs ${isActive ? 'text-purple-600 font-semibold' : 'text-gray-500'}`}>
                {tab.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </SafeAreaView>
  );
}