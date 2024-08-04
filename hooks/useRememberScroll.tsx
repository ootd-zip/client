import { Dispatch, MutableRefObject, SetStateAction, useEffect } from 'react';
import useEffectAfterMount from './useEffectAfterMount';

interface useRememberScrollProps {
  key: string;
  containerRef?: MutableRefObject<any>;
  setList?: Dispatch<SetStateAction<any>>;
  list?: any;
}
/*
이름: 스크롤 기억 훅
역할: 뒤로가기 시 스크롤 위치를 기억하기 위한 훅
*/
export default function useRememberScroll({
  key,
  containerRef,
  setList,
  list,
}: useRememberScrollProps) {
  useEffect(() => {
    if (!containerRef) return;
    const container = containerRef.current;

    if (!container) return;

    //세션 스토리지에 스크롤 저장 함수 (데이터 불러오기 전 스크롤 위치 이동을 막기 위한 컴포넌트 높이 저장)
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

  //세션 스토리지에 아이템이 있을 경우 리스트에 업데이트
  useEffect(() => {
    if (sessionStorage.getItem(`${key}-item`) && setList)
      setList(JSON.parse(sessionStorage.getItem(`${key}-item`)!));
  }, []);

  //세션 스토리지에 스크롤 위치가 있을 경우 스크롤 위치 이동
  useEffectAfterMount(() => {
    if (!containerRef) return;
    const container = containerRef.current;
    if (!container) return;

    const memoScroll = sessionStorage.getItem(`${key}-scroll`);
    const memeoScrollHeight = sessionStorage.getItem(`${key}-component-height`);

    if (memeoScrollHeight && container.scrollHeight < memeoScrollHeight) return;

    container.scrollTo({
      top: memoScroll,
    });
  }, [list]);

  //세션 스토리지 초기화 함수
  const reset = async () => {
    sessionStorage.removeItem(`${key}-scroll`);
    sessionStorage.removeItem(`${key}-component-height`);
    sessionStorage.removeItem(`${key}-item`);
    sessionStorage.removeItem(`${key}-page`);
  };

  return { reset };
}
