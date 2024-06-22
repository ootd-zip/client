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

export default function EditProfile({
  imageURL,
  setImageURL,
  onClickImage,
}: EditProfileProps) {
  const [openActionSheet, setOpenActionSheet] = useState<Boolean>(false);

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
