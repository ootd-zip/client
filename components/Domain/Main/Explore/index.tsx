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

  //탐색 리스트 조회 api 호출 함수
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

  //탐색 리스트 무한 스크롤 훅
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

  //탐색 리스트 조회 api 호출 완료 시 ootdList 상태 업데이트
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

  //탐색 리스트의 스크롤 위치를 기억하기 위한 훅
  useRememberScroll({
    key: 'explore',
    containerRef: OOTDRef,
    setList: setOOTDList,
    list: OOTDList,
  });

  //정렬 기준이 변경되면 새로운 데이터 패칭
  useEffectAfterMount(() => {
    setOOTDList([]);
    ootdReset();
  }, [sortStandard]);

  const [isVisible, setIsVisible] = useState<Boolean>(false);

  //맨 위 화면으로 이동하는 함수
  const scrollToTop = () => {
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
