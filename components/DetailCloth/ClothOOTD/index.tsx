import S from './style';
import { Headline1, Body2, Body3 } from '@/components/UI';
import Header from '@/components/Header';
import SubHead from '../SubHead';
import ImageList from '@/components/ImageList';
import { useEffect, useState } from 'react';
import ClothApi from '@/apis/domain/Cloth/ClothApi';
import { useRouter } from 'next/router';
import Spinner from '@/components/Spinner';
import useInfiniteScroll from '@/hooks/useInfiniteScroll';

interface OOTDDataProps {
  ootdId: number;
  ootdImage: string;
}

interface ClothOOTDProps {
  clothId: number;
}

/*
이름: 이 옷을 활용한 OOTD 컴포넌트
역할: 의류 상세 페이지에서 사용되는 이 옷을 활용한 OOTD 컴포넌트
*/

export default function ClothOOTD({ clothId }: ClothOOTDProps) {
  const [clicked, setClicked] = useState<string>('new');
  const [data, setData] = useState<OOTDDataProps[]>([]);

  const { getOOTDWithCloth } = ClothApi();

  const fetchDataFunction = async (page: number, size: number) => {
    const data = await getOOTDWithCloth({
      clothesId: clothId,
      page,
      size,
      sortCriteria: 'createdAt',
      sortDirection: clicked === 'new' ? 'DESC' : 'ASC',
    });
    return data;
  };

  const {
    data: ootdData,
    isLoading,
    hasNextPage,
    containerRef: ootdRef,
    reset,
  } = useInfiniteScroll({
    fetchDataFunction,
    initialData: [],
    size: 7,
  });

  useEffect(() => {
    setData(
      ootdData.map((item: any) => {
        return { ootdId: item.id, ootdImage: item.image };
      })
    );
  }, [ootdData]);

  useEffect(() => {
    setData([]);
    reset();
  }, [clicked]);

  const router = useRouter();

  return (
    <S.Layout ref={ootdRef}>
      <Header text="이 옷을 활용한 OOTD" />
      <SubHead state={clicked} setState={setClicked} count={data?.length} />
      <S.OOTDLayout>
        <ImageList
          data={data}
          type="column"
          onClick={(index) => router.push(`/ootd/${index}`)}
        />
      </S.OOTDLayout>
      {isLoading && hasNextPage && <Spinner />}
    </S.Layout>
  );
}
