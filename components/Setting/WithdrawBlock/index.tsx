import Image from 'next/image';
import S from './style';
import CheckBoxTrue from 'public/images/CheckBoxTrue.svg';
import CheckBoxFalse from 'public/images/CheckBoxFalse.svg';
import { Body3, Body4 } from '@/components/UI';
import { useRouter } from 'next/router';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';

interface WithdrawBlockProps {
  title: string;
  content?: React.ReactNode;
  content2?: React.ReactNode;
  buttonClick?: () => void;
  checked: boolean;
  setChecked: Dispatch<SetStateAction<boolean>>;
  lastItem?: Boolean;
}

const WithdrawBlock = ({
  title,
  content,
  content2,
  buttonClick,
  checked,
  setChecked,
  lastItem,
}: WithdrawBlockProps) => {
  const router = useRouter();

  return (
    <S.Layout onClick={buttonClick} state={lastItem}>
      <S.TextWrap>
        <Body3>{title}</Body3>
        <Body4 className="content">{content}</Body4>
        <Body4 className="content">{content2}</Body4>
      </S.TextWrap>
      <S.IconSpan>
        {checked ? (
          <CheckBoxTrue
            className="checkBoxIcon"
            onClick={() => setChecked(false)}
          />
        ) : (
          <CheckBoxFalse
            className="checkBoxIcon"
            onClick={() => setChecked(true)}
          />
        )}
      </S.IconSpan>
    </S.Layout>
  );
};

export default WithdrawBlock;
