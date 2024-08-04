/* eslint-disable @next/next/no-img-element */
import { Title1 } from '@/components/UI';
import S from './style';
import { useRouter } from 'next/router';
import ImageList from '@/components/ImageList';
import { OOTDApi } from '@/apis/domain/OOTD/OOTDApi';
import { useEffect, useState } from 'react';

interface OOTDListType {
  id: number;
  image: string;
}

/*
이름: 비슷한 ootd
역할: ootd 상세 페이지에서 해당 ootd와 스타일이 비슷한 ootd 리스트를 보여주는 컴포넌트
*/
export default function SimilarOOTD() {
  const router = useRouter();

  const { getSimilarOOTD } = OOTDApi();

  //비슷한 ootd 리스트
  const [ootdList, setOOTDList] = useState<OOTDListType[] | null>(null);

  //비슷한 ootd 리스트 조회 api 호출 함수
  useEffect(() => {
    if (!router.isReady) return;
    const fetchData = async () => {
      const result = await getSimilarOOTD(Number(router.query.OOTDNumber![0]));
      setOOTDList(result?.content);
    };
    fetchData();
  }, [router.isReady, router.query.OOTDNumber]);

  //비슷한 ootd 리스트 클릭 함수
  const onClickSimilarOOTDImage = (ootdId: number) => {
    router.push(`/ootd/${ootdId}`);
  };

  return (
    <S.Layout>
      {ootdList && ootdList.length > 0 && (
        <S.Title>
          <Title1>비슷한 OOTD</Title1>
        </S.Title>
      )}

      <S.OOTD>
        {ootdList && (
          <ImageList
            onClick={onClickSimilarOOTDImage}
            type="column"
            data={ootdList.map((item) => {
              return { ootdId: item.id, ootdImage: item.image };
            })}
          />
        )}
      </S.OOTD>
    </S.Layout>
  );
}
