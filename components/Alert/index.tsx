import S from './style';
import { Button1, Button2, Button3 } from '../UI';

interface AlertProps {
  onClickYesButton: () => void;
  onClickNoButton: () => void;
  headline: React.ReactNode;
  body: React.ReactNode;
  yes?: string;
  no?: string;
}

export default function Alert({
  onClickYesButton,
  onClickNoButton,
  headline,
  body,
  yes,
  no,
}: AlertProps) {
  return (
    <S.Layout>
      <S.AlertPrompt>
        <S.AlertHeadline>{headline}</S.AlertHeadline>
        <S.AlertBody>{body}</S.AlertBody>
        {yes && no && (
          <S.AlertButton>
            <button onClick={onClickNoButton} className="no">
              <Button2>안할래</Button2>
            </button>
            <button onClick={onClickYesButton} className="yes">
              <Button3>할래</Button3>
            </button>
          </S.AlertButton>
        )}
      </S.AlertPrompt>
    </S.Layout>
  );
}
