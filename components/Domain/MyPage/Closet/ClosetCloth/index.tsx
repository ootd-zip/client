import { Body4, Caption2 } from '@/components/UI';
import S from './style';
import { useEffect, useState } from 'react';
import ImageList from '@/components/ImageList';
import { useRouter } from 'next/router';
import { AiOutlineDown } from 'react-icons/ai';
import FilterModal from '../FilterModal';
import { ColorListType } from '@/components/ColorList';
import { CategoryListType } from '@/components/Domain/AddCloth/ClothCategoryModal';
import { BrandType } from '@/components/BrandList/Brand';
import useInfiniteScroll from '@/hooks/useInfiniteScroll';
import ClothApi from '@/apis/domain/Cloth/ClothApi';
import Spinner from '@/components/Spinner';
import { useRecoilValue } from 'recoil';
import { userId } from '@/utils/recoil/atom';
import { ClothDataType } from '@/pages/cloth/[...ClothNumber]';
import Background from '@/components/Background';
import useRememberScroll from '@/hooks/useRememberScroll';
import useEffectAfterMount from '@/hooks/useEffectAfterMount';

interface ClosetClothProps {
  showingId: number;
}

export type myPageClothType = {
  clothId: number;
  clothImage: string;
};

export interface FilterData {
  category: CategoryListType[] | null;
  color: ColorListType | null;
  brand: BrandType[] | null;
  isOpen: Boolean | null;
  gender?: {
    man: Boolean;
    woman: Boolean;
  };
}
/*
이름: 마이페이지 옷
역할: 마이페이지에서 사용되는 유저의 옷 컴포넌트
*/
export default function ClosetCloth({ showingId }: ClosetClothProps) {
  const router = useRouter();
  const localUserId = useRecoilValue(userId); //현재 로그인한 유저 아이디

  //옷 필터 모달 렌더링 여부
  const [filterModalIsOpen, setFilterModalIsOpen] = useState<Boolean>(false);

  //옷 필터 상태
  const [filter, setFilter] = useState<FilterData>({
    category: null,
    color: null,
    brand: null,
    isOpen: null,
  });

  const [searchResult, setSearchResult] = useState([]); //옷 검색 결과 리스트
  const [filterModalInitialIndex, setFilterModalInitialIndex] =
    useState<number>(1); //옷 필터 모달의 첫 렌더링 인덱스

  const { getUserClothList } = ClothApi();

  //유저의 옷 리스트 조회 api 호출 함수
  const fetchDataFunction = async (page: number, size: number) => {
    const data = await getUserClothList({
      userId: Number(router.query.UserId![0]),
      page,
      size,
      brandIds: filter.brand?.map((item) => item.id),
      colorIds: filter.color?.map((item) => item.id),
      categoryIds: filter.category?.map((item) => {
        if (item.state) {
          return item.id;
        }
        return item.detailCategories![0].id;
      }),
      isPrivate:
        localUserId !== showingId
          ? false
          : filter.isOpen !== null
          ? filter.isOpen
          : undefined,
    });
    return data;
  };

  //정렬 조건이 변경되면 옷 초기화
  useEffectAfterMount(() => {
    reset();
  }, [filter]);

  //무한 스크롤을 위한 훅
  const {
    data: clothData,
    isLoading,
    hasNextPage,
    containerRef,
    reset,
    ReloadSpinner,
    containerProps,
  } = useInfiniteScroll({
    fetchDataFunction,
    initialData: sessionStorage.getItem(`mypage-${showingId}-cloth-item`)
      ? JSON.parse(sessionStorage.getItem(`mypage-${showingId}-cloth-item`)!)
      : [],
    initialPage: sessionStorage.getItem(`mypage-${showingId}-cloth-page`)
      ? Number(sessionStorage.getItem(`mypage-${showingId}-cloth-page`)!)
      : 0,
    size: 8,
    key: `mypage-${showingId}-cloth`,
  });

  //유저의 옷 리스트 스크롤을 기억하기 위한 훅
  useRememberScroll({
    key: `mypage-${showingId}-cloth`,
    containerRef,
    setList: setSearchResult,
    list: searchResult,
  });

  //유저의 옷 조회 api 호출 후 검색 결과 상태 업데이트
  useEffect(() => {
    const newClothData = clothData.map((item: ClothDataType) => {
      return { clothId: item.id, clothImage: item.imageUrl };
    });
    setSearchResult(newClothData);
  }, [clothData]);

  //이미지 리스트 클릭 함수
  const onClickImageList = (index: number) => {
    router.push(`/cloth/${index}/closet`);
  };

  //필터 열기 버튼 클릭 함수 (클릭 하는 필터에 따라 모달 시작 위치가 달라짐)
  const onClickFilterSpan = (index: number) => {
    setFilterModalIsOpen(true);
    setFilterModalInitialIndex(index);
  };

  //초기화 버튼 클릭 함수
  const onClickInitButton = () => {
    setFilter({
      category: null,
      color: null,
      brand: null,
      isOpen: null,
    });
  };

  //스크롤 이벤트 감지
  useEffect(() => {
    window.addEventListener('scroll', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  //옷 리스트 스크롤 가능 상태
  const [listScrollState, setListScrollState] = useState<Boolean>(false);

  //전체 스크롤이 일정 영역을 넘지 않으면 옷 리스트의 스크롤 상태는 false
  const onScroll = () => {
    const { scrollY } = window;
    if (scrollY === 0) return;
    sessionStorage.setItem(`mypage-${showingId}`, `${scrollY}`);
    if (scrollY >= 30) {
      setListScrollState(true);
    } else {
      setListScrollState(false);
    }
  };

  //스크롤을 기억하고 해당 위치로 돌려보내주는 함수
  useEffect(() => {
    const memoScroll = sessionStorage.getItem(`mypage-${showingId}`);

    if (!memoScroll) return;

    window.scrollTo({
      top: Number(memoScroll),
    });
  }, []);

  return (
    <>
      <Background
        isOpen={filterModalIsOpen}
        onClick={() => setFilterModalIsOpen(false)}
      />
      <S.Layout>
        {/*옷 검색 필터 컴포넌트*/}
        <S.SearchFilter>
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
          {localUserId === showingId && (
            <>
              <S.Span
                state={filter.isOpen === true}
                onClick={() => setFilter({ ...filter, isOpen: true })}
              >
                <Body4 state="emphasis">공개</Body4>
              </S.Span>
              <S.Span
                state={filter.isOpen === false}
                onClick={() => setFilter({ ...filter, isOpen: false })}
              >
                <Body4 state="emphasis">비공개</Body4>
              </S.Span>
            </>
          )}
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
        {isLoading && hasNextPage && <Spinner />}
        {/*옷 조회 결과 리스트*/}
        {ReloadSpinner()}
        <S.ClothList
          {...containerProps}
          ref={containerRef}
          state={listScrollState}
        >
          <ImageList
            onClick={onClickImageList}
            data={searchResult!}
            type={'column'}
          />
        </S.ClothList>
      </S.Layout>
      {/*옷 검색 필터 모달*/}
      {filterModalIsOpen && (
        <FilterModal
          isOpen={filterModalIsOpen}
          setFilterModalIsOpen={setFilterModalIsOpen}
          categoryInitital={filter.category}
          colorInitital={filter.color}
          brandInitial={filter.brand}
          setFilter={setFilter}
          initialIndex={filterModalInitialIndex}
          page="mypage"
        />
      )}
    </>
  );
}
