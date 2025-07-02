import React, { useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { Menu } from 'react-native-paper';

interface DropdownProps {
  items: string[];
  selected: string | null;
  onSelect: (value: string) => void;
  disabled?: boolean;
  itemName?: string;
}

export default function Dropdown({
  items,
  selected,
  onSelect,
  disabled = false,
  itemName
}: DropdownProps) {
  const [visible, setVisible] = useState(false);

  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);

  return (
    <View className="w-full">
      <Menu
        visible={visible}
        onDismiss={closeMenu}
        anchor={
          <TouchableOpacity className="flex-row items-center justify-between w-full h-[48px] rounded-[20px] bg-[#121212] border-[1px] border-[#979B9F] pt-12 pr-16 pb-12 pl-16"
            onPress={openMenu}
            disabled={disabled}
          >
            <Text className="text-white text-base">
                {selected || `${itemName} 선택`}
            </Text>
            
          </TouchableOpacity>
        }
        contentStyle={{
          backgroundColor: '#2b2b2b',
          borderRadius: 10,
          paddingVertical: 4,
          width: '100%',
          minWidth:'100%',
          alignSelf: 'center',
        }}
      >

          {items.map((item, index) => {
            const isSelected = item === selected;
            return (
              <TouchableOpacity className={`w-full px-4 py-2 ${
                  isSelected ? 'bg-blue-500 rounded-full' : ''
                }`}
                key={index}
                onPress={() => {
                  onSelect(item);
                  closeMenu();
                }}
                
              >
                <Text className="text-white text-base">{item}</Text>
              </TouchableOpacity>
            );
          })}
        
      </Menu>
    </View>
  );
}
