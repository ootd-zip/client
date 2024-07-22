import Alert from '@/components/Alert';
import { Body3 } from '@/components/UI';

interface AddClothAlertProps {
  onClickYesButton: () => void;
  onClickNoButton: () => void;
}
/*
이름: 옷 등록 추가정보 Alert
역할: 옷 등록 페이지에서 추가 정보 입력의 유무를 선택하는 Alert 컴포넌트
*/
export default function AddClothAlert({
  onClickNoButton,
  onClickYesButton,
}: AddClothAlertProps) {
  return (
    <Alert
      onClickYesButton={onClickYesButton}
      onClickNoButton={onClickNoButton}
      headline="추가정보를 입력하시겠습니까?"
      body={
        <>
          <Body3>입력한 추가정보는 맞춤형 콘텐츠 추천에</Body3>
          <Body3>활용됩니다. 취소를 누를 경우 추가정보 입</Body3>
          <Body3>력 없이 게시됩니다.</Body3>
        </>
      }
      yes={'확인'}
      yesColor="error"
      no={'취소'}
    />
  );
}
