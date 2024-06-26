import { Body4, Caption2 } from '@/components/UI';
import S from './style';
import { useCallback, useEffect, useState } from 'react';
import ImageList from '@/components/ImageList';
import { useRouter } from 'next/router';
import { AiOutlineDown } from 'react-icons/ai';
import FilterModal from '../FilterModal';
import { CategoryListType } from '@/components/Domain/AddCloth/ClothCategoryModal';
import { BrandType } from '@/utils/types/OOTD.types';
import useInfiniteScroll from '@/hooks/useInfiniteScroll';
import ClothApi from '@/apis/domain/Cloth/ClothApi';
import Spinner from '@/components/Spinner';
import { useRecoilValue } from 'recoil';
import { userId } from '@/utils/recoil/atom';
import { ClothDataType } from '@/pages/cloth/[...ClothNumber]';
import Background from '@/components/Background';
import useRememberScroll from '@/hooks/useRememberScroll';
import useEffectAfterMount from '@/hooks/useEffectAfterMount';
import { ColorListType } from '@/utils/types/OOTD.types';

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

export default function ClosetCloth({ showingId }: ClosetClothProps) {
  const router = useRouter();
  const localUserId = useRecoilValue(userId);

  const [filterModalIsOpen, setFilterModalIsOpen] = useState<Boolean>(false);

  const [filter, setFilter] = useState<FilterData>({
    category: null,
    color: null,
    brand: null,
    isOpen: null,
  });
  const [searchResult, setSearchResult] = useState<myPageClothType[]>([]);
  const [filterModalInitialIndex, setFilterModalInitialIndex] =
    useState<number>(1);

  const { getUserClothList } = ClothApi();

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

  useEffectAfterMount(() => {
    reset();
  }, [filter]);

  const {
    data: clothData,
    isLoading,
    hasNextPage,
    containerRef,
    reset,
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

  useRememberScroll({
    key: `mypage-${showingId}-cloth`,
    containerRef,
    setList: setSearchResult,
    list: searchResult,
  });

  useEffect(() => {
    const newClothData = clothData.map((item: ClothDataType) => {
      return { clothId: item.id, clothImage: item.imageUrl };
    });
    setSearchResult(newClothData);
  }, [clothData]);

  const onClickImageList = (index: number) => {
    router.push(`/cloth/${index}/closet`);
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
      isOpen: null,
    });
  };

  useEffect(() => {
    //add eventlistener to window
    window.addEventListener('scroll', onScroll);
    // remove event on unmount to prevent a memory leak with the cleanup
    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  const [listScrollState, setListScrollState] = useState<Boolean>(false);

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
        <S.ClothList ref={containerRef} state={listScrollState}>
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
          initialIndex={filterModalInitialIndex}
          page="mypage"
        />
      )}
    </>
  );
}
