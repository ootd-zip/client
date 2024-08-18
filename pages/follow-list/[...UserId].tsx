import AppBar from '@/components/Appbar';
import S from '@/style/followList/style';
import { AiOutlineArrowLeft, AiOutlineEllipsis } from 'react-icons/ai';
import { useRouter } from 'next/router';
import Follower from '@/components/Domain/FollowList/Follower';
import Following from '@/components/Domain/FollowList/Following';
import { useState } from 'react';
import ActionSheet from '@/components/ActionSheet';
import { userId } from '@/utils/recoil/atom';
import { useRecoilValue } from 'recoil';
import TabView from '@/components/TabView';
import FollowAlert from '@/components/Domain/FollowList/FollowAlert';
import Toast from '@/components/Toast';
import Background from '@/components/Background';

export type followListType = {
  userId: number;
  userName: string;
  userImage: string;
  isFollow: Boolean;
};

/*
이름: 팔로우 팔로잉 리스트
역할: 유저의 팔로우 팔로잉 리스트
*/

export default function FollowList() {
  const router = useRouter();

  const localUserId = useRecoilValue(userId);

  const [followerList, setFollowerList] = useState<followListType[]>([]);
  const [followingList, setFollowingList] = useState<followListType[]>([]);
  const [followerTotalCount, setFollowerTotalCount] = useState<number>(0);
  const [followingTotalCount, setFollowingTotalCount] = useState<number>(0);
  const [openActionSheet, setOpenActionSheet] = useState<Boolean>(false);
  const [toastOpen, setToastOpen] = useState<Boolean>(false);

  // 차단한 계정 이동 함수
  const goBlockedList = () => {
    router.push('/blocked-account');
  };

  const buttons = [{ name: '차단한 계정 관리', buttonClick: goBlockedList }];
  const [alertOpen, setAlertOpen] = useState<Boolean>(false);
  const [selectedUserName, setSelectedUserName] = useState<string>('');

  const onClickBackground = () => {
    if (alertOpen) {
      setAlertOpen(false);
    }
    if (openActionSheet) {
      setOpenActionSheet(false);
    }
  };

  // 팔로우 예스 함수
  const onClickYesButton = () => {
    setAlertOpen(false);
    setToastOpen(true);
  };

  // 팔로우 취소 함수
  const onClickNoButton = () => {
    setAlertOpen(false);
  };

  return (
    <>
      <Background
        isOpen={openActionSheet || alertOpen}
        onClick={onClickBackground}
      />
      <S.Layout>
        {router.isReady && (
          <AppBar
            leftProps={
              <AiOutlineArrowLeft
                onClick={() => router.back()}
                className="arrowleft"
              />
            }
            middleProps={<></>}
            rightProps={
              localUserId === Number(router.query.UserId![0]) ? (
                <AiOutlineEllipsis onClick={() => setOpenActionSheet(true)} />
              ) : (
                <></>
              )
            }
          />
        )}
        {/* 팔로워 팔로잉 리스트 탭뷰 */}
        <TabView>
          <TabView.TabBar
            tab={['팔로워', '팔로잉']}
            count={[followerTotalCount, followingTotalCount]}
            display="block"
          />
          <TabView.Tabs>
            <TabView.Tab>
              <Follower
                setSelectedUserName={setSelectedUserName}
                setAlertOpen={setAlertOpen}
                followerList={followerList}
                setFollowerList={setFollowerList}
                localUserId={localUserId}
                setFollowerTotalCount={setFollowerTotalCount}
              />
            </TabView.Tab>
            <TabView.Tab>
              <Following
                followingList={followingList}
                setFollowingList={setFollowingList}
                setFollowingTotalCount={setFollowingTotalCount}
              />
            </TabView.Tab>
          </TabView.Tabs>
        </TabView>
        {toastOpen && (
          <Toast
            text="삭제되었습니다."
            setState={setToastOpen}
            state={toastOpen}
          />
        )}
      </S.Layout>
      {openActionSheet && <ActionSheet buttons={buttons} />}
      {alertOpen && (
        <FollowAlert
          userName={selectedUserName}
          onClickYesButton={onClickYesButton}
          onClickNoButton={onClickNoButton}
        />
      )}
    </>
  );
}
