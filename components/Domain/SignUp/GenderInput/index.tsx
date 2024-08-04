import Input from '@/components/Input';
import { Dispatch, SetStateAction } from 'react';
import S from './style';

interface GenderInputProps {
  gender: Boolean;
  setGender: Dispatch<SetStateAction<Boolean>>;
}
/*
이름: 성별 선택
역할: 회원가입에서 사용되는 성별을 선택하는 컴포넌트
*/
export default function GenderInput({ gender, setGender }: GenderInputProps) {
  return (
    <S.Layout>
      <Input>
        <Input.Label size="big">성별</Input.Label>
        <div className="truefalse">
          <Input.TrueFalse
            left="남성"
            right="여성"
            state={gender}
            setState={setGender}
          />
        </div>
        <Input.HelperText className="helperText" state={1}>
          입력하신 정보는 스타일 추천 목적으로 활용됩니다.
        </Input.HelperText>
      </Input>
    </S.Layout>
  );
}
