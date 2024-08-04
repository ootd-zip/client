import { Dispatch, SetStateAction } from 'react';
import S from '@/pageStyle/sign-up/BodyInfo/style';
import BodyInput from '@/components/Domain/SignUp/BodyInput';
import WeightOpen from '@/components/Domain/SignUp/WeightOpen';

interface BodyInfoProps {
  open: Boolean;
  setOpen: Dispatch<SetStateAction<Boolean>>;
  heightSetState: Dispatch<SetStateAction<string>>;
  weightSetState: Dispatch<SetStateAction<string>>;
  weight: string;
  height: string;
}
/*
이름: 체형 정보 페이지
*/
export default function BodyInfo({
  open,
  setOpen,
  heightSetState,
  weightSetState,
  weight,
  height,
}: BodyInfoProps) {
  return (
    <S.Layout>
      <BodyInput
        weight={weight}
        height={height}
        heightSetState={heightSetState}
        weightSetState={weightSetState}
      />
      <WeightOpen state={open} setState={setOpen} />
    </S.Layout>
  );
}
