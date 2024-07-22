import ProfileLayout from '../ProfileLayout';
import S from './style';
import { ProfileType } from '../type';
import { Body2, Body4 } from '@/components/UI';
import { useRouter } from 'next/router';

/*
이름: 다른 유저의 프로필
역할: 다른 유저의 프로필 컴포넌트
*/
export default function OtherProfile({
  isUser,
  userImage,
  userName,
  follow,
  myCloth,
  className,
  showingId,
}: ProfileType) {
  const router = useRouter();

  return (
    <ProfileLayout
      isUser={isUser}
      imgSrc={userImage}
      isMine={false}
      className={className}
    >
      <S.Layout>
        <S.Name>
          <Body2>{userName}</Body2>
        </S.Name>
        <S.Info onClick={() => router.push(`/follow-list/${showingId}`)}>
          <Body4>팔로워</Body4>
          <Body4 state="emphasis">{follow}</Body4>
          <Body4>명</Body4>
          <Body4 className="dot">•</Body4>
          <Body4>팔로잉</Body4>
          <Body4 state="emphasis">{myCloth}</Body4>
          <Body4>명</Body4>
        </S.Info>
      </S.Layout>
    </ProfileLayout>
  );
}
