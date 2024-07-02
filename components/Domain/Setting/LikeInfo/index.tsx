import Input from '@/components/Input';
import S from './style';
import { Style } from '@/utils/types/OOTD.types';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { OOTDApi } from '@/apis/domain/OOTD/OOTDApi';
import { UserApi } from '@/apis/domain/User/UserApi';

interface StyleInputProps {
  selectedStyle: Style[];
  setSelectedStyle: Dispatch<SetStateAction<Style[]>>;
}
export default function LikeInfoStyleInput({
  selectedStyle,
  setSelectedStyle,
}: StyleInputProps) {
  const [style, setStyle] = useState<Style[]>([]);
  const { getStyle } = OOTDApi();

  const { getUserStyle } = UserApi();

  useEffect(() => {
    const ferchData = async () => {
      const userStyle = (await getUserStyle()).map((item: Style) => {
        return { ...item };
      }) as Style[];

      const wholeStyle = (await getStyle()).map((item: Style) => {
        return { ...item, state: false };
      }) as Style[];

      const updatedStyle = wholeStyle.map((styleItem) => {
        const isUserStyle = userStyle.some(
          (userItem) => userItem.id === styleItem.id
        );
        return {
          ...styleItem,
          state: isUserStyle ? true : styleItem.state,
        };
      });

      setStyle(updatedStyle);
    };

    ferchData();
  }, []);

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
