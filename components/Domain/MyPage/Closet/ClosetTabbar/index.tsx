import { Body3, Caption1 } from '@/components/UI';
import S from './style';
import Link from 'next/link';

interface ClosetTabbarProps {
  ootdCount: number;
  clothesCount: number;
  handleStep: (next: string) => void;
  currentStep: string;
  showingId: number;
}
/*
이름: 마이페이지 탭바
역할: 마이페이지에서 사용되는 탭바 컴포넌트
*/
export default function ClosetTabbar({
  ootdCount,
  clothesCount,
  handleStep,
  currentStep,
  showingId,
}: ClosetTabbarProps) {
  return (
    <S.Layout>
      <Link
        href={`/mypage/${showingId}/ootd`}
        scroll={false}
        onClick={() => {
          handleStep('OOTD');
        }}
      >
        <S.OOTD>
          <Body3 state="emphasis">{ootdCount}</Body3>
          <Caption1>OOTD</Caption1>
          {currentStep === 'OOTD' && <S.Hr />}
        </S.OOTD>
      </Link>
      <Link
        href={`/mypage/${showingId}/cloth`}
        scroll={false}
        onClick={() => {
          handleStep('Cloth');
        }}
      >
        <S.Closet>
          <Body3 state="emphasis">{clothesCount}</Body3>
          <Caption1>옷</Caption1>
          {currentStep === 'Cloth' && <S.Hr />}
        </S.Closet>
      </Link>
    </S.Layout>
  );
}
