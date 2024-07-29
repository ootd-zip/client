import React, { MutableRefObject, useState, useEffect, useRef } from 'react';
import { AiFillCloseCircle, AiOutlineLink } from 'react-icons/ai';
import S from './style';
import useDebounce from '@/hooks/useDebouce';
import Body from '@/components/UI/TypoGraphy/Body3';

interface TextProps {
  defaultValue?: string;
  size: 'big' | 'small';
  placeholder?: string;
  unit?: string;
  validity?: (value: string) => void;
  onChange: (value: string) => void;
  type?: 'number' | 'Link';
  border?: Boolean;
  line: 'underline' | 'outline';
  inputRef?: MutableRefObject<null>;
  pressEnter?: () => void;
  onClick?: () => void;
  state?: Boolean;
}
/*
이름: 일반 기본 인풋
역할: 기본적으로 사용되는 인풋 컴포넌트
*/
export default function Text({
  defaultValue,
  size,
  placeholder,
  unit,
  validity,
  onChange,
  type,
  line,
  inputRef,
  pressEnter,
  onClick,
  state,
}: TextProps) {
  //input의 value

  //기존의 값이 있다면 업데이트
  useEffect(() => {
    if (defaultValue) setLetter(defaultValue);
  }, [defaultValue]);

  const [letter, setLetter] = useState<string>(''); //input 글자
  const [inputFocus, setInputFocus] = useState<Boolean>(false); //input 포커싱 유무

  //input 입력 시 letter를 업데이트 하는 함수
  const onChangeInput = (value: string) => {
    setLetter(value);
  };

  //값을 검사해야 한다면 validity 함수로 확인
  const search = () => {
    if (validity) validity(letter && letter.trimEnd());
    onChange(letter);
  };

  //바로바로 값을 판정하는게 아닌 500의 딜레이동안 입력이 없을 때 마지막만 판정
  useDebounce({
    func: () => search(),
    delay: 500,
    deps: [letter],
  });

  //엔터키로 다음 input으로 넘어감
  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      pressEnter ? pressEnter() : '';
    }
  };

  return (
    <S.Layout
      state={state !== undefined ? state : letter.length > 0}
      inputFocus={inputFocus}
      onFocus={() => setInputFocus(true)}
      onBlur={() => setInputFocus(false)}
      size={size}
      line={line}
      onClick={onClick}
      ref={inputRef}
    >
      {/*인풋이 링크일 경우*/}
      {type === 'Link' && (
        <S.LinkIcon state={letter.length > 0}>
          <AiOutlineLink />
        </S.LinkIcon>
      )}
      <S.SearchInput>
        {/*인풋이 숫자일 경우*/}
        {type === 'number' && (
          <S.Input
            ref={inputRef}
            line={line}
            value={letter}
            onChange={(e) => onChangeInput(e.target.value)}
            placeholder={placeholder}
            type="number"
            pattern="\d*"
          />
        )}
        {/*인풋이 숫자가 아닐 경우*/}
        {type !== 'number' && (
          <S.Input
            ref={inputRef}
            line={line}
            value={letter}
            onChange={(e) => onChangeInput(e.target.value)}
            placeholder={placeholder}
            onKeyDown={onKeyDown}
            type={type}
          />
        )}
      </S.SearchInput>
      {/*인풋 초기화 버튼*/}
      {letter.length > 0 && (
        <S.CloseIcon
          className="close"
          onClick={() => setLetter('')}
          line={line}
        >
          <AiFillCloseCircle />
        </S.CloseIcon>
      )}
      {/*인풋 단위*/}
      {unit && (
        <S.Unit>
          <Body>{unit}</Body>
        </S.Unit>
      )}
    </S.Layout>
  );
}
