import Button from '@/components/Button';
import S from './style';
import { Button3 } from '../UI';

interface NextButtonProps {
  state: Boolean;
  onClick: () => void;
  children: string;
  className?: string;
}

/*
이름: 다음 버튼
역할: 보통 페이지 맨 아래에서 사용되는 다음 단계 버튼
*/
export default function NextButton({
  state,
  onClick,
  children,
  className,
}: NextButtonProps) {
  return (
    <S.Layout className={className}>
      {state === true && (
        <Button
          size="big"
          backgroundColor="grey_00"
          color="grey_100"
          border={false}
          onClick={onClick}
        >
          <Button3>{children}</Button3>
        </Button>
      )}
      {state === false && (
        <Button
          size="big"
          backgroundColor="grey_90"
          color="grey_100"
          border={false}
          onClick={() => {}}
        >
          <Button3>{children}</Button3>
        </Button>
      )}
    </S.Layout>
  );
}
