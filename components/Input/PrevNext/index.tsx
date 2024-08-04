import S from './style';
import { Button3 } from '@/components/UI';

interface PrevNextProps {
  left: string;
  right: string;
  leftButtonOnClick: () => void;
  rightButtonOnClick: () => void;
}
/*
이름: 두가지 선택 버튼
역할: 두가지 선택 중 한가지만 선택이 가능한 버튼
*/
export default function TrueFalse({
  left,
  right,
  leftButtonOnClick,
  rightButtonOnClick,
}: PrevNextProps) {
  return (
    <S.Layout>
      <S.LeftButton onClick={leftButtonOnClick}>
        <Button3>{left}</Button3>
      </S.LeftButton>
      <S.RightButton onClick={rightButtonOnClick}>
        <Button3>{right}</Button3>
      </S.RightButton>
    </S.Layout>
  );
}

export type { PrevNextProps };
