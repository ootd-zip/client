import { OtherProfile } from '@/components/Profile';
import S from './style';
import Button from '@/components/Button';
import { Body3, Body4, Button3 } from '@/components/UI';
import { useRouter } from 'next/router';

export interface UserProfileDataType {
  userId: number;
  userName: string;
  profileImage: string;
  followerCount: number;
  followingCount: number;
  height: number;
  weight: number;
  description: string;
  isMyProfile: Boolean;
  isFollow: Boolean;
  ootdCount: number;
  clothesCount: number;
}

interface profileProps {
  data: UserProfileDataType;
  onClickFollowButton: () => void;
}
/*
이름: 유저의 프로필
역할: 마이페이지에서 사용되는 유저의 프로필 컴포넌트
*/
export default function Profile({ data, onClickFollowButton }: profileProps) {
  const router = useRouter();

  return (
    <S.Layout>
      <OtherProfile
        showingId={data.userId}
        className="profile"
        userImage={data.profileImage}
        userName={data.userName}
        isUser={true}
        follow={data.followerCount}
        myCloth={data.followingCount}
      />
      {/*체형*/}
      {String(data.height) !== '0' && (
        <S.BodyInformation>
          <Body4>{data.height}cm</Body4>
          <Body4 className="dot">•</Body4>
          <Body4>{data.weight}kg</Body4>
        </S.BodyInformation>
      )}
      {/*유저의 자기 소개*/}
      <S.Introduce>
        <Body3>{data.description}</Body3>
      </S.Introduce>
      {/*자기 옷장인지 아닌지 유무에 따른 팔로우/내 정보 수정 버튼*/}
      {data.isMyProfile ? (
        <Button
          className="editButton"
          backgroundColor="grey_95"
          color="grey_00"
          size="big"
          onClick={() => router.push(`/edit-mypage`)}
          border={false}
        >
          <Button3>프로필 수정</Button3>
        </Button>
      ) : (
        <S.ButtonWrap>
          {!data.isFollow ? (
            <Button
              className="followButton"
              backgroundColor="grey_00"
              color="grey_100"
              size="big"
              onClick={onClickFollowButton}
              border={false}
            >
              <Button3>팔로우</Button3>
            </Button>
          ) : (
            <Button
              className="followingButton"
              backgroundColor="grey_100"
              color="grey_70"
              size="big"
              onClick={onClickFollowButton}
              border={false}
            >
              <Button3>팔로잉</Button3>
            </Button>
          )}
        </S.ButtonWrap>
      )}
    </S.Layout>
  );
}
