import { Headline2 } from '@/components/UI';
import S from './style';
import { MainFavoriteCard } from '@/components/Card';
import Carousel from '@/components/Carousel';
import { useEffect, useState } from 'react';
import { MainFavoriteCardProps } from '@/components/Card/MainFavoriteCard';
import { useRouter } from 'next/router';
import useInfiniteScroll from '@/hooks/useInfiniteScroll';
import { OOTDApi } from '@/apis/domain/OOTD/OOTDApi';
import { OOTDListType } from '../../Search/SearchResult/ClosetCloth';
import useEffectAfterMount from '@/hooks/useEffectAfterMount';
import SubHead from '../../Search/SearchResult/SubHead';
import ImageList from '@/components/ImageList';
import Spinner from '@/components/Spinner';
import BackTop from '@/public/images/BackTop.svg';

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
    size: 20,
    initialData: [],
  });

  useEffect(() => {
    setOOTDList(
      OOTDData.map((item: any) => {
        return {
          id: item.id,
          imageUrl: item.imageUrl,
        };
      })
    );
  }, [OOTDData]);

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

  useEffect(() => {
    const container = OOTDRef.current;

    const handleScroll = () => {
      const { scrollTop, clientHeight, scrollHeight } = container;
      if (scrollTop >= 50) {
        setIsVisible(true);
      } else if (scrollTop < 50) {
        setIsVisible(false);
      }
    };

    // 스크롤 이벤트 리스너 등록
    container.addEventListener('scroll', handleScroll);

    // 컴포넌트 언마운트 시에 이벤트 리스너 제거
    return () => {
      container.removeEventListener('scroll', handleScroll);
    };
  }, []);

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
            <S.TopButton>
              <BackTop onClick={scrollToTop}>버튼</BackTop>
            </S.TopButton>
          )}
        </S.ClothList>
      </S.Layout>
    </>
  );
}
