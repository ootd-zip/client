import Plusbutton from '@/public/images/plusButton.svg';
import S from './style';
import { Body3 } from '../UI';

interface PlusButtonProps {
  onClickPlusButton: () => void;
}

/*
이름: 추가 버튼
역할: 공용으로 사용되는 추가하기 컴포넌트
*/
export default function PlusButton({ onClickPlusButton }: PlusButtonProps) {
  return (
    <S.Layout onClick={onClickPlusButton}>
      <Plusbutton />
      <Body3>추가하기</Body3>
    </S.Layout>
  );
}
