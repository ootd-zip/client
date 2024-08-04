import { AiOutlineLink } from 'react-icons/ai';
import S from './style';

interface ReadOnlyProps {
  state: Boolean;
  result: React.ReactNode;
  type?: 'Link' | 'Write';
  onClick?: any;
}
/*
이름: 읽기 전용 인풋
역할: 입력이 불가능하고 값을 나타내기만 하는 인풋 컴포넌트
*/
export default function ReadOnly({
  state,
  result,
  type,
  onClick,
}: ReadOnlyProps) {
  return (
    <S.Layout state={state} type={type} onClick={onClick}>
      {type === 'Link' && (
        <S.LinkIcon state={state}>
          <AiOutlineLink />
        </S.LinkIcon>
      )}
      {state === true && <S.Result>{result}</S.Result>}
    </S.Layout>
  );
}
