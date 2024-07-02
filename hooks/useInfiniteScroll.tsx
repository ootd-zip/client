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
  const [page, setPage] = useState<number>(initialPage ? initialPage : 0);
  const [data, setData] = useState<any>(initialData);
  const [hasNextPage, setHasNextPage] = useState<Boolean>(false);
  const [isLoading, setIsLoading] = useState<Boolean>(false);
  const [total, setTotal] = useState<number>(0); // total 필드 추가
  const containerRef = useRef<any>(null);
  const router = useRouter();

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

  useEffect(() => {
    if (!hasNextPage || !isLoading) return;
    fetchDataFunction(page, size).then((result: any) => {
      setHasNextPage(!result.isLast);
      setData((prevData: any) => [...prevData, ...result.content]);
      setPage((prevPage) => prevPage + 1);
      setIsLoading(false);
    });
  }, [isLoading]);

  const handleScroll = () => {
    const container = containerRef.current;
    if (!container) return;

    const { scrollTop, clientHeight, scrollHeight } = container;

    if (scrollTop + clientHeight >= scrollHeight && !isLoading) {
      setIsLoading(true);
    }
  };

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    container.addEventListener('scroll', handleScroll);
    return () => {
      container.removeEventListener('scroll', handleScroll);
    };
  }, [containerRef.current]);

  const moreFetch = () => {
    setIsLoading(true);
  };

  const reset = async () => {
    fetchDataFunction(0, size).then((result: any) => {
      setData(result.content);
      setHasNextPage(!result.isLast);
      setPage(1);
      setIsLoading(false);
      if (result.total) setTotal(result.total);
    });
  };

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
