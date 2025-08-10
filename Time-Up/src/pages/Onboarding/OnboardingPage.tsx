import useAppNavigation from '@/src/hooks/useAppNavigation';
import { useProfileStore } from '@/src/stores/useProfileStore';
import { setAccessToken, setRefreshToken } from '@/src/utils/storage';
import * as Google from 'expo-auth-session/providers/google';
import * as WebBrowser from 'expo-web-browser';
import React, { useEffect, useRef } from 'react';
import { Alert, Animated, Platform, Text, TouchableOpacity, View } from 'react-native';
import GoogleIcon from '../../../assets/images/GoogleIcon.svg';
import IconImage from '../../../assets/images/Icon.svg';
import { login } from '../../apis/auth';

WebBrowser.maybeCompleteAuthSession();

export default function OnboardingPage() {
  const navigation = useAppNavigation();
  const { setField } = useProfileStore();

  const [request, response, promptAsync] = Google.useAuthRequest({
    webClientId: process.env.GOOGLE_CLIENT_ID,
    iosClientId: process.env.GOOGLE_CLIENT_ID,
    androidClientId: process.env.GOOGLE_CLIENT_ID,
    scopes: ['profile', 'email', 'https://www.googleapis.com/auth/calendar',],
  });
  const opacityAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    console.log('Platform:', Platform.OS);
    console.log('Android Client ID:', process.env.EXPO_PUBLIC_ANDROID_CLIENT_ID);
    console.log('iOS Client ID:', process.env.GOOGLE_CLIENT_ID);
    console.log('Request object:', request);
    
    import('expo-constants').then(Constants => {
      console.log('App config:', Constants.default.expoConfig);
      console.log('Android package:', Constants.default.expoConfig?.android?.package);
      console.log('iOS bundleIdentifier:', Constants.default.expoConfig?.ios?.bundleIdentifier);
    });
    
    console.log('Google Auth Response changed:', response);

    if (response) {
      if (response.type === 'success') {
        const { authentication } = response;
        console.log('Authentication object:', authentication);
        if (authentication?.accessToken) {
          console.log('Access Token:', authentication.accessToken);
        } else {
          console.warn('No access token found in authentication');
        }
      } else if (response.type === 'error') {
        console.error('Google Auth Error:', response.error);
        Alert.alert('인증 오류', `Google 로그인 중 오류가 발생했습니다: ${response.error?.message || '알 수 없는 오류'}`);
      } else if (response.type === 'dismiss') {
        console.log('Google Auth dismissed');
      } else if (response.type === 'cancel') {
        console.log('Google Auth cancelled by user');
      }
    }
  }, [response]);

  useEffect(() => {
    const fetchLogin = async () => {
      if (response?.type === 'success') {
        const { authentication } = response;

        if (!authentication?.accessToken) {
          Alert.alert('로그인 실패', '액세스 토큰이 없습니다.');
          return;
        }

        try {
          console.log('Sending access token to backend...');
          const data = await login(authentication.accessToken);

          if (data.success?.accessToken) {
            setAccessToken(data.success.accessToken);
          }
          if (data.success?.refreshToken) {
            setRefreshToken(data.success.refreshToken);
          }
          if (data.success?.isNew) {
            navigation.navigate('ProfileSettingPage',{});
          } else {
            navigation.navigate('AlarmPage');
          }
        } catch (error: any) {
          console.error('로그인 요청 실패:', error);
          Alert.alert('에러', error.response?.data?.message || '네트워크 오류가 발생했습니다.');
        }
      }
    };

    fetchLogin();
  }, [response, navigation, setField]);

  useEffect(() => {
    Animated.timing(opacityAnim, {
      toValue: 1,
      duration: 2000, 
      useNativeDriver: true,
    }).start();
  }, []);

  return (
    <View className="flex-1 items-center pt-[208px] bg-black gap-3">
      <IconImage/>
      <Animated.View style={{ opacity: opacityAnim, position: 'absolute', bottom: 50 }}>
      <TouchableOpacity
          disabled={!request}
          onPress={async () => {
            try {
              console.log('Starting Google authentication...');
              const result = await promptAsync();
              console.log('Google login promptAsync result:', result);
            } catch (error) {
              console.error('Google login error:', error);
              Alert.alert('오류', '구글 로그인 중 오류가 발생했습니다.');
            }
          }}
        className="bg-[#ffffff] rounded-full px-8 py-3 justify-center">
        <View className="flex-row items-center justify-center gap-[10px]">
          <GoogleIcon width={18} height={18} />
          <Text className="text-[#1F1F1F] text-base font-roboto font-medium leading-normal">Sign in with Google</Text>
        </View>
      </TouchableOpacity>
      </Animated.View>
    </View>
  );
}