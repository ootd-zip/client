import { Body3, Headline2 } from '@/components/UI';
import S from './style';
/*
이름: 알림 없음
역할: 유저에게 알림이 없다고 알려주는 컴포넌트
*/
export default function NoAlarm() {
  return (
    <S.Layout>
      <Headline2 className="title">알림이 없습니다.</Headline2>
      <Body3 className="body">다른 사용자가 회원님에게</Body3>
      <Body3>흔적을 남길 경우 여기에 표시됩니다.</Body3>
    </S.Layout>
  );
}
