import S from './style';
import { Headline1, Body2, Body3 } from '@/components/UI';
import { AiOutlineRight } from 'react-icons/ai';

interface ClothInfoProps {
  state: Boolean;
  isPublic: Boolean;
  bigCategory: string;
  smallCategory: string;
  brand: string;
  clothByName: string;
}

export default function DetailClothDiscription({
  state,
  isPublic,
  bigCategory,
  smallCategory,
  brand,
  clothByName,
}: ClothInfoProps) {
  return (
    <S.Layout>
      <S.Container>
        <S.Category>
          <Body2>{bigCategory}</Body2>
          <S.IconSpan>
            <AiOutlineRight />
          </S.IconSpan>
          <Body2 style={{ fontWeight: '600' }}>{smallCategory}</Body2>
        </S.Category>
        {state && (
          <S.OpenTag state={isPublic}>
            <Body3 state="emphasis" className="isPublic">
              {isPublic ? '공개' : '비공개'}
            </Body3>
          </S.OpenTag>
        )}
      </S.Container>
      <Headline1>{brand}</Headline1>
      <Body2 style={{ color: '#BBBBBB' }}>{clothByName}</Body2>
    </S.Layout>
  );
}
