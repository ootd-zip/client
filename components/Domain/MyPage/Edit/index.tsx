import { useFunnel } from '@/hooks/use-funnel';
import S from './style';
import EditProfile from './EditProfile';
import EditMyInfo from './EditMyInfo';
import { useState } from 'react';
import ActionSheet from '@/components/ActionSheet';

export default function Edit() {
  const [ImageURL, setImageURL] = useState<string>('/images/권낙현.jpg');

  const [nickName, setNickName] = useState<string>('닉네임');
  const [introduction, setIntroduction] = useState<string>('소개');
  const [height, setHeight] = useState<string>('160');
  const [weight, setWeight] = useState<string>('40');
  const [open, setOpen] = useState<Boolean>(true);

  const [openActionSheet, setOpenActionSheet] = useState<Boolean>(false);

  const takePicture = () => {
    console.log('사진 촬영');
  };

  const choosePicture = () => {
    console.log('앨범에서 선택');
  };

  const deleteImage = () => {
    console.log('현재 사진 삭제');
    setImageURL('');
  };

  const buttons = [
    { name: '사진 촬영', buttonClick: takePicture },
    { name: '앨범에서 선택', buttonClick: choosePicture },
    { name: '현재 사진 삭제', buttonClick: deleteImage, state: 'emphasis' },
  ];

  return (
    <>
      <S.Background
        isOpen={openActionSheet}
        onClick={() => setOpenActionSheet(false)}
      />
      <S.Layout>
        <EditProfile
          imageURL={ImageURL}
          setImageURL={setImageURL}
          onClickImage={() => setOpenActionSheet(!openActionSheet)}
        />
        <EditMyInfo
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
        />
      </S.Layout>

      {openActionSheet && <ActionSheet buttons={buttons} />}
    </>
  );
}
