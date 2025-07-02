import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import './global.css';
import AlarmPage from './src/pages/AlarmPage';
import CalendarPage from './src/pages/CalendarPage';
import DiaryWritePage from './src/pages/DiaryWritePage';
import LoginPage from './src/pages/LoginPage';
import MyPage from './src/pages/MyPage';
import OnboardingPage from './src/pages/OnboardingPage';

export default function App() {
  const Stack = createNativeStackNavigator();
  return (
     <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="OnboardingPage" component={OnboardingPage}/>
        <Stack.Screen name="LoginPage" component={LoginPage}/>
        <Stack.Screen name="MyPage" component={MyPage}/>
        <Stack.Screen name="AlarmPage" component={AlarmPage}/>
        <Stack.Screen name="CalendarPage" component={CalendarPage}/>
        <Stack.Screen name="DiaryWritePage" component={DiaryWritePage}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
