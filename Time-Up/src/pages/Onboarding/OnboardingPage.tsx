import { axiosInstance } from '@/src/apis/axiosInstance';
import useAppNavigation from '@/src/hooks/useAppNavigation';
import { useProfileStore } from '@/src/stores/useProfileStore';
import { setAccessToken, setRefreshToken } from '@/src/utils/storage';
import * as Google from 'expo-auth-session/providers/google';
import { useEffect, useRef, useState } from 'react';
import { Alert, Animated, Platform, Text, TouchableOpacity, View } from 'react-native';
import GoogleIcon from '../../../assets/images/GoogleIcon.svg';
import IconImage from '../../../assets/images/Icon.svg';
import { login } from '../../apis/auth';

export default function OnboardingPage() {
  const navigation = useAppNavigation();
  const { setField } = useProfileStore();
  const opacityAnim = useRef(new Animated.Value(0)).current;

  // 네이티브 전용 
  const [GoogleSignin, setGoogleSignin] = useState<any>(null);

  useEffect(() => {
    if (Platform.OS !== 'web') {
      (async () => {
        const { GoogleSignin } = await import('@react-native-google-signin/google-signin');
        GoogleSignin.configure({
          webClientId: process.env.EXPO_PUBLIC_WEB_CLIENT_ID,
          // androidClientId: process.env.EXPO_PUBLIC_ANDROID_CLIENT_ID,
          scopes: ['https://www.googleapis.com/auth/calendar'],
        });
        setGoogleSignin(GoogleSignin);
      })();
    }
  }, []);

  // 웹 전용 
  const [request, response, promptAsync] = Google.useAuthRequest({
    webClientId: process.env.EXPO_PUBLIC_WEB_CLIENT_ID,
    androidClientId: process.env.EXPO_PUBLIC_ANDROID_CLIENT_ID,
  });

  // 웹 로그인 
  useEffect(() => {
    const handleWebAppLogin = async (authentication: any) => {
      if (!authentication?.accessToken) return;
      try {
        const userInfoResponse = await axiosInstance.get(
          'https://www.googleapis.com/userinfo/v2/me',
          {
            headers: { Authorization: `Bearer ${authentication.accessToken}` },
          }
        );
        const userInfo = userInfoResponse.data;
        handleBackendLogin(authentication.accessToken, userInfo.picture);
      } catch (error) {
        console.error('웹 사용자 정보 가져오기 실패:', error);
        Alert.alert('오류', '웹에서 사용자 정보를 가져오는데 실패했습니다.');
      }
    };

    if (Platform.OS === 'web' && response?.type === 'success') {
      handleWebAppLogin(response.authentication);
    }
  }, [response]);

  // 공통 백엔드 로그인
  const handleBackendLogin = async (accessToken: string, googleProfileImage: string | null) => {
    try {
      const data = await login(accessToken);

      if (data.success?.accessToken) {
        await setAccessToken(data.success.accessToken);
      }
      if (data.success?.refreshToken) {
        await setRefreshToken(data.success.refreshToken);
      }
      if (googleProfileImage) {
        setField('profileImage', googleProfileImage);
      }
      if (data.success?.isNew) {
        navigation.navigate('ProfileSettingPage', {});
      } else {
        navigation.navigate('AlarmPage');
      }
    } catch (error: any) {
      console.error('로그인 요청 실패:', error);
      Alert.alert('에러', error.message || '네트워크 오류가 발생했습니다.');
    }
  };

  // 네이티브 로그인 
  const handleNativeSignIn = async () => {
    if (!GoogleSignin) {
      Alert.alert('오류', 'Google 로그인 모듈을 불러오지 못했습니다.');
      return;
    }
    try {
      await GoogleSignin.hasPlayServices();
      await GoogleSignin.signIn();

      const currentUser = await GoogleSignin.getCurrentUser();
      const { accessToken } = await GoogleSignin.getTokens();

      if (accessToken && currentUser) {
        handleBackendLogin(accessToken, currentUser.user.photo);
      } else {
        throw new Error('Failed to get accessToken or user info from Google');
      }
    } catch (error: any) {
      console.error('네이티브 로그인 실패:', error);
      if (error.code !== '12501' && !error.message?.includes('cancelled')) {
        Alert.alert('로그인 오류', error.message);
      }
    }
  };

  const handleSignInPress = () => {
    if (Platform.OS === 'web') {
      promptAsync();
    } else {
      handleNativeSignIn();
    }
  };

  useEffect(() => {
    Animated.timing(opacityAnim, {
      toValue: 1,
      duration: 2000, 
      useNativeDriver: Platform.OS !== 'web',
    }).start();
  }, []);

  return (
    <View className="flex-1 items-center pt-[208px] bg-black gap-3">
      <IconImage/>
      <Animated.View style={{ opacity: opacityAnim,position: 'absolute', bottom: 50 }}>
      <TouchableOpacity
        onPress={handleSignInPress}
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