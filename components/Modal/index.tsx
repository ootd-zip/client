import Portal from '@/components/Portal/index';
import S from './style';

interface ModalProps {
  isOpen: Boolean;
  children: React.ReactNode;
  height: string;
  className?: string;
}

/*
이름: 모달
역할: 페이지 이동을 하지 않고 유저에게 새로운 제안을 해주는 모달 컴포넌트
특이사항: 뷰포트를 상위 요소로 잡기 위해 Portal 사용
*/
const Modal = ({ isOpen, children, height, className }: ModalProps) => {
  return (
    <Portal>
      <S.Layout
        onTouchMove={(e) => e.stopPropagation()}
        height={height}
        isOpen={isOpen}
        className={className}
      >
        {children}
      </S.Layout>
    </Portal>
  );
};

export default Modal;
