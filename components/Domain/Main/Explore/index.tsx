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

export default function Explore() {
  const router = useRouter();

  const onClickImageList = (index: number) => {
    router.push(`/ootd/${index}/explore`);
  };

  const [sortStandard, setSortStandard] = useState<string>('LATEST');
  const [OOTDList, setOOTDList] = useState<OOTDListType[]>([]);

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
          count={OOTDList?.length || 0}
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
