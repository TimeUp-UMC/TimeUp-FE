import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

interface ModalProps {
  onClose: () => void;
  onConfirm?: () => void;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ onClose, onConfirm, children }) => {
  return (
    <View className="absolute inset-0 bg-black/40 justify-center items-center px-2.5">
      <View
        className="w-full rounded-2xl bg-[#F7F7FE]"
        style={{
          shadowColor: '#65696D',
          shadowOffset: { width: 0, height: -2 },
          shadowOpacity: 0.2,
          shadowRadius: 4,
          elevation: 4,
        }}
      >
        <View className="px-6 pt-11 pb-9">
          <Text className="text-[20px] leading-[28px] font-medium text-center tracking-[-0.4px]">
            {children}
          </Text>
        </View>

        <View className="px-6 pb-4 flex-row justify-between gap-4">
          <TouchableOpacity
            onPress={onClose}
            className="flex-1 h-[48px] rounded-xl bg-[#C9CDD1] justify-center items-center"
          >
            <Text className="text-center text-black font-semibold">취소</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={onConfirm ?? onClose}
            className="flex-1 h-[48px] rounded-xl bg-[#4D4DFF] justify-center items-center"
          >
            <Text className="text-center text-white font-semibold">확인</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default Modal;
