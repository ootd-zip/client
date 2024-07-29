import { useRouter } from 'next/router';
import { useEffect, useRef, useState } from 'react';
import useEffectAfterMount from './useEffectAfterMount';

interface InfiniteScrollProps {
  fetchDataFunction: any;
  initialData: any;
  size: number;
  initialPage?: number;
  key?: string;
}

export default function useInfiniteScroll({
  fetchDataFunction,
  initialData,
  size,
  initialPage,
  key,
}: InfiniteScrollProps) {
  const [page, setPage] = useState<number>(initialPage ? initialPage : 0); //페이지
  const [data, setData] = useState(initialData); //스크롤 할 데이터
  const [hasNextPage, setHasNextPage] = useState<Boolean>(false); //다음 페이지 존재 여부
  const [isLoading, setIsLoading] = useState<Boolean>(false); //로딩중 상태
  const [total, setTotal] = useState<number>(0); //리스트 총 갯수

  const containerRef = useRef<any>(null);
  const router = useRouter();

  //초기 api 호출 후 상태 업데이트
  useEffect(() => {
    if (!router.isReady) return;
    fetchDataFunction(page, size).then((result: any) => {
      if (!result) return;
      if (initialPage) {
        setData(() => [...initialData, ...result.content]);
      } else {
        setData(result.content);
      }
      setHasNextPage(!result.isLast);
      if (initialPage) {
        if (result.content.length > 0) {
          setPage(initialPage + 1);
        }
      } else {
        setPage(1);
      }
      setIsLoading(false);
      if (result.total) setTotal(result.total);
    });
  }, [router.isReady]);

  //isLoading 변경 시 조회 api 호출
  useEffect(() => {
    if (!hasNextPage || !isLoading) return;
    fetchDataFunction(page, size).then((result: any) => {
      setHasNextPage(!result.isLast);
      setData((prevData: any) => [...prevData, ...result.content]);
      setPage((prevPage) => prevPage + 1);
      setIsLoading(false);
    });
  }, [isLoading]);

  //스크롤이 맨 아래에 닿을 시 isLoading상태 true로 변경
  const handleScroll = () => {
    const container = containerRef.current;
    if (!container) return;

    const { scrollTop, clientHeight, scrollHeight } = container;

    if (scrollTop + clientHeight >= scrollHeight && !isLoading) {
      setIsLoading(true);
    }
  };

  //스크롤 감지 이벤트
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    container.addEventListener('scroll', handleScroll);
    return () => {
      container.removeEventListener('scroll', handleScroll);
    };
  }, [containerRef.current]);

  //스크롤이 아닌 다른 트리거를 사용해 api를 호출하는 함수
  const moreFetch = () => {
    setIsLoading(true);
  };

  //초기화 함수
  const reset = async () => {
    fetchDataFunction(0, size).then((result: any) => {
      setData(result.content);
      setHasNextPage(!result.isLast);
      setPage(1);
      setIsLoading(false);
      if (result.total) setTotal(result.total);
    });
  };

  //data가 변할때 마다 세션 스토리지에 data 저장(뒤로가기 시 이전 데이터를 다시 불러오기 위함)
  useEffectAfterMount(() => {
    if (data.length === 0) return;
    sessionStorage.setItem(`${key}-item`, JSON.stringify(data));
    sessionStorage.setItem(`${key}-page`, String(page));
  }, [data]);

  return {
    data,
    isLoading,
    hasNextPage,
    containerRef,
    reset,
    moreFetch,
    total,
  };
}
