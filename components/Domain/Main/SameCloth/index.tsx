import { Body3, Headline2, Title2 } from '@/components/UI';
import S from './style';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { MainApi } from '@/apis/domain/Main/MainApi';
import NextImage from '@/components/NextImage';
import { useRouter } from 'next/router';

type SameClothData = {
  clothesId: number;
  clothesName: string;
  clothesCategory: {
    id: number;
    categoryName: string;
  };
  clothesImageUrl: string;
  clothesColor: {
    id: number;
  }[];
  ootds: {
    ootdId: number;
    imageUrl: string;
    imageCount: number;
  }[];
}[];
/*
이름: 같은 옷 다른 느낌
역할: 유저의 옷장에 있는 옷들과 색상, 카테고리가 같은 옷을 포함하고 있는 
ootd 리스트를 보여주는 컴포넌트
*/
export default function SameCloth() {
  const [currentIndex, setCurrentIndex] = useState<number>(0); //현재 선택 인덱스
  const [sameClothData, setSameClothData] = useState<SameClothData>([]); //유저의 옷 리스트

  const { getSameClothDifferentOOTD } = MainApi();

  //유저의 옷 리스트 조회 api 호출 함수
  const fetchDataFunction = async () => {
    const data = await getSameClothDifferentOOTD();
    setSameClothData(data);
  };

  //옷 이미지 클릭 함수
  const onClickImage = (index: number) => {
    setCurrentIndex(index);
  };

  const router = useRouter();

  //ootd 리스트 클릭 함수
  const onClickListImage = (ootdId: number) => {
    router.push(`/ootd/${ootdId}/curation`);
  };

  //페이지 진입 시 옷 리스트 조회 api 호출 함수 실행
  useEffect(() => {
    fetchDataFunction();
  }, []);

  return (
    <S.Layout>
      <S.Label>
        <Headline2>같은 옷, 다른 느낌</Headline2>
        <Body3 className="body">
          다른 사용자들은 어떻게 활용하고 있을까요?
        </Body3>
      </S.Label>
      {/*유저의 옷 리스트*/}
      <S.Filter>
        {sameClothData.length > 0 &&
          sameClothData.map((item, index) => {
            return (
              <S.FilterItem
                onTouchMove={(e) => e.stopPropagation()}
                key={index}
                state={index === currentIndex}
              >
                <Image
                  onClick={() => onClickImage(index)}
                  width={56}
                  height={56}
                  src={item.clothesImageUrl}
                  alt="같은옷"
                />
                <div className="filterItemTrue">
                  <Title2 className="category">
                    {item.clothesCategory.categoryName}
                  </Title2>
                  <Body3 className="name">{item.clothesName}</Body3>
                </div>
              </S.FilterItem>
            );
          })}
      </S.Filter>
      {/*유저의 ootd 리스트*/}
      {sameClothData.length > 0 && (
        <S.List>
          {sameClothData[currentIndex].ootds[0] && (
            <S.FirstImage>
              <NextImage
                fill={true}
                src={sameClothData[currentIndex].ootds[0].imageUrl}
                alt=""
                onClick={() =>
                  onClickListImage(sameClothData[currentIndex].ootds[0].ootdId)
                }
              />
            </S.FirstImage>
          )}

          <div className="flexList">
            {sameClothData[currentIndex].ootds[1] && (
              <S.FlexImage>
                <NextImage
                  fill={true}
                  src={sameClothData[currentIndex].ootds[1].imageUrl}
                  alt=""
                  onClick={() =>
                    onClickListImage(
                      sameClothData[currentIndex].ootds[1].ootdId
                    )
                  }
                />
              </S.FlexImage>
            )}
            {sameClothData[currentIndex].ootds[2] && (
              <S.FlexImage>
                <NextImage
                  fill={true}
                  src={sameClothData[currentIndex].ootds[2].imageUrl}
                  alt=""
                  onClick={() =>
                    onClickListImage(
                      sameClothData[currentIndex].ootds[2].ootdId
                    )
                  }
                />
              </S.FlexImage>
            )}
            {sameClothData[currentIndex].ootds[3] && (
              <S.FlexImage>
                <NextImage
                  fill={true}
                  src={sameClothData[currentIndex].ootds[3].imageUrl}
                  alt=""
                  onClick={() =>
                    onClickListImage(
                      sameClothData[currentIndex].ootds[3].ootdId
                    )
                  }
                />
              </S.FlexImage>
            )}
          </div>
        </S.List>
      )}
    </S.Layout>
  );
}
