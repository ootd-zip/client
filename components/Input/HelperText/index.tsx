import { AiOutlineExclamationCircle } from 'react-icons/ai';
import S from './style';
import Caption from '@/components/UI/TypoGraphy/Caption1';

interface HelperTextType {
  children: React.ReactNode;
  state: number;
  className?: string;
}
/*
이름: 헬퍼 텍스트
역할: 인풋 단계에서 유저에게 선택의 도움을 주는 텍스트
*/
export default function HelperText({
  children,
  state,
  className,
}: HelperTextType) {
  return (
    <S.Layout className={className} state={state}>
      <S.Icon>
        <AiOutlineExclamationCircle />
      </S.Icon>
      <Caption>{children}</Caption>
    </S.Layout>
  );
}
