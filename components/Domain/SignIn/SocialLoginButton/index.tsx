/* eslint-disable react/jsx-key */
import S from './style';
import { Button3 } from '@/components/UI';
import KakaoLogo from '@/public/images/kakaoLogos.svg';
import AppleLogo from '@/public/images/appleLogos.svg';
import NaverLogo from '@/public/images/naverLogo.svg';

interface SocialLoginButtonProps {
  onClick: () => void;
  platform: 'KAKAO' | 'NAVER' | 'APPLE';
}
/*
이름: 소셜 로그인 버튼
역할: 로그인 페이지에서 사용되는 소셜 로그인 버튼 컴포넌트
*/
export default function SocialLoginButton({
  onClick,
  platform,
}: SocialLoginButtonProps) {
  const platformInfo = {
    KAKAO: [<KakaoLogo />, '카카오로 로그인'],
    APPLE: [<AppleLogo />, 'Apple로 로그인'],
    NAVER: [<NaverLogo />, '네이버 계정으로 로그인'],
  };

  return (
    <S.Layout>
      <S.Button onClick={onClick}>
        <S.ButtonString platform={platform}>
          {platformInfo[platform][0]}
          <Button3>
            <>{platformInfo[platform][1]}</>
          </Button3>
        </S.ButtonString>
      </S.Button>
    </S.Layout>
  );
}
