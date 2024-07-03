import { Headline2 } from '@/components/UI';
import S from './style';
import { MainFavoriteCard } from '@/components/Card';
import Carousel from '@/components/Carousel';
import { useEffect, useState } from 'react';
import { MainFavoriteCardProps } from '@/utils/types/OOTD.types';
import { useRouter } from 'next/router';
import { MainApi } from '@/apis/domain/Main/MainApi';

export default function LikeOOTD() {
  const [data, setData] = useState<MainFavoriteCardProps[] | null>();
  const router = useRouter();

  const onClickCard = (ootdId: number) => {
    router.push(`/ootd/${ootdId}/curation`);
  };

  const { getLikeOOTD } = MainApi();

  useEffect(() => {
    const fetchData = async () => {
      const result = await getLikeOOTD();
      setData(result);
    };
    fetchData();
  }, []);

  return (
    <S.Layout onTouchMove={(e) => e.stopPropagation()}>
      <Headline2>내가 '좋아요'한 OOTD</Headline2>
      <Carousel infinite={false} slidesToShow={1.52}>
        {data?.map((item, index) => {
          return (
            <MainFavoriteCard
              key={index}
              writerId={item.writerId}
              writerName={item.writerName}
              ootdImageUrl={item.ootdImageUrl}
              ootdImageCount={item.ootdImageCount}
              ootdId={item.ootdId}
              onClick={() => onClickCard(item.ootdId)}
            />
          );
        })}
      </Carousel>
    </S.Layout>
  );
}
