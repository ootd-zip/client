import { Dispatch, SetStateAction, useEffect } from 'react';
import Brand, { BrandType } from './Brand';
import S from './style';

interface BrandListProps {
  keyword?: string;
  brandInitial: BrandType[] | null;
  setSelectedBrand: Dispatch<SetStateAction<BrandType[] | null>>;
  brandList: BrandType[] | null;
  setBrandList: Dispatch<SetStateAction<BrandType[] | null>>;
  many: 'one' | 'many';
}

/*
이름: 브랜드 리스트 컴포넌트
역할: 선택이 가능한 브랜드를 모아둔 리스트  
특이사항: 한글로만 이루어짐, 영어 버전 추가 예정
*/
export default function BrandList({
  keyword,
  brandList,
  setBrandList,
  setSelectedBrand,
  brandInitial,
  many,
}: BrandListProps) {
  //기존에 선택되어있던 브랜드 초깃값을 세팅하는 과정
  useEffect(() => {
    if (brandList) {
      const newBrandList = [...brandList];
      if (brandInitial) {
        for (let i = 0; i < brandInitial?.length; i++) {
          for (let j = 0; j < newBrandList.length; j++) {
            if (brandInitial[i].id === newBrandList[j].id) {
              newBrandList[j].state = true;
            }
          }
        }
        setBrandList(newBrandList);
      }
    }
  }, []);

  //브랜드 선택 함수
  const onClickBrandList = (index: number) => {
    let newBrandList = [...brandList!];
    //선택할 개수가 한개라면 다른 클릭 초기화
    if (many === 'one') {
      newBrandList = newBrandList.map((item) => {
        return { ...item, state: false };
      });
    }
    newBrandList[index] = {
      ...newBrandList![index],
      state: !newBrandList![index].state,
    };
    setBrandList(newBrandList);
  };

  //브랜드 리스트에 filter 함수를 활용해 선택된 브랜드를 업데이트
  useEffect(() => {
    if (brandList) {
      const newBrandList = [...brandList]
        .filter((item) => item.state)
        .map((item) => {
          return {
            id: item.id,
            name: item.name,
          };
        });
      setSelectedBrand(newBrandList);
    }
  }, [brandList]);

  return (
    <S.Layout>
      {brandList?.map((item, index) => {
        return (
          <Brand
            keyword={keyword}
            key={index}
            name={item.name}
            onClickBrandList={onClickBrandList}
            onClickIndex={index}
            state={item.state}
          />
        );
      })}
    </S.Layout>
  );
}
