// src/pages/OnboardingPage.tsx
import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import ConfirmButton from '../components/ConfirmButton';
import CustomDropdown from '../components/DropDown2';


export default function OnboardingPage() {
  const navigation = useNavigation();

  const handleConfirm = () => {
    console.log('버튼이 눌렸습니다')
  }
  
  const jobOptions = [
    { label: '직장인', value: 'office_worker' },
    { label: '공무원/군인', value: 'public_officer' },
    { label: '자영업자', value: 'self_employed' },
    { label: '프리랜서', value: 'freelancer' },
    { label: '학생', value: 'student' },
    { label: '무직', value: 'unemployed' },
  ]
  
  const [selectedJob, setSelectedJob] = useState<string | null>(null);
  
  return (
    <View className="flex-1 items-center justify-center bg-white">
      <Text className="text-xl text-blue-600 font-bold">온보딩</Text>
      <TouchableOpacity className="mt-4 bg-blue-500 px-4 py-2 rounded"
        onPress={() => navigation.navigate('LoginPage')}>
        <Text className="text-white">로그인</Text>
      </TouchableOpacity>

      <ConfirmButton title="확인" onPress = {handleConfirm}/>

      <CustomDropdown
      data={jobOptions}
      placeholder="직업 선택"
      value={selectedJob}
      onChange={setSelectedJob}
        />

    </View>
  );
}
