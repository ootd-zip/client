import Alert from '@/components/Alert';
import { Body3 } from '@/components/UI';

interface FollowAlertProps {
  onClickYesButton: () => void;
  onClickNoButton: () => void;
  userName: string;
}

/*
이름: 사용자 차단 Alert 컴포넌트
역할: 사용자 차단 한 번 더 확인하는 컴포넌트
*/

export default function FollowAlert({
  onClickNoButton,
  onClickYesButton,
  userName,
}: FollowAlertProps) {
  return (
    <Alert
      onClickYesButton={onClickYesButton}
      onClickNoButton={onClickNoButton}
      headline={`${userName}님을 차단하시겠습니까?`}
      body={
        <>
          <Body3>{`차단을 누를 경우 ${userName}님의 프로필 및`}</Body3>
          <Body3>게시물(댓글)이 표시되지 않습니다.</Body3>
          <Body3>{`${userName}님은 차단된 사실을 알 수 없습니다.`}</Body3>
        </>
      }
      yes={'차단'}
      yesColor="error"
      no={'닫기'}
    />
  );
}
