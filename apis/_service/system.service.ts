import { systemApi } from '@/apis/_api';
import { postReportPayload, postBrandPayload } from '../_api/type';

export const getClothCategory = async () => {
  const data = await systemApi.getClothCategory();

  return data;
};

export const getClothColor = async () => {
  const data = await systemApi.getColor();

  return data;
};

export const getBrand = async (keyword: string) => {
  const data = await systemApi.getBrand(keyword);

  return data;
};

export const getSize = async (id: number) => {
  const data = await systemApi.getSize(id);

  return data;
};

export const getStyle = async () => {
  const data = await systemApi.getStyle();

  return data;
};

export const getReport = async () => {
  const data = await systemApi.getReport();

  return data;
};

export const postReport = async (payload: postReportPayload) => {
  const data = await systemApi.postReport(payload);

  return data;
};

export const postBrand = async (payload: postBrandPayload) => {
  const data = await systemApi.postBrand(payload);

  return data;
};
