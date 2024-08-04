import S from './style';
import { Headline1, Body2, Body3 } from '@/components/UI';
import {
  AiOutlineShopping,
  AiOutlineCalendar,
  AiOutlineContainer,
} from 'react-icons/ai';

interface colorProps {
  id: number;
  color: string;
  name: string;
}

interface ClothDiscriptionProps {
  color?: colorProps[];
  size?: string;
  buyDate?: string;
}

/*
이름: 의류 세부사항 정보 컴포넌트
역할: 색상, 사이즈, 구매시기 세부사항 정보 컴포넌트
*/

export default function DetailClothDetailInfo({
  color,
  size,
  buyDate,
}: ClothDiscriptionProps) {
  return (
    <S.Layout>
      <S.CategoryStart>
        {/* colorSpan 컴포넌트가 아닌 자체 colorList 사용 */}
        <S.InfoTitle>
          <Body3 style={{ fontWeight: '600' }}>색상</Body3>
        </S.InfoTitle>
        <S.ColorList>
          {color &&
            color.map((item, index) => {
              return (
                <>
                  <S.ColorSpanLayout key={index}>
                    <S.ColorSpan bgColor={item.color} />
                    <Body3>{item.name}</Body3>
                  </S.ColorSpanLayout>
                </>
              );
            })}
        </S.ColorList>
      </S.CategoryStart>

      <S.Category>
        <S.InfoTitle>
          <Body3 style={{ fontWeight: '600' }}>사이즈</Body3>
        </S.InfoTitle>
        <Body3>{size}</Body3>
      </S.Category>

      {buyDate && (
        <S.Category>
          <S.InfoTitle>
            <Body3 style={{ fontWeight: '600' }}>구매시기</Body3>
          </S.InfoTitle>
          <Body3>{buyDate}</Body3>
        </S.Category>
      )}
    </S.Layout>
  );
}
