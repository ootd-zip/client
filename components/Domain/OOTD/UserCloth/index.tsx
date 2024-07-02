import { Button3, Title1 } from '@/components/UI';
import S from './style';
import Carousel from '@/components/Carousel';
import ClothInformation from '@/components/ClothInformation';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import ClothApi from '@/apis/domain/Cloth/ClothApi';
import useInfiniteScroll from '@/hooks/useInfiniteScroll';
import { UserClothDataType } from '@/utils/types/cloth.types';

interface UserClothProps {
  userName: string;
  userId: number;
}
export default function UserCloth({ userName, userId }: UserClothProps) {
  const router = useRouter();
  const { getUserTaggedClothList } = ClothApi();
  const [data, setData] = useState<UserClothDataType[] | null>(null);

  const fetchDataFunction = async () => {
    const data = await getUserTaggedClothList({
      ootdId: Number(router.query.OOTDNumber![0]),
      userId: userId,
    });

    return data;
  };

  const { data: userClothData, reset } = useInfiniteScroll({
    fetchDataFunction,
    initialData: [],
    size: 10,
  });

  useEffect(() => {
    setData(userClothData);
  }, [userClothData]);

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
          {data &&
            data.map((item, index) => {
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
                    {data[index + 1] && (
                      <ClothInformation
                        onClick={() =>
                          router.push(`/cloth/${data[index + 1].id}`)
                        }
                        clothId={data[index + 1].id}
                        clothImage={data[index + 1].imageUrl}
                        caption={
                          data[index + 1].isTagged === 1 ? '태그' : '옷장'
                        }
                        brand={data[index + 1].brandName}
                        category={data[index + 1].categoryName}
                        name={data[index + 1].clothesName}
                        clothSize={data[index + 1].sizeName}
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
