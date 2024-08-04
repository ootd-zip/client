import React, { FC, useEffect, useState } from 'react';
import { AppLayoutProps } from '@/AppLayout';
import { Style } from '../add-ootd';
import S from '@/pageStyle/agree/style';
import AppBar from '@/components/Appbar';
import { AiOutlineArrowLeft } from 'react-icons/ai';
import { useRouter } from 'next/router';
import Symbol from '@/public/images/symbol.svg';
import { Button3, Headline2 } from '@/components/UI';
import CheckBoxTrue from 'public/images/CheckBoxTrue.svg';
import CheckBoxFalse from 'public/images/CheckBoxFalse.svg';
import AgreeBlock from '@/components/AgreeBlock';
import Button from '@/components/Button';

interface ComponentWithLayout extends FC {
  Layout?: FC<AppLayoutProps>;
}

/*
이름: 동의 페이지
역할: 회원가입 시 동의 페이지
*/

const Agree: ComponentWithLayout = () => {
  const router = useRouter();

  const [check1, setCheck1] = useState<Boolean>(false);
  const [check2, setCheck2] = useState<Boolean>(false);

  const [possible, setPossible] = useState<Boolean>(false);
  const [alertOpen, setAlertOpen] = useState<Boolean>(false);

  useEffect(() => {
    if (check1 && check2) {
      setPossible(true);
    } else {
      setPossible(false);
    }
  }, [check1, check2]);

  // 다음 버튼 함수
  const onClickNextButton = async () => {
    if (possible) {
      router.push('/sign-up');
    }
  };

  return (
    <>
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
      <S.Layout>
        <Symbol className="symbol" />
        <S.Text>
          <Headline2>만나서 반가워요!</Headline2>
          <Headline2>ootdzip 서비스 이용을 위한</Headline2>
          <Headline2>약관 동의가 필요해요.</Headline2>
        </S.Text>

        <S.CheckLayout>
          <AgreeBlock
            title="이용약관 동의"
            checked={check1}
            setChecked={setCheck1}
          />
          <AgreeBlock
            title="개인정보처리방침 동의"
            checked={check2}
            setChecked={setCheck2}
            lastItem={true}
          />
        </S.CheckLayout>

        <Button
          className="agreeButton"
          backgroundColor={possible ? 'grey_00' : 'grey_90'}
          color="grey_100"
          size="big"
          onClick={onClickNextButton}
          border={false}
        >
          <Button3>다음</Button3>
        </Button>
      </S.Layout>
    </>
  );
};

export default Agree;

export type { ComponentWithLayout, Style };

Agree.Layout = ({ children }: AppLayoutProps) => {
  return <>{children}</>;
};

Agree.Layout.displayName = 'NameLayout';
