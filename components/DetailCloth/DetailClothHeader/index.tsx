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

/*
이름: 의류 상세 Header 컴포넌트
역할: 분류, 공개 여부, 이름을 표현하는 의류 상세 Header 컴포넌트
*/

export default function DetailClothHeader({
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
          {/* 대분류 */}
          <Body2>{bigCategory}</Body2>
          <S.IconSpan>
            <AiOutlineRight />
          </S.IconSpan>
          {/* 소분류 */}
          <Body2 state="emphasis">{smallCategory}</Body2>
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
      <Body2 className="clothName">{clothByName}</Body2>
    </S.Layout>
  );
}
