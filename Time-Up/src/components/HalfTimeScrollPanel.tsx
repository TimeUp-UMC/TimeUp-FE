// src/components/HalfTimeScrollPanel.tsx
import React, { useState } from 'react';
import { ScrollView, Text, View } from 'react-native';

const ITEM_HEIGHT = 40;

const generateRange = (start: number, end: number) =>
  Array.from({ length: end - start + 1 }, (_, i) => String(i).padStart(2, '0'));

const hours = generateRange(1, 12);
const minutes = generateRange(0, 59);
const periods = [' ', ' ', '오전', '오후', ' ', ' '];

export default function HalfTimeScrollPanel() {
  const [selectedHour, setSelectedHour] = useState('00');
  const [selectedMinute, setSelectedMinute] = useState('00');
  const [selectedPeriod, setSelectedPeriod] = useState('오전');

  const renderList = (items: string[], selected: string, onChange: (val: string) => void) => (
    <ScrollView
      showsVerticalScrollIndicator={false}
      snapToInterval={ITEM_HEIGHT}
      snapToAlignment="center"
      decelerationRate="fast"
      contentContainerStyle={{ paddingVertical: 80 }}
      onMomentumScrollEnd={(e) => {
        const offsetY = e.nativeEvent.contentOffset.y;
        const index = Math.round(offsetY / ITEM_HEIGHT);
        onChange(items[index]);
      }}
    >
      {items.map((item, index) => (
        <View key={index} className="h-[40px] items-center justify-center">
          <Text className={`${item === selected ? 'text-3xl text-black font-bold' : 'text-2xl text-gray-400'}`}>
            {item}
          </Text>
        </View>
      ))}
    </ScrollView>
  );

  return (
    <View className="flex-row items-center justify-center bg-gray-200 w-[220px] h-[200px] rounded-xl px-2">
      <View className="w-[50px] items-center">{renderList(periods, selectedPeriod, setSelectedPeriod)}</View>
      <Text className="text-xl font-bold text-black px-2"> </Text>
      <View className="w-[50px] items-center">{renderList(hours, selectedHour, setSelectedHour)}</View>
      <Text className="text-xl font-bold text-black px-2">:</Text>
      <View className="w-[50px] items-center">{renderList(minutes, selectedMinute, setSelectedMinute)}</View>
    </View>
  );
}
