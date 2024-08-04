import { Dispatch, SetStateAction, useState } from 'react';
import S from './style';
import {
  hasKoreanInitial,
  hasSpecialCharacter,
  isMoreThan12Length,
  isMoreThan2Length,
  badNickname,
} from '@/hooks/regex';
import {
  HELPER_TEXT_KOREAN_INITIAL,
  HELPER_TEXT_VALID,
  HELPER_TEXT_SPECIAL_CHAR,
  HELPER_TEXT_12_LENGTH,
  NICKNAME_PLACEHODER,
  HELPER_TEXT_2_LENGTH,
  HELPER_TEXT_BAD_NICKNAME,
  HELPER_TEXT_EXIST_SAMEID,
} from '@/constants/business.constants';
import Input from '@/components/Input';
import { RegisterApi } from '@/apis/domain/Register/RegisterApi';

interface InputProps {
  setInput: Dispatch<SetStateAction<string>>;
  setCanUseId: Dispatch<SetStateAction<Boolean>>;
  id: string;
}
/*
이름: 닉네임을 인풋
역할: 회원가입에서 사용되는 닉네임을 기입하는 인풋 컴포넌트
*/
export default function IdInput({ setInput, setCanUseId, id }: InputProps) {
  //닉네임 조건을 알려주는 헬퍼 텍스트
  const [helperText, setHelperText] = useState<string>('입력해주세요');
  //헬퍼 텍스트의 색상 상태를 위한 상태
  const [state, setState] = useState<number>(1);

  const { checkName } = RegisterApi();

  //헬퍼 텍스트 업데이트 함수
  const updateHelperText = (text: string, newState: number) => {
    setHelperText(text);
    setState(newState);
  };

  //닉네임 중복 여부 조회 api 함수
  const checkNameApi = (name: string) => {
    const fetchCheckName = async () => {
      const result = await checkName(name);

      return result;
    };

    return fetchCheckName();
  };

  //인풋 유효성 검증 함수
  const idInputValidity = async (value: string) => {
    if (hasKoreanInitial(value)) {
      updateHelperText(HELPER_TEXT_KOREAN_INITIAL, 2);
      setCanUseId(false);
    } else if (hasSpecialCharacter(value)) {
      updateHelperText(HELPER_TEXT_SPECIAL_CHAR, 2);
      setCanUseId(false);
    } else if (isMoreThan12Length(value)) {
      updateHelperText(HELPER_TEXT_12_LENGTH, 2);
      setCanUseId(false);
    } else if (isMoreThan2Length(value)) {
      updateHelperText(HELPER_TEXT_2_LENGTH, 2);
      setCanUseId(false);
    } else if (badNickname(value)) {
      updateHelperText(HELPER_TEXT_BAD_NICKNAME, 2);
      setCanUseId(false);
    } else {
      if (await checkNameApi(value)) {
        updateHelperText(HELPER_TEXT_VALID, 3);
        setCanUseId(true);
        return;
      }
      updateHelperText(HELPER_TEXT_EXIST_SAMEID, 2);
      setCanUseId(false);
    }
  };

  return (
    <S.Layout>
      <Input>
        <Input.Label className="title" size="big">
          닉네임
        </Input.Label>
        <Input.Text
          defaultValue={id}
          line="underline"
          size="big"
          placeholder={NICKNAME_PLACEHODER}
          validity={idInputValidity}
          onChange={setInput}
        />
        {id?.length === 0 || state === 3 ? (
          <div className="hidden">
            <Input.HelperText className="helperText" state={state}>
              {helperText}
            </Input.HelperText>
          </div>
        ) : (
          <Input.HelperText className="helperText" state={state}>
            {helperText}
          </Input.HelperText>
        )}
      </Input>
    </S.Layout>
  );
}

export type { InputProps };
