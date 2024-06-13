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

export default function Closet({
  showingId,
  ootdCount,
  userName,
  clothesCount,
  isMyProfile,
}: ClosetType) {
  const [Funnel, currentStep, handleStep] = useFunnel(['OOTD', 'Cloth']);
  const router = useRouter();

  useEffect(() => {
    if (!router.isReady) return;
    if (router.query.UserId![1] === 'cloth') {
      handleStep('Cloth');
      return;
    }
    handleStep('OOTD');
  }, [router.isReady, router.query.UserId![0]]);

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
