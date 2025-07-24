// src/components/TimeScrollPanel.tsx
import React, { useRef, useState } from 'react';
import { FlatList, NativeScrollEvent, NativeSyntheticEvent, Platform, ScrollView, Text, View, } from 'react-native';

const ITEM_HEIGHT = 40;

const generateRange = (start: number, end: number) =>
  Array.from({ length: end - start + 1 }, (_, i) => String(i).padStart(2, '0'));

const hours = generateRange(0, 23);
const minutes = generateRange(0, 59);

export default function TimeScrollPanel() {
  const [selectedHour, setSelectedHour] = useState('00');
  const [selectedMinute, setSelectedMinute] = useState('00');

  const hourRef = useRef<FlatList<string> | null>(null);
  const minuteRef = useRef<FlatList<string> | null>(null);

  const onScrollEnd = (
    e: NativeSyntheticEvent<NativeScrollEvent>,
    items: string[],
    onSelect: (val: string) => void
  ) => {
    const offsetY = e.nativeEvent.contentOffset.y;
    const index = Math.round(offsetY / ITEM_HEIGHT);
    onSelect(items[index]);
  };

  const renderItem = (item: string, selected: string) => (
    <View className="h-[40px] items-center justify-center">
      <Text className={`${item === selected ? 'text-3xl text-black font-bold' : 'text-2xl text-gray-400'}`}>
        {item}
      </Text>
    </View>
  );

  const renderList = (
    items: string[],
    selected: string,
    onChange: (val: string) => void,
    ref?: React.RefObject<FlatList<string> | null>
  ) => {
  if (Platform.OS === 'web') {
    return (
      <FlatList
        ref={ref}
        data={items}
        keyExtractor={(item) => item}
        snapToInterval={ITEM_HEIGHT}
        decelerationRate="fast"
        showsVerticalScrollIndicator={false}
        getItemLayout={(_, index) => ({
          length: ITEM_HEIGHT,
          offset: ITEM_HEIGHT * index,
          index,
        })}
        contentContainerStyle={{ paddingVertical: 80 }}
        style={{ height: ITEM_HEIGHT * 5 }}
        onMomentumScrollEnd={(e) => onScrollEnd(e, items, onChange)}
        renderItem={({ item }) => renderItem(item, selected)}
        extraData={selected}
      />
    );

    } else {
      return (
        <ScrollView
          showsVerticalScrollIndicator={false}
          snapToInterval={ITEM_HEIGHT}
          snapToAlignment="center"
          decelerationRate="fast"
          contentContainerStyle={{ paddingVertical: 80 }}
          onMomentumScrollEnd={(e) => onScrollEnd(e, items, onChange)}
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
    }
  };

  return (
    <View className="flex-row items-center justify-center bg-gray-200 w-[160px] h-[200px]">
      <View className="flex-1 items-center">
        {renderList(hours, selectedHour, setSelectedHour, hourRef)}
      </View>
      <Text className="text-xl font-bold text-black px-2">:</Text>
      <View className="flex-1 items-center">
        {renderList(minutes, selectedMinute, setSelectedMinute, minuteRef)}
      </View>
    </View>
  );
}
