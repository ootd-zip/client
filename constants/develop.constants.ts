//자체 개발 관련 상수
export const NEXT_PUBLIC_API_HOST = process.env.NEXT_PUBLIC_API_HOST;
export const NEXT_PUBLIC_DOMAIN_HOST = process.env.NEXT_PUBLIC_DOMAIN_HOST;

//카카오 인증 관련 상수
export const NEXT_PUBLIC_KAKAO_JS_KEY = process.env.NEXT_PUBLIC_KAKAO_JS_KEY;
export const NEXT_PUBLIC_KAKAO_URI = `${NEXT_PUBLIC_DOMAIN_HOST}/sign-in/kakao/callback`;

//네이버 인증 관련 상수
export const NEXT_PUBLIC_NAVER_URI =
  'https://ootdzip.com/api/v1/login/authorization/naver';

//애플 인증 관련 상수
export const NEXT_PUBLIC_APPLE_CLIENT_ID =
  process.env.NEXT_PUBLIC_APPLE_CLIENT_ID;
export const NEXT_PUBLIC_APPLE_URI =
  'https://ootdzip.com/api/v1/login/authorization/apple';
