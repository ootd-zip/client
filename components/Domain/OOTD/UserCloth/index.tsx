import { Button3, Title1 } from '@/components/UI';
import S from './style';
import Carousel from '@/components/Carousel';
import ClothInformation from '@/components/ClothInformation';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import ClothApi from '@/apis/domain/Cloth/ClothApi';
import useInfiniteScroll from '@/hooks/useInfiniteScroll';

export interface UserClothDataType {
  id: number;
  isTagged: number;
  imageUrl: string;
  clothesName: string;
  brandName: string;
  categoryName: string;
  sizeName: string;
}

interface UserClothProps {
  userName: string;
  userId: number;
}

/*
이름: 유저의 옷장
역할: ootd 상세 페이지에서 사용되는 해당 유저의 옷장에 있는 옷을 보여주는 컴포넌트
특이사항: 해당 ootd에 태그된 옷을 우선적으로 먼저 보여준다.
*/
export default function UserCloth({ userName, userId }: UserClothProps) {
  const router = useRouter();
  const { getUserTaggedClothList } = ClothApi();

  //유저의 옷 리스트
  const [userCloth, setUserCloth] = useState<UserClothDataType[] | null>(null);

  //유저의 옷 조회 api 호출 함수
  const fetchDataFunction = async () => {
    const data = await getUserTaggedClothList({
      ootdId: Number(router.query.OOTDNumber![0]),
      userId: userId,
    });

    return data;
  };

  //무한 스크롤을 위한 훅
  const { data: userClothData, reset } = useInfiniteScroll({
    fetchDataFunction,
    initialData: [],
    size: 10,
  });

  //유저의 옷 조회 api 호출 후 옷 리스트 상태 업데이트
  useEffect(() => {
    setUserCloth(userClothData);
  }, [userClothData]);

  //ootd id, 유저 id가 변할 경우 옷 리스트 초기화
  useEffect(() => {
    reset();
  }, [router.isReady, router.query.OOTDNumber![0], userId]);

  return (
    <S.Layout>
      <S.Title>
        <Title1>{userName}님의 옷장</Title1>
        <Button3 onClick={() => router.push(`/mypage/${userId}/cloth`)}>
          더보기
        </Button3>
      </S.Title>
      <S.Cloth>
        <Carousel slidesToShow={1.1} infinite={false} dots={false}>
          {userCloth &&
            userCloth.map((item, index) => {
              if (index % 2 === 0) {
                return (
                  <S.CarouselItem key={item.id}>
                    <ClothInformation
                      onClick={() => router.push(`/cloth/${item.id}`)}
                      clothId={item.id}
                      clothImage={item.imageUrl}
                      caption={item.isTagged === 1 ? '태그' : '옷장'}
                      brand={item.brandName}
                      category={item.categoryName}
                      name={item.clothesName}
                      clothSize={item.sizeName}
                    />
                    {userCloth[index + 1] && (
                      <ClothInformation
                        onClick={() =>
                          router.push(`/cloth/${userCloth[index + 1].id}`)
                        }
                        clothId={userCloth[index + 1].id}
                        clothImage={userCloth[index + 1].imageUrl}
                        caption={
                          userCloth[index + 1].isTagged === 1 ? '태그' : '옷장'
                        }
                        brand={userCloth[index + 1].brandName}
                        category={userCloth[index + 1].categoryName}
                        name={userCloth[index + 1].clothesName}
                        clothSize={userCloth[index + 1].sizeName}
                      />
                    )}
                  </S.CarouselItem>
                );
              }
            })}
        </Carousel>
      </S.Cloth>
    </S.Layout>
  );
}
