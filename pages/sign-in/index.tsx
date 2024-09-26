import S from '@/pageStyle/sign-in/style';
import { Body2 } from '@/components/UI';
import { AppLayoutProps } from '@/AppLayout';
import { ComponentWithLayout } from '../sign-up';
import { SignInApi } from '@/apis/domain/SignIn/SignInApi';
import SocialLoginButton from '@/components/Domain/SignIn/SocialLoginButton';
import SplashLogo from '@/public/images/SplashLogo.svg';
import { useEffect } from 'react';
/*
이름: 로그인 페이지
*/
const SignIn: ComponentWithLayout = () => {
  const [, routing] = SignInApi();

  useEffect(() => {
    localStorage.clear();
  }, []);

  return (
    <>
      <S.Layout>
        <S.Main>
          <S.Logo>
            <S.Text>
              <Body2>오늘도 옷장 앞에서 고민하는 당신을 위해 </Body2>
            </S.Text>
            <SplashLogo />
          </S.Logo>
          <S.SocialLoginButton>
            <SocialLoginButton
              platform="KAKAO"
              onClick={() => routing('KAKAO')}
            />
            <SocialLoginButton
              platform="NAVER"
              onClick={() => routing('NAVER')}
            />
            <SocialLoginButton
              platform="APPLE"
              onClick={() => routing('APPLE')}
            />
          </S.SocialLoginButton>
        </S.Main>
      </S.Layout>
    </>
  );
};

export default SignIn;

SignIn.Layout = ({ children }: AppLayoutProps) => {
  return <>{children}</>;
};

SignIn.Layout.displayName = 'SignInLayout';
