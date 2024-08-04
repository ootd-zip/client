import { Dispatch, SetStateAction } from 'react';
import S from './style';
import { Button3 } from '@/components/UI';

interface TrueFalseProps {
  left: string;
  right: string;
  state: Boolean;
  setState: Dispatch<SetStateAction<Boolean>>;
}

/*
이름: 왼쪽 혹은 오른쪽
역할: 둘중 하나만 선택이 가능한 버튼 컴포넌트
*/
export default function TrueFalse({
  left,
  right,
  state,
  setState,
}: TrueFalseProps) {
  const onClickTrueButton = () => {
    setState(true);
  };

  const onClickFalseButton = () => {
    setState(false);
  };

  return (
    <S.Layout>
      <S.LeftButton state={state} onClick={() => onClickTrueButton()}>
        <Button3>{left}</Button3>
      </S.LeftButton>
      <S.RightButton state={state} onClick={() => onClickFalseButton()}>
        <Button3>{right}</Button3>
      </S.RightButton>
    </S.Layout>
  );
}

export type { TrueFalseProps };
