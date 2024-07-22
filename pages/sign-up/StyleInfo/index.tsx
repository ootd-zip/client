import { Dispatch, SetStateAction } from 'react';
import S from '@/pageStyle/sign-up/StyleInfo/style';
import GenderInput from '@/components/Domain/SignUp/GenderInput';
import StyleInput from '@/components/Domain/SignUp/StyleInput';
import { Style } from '@/pages/add-ootd';

interface StyleInfoProps {
  gender: Boolean;
  setGender: Dispatch<SetStateAction<Boolean>>;
  selectedStyle: Style[];
  setSelectedStyle: Dispatch<SetStateAction<Style[]>>;
}
/*
이름: 스타일 정보 페이지
*/
export default function StyleInfo({
  gender,
  setGender,
  selectedStyle,
  setSelectedStyle,
}: StyleInfoProps) {
  return (
    <S.Layout>
      <GenderInput gender={gender} setGender={setGender} />
      <div className="styleInput">
        <StyleInput
          selectedStyle={selectedStyle}
          setSelectedStyle={setSelectedStyle}
        />
      </div>
    </S.Layout>
  );
}
