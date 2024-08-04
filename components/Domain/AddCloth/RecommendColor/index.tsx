import { Body3, Button3 } from '@/components/UI';
import S from './style';
import MiniColor from '@/components/ColorList/MiniColor';
import { suggestionColorType } from '@/pages/add-cloth';
import { Dispatch, SetStateAction } from 'react';
import { ColorListType } from '@/components/ColorList';

interface ReommendColorProps {
  suggestionColor: suggestionColorType;
  setClothColor: Dispatch<SetStateAction<ColorListType | null>>;
}

export default function RecommendColor({
  suggestionColor,
  setClothColor,
}: ReommendColorProps) {
  //색상 제안 적용 버튼 클릭 함수
  const onClickSuggestionColor = () => {
    setClothColor([
      {
        id: suggestionColor.id,
        colorCode: suggestionColor.colorCode,
        name: suggestionColor.name,
        state: true,
      },
    ]);
  };
  return (
    <S.Layout>
      <Body3 state="emphasis">제안</Body3>
      <S.Color>
        <MiniColor
          color={suggestionColor!.colorCode}
          name={suggestionColor!.name}
        />
      </S.Color>
      <S.Button>
        <Button3 onClick={onClickSuggestionColor}>적용</Button3>
      </S.Button>
    </S.Layout>
  );
}
