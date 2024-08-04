import React, { ReactElement, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

/*
이름: 포탈
역할: 어떠한 상황에서든 뷰포트를 부모로 잡기위한 도구
특이사항: 보통 position:fixed는 부모로 뷰포트를 잡지만 상위 요소가 transform일 경우는 잡지못한다.
이러한 상황에서도 뷰포트를 부모로 잡기 위한 도구가 바로 Portal이다.
*/
const Portal = ({ children }: { children: ReactElement }) => {
  const [mounted, setMounted] = useState<Boolean>(false);

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  //CSR 에서만 작동
  if (typeof window === 'undefined') return <></>;

  return mounted ? (
    createPortal(children, document.getElementById('modal-root') as HTMLElement)
  ) : (
    <></>
  );
};

export default Portal;
