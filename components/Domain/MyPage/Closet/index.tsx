import { useFunnel } from '@/hooks/use-funnel';
import S from './style';
import ClosetTabbar from './ClosetTabbar';
import ClosetCloth from './ClosetCloth';
import ClosetOOTD from './ClosetOOTD';
import ClosetEmpty from './ClosetEmpty';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

interface ClosetType {
  showingId: number;
  userName: string;
  ootdCount: number;
  clothesCount: number;
  isMyProfile: Boolean;
}
/*
이름: 유저의 옷장
역할: 마이페이지에서 사용되는 유저의 옷장 컴포넌트
*/
export default function Closet({
  showingId,
  ootdCount,
  userName,
  clothesCount,
  isMyProfile,
}: ClosetType) {
  //슬라이드를 허용하지 않고 각 단계를 처리하기 위한 Funnel 사용
  const [Funnel, currentStep, handleStep] = useFunnel(['OOTD', 'Cloth']);
  const router = useRouter();

  //처음 보여지는 컨텐츠를 url에 기반해 선택해주는 로직
  useEffect(() => {
    if (!router.isReady) return;
    if (router.query.UserId![1] === 'cloth') {
      handleStep('Cloth');
      return;
    }
    handleStep('OOTD');
  }, [router.isReady, router.query.UserId]);

  return (
    <>
      <S.Layout>
        <ClosetTabbar
          ootdCount={ootdCount}
          clothesCount={clothesCount}
          handleStep={handleStep}
          currentStep={currentStep}
          showingId={showingId}
        />
        <Funnel>
          <Funnel.Steps name="OOTD">
            {ootdCount === 0 ? (
              <ClosetEmpty
                text={`${userName}님이 공유한 사진이 없습니다.`}
                button="OOTD 게시하기"
                onClick={() => router.push('/add-ootd')}
                isMyProfile={isMyProfile}
              />
            ) : (
              <ClosetOOTD showingId={showingId} />
            )}
          </Funnel.Steps>
          <Funnel.Steps name="Cloth">
            {clothesCount === 0 ? (
              <ClosetEmpty
                text={`${userName}님의 옷장이 비어있습니다.`}
                button="의류 추가하기"
                onClick={() => router.push('/add-cloth')}
                isMyProfile={isMyProfile}
              />
            ) : (
              <ClosetCloth showingId={showingId} />
            )}
          </Funnel.Steps>
        </Funnel>
      </S.Layout>
    </>
  );
}
