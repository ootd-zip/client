import { Body3, Caption1 } from '@/components/UI';
import S from './style';

interface ClosetTabbarProps {
  handleStep: (next: string) => void;
  currentStep: string;
}

/*
이름: 검색 결과 탭바 컴포넌트
역할: 검색 페이지에서 사용되는 탭바
*/

export default function ClosetTabbar({
  handleStep,
  currentStep,
}: ClosetTabbarProps) {
  return (
    <S.Layout>
      <S.OOTD onClick={() => handleStep('OOTD')}>
        <Caption1>OOTD</Caption1>
        {currentStep === 'OOTD' && <S.Hr />}
      </S.OOTD>
      <S.Closet onClick={() => handleStep('Profile')}>
        <Caption1>프로필</Caption1>
        {currentStep === 'Profile' && <S.Hr />}
      </S.Closet>
    </S.Layout>
  );
}
