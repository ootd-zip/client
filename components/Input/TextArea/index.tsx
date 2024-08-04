import { Dispatch, SetStateAction, useState } from 'react';
import S from './style';
import { Caption1 } from '@/components/UI';
import { MAX_TEXTAREA_LENGTH } from '@/constants/business.constants';

interface TextAreaProps {
  input: string;
  setInput: Dispatch<SetStateAction<string>>;
  placeholder: string;
}
/*
이름: 문자열 인풋
역할: 문자열 입력 컴포넌트
*/
export default function TextArea({
  input,
  setInput,
  placeholder,
}: TextAreaProps) {
  //문자열 선택 유무
  const [onClickDescriptionState, setOnclickDescriptionState] =
    useState<Boolean>(false);

  //문자열 변경 시 실행되는 함수
  const onChangeTextArea = (e: any) => {
    setInput(e.target.value);
  };
  return (
    <S.Layout
      onFocus={() => setOnclickDescriptionState(true)}
      onBlur={() => setOnclickDescriptionState(false)}
      onClickDescriptionState={onClickDescriptionState}
    >
      <S.TextArea
        onChange={onChangeTextArea}
        maxLength={2000}
        placeholder={placeholder}
        value={input}
      />
      <S.TextAreaLength>
        <Caption1>
          {input?.length}/{MAX_TEXTAREA_LENGTH}
        </Caption1>
      </S.TextAreaLength>
    </S.Layout>
  );
}
