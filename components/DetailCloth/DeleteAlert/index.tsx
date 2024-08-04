import Alert from '@/components/Alert';
import { Body3, Title1 } from '@/components/UI';

interface DeleteAlertProps {
  onClickYesButton: () => void;
  onClickNoButton: () => void;
}

/*
이름: 옷 삭제 Alert 모달
역할: 의류 상세 페이지 ActionSheet에서의 옷 삭제 Alert 모달
*/

export default function DeleteAlert({
  onClickNoButton,
  onClickYesButton,
}: DeleteAlertProps) {
  return (
    <Alert
      onClickYesButton={onClickYesButton}
      onClickNoButton={onClickNoButton}
      headline="옷장에서 옷을 삭제하시겠습니까"
      body={
        <Body3>
          확인을 누르시면 옷장에서 옷이 삭제되며 다시 복구할 수 없습니다.
        </Body3>
      }
      yes={'삭제'}
      yesColor="error"
      no={'취소'}
    />
  );
}
