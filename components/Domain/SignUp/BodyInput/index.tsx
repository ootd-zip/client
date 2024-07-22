import Input from '@/components/Input';
import { Dispatch, SetStateAction } from 'react';
import S from './style';

interface BodyInputProps {
  heightSetState: Dispatch<SetStateAction<string>>;
  weightSetState: Dispatch<SetStateAction<string>>;
  weight: string;
  height: string;
}
/*
이름: 체형 인풋
역할: 회원가입에서 사용되는 체형을 기입하는 인풋 컴포넌트
*/
export default function BodyInput({
  heightSetState,
  weightSetState,
  weight,
  height,
}: BodyInputProps) {
  return (
    <Input>
      <S.Layout>
        <Input.Label size="big">체형</Input.Label>
        <S.BodyLayout>
          <S.Weight>
            <Input.Label size="small">신장</Input.Label>
            <Input.Text
              defaultValue={height}
              line="underline"
              size="small"
              unit="cm"
              placeholder="160"
              onChange={heightSetState}
              type="number"
            />
          </S.Weight>
          <S.Height>
            <Input.Label size="small">몸무게</Input.Label>
            <Input.Text
              defaultValue={weight}
              line="underline"
              size="small"
              unit="kg"
              placeholder="40"
              onChange={weightSetState}
              type="number"
            />
          </S.Height>
        </S.BodyLayout>
      </S.Layout>
    </Input>
  );
}

export type { BodyInputProps };
