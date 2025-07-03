// src/components/TimeScrollPanel.tsx
import React, { useState } from 'react';
import { ScrollView, Text, View } from 'react-native';

const ITEM_HEIGHT = 40;

// 숫자를 두자리 문자열로 변환하는 함수(00, 01, ..., 23)
const generateRange = (start: number, end: number) =>
  Array.from({ length: end - start + 1 }, (_, i) => String(i).padStart(2, '0'));

const hours = generateRange(0, 23);
const minutes = generateRange(0, 59);

export default function TimeScrollPanel() {
  // 선택된 시간과 분 상태 관리. 초기값 00:00
  const [selectedHour, setSelectedHour] = useState('00');
  const [selectedMinute, setSelectedMinute] = useState('00');

  // 스크롤 뷰 렌더링 함수
  const renderList = (items: string[], selected: string, onChange: (val: string) => void) => (
    <ScrollView
      showsVerticalScrollIndicator={false}  // 스크롤바 숨김
      snapToInterval={ITEM_HEIGHT}          // 각 아이템의 높이기준으로 스크롤 스냅
      snapToAlignment="center"              // 아이템 자동 중앙 정렬
      decelerationRate="fast"               // 스크롤 감속 속도 빠르게
      contentContainerStyle={{ paddingVertical: 80 }}   // 첫번째/마지막 항목도 중앙 올 수 있도록 스크롤 상하단에 80px 여백 추가
      onMomentumScrollEnd={(e) => {                     // 스크롤이 멈췄을 때 위치를 계산해서 선택값을 결정
        const offsetY = e.nativeEvent.contentOffset.y;  // 현재 스크롤 된 Y 위치
        const index = Math.round(offsetY / ITEM_HEIGHT);// 현재 스크롤 위치에서 아이템 높이(40px)로 나눈 값을 반올림하여 인덱스 계산
        onChange(items[index]);                         // 해당 인덱스의 아이템을 선택값으로 설정
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
    <View className="flex-row items-center justify-center bg-gray-200 w-[160px] h-[200px]">
      <View className="flex-1 items-center">{renderList(hours, selectedHour, setSelectedHour)}</View>
      <Text className="text-xl font-bold text-black px-2">:</Text>
      <View className="flex-1 items-center">{renderList(minutes, selectedMinute, setSelectedMinute)}</View>
    </View>
  );
}
