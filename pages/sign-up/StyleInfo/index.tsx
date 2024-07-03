import { Dispatch, SetStateAction } from 'react';
import S from '@/pageStyle/sign-up/StyleInfo/style';
import GenderInput from '@/components/Domain/SignUp/GenderInput';
import StyleInput from '@/components/Domain/SignUp/StyleInput';
import { Style } from '@/utils/types/OOTD.types';

interface StyleInfoProps {
  gender: Boolean;
  setGender: Dispatch<SetStateAction<Boolean>>;
  selectedStyle: Style[];
  setSelectedStyle: Dispatch<SetStateAction<Style[]>>;
}

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
