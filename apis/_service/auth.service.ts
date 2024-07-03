import { authApi } from '@/apis/_api';
import { postRegistUserInfoPayload } from '../_api/type';
import { QueryParams } from '@/utils/types/setting.types';

export const login = async (payload: QueryParams) => {
  const data = await authApi.login(payload);

  return data;
};

export const checkName = async (name: string) => {
  const data = await authApi.checkName(name);

  return data;
};

export const postRegistUserInfo = async (
  payload: postRegistUserInfoPayload
) => {
  const data = await authApi.postRegistUserInfo(payload);

  return data;
};

export const getCheckCompleteRegistUserInfo = async () => {
  const data = await authApi.getCheckCompleteRegistUserInfo();

  return data;
};

export const getUserId = async () => {
  const data = await authApi.getUserId();

  return data;
};

export const getNewToken = async () => {
  const data = await authApi.getNewToken();

  return data;
};

export const logout = async () => {
  const data = await authApi.logout();

  return data;
};
