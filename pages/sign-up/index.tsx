import React, { FC, useEffect, useState } from 'react';
import { useFunnel } from '@/hooks/use-funnel';
import BasicInfo from './BasicInfo';
import BodyInfo from './BodyInfo';
import StyleInfo from './StyleInfo';
import NextButton from '@/components/NextButton';
import S from '@/pageStyle/sign-up/style';
import Title1 from '@/components/UI/TypoGraphy/Title1';
import AppBar from '@/components/Appbar';
import { AppLayoutProps } from '@/AppLayout';
import { AiOutlineArrowLeft, AiOutlineClose } from 'react-icons/ai';
import { useRouter } from 'next/router';
import { Style } from '../add-ootd';
import { RegisterApi } from '@/apis/domain/Register/RegisterApi';

interface ComponentWithLayout extends FC {
  Layout?: FC<AppLayoutProps>;
}

const SignUp: ComponentWithLayout = () => {
  const steps = ['기본정보', '체형정보', '취향정보'];
  const [Funnel, currentStep, handleStep] = useFunnel(steps);
  const [id, setId] = useState<string>('');
  const [age, setAge] = useState<string>('');
  const [height, setHeight] = useState<string>('');
  const [weight, setWeight] = useState<string>('');
  const [open, setOpen] = useState<Boolean>(true);
  const [gender, setGender] = useState<Boolean>(true);
  const [canUseId, setCanUseId] = useState<Boolean>(false);
  const [basicState, setBasicState] = useState<Boolean>(false);
  const [bodyState, setBodyState] = useState<Boolean>(false);
  const [styleState, setStyleState] = useState<Boolean>(false);
  const [selectedStyle, setSelectedStyle] = useState<Style[]>([]);

  const { postRegistUserInfo } = RegisterApi();

  useEffect(() => {
    const canAdvanceBasicState = canUseId && age?.length > 0;

    const canAdvanceBodyState = weight?.length > 0 && height?.length > 0;

    const canAdvanceStyleState = selectedStyle?.length >= 3;

    setBasicState(canAdvanceBasicState);
    setBodyState(canAdvanceBodyState);
    setStyleState(canAdvanceStyleState);
  }, [canUseId, age, weight, height, selectedStyle]);

  const onClickSubmitButton = async () => {
    const payload = {
      name: id,
      gender: gender ? 'MALE' : 'FEMALE',
      age: Number(age),
      height: Number(height),
      weight: Number(weight),
      isBodyPrivate: !open,
      styles: selectedStyle.map((item) => item.id),
    };

    const result = await postRegistUserInfo(payload);

    if (result) router.push('/splash-screen');
  };

  const router = useRouter();
  const onClickAppbarButton = () => {
    if (currentStep === '기본정보') {
      router.push('/sign-in');
    } else if (currentStep === '체형정보') {
      handleStep('기본정보');
    } else {
      handleStep('체형정보');
    }
  };

  return (
    <>
      <AppBar
        leftProps={
          currentStep === '기본정보' ? (
            <AiOutlineClose onClick={onClickAppbarButton} />
          ) : (
            <AiOutlineArrowLeft onClick={onClickAppbarButton} />
          )
        }
        middleProps={<Title1>회원가입</Title1>}
        rightProps={<></>}
      />
      <S.Layout>
        <Funnel>
          <S.ProgressBar>
            {steps.map((stepName, index) =>
              // 스타일 컴포넌트를 사용하여 스타일 적용
              currentStep === stepName ? (
                <S.ActiveStep key={stepName}>
                  <S.Progress>
                    <div className="number">
                      <Title1>0{index + 1}.</Title1>
                    </div>
                    <Title1>{stepName}</Title1>
                  </S.Progress>
                </S.ActiveStep>
              ) : (
                <S.Step key={stepName}>
                  <S.Progress>
                    <div className="number">
                      <Title1>0{index + 1}.</Title1>
                    </div>
                    <Title1>{stepName}</Title1>
                  </S.Progress>
                </S.Step>
              )
            )}
          </S.ProgressBar>
          <S.Main>
            <Funnel.Steps name="기본정보">
              <BasicInfo
                id={id}
                age={age}
                setId={setId}
                setAge={setAge}
                setCanUseId={setCanUseId}
              />
              <NextButton
                className="nextButton"
                state={basicState}
                onClick={() => handleStep('체형정보')}
              >
                다음
              </NextButton>
            </Funnel.Steps>
            <Funnel.Steps name="체형정보">
              <BodyInfo
                weight={weight}
                height={height}
                heightSetState={setHeight}
                weightSetState={setWeight}
                open={open}
                setOpen={setOpen}
              />
              <NextButton
                className="nextButton"
                state={bodyState}
                onClick={() => handleStep('취향정보')}
              >
                다음
              </NextButton>
            </Funnel.Steps>
            <Funnel.Steps name="취향정보">
              <StyleInfo
                gender={gender}
                setGender={setGender}
                selectedStyle={selectedStyle}
                setSelectedStyle={setSelectedStyle}
              />
              <NextButton
                className="nextButton"
                state={styleState}
                onClick={onClickSubmitButton}
              >
                다음
              </NextButton>
            </Funnel.Steps>
          </S.Main>
        </Funnel>
      </S.Layout>
    </>
  );
};

export default SignUp;

export type { ComponentWithLayout, Style };

SignUp.Layout = ({ children }: AppLayoutProps) => {
  return <>{children}</>;
};

SignUp.Layout.displayName = 'NameLayout';
