import { Body3, Button3 } from '@/components/UI';
import S from './style';
import { useRouter } from 'next/router';
import { followListType } from '@/pages/follow-list/[...UserId]';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import PublicApi from '@/apis/domain/Public/PublicApi';
import SearchBar from '@/components/SearchBar';
import useInfiniteScroll from '@/hooks/useInfiniteScroll';
import { UserApi } from '@/apis/domain/User/UserApi';
import NextImage from '@/components/NextImage';
import Avatar from '@/public/images/Avatar.svg';
import Spinner from '@/components/Spinner';

interface followingProps {
  followingList: followListType[];
  setFollowingList: Dispatch<SetStateAction<followListType[]>>;
  setFollowingTotalCount: Dispatch<SetStateAction<number>>;
}

/*
이름: 팔로잉 리스트
역할: 마이페이지 팔로잉 리스트
*/

export default function Following({
  followingList,
  setFollowingList,
  setFollowingTotalCount,
}: followingProps) {
  const router = useRouter();

  // 검색어
  const [keyword, setKeyword] = useState<string>('');

  const { follow, unFollow } = PublicApi();

  // 팔로우 팔로잉 버튼 누른 경우 발생되는 토글 함수
  const onClickFollow = async (status: Boolean, id: number, index: number) => {
    let newFollowingList = [...followingList];

    newFollowingList[index].isFollow = !newFollowingList[index].isFollow;

    setFollowingList(newFollowingList);

    if (!status) {
      await follow(id);
      return;
    }
    await unFollow(id);
  };

  const { getSearchUserFollowing } = UserApi();

  // 유저의 팔로잉 리스트 API
  const fetchDataFunction = async (page: number, size: number) => {
    const data = await getSearchUserFollowing({
      page,
      size,
      name: keyword,
      userId: Number(router.query.UserId![0]),
    });
    return data;
  };

  const { data, reset, containerRef, total, isLoading, hasNextPage } =
    useInfiniteScroll({
      fetchDataFunction,
      initialData: [],
      size: 20,
    });

  useEffect(() => {
    const newData = data.map((item: any) => {
      return {
        userId: item.id,
        userImage: item.profileImage,
        isFollow: item.isFollow,
        userName: item.name,
      };
    });
    setFollowingList(newData);
  }, [data]);

  useEffect(() => {
    reset();
  }, [keyword]);

  useEffect(() => {
    setFollowingTotalCount(total);
  }, [total]);

  return (
    <>
      {isLoading && hasNextPage && <Spinner />}
      <S.Wrap>
        <SearchBar placeholder="검색" letter={keyword} setLetter={setKeyword} />
      </S.Wrap>
      <S.Layout ref={containerRef}>
        {followingList &&
          followingList.map((item, index) => {
            return (
              <S.FollowBlockLayout key={index}>
                {/* 유저 프로필 이미지 */}
                {item.userImage === '' ? (
                  <Avatar
                    onClick={() => router.push(`/mypage/${item.userId}`)}
                    className="avatar"
                  />
                ) : (
                  <NextImage
                    width={52}
                    height={52}
                    fill={false}
                    src={item.userImage}
                    onClick={() => router.push(`/mypage/${item.userId}`)}
                    alt=""
                  />
                )}
                {/* 유저의 닉네임 */}
                <Body3
                  state="emphasis"
                  className="name"
                  onClick={() => router.push(`/mypage/${item.userId}`)}
                >
                  {item.userName}
                </Body3>
                {/* 팔로우하는 경우 팔로잉 버튼 활성화 */}
                {item.isFollow ? (
                  <Button3
                    className="unfollow"
                    onClick={() =>
                      onClickFollow(item.isFollow, item.userId, index)
                    }
                  >
                    팔로잉
                  </Button3>
                ) : (
                  // 팔로우 하지 않는 경우 팔로우 버튼 활성화
                  <Button3
                    className="following"
                    onClick={() =>
                      onClickFollow(item.isFollow, item.userId, index)
                    }
                  >
                    팔로우
                  </Button3>
                )}
              </S.FollowBlockLayout>
            );
          })}
      </S.Layout>
    </>
  );
}
