import { authService } from '@/apis/_service';
import { sendReactNativeMessage } from '@/utils/reactNativeMessage';
import {
  NEXT_PUBLIC_APPLE_URI,
  NEXT_PUBLIC_NAVER_URI,
} from '@/constants/develop.constants';
import { useRouter } from 'next/router';
import { QueryParams } from '@/utils/types/setting.types';
import { useState } from 'react';
import { kakaoLogin } from '@/apis/_api/auth';

export const SignInApi = () => {
  const router = useRouter();
  const [error, setError] = useState<any>();

  // callback 페이지에서 사용하는  API
  const login = async (payload: QueryParams) => {
    try {
      // 액세스 토큰을 받아온다.
      const data = await authService.login(payload);
      if (data.statusCode == 400) {
        return false;
      }

      if (data.accessToken) {
        // 쿠키에 담아준다.
        localStorage.setItem('accessToken', data.accessToken);
        localStorage.setItem('refreshToken', data.refreshToken);

        sendReactNativeMessage({
          type: 'accessToken',
          payload: data.accessToken,
        });

        sendReactNativeMessage({
          type: 'refreshToken',
          payload: data.refreshToken,
        });
        return true;
      }
    } catch (error) {
      setError(error);
      router.replace('/sign-in');
    }
    if (error) {
      throw error;
    }
  };

  // 로그인 하는 플랫폼에 따라 redirect 해주는 API
  const snsLogin = (platform: string) => {
    switch (platform) {
      case 'KAKAO': {
        kakaoLogin();
        break;
      }
      case 'NAVER': {
        router.push(NEXT_PUBLIC_NAVER_URI);
        break;
      }
      case 'APPLE': {
        router.push(NEXT_PUBLIC_APPLE_URI);
        break;
      }
    }
  };
  return [login, snsLogin] as const;
};
