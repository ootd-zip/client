import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import S from './style';
import { Body3 } from '@/components/UI';
import HelperText from '@/components/Input/HelperText';
import Input from '@/components/Input';
import SwitchToggle from '@/components/Toggle/SwitchToggle';
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
  HELPER_TEXT_NULL,
  NICKNAME_PLACEHODER,
  HELPER_TEXT_2_LENGTH,
  HELPER_TEXT_BAD_NICKNAME,
  HELPER_TEXT_EXIST_SAMEID,
} from '@/constants/business.constants';
import { RegisterApi } from '@/apis/domain/Register/RegisterApi';

interface MyInfoProps {
  nickNameCheck: Boolean;
  setNickNameCheck: Dispatch<SetStateAction<Boolean>>;
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
  possible: Boolean;
  setPossible: Dispatch<SetStateAction<Boolean>>;
}

/*
이름: 내 정보 수정 컴포넌트
역할: 마이페이지 내 정보 수정하기 위한 컴포넌트
*/

export default function EditMyInfo({
  nickNameCheck,
  setNickNameCheck,
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
  possible,
  setPossible,
}: MyInfoProps) {
  // 닉네임 조건을 나타내는 helperText
  const [helperText, setHelperText] = useState<string>('입력해주세요');
  // helperText의 상태로 색상 변화를 나타냄
  const [state, setState] = useState<number>(1);
  const { checkName } = RegisterApi();

  // helperText 변환해주는 함수
  const updateHelperText = (text: string, newState: number) => {
    setHelperText(text);
    setState(newState);
  };

  // 닉네임 중복 확인 API 함수 -> 이미 본인이 사용하고 있는 닉네임이면 중복 해당 x
  const checkNameApi = (name: string) => {
    const fetchCheckName = async () => {
      const result = await checkName(name);

      return result;
    };

    return fetchCheckName();
  };

  // ID 사용 여부 확인 상태 값
  const [canUseId, setCanUseId] = useState<Boolean>(false);

  // ID 작성 시 유효성 검증 함수수
  const idInputValidity = async (value: string) => {
    if (value !== undefined && value.length === 0) {
      updateHelperText(HELPER_TEXT_NULL, 1);
      setCanUseId(false);
    } else if (hasKoreanInitial(value)) {
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

  useEffect(() => {
    if (!canUseId) {
      setNickNameCheck(false);
    } else {
      setNickNameCheck(true);
    }
  }, [canUseId]);

  return (
    <>
      <S.Layout>
        <S.Category>
          <Input>
            <Input.Label className="title" size="small">
              닉네임
            </Input.Label>
            <Input.Text
              state={nickName === '' ? false : true}
              defaultValue={nickName}
              size="big"
              line="outline"
              onChange={setNickName}
              validity={idInputValidity}
            />
            {/* 닉네임의 상태에 따라서 helperText 차이 */}
            {nickName?.length === 0 || state === 3 ? (
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
        </S.Category>
        <S.Category>
          <Input>
            <Input.Label className="title" size="small">
              소개
            </Input.Label>
            <Input.Text
              state={true}
              defaultValue={introduction}
              size="big"
              line="outline"
              onChange={setIntroduction}
            />
          </Input>
        </S.Category>
        <S.BodyInfo>
          <S.Category>
            <Input>
              <Input.Label className="title" size="small">
                신장
              </Input.Label>
              <Input.Text
                state={height === '' || height === '0' ? false : true}
                defaultValue={height}
                size="small"
                line="outline"
                unit="CM"
                type="number"
                onChange={setHeight}
              />
            </Input>
          </S.Category>
          <S.Category>
            <Input>
              <Input.Label className="title" size="small">
                체중
              </Input.Label>
              <Input.Text
                state={weight === '' || weight === '0' ? false : true}
                defaultValue={weight}
                size="small"
                line="outline"
                unit="KG"
                type="number"
                onChange={setWeight}
              />
            </Input>
          </S.Category>
        </S.BodyInfo>
      </S.Layout>

      <S.OpenStatus>
        <S.Wrap>
          <Body3>체형정보 공개</Body3>
          <SwitchToggle state={open} setState={setOpen} />
        </S.Wrap>
        <HelperText state={3}>
          {open
            ? '다른 사람에게 내 체형정보가 표시됩니다.'
            : '다른 사람에게 내 체형정보가 표시되지 않습니다.'}
        </HelperText>
      </S.OpenStatus>

      {/* 필수 값을 입력하지 않은 경우 helperText 사용 */}
      <S.StateLayout>
        {!possible && (
          <HelperText state={2}>
            닉네임, 신장, 체중은 필수정보입니다.
          </HelperText>
        )}
      </S.StateLayout>
    </>
  );
}
