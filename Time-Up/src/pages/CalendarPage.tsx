import React, { useState } from 'react';
import { Text, View } from 'react-native';
import CheckBox from '../components/common/CheckBox';
import ConfirmButton from '../components/common/ConfirmButton'; // 확인 버튼 테스트용 임포트
import Dropdown from '../components/common/DropDown'; // 드롭다운 컴포넌트 임포트
import ToggleSwitch from '../components/common/ToggleSwitch';


export default function CalendarPage() {
  const handleConfirm = () => {
    console.log('확인 버튼이 눌렸습니다')
  }

  const [checked, setChecked] = React.useState(false);
  const handleCheckBoxChange = (val: boolean) => {
    setChecked(val);
    console.log(`체크박스 상태: ${val ? '선택됨' : '선택되지 않음'}`);
  }
  const [selectedJob, setSelectedJob] = React.useState<string | null>(null);

  const [on, setOn] = useState(false);
  return (
    <View className="flex-1 items-center justify-center bg-[#121212]">
      <Text className="text-xl text-white font-bold">테스트</Text>
      <ConfirmButton title="확인" onPress = {handleConfirm}/>

      <CheckBox
        isChecked={checked}
        onValueChangeHandler={handleCheckBoxChange}
        disabled={false}
        >
          <Text className="text-white">약관에 동의합니다</Text>
        </CheckBox>

      <Dropdown
        items={['직장인', '공무원/군인', '자영업자', '프리랜서', '학생', '무직', '기타']}
        selected={selectedJob}
        onSelect={(value) => setSelectedJob(value)}
        itemName="직업"
        />

      <ToggleSwitch
        isOn={on}
        onToggle={() => setOn(!on)}
        ></ToggleSwitch>
    </View>
  );
}

