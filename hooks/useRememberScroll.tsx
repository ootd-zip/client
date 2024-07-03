import { Dispatch, MutableRefObject, SetStateAction, useEffect } from 'react';
import useEffectAfterMount from './useEffectAfterMount';

interface useRememberScrollProps {
  key: string;
  containerRef?: MutableRefObject<any>;
  setList?: Dispatch<SetStateAction<any>>;
  list?: any;
}

export default function useRememberScroll({
  key,
  containerRef,
  setList,
  list,
}: useRememberScrollProps) {
  useEffect(() => {
    if (!containerRef) return;
    const container = containerRef.current;

    const handleScroll = () => {
      const { scrollTop, scrollHeight } = container;

      sessionStorage.setItem(`${key}-scroll`, `${scrollTop}`);
      sessionStorage.setItem(`${key}-component-height`, `${scrollHeight}`);
    };
    // 스크롤 이벤트 리스너 등록
    container.addEventListener('scroll', handleScroll);

    // 컴포넌트 언마운트 시에 이벤트 리스너 제거
    return () => {
      container.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    if (sessionStorage.getItem(`${key}-item`) && setList)
      setList(JSON.parse(sessionStorage.getItem(`${key}-item`)!));
  }, []);

  useEffectAfterMount(() => {
    if (!containerRef) return;
    const container = containerRef.current;

    const memoScroll = sessionStorage.getItem(`${key}-scroll`);
    const memeoScrollHeight = sessionStorage.getItem(`${key}-component-height`);

    if (memeoScrollHeight && container.scrollHeight < memeoScrollHeight) return;

    container.scrollTo({
      top: memoScroll,
    });
  }, [list]);

  const reset = async () => {
    sessionStorage.removeItem(`${key}-scroll`);
    sessionStorage.removeItem(`${key}-component-height`);
    sessionStorage.removeItem(`${key}-item`);
    sessionStorage.removeItem(`${key}-page`);
  };

  return { reset };
}
