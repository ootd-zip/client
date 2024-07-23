import S from './style';
import { useState } from 'react';
import { useRouter } from 'next/router';
import useInfiniteScroll from '@/hooks/useInfiniteScroll';
import { OOTDApi } from '@/apis/domain/OOTD/OOTDApi';
import { OOTDListType } from '../../Search/SearchResult/ClosetCloth';
import useEffectAfterMount from '@/hooks/useEffectAfterMount';
import SubHead from '../../Search/SearchResult/SubHead';
import ImageList from '@/components/ImageList';
import Spinner from '@/components/Spinner';
import BackTop from '@/public/images/BackTop.svg';
import Portal from '@/components/Portal';
import useRememberScroll from '@/hooks/useRememberScroll';
/*
이름: 탐색
역할: 유저의 ootd들을 보여주는 탐색 컴포넌트
*/
export default function Explore() {
  const router = useRouter();

  //이미지 리스트 클릭 이벤트 함수
  const onClickImageList = (index: number) => {
    router.push(`/ootd/${index}/explore`);
  };

  const [sortStandard, setSortStandard] = useState<string>('LATEST'); // 정렬기준
  const [OOTDList, setOOTDList] = useState<OOTDListType[]>([]); //ootd 리스트

  const { getSearchOOTD } = OOTDApi();

  const fetchOOTDDataFunction = async (ootdPage: number, ootdSize: number) => {
    if (!router.isReady) return;

    const data = await getSearchOOTD({
      searchText: '',
      sortCriteria: sortStandard,
      page: ootdPage,
      size: ootdSize,
      writerGender: '',
    });

    return data;
  };

  const {
    data: OOTDData,
    isLoading: OOTDIsLoading,
    containerRef: OOTDRef,
    hasNextPage: OOTDHasNextPage,
    reset: ootdReset,
    total,
  } = useInfiniteScroll({
    fetchDataFunction: fetchOOTDDataFunction,
    size: 12,
    initialData: sessionStorage.getItem('explore-item')
      ? JSON.parse(sessionStorage.getItem('explore-item')!)
      : [],
    initialPage: sessionStorage.getItem('explore-page')
      ? Number(sessionStorage.getItem('explore-page'))
      : 0,
    key: 'explore',
  });

  useEffectAfterMount(() => {
    setOOTDList(
      OOTDData.map((item: any) => {
        return {
          id: item.id,
          imageUrl: item.imageUrl,
        };
      })
    );
  }, [OOTDData]);

  useRememberScroll({
    key: 'explore',
    containerRef: OOTDRef,
    setList: setOOTDList,
    list: OOTDList,
  });

  useEffectAfterMount(() => {
    setOOTDList([]);
    ootdReset();
  }, [sortStandard]);

  const [isVisible, setIsVisible] = useState<Boolean>(false);

  const scrollToTop = () => {
    // FAB 버튼 함수
    const container = OOTDRef.current;
    container.scrollTo({
      top: 0,
    });
  };

  return (
    <>
      <S.SubHeadDiv>
        <SubHead
          setState={setSortStandard}
          state={sortStandard}
          count={total}
        />
      </S.SubHeadDiv>
      <S.Layout>
        <S.ClothList ref={OOTDRef}>
          <ImageList
            onClick={onClickImageList}
            data={OOTDList.map((item) => {
              return { ootdId: item.id, ootdImage: item.imageUrl };
            })}
            type={'column'}
          />
          {OOTDIsLoading && OOTDHasNextPage && <Spinner />}

          {isVisible && (
            <Portal>
              <S.TopButton>
                <BackTop onClick={scrollToTop}>버튼</BackTop>
              </S.TopButton>
            </Portal>
          )}
        </S.ClothList>
      </S.Layout>
    </>
  );
}
