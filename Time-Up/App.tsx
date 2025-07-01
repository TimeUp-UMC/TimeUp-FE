import './global.css';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import LoginPage from './src/pages/LoginPage';
import MyPage from './src/pages/MyPage';
import OnboardingPage from './src/pages/OnBoardingPage';

export default function App() {
  const Stack = createNativeStackNavigator();
  return (
     <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="OnboardingPage" component={OnboardingPage}/>
        <Stack.Screen name="LoginPage" component={LoginPage}/>
        <Stack.Screen name="MyPage" component={MyPage}/>
      </Stack.Navigator>
    </NavigationContainer>
    
  );
}
