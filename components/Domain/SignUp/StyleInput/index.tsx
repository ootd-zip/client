import Input from '@/components/Input';
import S from './style';
import { Style } from '@/pages/add-ootd';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { OOTDApi } from '@/apis/domain/OOTD/OOTDApi';

interface StyleInputProps {
  selectedStyle: Style[];
  setSelectedStyle: Dispatch<SetStateAction<Style[]>>;
}
/*
이름: 스타일 인풋
역할: 회원가입에서 사용되는 스타일을 선택하는 컴포넌트
*/
export default function StyleInput({
  selectedStyle,
  setSelectedStyle,
}: StyleInputProps) {
  const [style, setStyle] = useState<Style[]>([]); //스타일 리스트
  const { getStyle } = OOTDApi();

  //스타일 리스트 조회 api 호출 함수
  useEffect(() => {
    const ferchData = async () => {
      let result = (await getStyle()).map((item: Style) => {
        return { ...item, state: false };
      }) as Style[];

      setStyle(result);
    };

    ferchData();
  }, []);

  //스타일 리스트 변동 시 선택한 스타일 리스트 업데이트
  useEffect(() => {
    const newStyle = style.filter((item) => item.state);

    setSelectedStyle(newStyle);
  }, [style]);

  return (
    <Input>
      <S.Layout>
        <Input.Label size="big">선호 스타일</Input.Label>
        <div>
          <Input.CheckBox state={style} setState={setStyle}></Input.CheckBox>
          {selectedStyle?.length < 3 && (
            <Input.HelperText className="helperText" state={2}>
              최소 3개 이상 선택해주세요.
            </Input.HelperText>
          )}
        </div>
      </S.Layout>
    </Input>
  );
}
