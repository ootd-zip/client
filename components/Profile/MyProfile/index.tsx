import ProfileLayout from '../ProfileLayout';
import S from './style';
import Title1 from '@/components/UI/TypoGraphy/Title1';
import Body from '@/components/UI/TypoGraphy/Body4';
import { ProfileType } from '@/utils/types/user.types';

export default function MyProfile({
  isUser,
  userImage,
  userName,
  follow,
  myCloth,
}: ProfileType) {
  //유저인 경우
  const User = () => {
    return (
      <S.Layout>
        <S.Name>
          <Title1>{userName}</Title1>
        </S.Name>
        <S.Info>
          <Body>
            팔로우 {follow}명 • 내 옷장 {myCloth}벌 {'>'}
          </Body>
        </S.Info>
      </S.Layout>
    );
  };

  return (
    <ProfileLayout isUser={isUser} imgSrc={userImage!} isMine={true}>
      {isUser && <User />}
    </ProfileLayout>
  );
}
