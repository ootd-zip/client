import { Dispatch, SetStateAction, useEffect } from 'react';
import Brand from './Brand';
import { BrandType } from '@/utils/types/OOTD.types';
import S from './style';
import useEffectAfterMount from '@/hooks/useEffectAfterMount';

interface BrandListProps {
  keyword?: string;
  brandInitial: BrandType[] | null;
  setSelectedBrand: Dispatch<SetStateAction<BrandType[] | null>>;
  brandList: BrandType[] | null;
  setBrandList: Dispatch<SetStateAction<BrandType[] | null>>;
  many: 'one' | 'many';
}

export default function BrandList({
  keyword,
  brandList,
  setBrandList,
  setSelectedBrand,
  brandInitial,
  many,
}: BrandListProps) {
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

  const onClickBrandList = (index: number) => {
    let newBrandList = [...brandList!];

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
