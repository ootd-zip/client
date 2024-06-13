import { Caption1 } from '@/components/UI';
import S from './style';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
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
export default function ClosetOOTD({ showingId }: ClosetOOTDProps) {
  const router = useRouter();

  const [myPageOOTDList, setMyPageOOTDList] = useState<MyPageOOTDType[]>([]);

  const onClickImageList = (index: number) => {
    router.push(`/ootd/${index}`);
  };

  const { getOOTD } = OOTDApi();

  const [sortStandard, setSortStandard] = useState<'오래된 순' | '최신순'>(
    '최신순'
  );

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

  const {
    data: ootdData,
    isLoading: ootdIsLoading,
    containerRef: ootdRef,
    hasNextPage: ootdHasNextPage,
    reset,
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

  useEffect(() => {
    setMyPageOOTDList(
      ootdData.map((item: any) => {
        return { clothId: item.id, clothImage: item.image };
      })
    );
  }, [ootdData]);

  useEffectAfterMount(() => {
    setMyPageOOTDList([]);
    reset();
  }, [sortStandard, router.query.UserId![0]]);

  const [listScrollState, setListScrollState] = useState<Boolean>(false);

  useRememberScroll({
    key: `mypage-${showingId}-ootd`,
    containerRef: ootdRef,
    setList: setMyPageOOTDList,
    list: myPageOOTDList,
  });

  useEffect(() => {
    //add eventlistener to window
    window.addEventListener('scroll', onScroll);
    // remove event on unmount to prevent a memory leak with the cleanup
    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

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
    <S.Layout>
      <S.OOTDSort state={sortStandard === '오래된 순'}>
        <Caption1 onClick={() => setSortStandard('오래된 순')} className="old">
          오래된 순
        </Caption1>
        <S.Divider />
        <Caption1 onClick={() => setSortStandard('최신순')} className="new">
          최신순
        </Caption1>
      </S.OOTDSort>
      <S.OOTDList ref={ootdRef} state={listScrollState}>
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
