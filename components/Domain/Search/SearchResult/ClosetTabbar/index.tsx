import { Body3, Caption1 } from '@/components/UI';
import S from './style';

interface ClosetTabbarProps {
  handleStep: (next: string) => void;
  currentStep: string;
}

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
