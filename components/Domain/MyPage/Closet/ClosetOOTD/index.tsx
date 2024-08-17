import { Caption1 } from '@/components/UI';
import S from './style';
import { useEffect, useState } from 'react';
import ImageList from '@/components/ImageList';
import { useRouter } from 'next/router';
import useInfiniteScroll from '@/hooks/useInfiniteScroll';
import { OOTDApi } from '@/apis/domain/OOTD/OOTDApi';
import Spinner from '@/components/Spinner';
import useEffectAfterMount from '@/hooks/useEffectAfterMount';
import useRememberScroll from '@/hooks/useRememberScroll';

export type MyPageOOTDType = {
  ootdId: number;
  ootdImage: string;
};

interface ClosetOOTDProps {
  showingId: number;
}
/*
이름: 마이페이지 ootd
역할: 마이페이지에서 사용되는 유저의 ootd 컴포넌트
*/
export default function ClosetOOTD({ showingId }: ClosetOOTDProps) {
  const router = useRouter();

  //ootd리스트
  const [myPageOOTDList, setMyPageOOTDList] = useState<MyPageOOTDType[]>([]);

  //이미지 클릭 함수
  const onClickImageList = (index: number) => {
    router.push(`/ootd/${index}`);
  };

  const { getOOTD } = OOTDApi();

  //ootd 정렬 기준
  const [sortStandard, setSortStandard] = useState<'오래된 순' | '최신순'>(
    '최신순'
  );

  //ootd 조회 api 호출 함수
  const fetchDataFunction = async (ootdPage: number, size: number) => {
    if (!router.isReady) return;
    const data = await getOOTD({
      page: ootdPage,
      size,
      userId: Number(router.query.UserId![0]),
      sortCriteria: 'createdAt',
      sortDirection: sortStandard === '오래된 순' ? 'ASC' : 'DESC',
    });

    return data;
  };

  //ootd 리스트 무한 스크롤을 위한 훅
  const {
    data: ootdData,
    isLoading: ootdIsLoading,
    containerRef: ootdRef,
    hasNextPage: ootdHasNextPage,
    reset,
    ReloadSpinner,
    pullDistance,
  } = useInfiniteScroll({
    fetchDataFunction,
    size: 20,
    initialData: sessionStorage.getItem(`mypage-${showingId}-ootd-item`)
      ? JSON.parse(sessionStorage.getItem(`mypage-${showingId}-ootd-item`)!)
      : [],
    initialPage: sessionStorage.getItem(`mypage-${showingId}-ootd-page`)
      ? JSON.parse(sessionStorage.getItem(`mypage-${showingId}-ootd-page`)!)
      : 0,
    key: `mypage-${showingId}-ootd`,
  });

  //ootd 리스트 조회 api 호출 후 ootd 리스트 상태 업데이트
  useEffect(() => {
    setMyPageOOTDList(
      ootdData.map((item: any) => {
        return { clothId: item.id, clothImage: item.image };
      })
    );
  }, [ootdData]);

  //옷장 주인, 정렬 기준이 변하면 ootd 리스트 초기화
  useEffectAfterMount(() => {
    setMyPageOOTDList([]);
    reset();
  }, [sortStandard, router.query.UserId![0]]);

  //ootd리스트 스크롤 가능 상태
  const [listScrollState, setListScrollState] = useState<Boolean>(false);

  //ootd리스트 스크롤을 기억하기 위한 훅
  useRememberScroll({
    key: `mypage-${showingId}-ootd`,
    containerRef: ootdRef,
    setList: setMyPageOOTDList,
    list: myPageOOTDList,
  });

  //스크롤 감지 이벤트
  useEffect(() => {
    window.addEventListener('scroll', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  //전체 스크롤과 ootd리스트 스크롤을 분리하기 위한 함수
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

  //스크롤 위치를 기억하고 해당 위치로 보내주는 함수
  useEffect(() => {
    const memoScroll = sessionStorage.getItem(`mypage-${showingId}`);

    if (!memoScroll) return;

    window.scrollTo({
      top: Number(memoScroll),
    });
  }, []);

  return (
    <S.Layout>
      {/*ootd 리스트 정렬 기준*/}
      <S.OOTDSort state={sortStandard === '오래된 순'}>
        <Caption1 onClick={() => setSortStandard('오래된 순')} className="old">
          오래된 순
        </Caption1>
        <S.Divider />
        <Caption1 onClick={() => setSortStandard('최신순')} className="new">
          최신순
        </Caption1>
      </S.OOTDSort>
      {/*ootd 리스트*/}
      {ReloadSpinner()}
      <S.OOTDList
        style={{
          transition: 'transform 0.2s',
          transform: `translateY(${Math.min(pullDistance / 2, 50)}px)`,
        }}
        ref={ootdRef}
        state={listScrollState}
      >
        <ImageList
          type="column"
          data={myPageOOTDList!}
          onClick={onClickImageList}
        />
        {ootdIsLoading && ootdHasNextPage && <Spinner />}
      </S.OOTDList>
    </S.Layout>
  );
}
