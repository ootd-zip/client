import { Body4, Caption2 } from '@/components/UI';
import S from './style';
import { useEffect, useState } from 'react';
import ImageList from '@/components/ImageList';
import { useRouter } from 'next/router';
import { AiOutlineDown } from 'react-icons/ai';
import FilterModal from '../FilterModal';
import { ColorListType } from '@/components/ColorList';
import { SelectedCategoryType } from '@/components/Domain/AddCloth/ClothCategoryModal';
import SubHead from '@/components/DetailCloth/SubHead';

interface ClosetClothProps {
  myPageClothList?: myPageClothType[];
}

export type myPageClothType = {
  clothId: number;
  clothImage: string;
};

export interface FilterData {
  category: SelectedCategoryType[] | null;
  color: ColorListType | null;
  brand: { brandId: number; korean: string; english: string }[] | null;
  isMan: Boolean | null;
}

export default function ClosetCloth({ myPageClothList }: ClosetClothProps) {
  const router = useRouter();

  const [filterModalIsOpen, setFilterModalIsOpen] = useState<Boolean>(false);

  const [filter, setFilter] = useState<FilterData>({
    category: null,
    color: null,
    brand: null,
    isMan: null,
  });

  const [searchResult, setSearchResult] = useState(myPageClothList);

  useEffect(() => {
    console.log(filter);
  }, [filter]);

  const onClickImageList = (index: number) => {
    router.push(`/OOTD/${index}`);
  };

  const onClickFilterSpan = () => {
    setFilterModalIsOpen(true);
  };

  const onClickInitButton = () => {
    setFilter({
      category: null,
      color: null,
      brand: null,
      isMan: null,
    });
  };

  return (
    <>
      <S.Background
        isOpen={filterModalIsOpen}
        onClick={() => setFilterModalIsOpen(false)}
      />
      <S.Layout>
        <S.SearchFilter>
          <S.Span onClick={onClickInitButton}>
            <Body4 state="emphasis">초기화</Body4>
          </S.Span>
          <S.Span
            state={filter.isMan === true}
            onClick={() => setFilter({ ...filter, isMan: true })}
          >
            <Body4 state="emphasis">남성</Body4>
          </S.Span>
          <S.Span
            state={filter.isMan === false}
            onClick={() => setFilter({ ...filter, isMan: false })}
          >
            <Body4 state="emphasis">여성</Body4>
          </S.Span>
          <S.Divider />
          <S.FilterSpan
            onClick={onClickFilterSpan}
            state={filter.category !== null}
          >
            <Body4 state="emphasis">카테고리</Body4>
            {filter.category !== null && (
              <Caption2 className="counter">{filter.category.length}</Caption2>
            )}
            <AiOutlineDown className="down" />
          </S.FilterSpan>
          <S.FilterSpan
            state={filter.color !== null && filter.color.length > 0}
            onClick={onClickFilterSpan}
          >
            <Body4 state="emphasis">색상</Body4>
            <AiOutlineDown className="down" />
            {filter.color !== null && filter.color.length > 0 && (
              <Caption2 className="counter">{filter.color.length}</Caption2>
            )}
          </S.FilterSpan>
          <S.FilterSpan
            state={filter.brand !== null && filter.brand.length > 0}
            onClick={onClickFilterSpan}
          >
            <Body4 state="emphasis">브랜드</Body4>
            <AiOutlineDown className="down" />
            {filter.brand !== null && filter.brand.length > 0 && (
              <Caption2 className="counter">{filter.brand.length}</Caption2>
            )}
          </S.FilterSpan>
        </S.SearchFilter>
        <SubHead
          count={myPageClothList?.length || 0}
          clicked="new"
          state="noPadding"
        />
        <S.ClothList>
          <ImageList
            onClick={onClickImageList}
            data={searchResult!}
            type={'column'}
          />
        </S.ClothList>
      </S.Layout>
      {filterModalIsOpen && (
        <FilterModal
          isOpen={filterModalIsOpen}
          setFilterModalIsOpen={setFilterModalIsOpen}
          categoryInitital={filter.category}
          colorInitital={filter.color}
          brandInitial={filter.brand}
          setFilter={setFilter}
        />
      )}
    </>
  );
}
