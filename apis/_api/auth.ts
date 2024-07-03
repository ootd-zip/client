import fetcher from '../fetcher';
import {
  NEXT_PUBLIC_API_HOST,
  NEXT_PUBLIC_KAKAO_URI,
} from '@/constants/develop.constants';
import { postRegistUserInfoPayload } from './type';
import { QueryParams } from '@/utils/types/setting.types';
import axios from 'axios';

export const login = async (payload: QueryParams) => {
  if (payload.callback![0] === 'kakao') {
    const requestData = new URLSearchParams();
    requestData.append('code', payload.code!);
    requestData.append('redirect_uri', NEXT_PUBLIC_KAKAO_URI);
    const { data } = await fetcher.post(
      `v1/oauth/token/code/kakao`,
      requestData
    );
    return data;
  }
  const { data } = await fetcher.get(
    `v1/login/oauth/code/${payload.callback![0]}?code=${payload.code}&state=${
      payload.state
    }`
  );

  return data;
};

export const kakaoLogin = async () => {
  window.Kakao.Auth.authorize({
    redirectUri: NEXT_PUBLIC_KAKAO_URI,
  });
};

export const checkName = async (name: string) => {
  const { data } = await fetcher.get(`v1/user/check-name?name=${name}`);

  return data;
};

export const postRegistUserInfo = async (
  payload: postRegistUserInfoPayload
) => {
  const { data } = await fetcher.post(`v1/user/register`, payload);

  return data;
};

export const getCheckCompleteRegistUserInfo = async () => {
  const { data } = await fetcher.get(`v1/user/complete`);

  return data;
};

export const getUserId = async () => {
  const { data } = await fetcher.get('/v1/user/id');

  return data;
};

export const getNewToken = async () => {
  const requestData = new URLSearchParams();
  requestData.append('grantType', 'refresh_token');
  requestData.append('refreshToken', localStorage.getItem('refreshToken')!);

  const { data } = await axios.post(
    `${NEXT_PUBLIC_API_HOST}/v1/oauth/token`,
    requestData
  );

  return data;
};

export const logout = async () => {
  const requestData = new URLSearchParams();
  requestData.append('refreshToken', localStorage.getItem('refreshToken')!);
  const data = await fetcher.post('/v1/oauth/token/revoke', requestData);
  return data;
};
