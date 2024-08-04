import Alert from '@/components/Alert';
import { Body3 } from '@/components/UI';

export interface BlockAlertProps {
  blockUserName: string;
  onClickYesButton: () => void;
  onClickNoButton: () => void;
}
/*
이름: 차단 Alert
역할: 유저에게 차단 행위를 한번 더 확인하는 Alert 컴포넌트
*/
export default function BlockAlert({
  blockUserName,
  onClickNoButton,
  onClickYesButton,
}: BlockAlertProps) {
  return (
    <Alert
      onClickYesButton={onClickYesButton}
      onClickNoButton={onClickNoButton}
      headline={`${blockUserName}님을 차단하시겠습니까?`}
      body={
        <>
          <Body3>해당 유저의 프로필 및 콘텐츠가 표시되지</Body3>
          <Body3>않습니다. 부적절한 사용자의 경우 신고 기</Body3>
          <Body3>능을이용해주시기 바랍니다.</Body3>
        </>
      }
      yes={'차단'}
      no={'닫기'}
      noColor="error"
    />
  );
}
