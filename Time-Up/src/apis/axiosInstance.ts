import axios from 'axios';
import { reset } from '../services/NavigationService';
import { getAccessToken, getRefreshToken, removeAccessToken, removeRefreshToken, setAccessToken, setRefreshToken } from '../utils/storage';

let refreshPromise: Promise<string | null> | null = null;

export const axiosInstance = axios.create({
  baseURL: process.env.EXPO_PUBLIC_SERVER_API_URL,
});

axiosInstance.interceptors.request.use(async (config) => {
  const token = await getAccessToken();
  if (token) {
    config.headers = config.headers ?? {};
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      if (originalRequest.url?.includes('/auth/refresh')) {
        await removeAccessToken();
        await removeRefreshToken();
        reset('OnboardingPage'); 
        return Promise.reject(error);
      }

      originalRequest._retry = true;

      if (!refreshPromise) {
        refreshPromise = (async () => {
          try {
            const refreshToken = await getRefreshToken();
            if (!refreshToken) throw new Error('No refresh token');

            const { data } = await axiosInstance.post('/auth/refresh', {
              refresh: refreshToken,
            });

            await setAccessToken(data.data.accessToken);
            await setRefreshToken(data.data.refreshToken);

            return data.data.accessToken;
          } catch (e) {
            await removeAccessToken();
            await removeRefreshToken();
            reset('OnboardingPage');
            return null;
          } finally {
            refreshPromise = null;
          }
        })();
      }

      const newAccessToken = await refreshPromise;
      if (newAccessToken) {
        originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
        return axiosInstance.request(originalRequest);
      }
    }

    return Promise.reject(error);
  }
);