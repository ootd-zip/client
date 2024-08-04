import Alert from '@/components/Alert';
import { Body3 } from '@/components/UI';

interface BlockUserAlertProps {
  onClickYesButton: () => void;
  onClickNoButton: () => void;
}

/*
이름: 차단 해제 Alert 컴포넌트
역할: 차단 해제 후 팔로우 여부 확인하는 컴포넌트
*/

export default function BlockUserAlert({
  onClickNoButton,
  onClickYesButton,
}: BlockUserAlertProps) {
  return (
    <Alert
      onClickYesButton={onClickYesButton}
      onClickNoButton={onClickNoButton}
      headline="차단이 해제되었습니다."
      body={
        <>
          <Body3>팔로우하시겠습니까?</Body3>
          <Body3>닫기를 누르면 이전 화면으로 돌아갑니다.</Body3>
        </>
      }
      yes={'팔로우'}
      no={'닫기'}
    />
  );
}
