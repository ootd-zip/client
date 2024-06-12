import fetcher from '../fetcher';
import { postReportPayload, postBrandPayload } from './type';

export const getClothCategory = async () => {
  const { data } = await fetcher.get('/v1/category');

  return data;
};

export const getColor = async () => {
  const { data } = await fetcher.get('/v1/color/');

  return data;
};

export const getBrand = async (keyword: string) => {
  const { data } = await fetcher.get(`/v1/brand?brandName=${keyword}`);

  return data;
};

export const getSize = async (id: number) => {
  const { data } = await fetcher.get(`/v1/size?categoryId=${id}`);

  return data;
};

export const getStyle = async () => {
  const { data } = await fetcher.get('/v1/style/');

  return data;
};

export const getReport = async () => {
  const { data } = await fetcher.get('/v1/report');

  return data;
};

export const postReport = async (payload: postReportPayload) => {
  const { data } = await fetcher.post('v1/report', payload);

  return data;
};

export const postBrand = async (payload: postBrandPayload) => {
  const { data } = await fetcher.post('v1/brand', payload);

  return data;
};
