/* eslint-disable react-hooks/exhaustive-deps */
import { useRouter } from 'next/router';
import { useEffect, useRef, useState, useCallback } from 'react';
import useEffectAfterMount from './useEffectAfterMount';
import { ClipLoader } from 'react-spinners';

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
  const [data, setData] = useState(initialData);
  const [hasNextPage, setHasNextPage] = useState<Boolean>(false);
  const [isLoading, setIsLoading] = useState<Boolean>(false);
  const [isRefreshing, setIsRefreshing] = useState<Boolean>(false);
  const [total, setTotal] = useState<number>(0);
  const [pullDistance, setPullDistance] = useState<number>(0);
  const [isPulling, setIsPulling] = useState<Boolean>(false);

  const containerRef = useRef<any>(null);
  const startY = useRef<number | null>(null);
  const router = useRouter();

  const fetchData = async (
    pageNum: number,
    pageSize: number,
    isRefresh: Boolean = false
  ) => {
    const result = await fetchDataFunction(pageNum, pageSize);
    if (!result) return;

    if (isRefresh) {
      setData(result.content);
      setPage(1);
    } else {
      setData((prevData: any) => {
        if (prevData.length >= 1) return [...prevData, ...result.content];
        else return result.content;
      });
      setPage((prevPage) => prevPage + 1);
    }

    setHasNextPage(!result.isLast);
    if (result.total) setTotal(result.total);
    return result;
  };

  useEffect(() => {
    if (!router.isReady) return;
    fetchData(page, size);
  }, [router.isReady]);

  useEffect(() => {
    if (!hasNextPage || !isLoading) return;
    fetchData(page, size).then(() => setIsLoading(false));
  }, [isLoading, hasNextPage]);

  const handleScroll = () => {
    const container = containerRef.current;
    if (!container) return;

    const { scrollTop, clientHeight, scrollHeight } = container;

    if (scrollTop + clientHeight >= scrollHeight - 20 && !isLoading) {
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
  }, [handleScroll]);

  const handleTouchStart = useCallback((e: TouchEvent) => {
    if (containerRef.current && containerRef.current.scrollTop === 0) {
      startY.current = e.touches[0].clientY;
    } else {
      startY.current = null;
    }
  }, []);

  const handleTouchMove = useCallback((e: TouchEvent) => {
    if (startY.current !== null) {
      const currentY = e.touches[0].clientY;
      const distance = currentY - startY.current;
      if (distance > 0) {
        setIsPulling(true);
        setPullDistance(Math.min(distance, 150));
        e.preventDefault();
      }
    }
  }, []);

  const handleTouchEnd = useCallback(async () => {
    if (isPulling && pullDistance > 100) {
      setIsRefreshing(true);
      await fetchData(0, size, true);
      setTimeout(() => {
        setIsRefreshing(false);
      }, 600);
    }
    setIsPulling(false);
    setPullDistance(0);
    startY.current = null;
  }, [isPulling, pullDistance, fetchData, size]);

  useEffect(() => {
    const container = containerRef.current;
    if (container) {
      container.addEventListener('touchstart', handleTouchStart as any);
      container.addEventListener('touchmove', handleTouchMove as any, {
        passive: false,
      });
      container.addEventListener('touchend', handleTouchEnd as any);
    }

    return () => {
      if (container) {
        container.removeEventListener('touchstart', handleTouchStart as any);
        container.removeEventListener('touchmove', handleTouchMove as any);
        container.removeEventListener('touchend', handleTouchEnd as any);
      }
    };
  }, [handleTouchStart, handleTouchMove, handleTouchEnd]);

  const moreFetch = useCallback(() => {
    setIsLoading(true);
  }, []);

  const reset = useCallback(async () => {
    const result = await fetchData(0, size, true);
    setIsLoading(false);
    return result;
  }, [fetchData, size]);

  useEffectAfterMount(() => {
    if (data.length === 0) return;
    sessionStorage.setItem(`${key}-item`, JSON.stringify(data));
    sessionStorage.setItem(`${key}-page`, String(page));
  }, [data, key, page]);

  const ReloadSpinner = useCallback(() => {
    if (isRefreshing)
      return (
        <div style={{ textAlign: 'center', paddingBottom: '10px' }}>
          <ClipLoader />
        </div>
      );
  }, [isRefreshing]);

  return {
    data,
    isLoading,
    isRefreshing,
    hasNextPage,
    containerRef,
    reset,
    moreFetch,
    total,
    isPulling,
    pullDistance,
    ReloadSpinner,
    containerProps: {
      style: {
        transition: 'transform 0.2s',
        transform: `translateY(${Math.min(pullDistance / 2, 50)}px)`,
      },
    },
  };
}
