import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import S from './style';
import { Caption1 } from '@/components/UI';
import ActionSheet from '@/components/ActionSheet';
import Avatar from '@/public/images/Avatar.svg';
import NextImage from '@/components/NextImage';

interface EditProfileProps {
  imageURL: string;
  setImageURL: Dispatch<SetStateAction<string>>;
  onClickImage: () => void;
}

/*
이름: 내 프로필 이미지 수정 컴포넌트
역할: 유저의 프로필 이미지 수정 하기 위한 컴포넌트
*/

export default function EditProfile({
  imageURL,
  setImageURL,
  onClickImage,
}: EditProfileProps) {
  // 이미지 클릭한 경우 발생되는 함수
  const onClickPicutre = () => {
    onClickImage();
  };

  return (
    <>
      <S.Layout>
        {imageURL === '' ? (
          <Avatar className="userImage" />
        ) : (
          <NextImage
            fill={false}
            width={88}
            height={88}
            className="userImage"
            src={imageURL}
            alt="유저 이미지"
          />
        )}
        <Caption1 style={{ color: '#8B8B8B' }} onClick={onClickPicutre}>
          사진 변경
        </Caption1>
      </S.Layout>
    </>
  );
}
