import { authService, userService } from '@/apis/_service';
import { sendReactNativeMessage } from '@/utils/reactNativeMessage';
import { useState } from 'react';
export default function PublicApi() {
  // const [error, setError] = useState<any>();

  const follow = async (id: number) => {
    try {
      const data = await userService.follow(id);
      return data;
    } catch (err) {
      // setError(err);
    }
  };

  const unFollow = async (id: number) => {
    try {
      const data = await userService.unFollow(id);
      return data;
    } catch (err) {
      // setError(err);
    }
  };

  const getUserId = async () => {
    try {
      const { result } = await authService.getUserId();

      return result;
    } catch (err) {
      // setError(err);
    }
  };

  const getNewToken = async () => {
    const { accessToken, refreshToken } = await authService
      .getNewToken()
      .catch((err) => {
        throw Error(err);
      });

    localStorage.setItem('accessToken', accessToken);
    localStorage.setItem('refreshToken', refreshToken);
    sendReactNativeMessage({ type: 'accessToken', payload: accessToken });
    sendReactNativeMessage({ type: 'refreshToken', payload: refreshToken });
  };

  // if (error) throw error;
  return {
    follow,
    unFollow,
    getUserId,
    getNewToken,
  } as const;
}
