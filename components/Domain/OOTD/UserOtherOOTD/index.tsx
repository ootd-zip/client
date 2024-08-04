import { Title1 } from '@/components/UI';
import S from './style';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { useEffect } from 'react';
import { OOTDApi } from '@/apis/domain/OOTD/OOTDApi';
import Carousel from '@/components/Carousel';
import NextImage from '@/components/NextImage';

interface UserOOTDProps {
  userId?: number;
  userName?: string;
}

interface OOTDListType {
  id: number;
  image: string;
}
/*
이름: 유저의 다른 ootd
역할: ootd 상세 페이지에서 사용되는 해당 ootd를 제외한 유저의 ootd 리스트를 보여주는 컴포넌트
*/
export default function UserOtherOOTD({ userId, userName }: UserOOTDProps) {
  const router = useRouter();
  const { otherOOTD } = OOTDApi();

  //유저 id와 ootd id가 변하면 유저의 다른 ootd 조회 후 상태 업데이트
  useEffect(() => {
    const fetchData = async () => {
      if (!router.isReady || userId === undefined) return;
      const result = await otherOOTD(
        userId,
        Number(router.query.OOTDNumber![0])
      );
      setUserOtherOOTD(result.content);
    };
    fetchData();
  }, [router.isReady, userId, router.query.OOTDNumber]);

  //유저의 다른 ootd 리스트
  const [userOtherOOTD, setUserOtherOOTD] = useState<OOTDListType[] | null>(
    null
  );

  //유저의 다른 ootd가 없다면 빈 컴포넌트 렌더링
  if (!userOtherOOTD || userOtherOOTD.length === 0) return <></>;

  return (
    <S.Layout>
      <>
        <S.Title>
          <Title1>{userName}님의 다른 OOTD</Title1>
        </S.Title>
        <S.OOTD>
          <Carousel infinite={false} slidesToShow={2.15} dots={false}>
            {userOtherOOTD.map((item) => {
              return (
                <NextImage
                  onClick={() => router.push(`/ootd/${item.id}`)}
                  key={item.id}
                  src={item.image}
                  alt="이 유저의 다른 ootd"
                  fill={false}
                  width={167}
                  height={167}
                />
              );
            })}
          </Carousel>
        </S.OOTD>
      </>
    </S.Layout>
  );
}
