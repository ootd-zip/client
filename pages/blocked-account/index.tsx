import AppBar from '@/components/Appbar';
import S from '@/pageStyle/blocked-account/style';
import { AiOutlineArrowLeft } from 'react-icons/ai';
import { useRouter } from 'next/router';
import { Body3, Button3 } from '@/components/UI';
import Header from '@/components/Header';
import { useEffect, useState } from 'react';
import Toast from '@/components/Toast';
import Background from '@/components/Background';
import { BlockApi } from '@/apis/domain/Block/BlockApi';
import useInfiniteScroll from '@/hooks/useInfiniteScroll';
import Spinner from '@/components/Spinner';
import NextImage from '@/components/NextImage';
import Avatar from '@/public/images/Avatar.svg';
import BlockUserAlert from '@/components/Domain/BlockUser/BlockUserAlert';
import PublicApi from '@/apis/domain/Public/PublicApi';

export interface UserBlockListDataType {
  id: number;
  userId: number;
  userName: string;
  profileImage: string;
}

export default function BlockedAccount() {
  const router = useRouter();
  const [alertOpen, setAlertOpen] = useState<Boolean>(false);
  const [userBlockedList, setUserBlockedList] = useState<
    UserBlockListDataType[]
  >([]);

  const { getUserBlock } = BlockApi();

  const fetchDataFunction = async (page: number, size: number) => {
    const data = await getUserBlock({
      page,
      size,
    });
    return data;
  };

  const { data, isLoading, hasNextPage, containerRef, reset } =
    useInfiniteScroll({
      fetchDataFunction,
      initialData: [],
      size: 7,
    });

  useEffect(() => {
    setUserBlockedList(data);
  }, [data]);

  const [toastOpen, setToastOpen] = useState<Boolean>(false);
  const [followID, setFollowID] = useState<number>(0);
  const [followUserName, setFollowUserName] = useState<string>('');

  useEffect(() => {
    reset();
  }, [alertOpen]);

  const { follow } = PublicApi();

  const onClickYesButton = async () => {
    setAlertOpen(false);
    setToastOpen(true);
    await follow(followID);
  };

  const onClickNoButton = () => {
    setAlertOpen(false);
  };

  const { deleteUserBlock } = BlockApi();
  const onClickDelete = async (
    deleteID: number,
    userName: string,
    userID: number
  ) => {
    await deleteUserBlock(deleteID);
    setFollowID(userID);
    setFollowUserName(userName);
    setAlertOpen(true);
  };

  return (
    <>
      <Background isOpen={alertOpen} onClick={() => setAlertOpen(false)} />
      <AppBar
        leftProps={
          <AiOutlineArrowLeft
            onClick={() => router.back()}
            className="arrowleft"
          />
        }
        middleProps={<></>}
        rightProps={<></>}
      />
      <Header text="차단한 계정" />
      <S.WholeLayout ref={containerRef}>
        {userBlockedList &&
          userBlockedList.map((item, index) => {
            return (
              <S.Layout key={item.id}>
                {item.profileImage === '' ? (
                  <Avatar className="avatar" />
                ) : (
                  <NextImage
                    width={52}
                    height={52}
                    fill={false}
                    src={item.profileImage}
                    alt=""
                  />
                )}
                <Body3 state="emphasis" className="userName">
                  {item.userName}
                </Body3>
                <Button3
                  className="deleteButton"
                  onClick={() =>
                    onClickDelete(item.id, item.userName, item.userId)
                  }
                >
                  해제
                </Button3>
                {isLoading && hasNextPage && <Spinner />}
              </S.Layout>
            );
          })}

        {alertOpen && (
          <BlockUserAlert
            onClickYesButton={onClickYesButton}
            onClickNoButton={onClickNoButton}
          />
        )}
        {toastOpen && followUserName && (
          <Toast
            text={`${followUserName}님을 팔로우합니다.`}
            setState={setToastOpen}
            state={toastOpen}
          />
        )}
      </S.WholeLayout>
    </>
  );
}
