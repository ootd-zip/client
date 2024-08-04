import { useEffect } from 'react';
import Portal from '../Portal';
import S from './style';

interface BackgroundProps {
  isOpen: Boolean;
  onClick: () => void;
}

/*
이름: 배경 컴포넌트
역할: Modal이나 Alert가 렌더링 되면 뒷 배경을 흐리게 하는 역할
특이사항: 뷰포트를 상위 컴포넌트로 갖기 위한 Portal 사용 
*/

export default function Background({ isOpen, onClick }: BackgroundProps) {
  //배경 렌더링 시 뒷 배경의 스크롤을 막기 위한 설정
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      return;
    }
    document.body.style.overflow = 'auto';
  }, [isOpen]);

  return (
    <Portal>
      <S.Layout
        isOpen={isOpen}
        onClick={onClick}
        onTouchMove={(e) => e.stopPropagation()}
      />
    </Portal>
  );
}
