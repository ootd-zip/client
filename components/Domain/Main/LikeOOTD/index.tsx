import { Headline2 } from '@/components/UI';
import S from './style';
import { MainFavoriteCard } from '@/components/Card';
import Carousel from '@/components/Carousel';
import { useEffect, useState } from 'react';
import { MainFavoriteCardProps } from '@/components/Card/MainFavoriteCard';
import { useRouter } from 'next/router';
import { MainApi } from '@/apis/domain/Main/MainApi';
/*
이름: 내가 좋아요한 ootd
역할: 내가 좋아요한 ootd 리스트를 보여주는 컴포넌트
*/
export default function LikeOOTD() {
  const [ootdList, setOOTDList] = useState<MainFavoriteCardProps[] | null>(); //ootd리스트
  const router = useRouter();

  //카드 클릭 함수
  const onClickCard = (ootdId: number) => {
    router.push(`/ootd/${ootdId}/curation`);
  };

  const { getLikeOOTD } = MainApi();

  //내가 좋아요한 ootd 조회 api
  useEffect(() => {
    const fetchData = async () => {
      const result = await getLikeOOTD();
      setOOTDList(result);
    };
    fetchData();
  }, []);

  return (
    <S.Layout onTouchMove={(e) => e.stopPropagation()}>
      <Headline2>내가 '좋아요'한 OOTD</Headline2>
      <Carousel infinite={false} slidesToShow={1.52}>
        {ootdList?.map((item, index) => {
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
