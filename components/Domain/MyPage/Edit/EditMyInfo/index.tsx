import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import S from './style';
import { Body3, Caption1 } from '@/components/UI';
import HelperText from '@/components/Input/HelperText';
import Input from '@/components/Input';
import SwitchToggle from '@/components/Toggle/SwitchToggle';
import { AiOutlineExclamationCircle } from 'react-icons/ai';

interface MyInfoProps {
  nickName: string;
  setNickName: Dispatch<SetStateAction<string>>;
  introduction: string;
  setIntroduction: Dispatch<SetStateAction<string>>;
  height: string;
  setHeight: Dispatch<SetStateAction<string>>;
  weight: string;
  setWeight: Dispatch<SetStateAction<string>>;
  open: Boolean;
  setOpen: Dispatch<SetStateAction<Boolean>>;
}

export default function EditMyInfo({
  nickName,
  setNickName,
  introduction,
  setIntroduction,
  height,
  setHeight,
  weight,
  setWeight,
  open,
  setOpen,
}: MyInfoProps) {
  return (
    <>
      <S.Layout>
        <S.Category>
          <Body3>닉네임</Body3>
          <Input.Text
            defaultValue={nickName}
            size="big"
            line="outline"
            onChange={setNickName}
          />
        </S.Category>

        <S.Category>
          <Body3>소개</Body3>
          <Input.Text
            defaultValue={introduction}
            size="big"
            line="outline"
            onChange={setIntroduction}
          />
        </S.Category>

        <S.BodyInfo>
          <S.Category>
            <Body3>신장</Body3>
            <Input.Text
              defaultValue={height}
              size="small"
              line="outline"
              unit="CM"
              type="number"
              onChange={setHeight}
            />
          </S.Category>
          <S.Category>
            <Body3>체중</Body3>
            <Input.Text
              defaultValue={weight}
              size="small"
              line="outline"
              unit="kg"
              type="number"
              onChange={setWeight}
            />
          </S.Category>
        </S.BodyInfo>
      </S.Layout>

      <S.OpenStatus>
        <S.Wrap>
          <Body3>체형정보 공개</Body3>
          <SwitchToggle state={open} setState={setOpen} />
        </S.Wrap>
        <S.CaptionLayout>
          <S.Icon>
            <AiOutlineExclamationCircle />
          </S.Icon>
          <Caption1>다른 사람에게 내 체형정보가 표시되지 않습니다.</Caption1>
        </S.CaptionLayout>
      </S.OpenStatus>
    </>
  );
}
