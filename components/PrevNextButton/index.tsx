import { Button3 } from '../UI';
import S from './style';

interface PrevNextButtonProps {
  onClickPrevButton: () => void;
  onClickNextButton: () => void;
  prev: string;
  next: string;
  className?: string;
}

/*
이름: 이전 다음 버튼
역할: 이전과 다음 두가지로 이루어진 버튼
*/
export default function PrevNextButton({
  onClickPrevButton,
  onClickNextButton,
  prev,
  next,
  className,
}: PrevNextButtonProps) {
  return (
    <S.Layout className={className}>
      <button onClick={onClickPrevButton} className="leftButton">
        <Button3>{prev}</Button3>
      </button>
      <button onClick={onClickNextButton} className="rightButton">
        <Button3>{next}</Button3>
      </button>
    </S.Layout>
  );
}
