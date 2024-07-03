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

export default function UserOtherOOTD({ userId, userName }: UserOOTDProps) {
  const router = useRouter();
  const { otherOOTD } = OOTDApi();

  useEffect(() => {
    const fetchData = async () => {
      if (!router.isReady || userId === undefined) return;
      const result = await otherOOTD(
        userId,
        Number(router.query.OOTDNumber![0])
      );
      setData(result.content);
    };
    fetchData();
  }, [router.isReady, userId, router.query.OOTDNumber]);

  const [data, setData] = useState<OOTDListType[] | null>(null);

  if (!data || data.length === 0) return <></>;

  return (
    <S.Layout>
      <>
        <S.Title>
          <Title1>{userName}님의 다른 OOTD</Title1>
        </S.Title>
        <S.OOTD>
          <Carousel infinite={false} slidesToShow={2.15} dots={false}>
            {data.map((item) => {
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
