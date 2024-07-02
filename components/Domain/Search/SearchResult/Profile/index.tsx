import { Body3, Body4, Caption2 } from '@/components/UI';
import S from './style';
import {
  Dispatch,
  MutableRefObject,
  SetStateAction,
  useEffect,
  useState,
} from 'react';
import FollowBlock from '@/components/FollowBlock';
import { useRouter } from 'next/router';
import Spinner from '@/components/Spinner';
import Button from '@/components/Button';
import Avatar from '@/public/images/Avatar.svg';
import NextImage from '@/components/NextImage';
import PublicApi from '@/apis/domain/Public/PublicApi';
import { ProfileListType } from '@/utils/types/user.types';

interface ProfileProps {
  profileList: ProfileListType[];
  setProfileList: Dispatch<SetStateAction<ProfileListType[]>>;
  profileIsLoading: Boolean;
  profileRef: MutableRefObject<any>;
  profileHasNextPage: Boolean;
}

export default function Profile({
  profileList,
  setProfileList,
  profileIsLoading,
  profileRef,
  profileHasNextPage,
}: ProfileProps) {
  const router = useRouter();

  const { follow, unFollow } = PublicApi();

  const onClickFollow = async (
    isFollow: Boolean,
    index: number,
    userId: number
  ) => {
    let newProfileList = [...profileList];
    newProfileList[index].isFollow = !newProfileList[index].isFollow;
    setProfileList(newProfileList);

    if (isFollow) {
      await unFollow(userId);
      return;
    }
    await follow(userId);
  };

  return (
    <>
      <S.Layout ref={profileRef}>
        {profileList &&
          profileList.map((item, index) => {
            return (
              <S.ProfileLayout key={index}>
                <S.Profile
                  onClick={() => router.push(`/mypage/${item.id}/search`)}
                >
                  {item.profileImage === '' ? (
                    <Avatar className="userImage" />
                  ) : (
                    <NextImage
                      className="userImage"
                      src={item.profileImage}
                      alt="유저 이미지"
                      fill={false}
                      width={64}
                      height={64}
                    />
                  )}
                  <S.NameText>
                    <Body3 state="emphasis">{item.name}</Body3>
                  </S.NameText>
                </S.Profile>

                {item.isFollow ? (
                  <Button
                    border={false}
                    size="small"
                    backgroundColor="grey_95"
                    color="grey_00"
                    className="followButton"
                    onClick={() => onClickFollow(item.isFollow, index, item.id)}
                  >
                    <Body3>팔로잉</Body3>
                  </Button>
                ) : (
                  <Button
                    border={false}
                    size="small"
                    backgroundColor="subdued"
                    color="grey_00"
                    className="followButton"
                    onClick={() => onClickFollow(item.isFollow, index, item.id)}
                  >
                    <Body3>팔로우</Body3>
                  </Button>
                )}
              </S.ProfileLayout>
            );
          })}
        {profileIsLoading && profileHasNextPage && <Spinner />}
      </S.Layout>
    </>
  );
}
