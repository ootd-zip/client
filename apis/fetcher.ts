import axios from 'axios';
import { NEXT_PUBLIC_API_HOST } from '@/constants/develop.constants';
import PublicApi from './domain/Public/PublicApi';

let refreshing = false; // 리프레시 중인지 여부를 추적하는 변수

const fetcher = axios.create({
  baseURL: NEXT_PUBLIC_API_HOST,
  timeout: 2500,
});

fetcher.interceptors.request.use((config) => {
  const accessToken = localStorage.getItem('accessToken');

  // 로그인, 회원가입 단계 api에서는 accessToken이 없으니 바로 return
  if (!accessToken) return config;

  // 그 외의 api 에서는 accessToken을 사용해 사용자 인증
  config.headers.Authorization = `Bearer ${accessToken}`;

  return config;
});

fetcher.interceptors.response.use(
  (config) => {
    return config;
  },
  async (error) => {
    if (error.response.data.divisionCode === 'U002') {
      if (!refreshing) {
        // 리프레시 중이 아닌 경우에만 리프레시 요청 진행
        refreshing = true; // 리프레시 중으로 표시
        const { getNewToken } = PublicApi();
        try {
          await getNewToken();
          refreshing = false; // 리프레시 완료 후 상태 변경
        } catch {
          localStorage.clear();
          window.location.replace('/sign-in');
          return;
        }
      }

      const accessToken = localStorage.getItem('accessToken');
      const newConfig = error.config;
      newConfig.headers.Authorization = `Bearer ${accessToken}`;

      return fetcher.request(newConfig);
    }
    if (error.response.data.statusCode === 404) {
      throw Error(error.response.data.statusCode);
    }
    if (error.response.data.statusCode === 500) {
      throw Error(error.response.data.statusCode);
    }
    if (
      error.code === 'ECONNABORTED' ||
      error.response.data.statusCode === 408
    ) {
      throw Error(error.response.data.statusCode);
    }
  }
);

export default fetcher;
