import {
  getSearchUserParams,
  patchProfilePayload,
  putStylePayload,
} from '@/apis/_api/type';
import { authService, userService } from '@/apis/_service';
import { sendReactNativeMessage } from '@/utils/reactNativeMessage';
import { useState } from 'react';

export const UserApi = () => {
  const [error, setError] = useState<any>();
  // 사용자 프로필 정보 조회
  const getMypage = async (id: number) => {
    try {
      const data = await userService.getMypage(id);
      if (data.statusCode === 200) {
        return data.result;
      }
      return data;
    } catch (err) {
      console.log('에러명', err);
      setError(err);
    }
  };

  // 프로필 정보 조회
  const getProfile = async () => {
    try {
      const data = await userService.getProfile();
      if (data.statusCode === 200) {
        return data.result;
      }
      return data;
    } catch (err) {
      console.log('에러명', err);
      setError(err);
    }
  };

  // 프로필 정보 업데이트
  const patchProfile = async (payload: patchProfilePayload) => {
    try {
      const { statusCode } = await userService.patchProfile(payload);
      if (statusCode === 200) {
        return true;
      } else {
        return false;
      }
    } catch (err) {
      console.log('에러명', err);
      setError(err);
    }
  };

  const getSearchUser = async (params: getSearchUserParams) => {
    try {
      const data = await userService.getSearchUser(params);
      if (data.statusCode === 200) {
        return data.result;
      }
      return data;
    } catch (err) {
      console.log('에러명', err);
      setError(err);
    }
  };

  const getSearchUserFollower = async (params: getSearchUserParams) => {
    try {
      const data = await userService.getSearchUserFollower(params);
      if (data.statusCode === 200) {
        return data.result;
      }
      return data;
    } catch (err) {
      console.log('에러명', err);
      setError(err);
    }
  };
  const getSearchUserFollowing = async (params: getSearchUserParams) => {
    try {
      const data = await userService.getSearchUserFollowing(params);
      if (data.statusCode === 200) {
        return data.result;
      }
      return data;
    } catch (err) {
      console.log('에러명', err);
      setError(err);
    }
  };
  const getUserStyle = async () => {
    try {
      const data = await userService.getUserStyle();
      if (data.statusCode === 200) {
        return data.result;
      }
      return data;
    } catch (err) {
      console.log('에러명', err);
      setError(err);
    }
  };

  //style 수정
  const putStyle = async (params: putStylePayload) => {
    try {
      const { statusCode } = await userService.putStyle(params);

      if (statusCode === 200) {
        return true;
      }
      return false;
    } catch (err) {
      console.log('에러명:', err);
      setError(err);
    }
  };

  // 탈퇴
  const deleteUser = async () => {
    try {
      const { statusCode } = await userService.deleteUser();

      if (statusCode === 200) return true;
      return false;
    } catch (err) {
      console.log('에러명:', err);
      setError(err);
    }
  };

  // 로그아웃
  const logout = async () => {
    try {
      const { status } = await authService.logout();

      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      sessionStorage.clear();
      sendReactNativeMessage({ type: 'logout' });
      if (status === 200) return true;
      return false;
    } catch (err) {
      console.log('에러명:', err);
      setError(err);
    }
  };

  // 소셜 로그인 플랫폼 조회
  const getSocilLoginProvider = async () => {
    try {
      const data = await userService.getSocilLoginProvider();
      if (data.statusCode === 200) {
        return data.result;
      }
      return data;
    } catch (err) {
      console.log('에러명', err);
      setError(err);
    }
  };
  if (error) throw error;
  return {
    getMypage,
    getProfile,
    patchProfile,
    getSearchUser,
    getSearchUserFollower,
    getSearchUserFollowing,
    getUserStyle,
    putStyle,
    deleteUser,
    logout,
    getSocilLoginProvider,
  } as const;
};
