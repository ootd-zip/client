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

/*
이름: 내 정보 수정 컴포넌트
역할: 유저의 프로필과 정보 수정 가능한 컴포넌트
*/

export default function Edit({
  openActionSheet,
  setOpenActionSheet,
}: ActionSheetProps) {
  const router = useRouter();

  // 실제 보여지는 프로필 이미지
  const [profileImage, setProfileImage] = useState<string>(
    '/images/basicProfile.svg'
  );

  // 페이지 최초 진입 시 프로필 이미지
  const [originProfile, setOriginProfile] = useState<string>(
    '/images/basicProfile.svg'
  );

  const [nickNameCheck, setNickNameCheck] = useState<Boolean>(true);
  const [nickName, setNickName] = useState<string>('닉네임');
  const [introduction, setIntroduction] = useState<string>('소개');
  const [height, setHeight] = useState<string>('160');
  const [weight, setWeight] = useState<string>('40');
  const [open, setOpen] = useState<Boolean>(true);

  const { getProfile, patchProfile } = UserApi();

  // 사진 촬영 후 바로 이미지 업로드 함수
  const takePicture = () => {
    sendReactNativeMessage({ type: 'TakeProfile' }); // react-native 기능으로 사진 촬영 후 바로 이미지 업로드 하기 위한 통신 메시지
    setOpenActionSheet(false); // 액션 시트 자동 종료
  };

  // 앨범에서 이미지 선택 후 업로드 함수
  const choosePicture = () => {
    sendReactNativeMessage({ type: 'Profile' }); // react-native 기능으로 앨범에서 이미지 선택하기 위한 통신 메시지
    setOpenActionSheet(false); // 액션 시트 자동 종료
  };

  // 기본 이미지로 변경하는 함수
  const deleteImage = () => {
    setProfileImage('/images/Avatar.svg');
    setOpenActionSheet(false); // 액션 시트 자동 종료
  };

  useEffect(() => {
    if (typeof window !== 'undefined') {
      getReactNativeMessage(setProfileImage);
    }
  }, []);

  // ActionSheet 버튼 정의 및 함수
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

  // 편집 완료 버튼 활성화를 위한 체크
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

  // 편집 완료 버튼 함수
  const onClickNextButton = async () => {
    if (possible) {
      const payload = {
        name: nickName,
        profileImage: profileImage === '/images/Avatar.svg' ? '' : profileImage, // 프로필 이미지를 기본 값으로 설정한 경우 빈 스트링으로 전송
        description: introduction,
        height: Number(height),
        weight: Number(weight),
        isBodyPrivate: !open,
      };

      const result = await patchProfile(payload);

      // API 통신이 성공적이었다면 이전 페이지(마이페이지)에서 toast message 설정
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
          {/* 프로필 이미지 */}
          <EditProfile
            imageURL={profileImage}
            setImageURL={setProfileImage}
            onClickImage={() => setOpenActionSheet(!openActionSheet)}
          />
          {/* 내 정보 */}
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
        {/* 수정 완료 버튼 */}
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
