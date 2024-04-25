import { Body4, Caption2 } from '@/components/UI';
import S from './style';
import { Dispatch, MutableRefObject, SetStateAction, useState } from 'react';
import ImageList from '@/components/ImageList';
import { useRouter } from 'next/router';
import { AiOutlineDown } from 'react-icons/ai';
import SubHead from '../SubHead';
import Spinner from '@/components/Spinner';
import FilterModal from '@/components/Domain/MyPage/Closet/FilterModal';
import { FilterData } from '@/components/Domain/MyPage/Closet/ClosetCloth';
import Portal from '@/components/Portal';

interface ClosetClothProps {
  OOTDTotal: number;
  OOTDList: OOTDListType[];
  OOTDIsLoading: Boolean;
  OOTDRef: MutableRefObject<any>;
  OOTDHasNextPage: Boolean;
  filter: FilterData | SearchFilterData;
  setFilter: Dispatch<SetStateAction<FilterData | SearchFilterData>>;
  sortStandard: string;
  setSortStandard: Dispatch<SetStateAction<string>>;
}

export type OOTDListType = {
  id: number;
  imageUrl: string;
  imageCount: number;
};

export type GenderTypes = {
  man: Boolean;
  woman: Boolean;
};

export interface SearchFilterData extends FilterData {
  gender?: GenderTypes;
}

export default function ClosetCloth({
  OOTDTotal,
  OOTDList,
  OOTDIsLoading,
  OOTDRef,
  OOTDHasNextPage,
  filter,
  setFilter,
  sortStandard,
  setSortStandard,
}: ClosetClothProps) {
  const router = useRouter();
  const [filterModalIsOpen, setFilterModalIsOpen] = useState<Boolean>(false);
  const [filterModalInitialIndex, setFilterModalInitialIndex] =
    useState<number>(1);

  const onClickImageList = (index: number) => {
    router.push(`/ootd/${index}`);
  };

  const onClickFilterSpan = (index: number) => {
    setFilterModalIsOpen(true);
    setFilterModalInitialIndex(index);
  };

  const onClickInitButton = () => {
    setFilter({
      category: null,
      color: null,
      brand: null,
      isOpen: true,
      gender: {
        man: false,
        woman: false,
      },
    });
  };

  return (
    <>
      <Portal>
        <S.Background
          isOpen={filterModalIsOpen}
          onClick={() => setFilterModalIsOpen(false)}
          onTouchMove={(e) => e.stopPropagation()}
        />
      </Portal>
      <S.Layout>
        <S.SearchFilter onTouchMove={(e) => e.stopPropagation()}>
          <S.Span
            state={
              !!(
                filter?.category?.length ||
                filter?.brand?.length ||
                filter?.color?.length
              )
            }
            onClick={onClickInitButton}
          >
            <Body4 state="emphasis">초기화</Body4>
          </S.Span>
          <S.Span
            state={filter.gender!.man}
            onClick={() =>
              setFilter({
                ...filter,
                gender: {
                  woman: filter.gender!.woman!,
                  man: !filter.gender!.man,
                },
              })
            }
          >
            <Body4 state="emphasis">남성</Body4>
          </S.Span>
          <S.Span
            state={filter.gender!.woman}
            onClick={() =>
              setFilter({
                ...filter,
                gender: {
                  man: filter.gender!.man,
                  woman: !filter.gender!.woman,
                },
              })
            }
          >
            <Body4 state="emphasis">여성</Body4>
          </S.Span>
          <S.Divider />
          <S.FilterSpan
            onClick={() => onClickFilterSpan(1)}
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
            onClick={() => onClickFilterSpan(2)}
          >
            <Body4 state="emphasis">색상</Body4>
            <AiOutlineDown className="down" />
            {filter.color !== null && filter.color.length > 0 && (
              <Caption2 className="counter">{filter.color.length}</Caption2>
            )}
          </S.FilterSpan>
          <S.FilterSpan
            state={filter.brand !== null && filter.brand.length > 0}
            onClick={() => onClickFilterSpan(3)}
          >
            <Body4 state="emphasis">브랜드</Body4>
            <AiOutlineDown className="down" />
            {filter.brand !== null && filter.brand.length > 0 && (
              <Caption2 className="counter">{filter.brand.length}</Caption2>
            )}
          </S.FilterSpan>
        </S.SearchFilter>
        <SubHead
          setState={setSortStandard}
          state={sortStandard}
          count={OOTDTotal || 0}
          style="noPadding"
        />
        <S.ClothList ref={OOTDRef}>
          <ImageList
            onClick={onClickImageList}
            data={OOTDList.map((item) => {
              return {
                ootdId: item.id,
                ootdImage: item.imageUrl,
                ootdImageCount: item.imageCount,
              };
            })}
            type={'column'}
          />
          {OOTDIsLoading && OOTDHasNextPage && <Spinner />}
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
          page="search"
          gender={filter.gender!}
          initialIndex={filterModalInitialIndex}
        />
      )}
    </>
  );
}
