import S from './style';
import EditProfile from './EditProfile';
import EditMyInfo from './EditMyInfo';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import ActionSheet from '@/components/ActionSheet';
import {
  getReactNativeMessage,
  sendReactNativeMessage,
} from '@/utils/reactNativeMessage';

import { UserApi } from '@/apis/domain/User/UserApi';
import { Button3 } from '@/components/UI';
import { useRouter } from 'next/router';
import Button from '@/components/Button';
import { useRecoilValue } from 'recoil';
import { userId } from '@/utils/recoil/atom';

interface ActionSheetProps {
  openActionSheet: Boolean;
  setOpenActionSheet: Dispatch<SetStateAction<Boolean>>;
}

export default function Edit({
  openActionSheet,
  setOpenActionSheet,
}: ActionSheetProps) {
  const router = useRouter();

  const [profileImage, setProfileImage] =
    useState<string>('/images/Avatar.svg');

  const [originProfile, setOriginProfile] =
    useState<string>('/images/Avatar.svg');

  const [nickNameCheck, setNickNameCheck] = useState<Boolean>(true);
  const [nickName, setNickName] = useState<string>('닉네임');
  const [introduction, setIntroduction] = useState<string>('소개');
  const [height, setHeight] = useState<string>('160');
  const [weight, setWeight] = useState<string>('40');
  const [open, setOpen] = useState<Boolean>(true);

  const { getProfile, patchProfile } = UserApi();

  const takePicture = () => {
    sendReactNativeMessage({ type: 'TakeProfile' });
    setOpenActionSheet(false); // 액션 시트 자동 종료
  };

  const choosePicture = () => {
    sendReactNativeMessage({ type: 'Profile' });
    setOpenActionSheet(false); // 액션 시트 자동 종료
  };

  const deleteImage = () => {
    setProfileImage('/images/Avatar.svg');
    setOpenActionSheet(false); // 액션 시트 자동 종료
  };

  useEffect(() => {
    if (typeof window !== 'undefined') {
      getReactNativeMessage(setProfileImage);
    }
  }, []);

  const buttons = [
    // { name: '사진 촬영', buttonClick: takePicture }, // 2차 배포
    { name: '앨범에서 선택', buttonClick: choosePicture },
    { name: '기본 이미지로 변경', buttonClick: deleteImage },
  ];

  const myId = useRecoilValue(userId);

  useEffect(() => {
    const ferchData = async () => {
      const result = await getProfile();

      setNickName(result.name);
      setIntroduction(result.description);
      setOpen(!result.isBodyPrivate);
      setHeight(String(result.height));
      setWeight(String(result.weight));
      setProfileImage(result.profileImage);
      setOriginProfile(result.profileImage); // 이미지 선택 도중 원본 이미지 복구를 위함
    };

    ferchData();
  }, []);

  const [possible, setPossible] = useState<Boolean>(false);

  useEffect(() => {
    if (
      nickName === '' ||
      height === '0' ||
      weight === '0' ||
      height === '' ||
      weight === '' ||
      !nickNameCheck
    ) {
      setPossible(false);
    } else {
      setPossible(true);
    }
  }, [nickName, weight, height, nickNameCheck]);

  const onClickNextButton = async () => {
    if (possible) {
      const payload = {
        name: nickName,
        profileImage: profileImage === '/images/Avatar.svg' ? '' : profileImage,
        description: introduction,
        height: Number(height),
        weight: Number(weight),
        isBodyPrivate: !open,
      };

      const result = await patchProfile(payload);

      if (result) {
        router.push({
          pathname: `/mypage/${myId}`,
          query: { state: 'editSuccess' },
        });
      } else {
        alert('실패');
      }
    }
  };

  useEffect(() => {
    if (profileImage === undefined) {
      // 이미지 선택 취소 시 원본 프로필 이미지로 재수정
      setProfileImage(originProfile);
    }
  }, [profileImage]);

  return (
    <>
      <S.Layout>
        <S.Main>
          <EditProfile
            imageURL={profileImage}
            setImageURL={setProfileImage}
            onClickImage={() => setOpenActionSheet(!openActionSheet)}
          />
          <EditMyInfo
            nickNameCheck={nickNameCheck}
            setNickNameCheck={setNickNameCheck}
            nickName={nickName}
            setNickName={setNickName}
            introduction={introduction}
            setIntroduction={setIntroduction}
            height={height}
            setHeight={setHeight}
            weight={weight}
            setWeight={setWeight}
            open={open}
            setOpen={setOpen}
            possible={possible}
            setPossible={setPossible}
          />
        </S.Main>
        <Button
          className="editMyPageButton"
          backgroundColor={possible ? 'grey_00' : 'grey_90'}
          color="grey_100"
          size="big"
          onClick={onClickNextButton}
          border={false}
        >
          <Button3>수정 완료</Button3>
        </Button>
      </S.Layout>

      {openActionSheet && <ActionSheet buttons={buttons} />}
    </>
  );
}
