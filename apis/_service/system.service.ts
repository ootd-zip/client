import { systemApi } from '@/apis/_api';

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
