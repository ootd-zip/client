import Input from '@/components/Input';
import S from './style';

interface InputComponentProps {
  onChange: (value: string) => void;
  age: string;
}

/*
이름: 나이 인풋
역할: 회원가입에서 사용되는 나이를 기입하는 인풋 컴포넌트
*/
export default function AgeInput({ onChange, age }: InputComponentProps) {
  return (
    <Input>
      <S.Layout>
        <Input.Label size="big">나이</Input.Label>
        <Input.Text
          defaultValue={age}
          line="underline"
          size="small"
          unit="세"
          onChange={onChange}
          placeholder="24"
          type="number"
        />
      </S.Layout>
    </Input>
  );
}
