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
import EmptyFilteredResult from '../EmptyFilteredResult';
import Background from '@/components/Background';
import useRememberScroll from '@/hooks/useRememberScroll';

interface ClosetClothProps {
  OOTDTotal: number;
  OOTDList: OOTDListType[];
  setOOTDList: Dispatch<SetStateAction<OOTDListType[]>>;
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

/*
이름: 검색 결과 옷장 컴포넌트
역할: 검색 결과에 따른 옷장
*/

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
  setOOTDList,
}: ClosetClothProps) {
  const router = useRouter();
  const [filterModalIsOpen, setFilterModalIsOpen] = useState<Boolean>(false);

  // 옷장 필터 모달 렌더링 여부
  const [filterModalInitialIndex, setFilterModalInitialIndex] =
    useState<number>(1);

  // 옷장 클릭 시 이동되는 함수
  const onClickImageList = (index: number) => {
    router.push(`/ootd/${index}/search`);
  };

  // 필터 클릭 함수 (필터 함수 클릭하는 것에 따라 모달 시작이 달라짐)
  const onClickFilterSpan = (index: number) => {
    setFilterModalIsOpen(true);
    setFilterModalInitialIndex(index);
  };

  // 초기화 버튼 함수
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

  // 옷장 스크를 저장 훅
  useRememberScroll({
    key: 'search-ootd',
    containerRef: OOTDRef,
    setList: setOOTDList,
    list: OOTDList,
  });

  return (
    <>
      <Background
        isOpen={filterModalIsOpen}
        onClick={() => setFilterModalIsOpen(false)}
      />
      <S.Layout>
        {/* 검색 필터 */}
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

        {/* 옷장 결과 */}
        {OOTDList.length === 0 ? (
          <EmptyFilteredResult />
        ) : (
          <>
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
          </>
        )}
      </S.Layout>
      {/* 옷장 필터 모달 */}
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
