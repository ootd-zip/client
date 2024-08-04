import Alert from '@/components/Alert';
import { Body3, Title1 } from '@/components/UI';

interface BookmarkAlertProps {
  onClickYesButton: () => void;
  onClickNoButton: () => void;
}

/*
이름: 북마크 삭제 Alert 컴포넌트
역할: 북마크에서 삭제 여부 확인하는 컴포넌트
*/

export default function BookmarkAlert({
  onClickNoButton,
  onClickYesButton,
}: BookmarkAlertProps) {
  return (
    <Alert
      onClickYesButton={onClickYesButton}
      onClickNoButton={onClickNoButton}
      headline="북마크에서 삭제하시겠습니까?"
      body={
        <>
          <Body3>삭제를 누르면 해당 콘텐츠의 북마크가 해제됩니다.</Body3>
        </>
      }
      yes={'삭제'}
      yesColor="error"
      no={'취소'}
    />
  );
}
