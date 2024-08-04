import S from './style';
import { Button1, Title1 } from '../UI';
import { ReactNode } from 'react';

interface AlertProps {
  onClickYesButton: () => void;
  onClickNoButton: () => void;
  headline: string;
  body: ReactNode;
  yes?: string;
  yesColor?: string;
  no?: string;
  noColor?: string;
}

/*
이름: Alert 컴포넌트
역할: 유저의 선택을 한번 더 확인하는 컴포넌트
특이사항: 유저 경험을 위해 항상 오른쪽 버튼이 긍정
*/

export default function Alert({
  onClickYesButton,
  onClickNoButton,
  headline,
  body,
  yes,
  yesColor,
  no,
  noColor,
}: AlertProps) {
  return (
    <S.Layout>
      <S.AlertPrompt>
        {/*Alert창의 제목*/}
        <S.AlertHeadline>
          <Title1>{headline}</Title1>
        </S.AlertHeadline>
        {/*Alert창의 본문*/}
        <S.AlertBody>{body}</S.AlertBody>
        {/*Alert창의 버튼*/}
        {yes && no && (
          <S.AlertButton yesColor={yesColor} noColor={noColor}>
            <button onClick={onClickNoButton} className="no">
              <Button1 state="thin">{no}</Button1>
            </button>
            <button onClick={onClickYesButton} className="yes">
              <Button1>{yes}</Button1>
            </button>
          </S.AlertButton>
        )}
      </S.AlertPrompt>
    </S.Layout>
  );
}
