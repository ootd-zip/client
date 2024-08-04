import AppBar from '@/components/Appbar';
import S from '@/pageStyle/edit-mypage/style';
import { AiOutlineArrowLeft } from 'react-icons/ai';
import { useRouter } from 'next/router';
import Edit from '@/components/Domain/MyPage/Edit';
import React, { FC, useState } from 'react';
import { Style } from '../add-ootd';
import { AppLayoutProps } from '@/AppLayout';
import Background from '@/components/Background';

interface ComponentWithLayout extends FC {
  Layout?: FC<AppLayoutProps>;
}

/*
이름: 내 정보 수정 페이지
역할: 마이페이지 내 정보 수정 페이지
*/

const EditMyPage: ComponentWithLayout = () => {
  const router = useRouter();

  const [openActionSheet, setOpenActionSheet] = useState<Boolean>(false);

  return (
    <>
      <Background
        isOpen={openActionSheet}
        onClick={() => setOpenActionSheet(false)}
      />
      <S.Layout>
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
        <Edit
          openActionSheet={openActionSheet}
          setOpenActionSheet={setOpenActionSheet}
        />
      </S.Layout>
    </>
  );
};

export default EditMyPage;

export type { ComponentWithLayout, Style };

EditMyPage.Layout = ({ children }: AppLayoutProps) => {
  return <>{children}</>;
};

EditMyPage.Layout.displayName = 'NameLayout';
